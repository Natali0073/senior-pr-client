import { Component, OnInit } from '@angular/core';
import { UnsubscriberService } from './shared/services/unsubscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UnsubscriberService]
})
export class AppComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
