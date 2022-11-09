import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { AppState } from 'src/app/state/app.state';
import { getChat } from 'src/app/state/chats/chats.actions';
import { selectChats } from 'src/app/state/chats/chats.selectors';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
import { Chat, HomeService, Message, User } from '../home.service';

@Component({
  selector: 'personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss'],
  providers: [UnsubscriberService]
})
export class PersonalChatComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  currentChatId: string;
  currentChat: Chat;
  message: string;
  loading: boolean;
  messages: Message[] = [];

  currentUser: User;
  currentUserAvatarLink: string;
  lastMessagedateSearched?: string;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private chatService: HomeService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.routeEventSubscribe();
  }

  ngOnInit() {
    this.getChatStore();
    this.selectUserStore();
    this.networkUpdateSubscribe();
  }

  routeEventSubscribe() {
    this.router.events
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(val => {
        if (val instanceof NavigationEnd) {
          const urlSplit = val.urlAfterRedirects.split('/');
          const id = urlSplit.reverse()[0];
          this.currentChatId = id !== 'chats' ? id : '';

          if (this.currentChatId) {
            this.getMessages({ resetMessages: true });
            this.getChatStore();
            this.socketMessageSubscribe();
          }
        }
      });
  }

  selectUserStore() {
    this.store.select(selectCurrentUser)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(
        (user) => {
          if (user) {
            this.currentUser = user;
            this.currentUserAvatarLink = user.avatar || '';
          }
        }
      );
  }

  getRouteParams() {
    this.route.paramMap
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(params => {
        this.currentChatId = params.get('id') || '';
      });
  }

  getChatStore() {
    this.store.select(selectChats)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(
        (chats: Chat[]) => {
          if (this.currentChat && this.currentChatId && this.currentChat.id === this.currentChatId) {
            return;
          }

          this.currentChat = chats.find((chat) => chat.id === this.currentChatId) || {} as Chat;
        });
  }

  getMessages(props: { lastMessageDate?: string, resetMessages?: boolean }) {
    const { lastMessageDate, resetMessages = false } = props;
    if (resetMessages) this.messages = [];

    const pagination = {
      lastMessageDate: lastMessageDate,
      size: 10
    };
    if (!lastMessageDate) delete pagination.lastMessageDate;

    this.lastMessagedateSearched = pagination.lastMessageDate;
    this.chatService.getMessagesByChat(this.currentChatId, pagination)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        map((response: Message[]) => {
          return response.map((message) => ({ ...message, formattedDate: this.formatDisplayDate(message.createdAt) }));
        })
      )
      .subscribe((response) => {
        this.messages.push(...response);
      });
  }

  socketMessageSubscribe() {
    this.chatService.socketChatSubscribe(this.currentChatId)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((message: Message) => {
        this.messages.unshift({ ...message, formattedDate: this.formatDisplayDate(message.createdAt) });
      });
  }

  onEnter() {
    this.sendMessage();
  }

  onScroll() {
    let element = this.content.nativeElement;
    let atTop = (element.scrollHeight + element.scrollTop) === element.clientHeight;
    if (atTop) {
      const lastMessageDate = this.messages[this.messages.length - 1].createdAt;
      // don't call get messages, if oldest is already present
      if (this.lastMessagedateSearched === lastMessageDate) return;

      this.getMessages({ lastMessageDate: lastMessageDate });
    }
  }

  sendMessage() {
    const newMessage = this.formatMessage();
    this.chatService.sendMessage(this.currentChatId, newMessage.text)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(() => {
        this.emitMessage(newMessage);
        this.message = '';
      });
  }

  emitMessage(newMessage: Message) {
    this.chatService.emitSocketMessage(newMessage);
  }

  formatDisplayDate(date: string) {
    const hours = new Date(date).getHours();
    const mins = new Date(date).getMinutes();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return `${this.formatValue(day)}/${this.formatValue(month)} ${this.formatValue(hours)}:${this.formatValue(mins)}`;
  }

  formatValue(number: number) {
    return `${number < 10 ? '0' : ''}${number}`;
  }

  formatMessage() {
    const date = new Date().toISOString();
    const newMessage = {
      chatId: this.currentChatId,
      createdAt: date,
      userId: this.currentUser.id,
      text: this.message
    }
    return newMessage;
  }

  networkUpdateSubscribe() {
    this.chatService.networkOnline
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(isOnline => isOnline && this.getMessages({ resetMessages: true }))
  }

}