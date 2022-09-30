import { Component } from '@angular/core';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe
export class HomeComponent {

  constructor() {
  }
}
