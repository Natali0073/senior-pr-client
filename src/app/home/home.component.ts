import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnsubscriberService } from '../shared/services/unsubscriber.service';
import { AppState } from '../state/app.state';
import { getCurrentUser } from '../state/users/users.actions';
import { User, HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  preview: string = '../../assets/avatar.png';
  currentUser: User;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private chatService: HomeService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.chatService.getCurrentUser()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((user: User) => {
        this.currentUser = user;
        this.store.dispatch(getCurrentUser({ user }));
      });
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }
}
