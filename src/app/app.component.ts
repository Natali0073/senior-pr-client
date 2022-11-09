import { Component, OnInit } from '@angular/core';
import { Subscription, merge, of, fromEvent, map } from 'rxjs';
import { HomeService } from './home/home.service';
import { UnsubscriberService } from './shared/services/unsubscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UnsubscriberService]
})
export class AppComponent implements OnInit {
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(
    private homeService: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.homeService.networkOnline.next(navigator.onLine);
    this.checkNetworkStatus();
  }

  checkNetworkStatus() {
    this.networkStatus$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false)))
      .subscribe((isOnline: boolean) => {
        this.homeService.networkOnline.next(isOnline);
      });
  }
}
