import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.component.html',
  styleUrls: ['chat-message.component.scss'],
})

export class ChatMessageComponent implements OnInit {
  constructor() {
  }

  @Input() currentUser: boolean;
  @Input() avatarLink: string;
  @Input() text: string;
  @Input() date: string;

  messageLeftPosition: boolean;

  ngOnInit() {
    this.messageLeftPosition = !this.currentUser;
  }

}
