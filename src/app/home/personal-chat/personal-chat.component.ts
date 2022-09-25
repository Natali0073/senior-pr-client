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
export class PersonalChatComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentChatId = params.get('id') || '';
    });
    if (this.currentChatId) this.getMessages();

    this.store.select(selectChats as any).subscribe(
      (chats: any) => {
        console.log('chats', chats);
        
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