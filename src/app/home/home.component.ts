import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/users/users.selectors';
import { getCurrentUser } from '../state/users/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe
export class HomeComponent implements OnInit {
  preview: string = '../../assets/avatar.png';
  chatsList: any[] = [];

  constructor(
    private chatService: HomeService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.chatService.getMessage().subscribe(message => {
      console.log('getMessage from socket', message);
    });

    this.store.select(selectCurrentUser as any).subscribe(
      (user: any) => {
        if (user && user.avatar) this.preview = user.avatar;
      }
    );
  }

  getCurrentUser() {
    this.chatService.getCurrentUser()
      .subscribe((user: User) => {
        this.store.dispatch(getCurrentUser({ user }));
      });
  }
}
