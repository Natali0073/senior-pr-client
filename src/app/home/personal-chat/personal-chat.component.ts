import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';

@Component({
  selector: 'personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss']
})
@AutoUnsubscribe
export class PersonalChatComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }


}