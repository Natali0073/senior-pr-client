import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentChatId: string;
  message: string;
  loading: boolean;
  messages: any[];

  currentUser: User;
  currentUserAvatarLink: string;
  friendAvatarLink: string;

  constructor(
    private chatService: HomeService,
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.getRouteParams();
    if (this.currentChatId) this.getMessages();
    this.getChatStore();
    this.selectUserStore();
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

  getMessages() {
    const pagination = {
      // lastMessageDate: undefined, 
      size: 10
    };
    this.chatService.getMessagesByChat(this.currentChatId, pagination)
      .pipe(
        map(response => {
          return response.map(message => ({ ...message, formattedDate: this.formatDisplayDate(message.date) }));
        })
      )
      .subscribe((response: any) => {
        console.log(response);

        this.messages = response
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.currentChatId, this.message)
      .subscribe(() => {
        this.message = '';
      });
  }

  formatDisplayDate(date: string) {
    const hours = new Date(date).getHours();
    const mins = new Date(date).getMinutes();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return `${day}/${month} ${hours}:${mins < 10 ? '0' + mins : mins}`;
  }



}