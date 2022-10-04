import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { selectChats } from 'src/app/state/chats/chats.selectors';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
import { HomeService, User } from '../home.service';

@Component({
  selector: 'personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss']
})
@AutoUnsubscribe
export class PersonalChatComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  currentChatId: string;
  message: string;
  loading: boolean;
  messages: any[] = [];

  currentUser: User;
  currentUserAvatarLink: string;
  friendAvatarLink: string;
  lastMessagedateSearched?: string;

  constructor(
    private chatService: HomeService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {
    this.routeEventSubscribe();
  }

  ngOnInit() {
    this.getChatStore();
    this.selectUserStore();
  }

  routeEventSubscribe() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const urlSplit = val.urlAfterRedirects.split('/');
        const id = urlSplit.reverse()[0];
        this.currentChatId = id !== 'chats' ? id : '';
        if (this.currentChatId) this.getMessages();
      }
    });
  }

  selectUserStore() {
    this.store.select(selectCurrentUser as any).subscribe(
      (user: any) => {
        if (user) {
          this.currentUser = user;
          this.currentUserAvatarLink = user.avatar;
        }
      }
    );
  }

  getRouteParams() {
    this.route.paramMap.subscribe(params => {
      this.currentChatId = params.get('id') || '';
    });
  }

  getChatStore() {
    this.store.select(selectChats as any).subscribe(
      (chats: any) => {
      }
    );
  }

  getMessages(lastMessageDate?: string) {
    const pagination = {
      lastMessageDate: lastMessageDate,
      size: 10
    };
    if (!lastMessageDate) delete pagination.lastMessageDate;

    this.lastMessagedateSearched = pagination.lastMessageDate;
    this.chatService.getMessagesByChat(this.currentChatId, pagination)
      .pipe(
        map(response => {
          return response.map(message => ({ ...message, formattedDate: this.formatDisplayDate(message.date) }));
        })
      )
      .subscribe((response: any) => {
        this.messages.push(...response);
      });
  }

  onEnter() {
    this.sendMessage();
  }

  onScroll() {
    let element = this.content.nativeElement;
    let atTop = (element.scrollHeight + element.scrollTop) === element.clientHeight;
    if (atTop) {
      const lastMessageDate = this.messages[this.messages.length - 1].date;
      // don't call get messages, if oldest is already present
      if (this.lastMessagedateSearched === lastMessageDate) return;

      this.getMessages(lastMessageDate);
    }
  }

  sendMessage() {
    this.chatService.sendMessage(this.currentChatId, this.message)
      .subscribe(() => {
        this.addLatestMessage();
        this.message = '';
      });
  }

  addLatestMessage() {
    const date = new Date().toISOString();
    const newMessage = {
      chatId: this.currentChatId,
      date: date,
      senderId: this.currentUser.id,
      text: this.message,
      formattedDate: this.formatDisplayDate(date),
      id: 'asdsad'
    }
    this.messages.unshift(newMessage);
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

}