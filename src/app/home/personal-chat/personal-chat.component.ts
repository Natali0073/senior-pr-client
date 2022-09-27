import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { selectChats } from 'src/app/state/chats/chats.selectors';
import { HomeService } from '../home.service';

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
      .subscribe((response: any) => {
        this.messages = response
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.currentChatId, this.message)
      .subscribe(() => {
        this.message = '';
      });
  }

}