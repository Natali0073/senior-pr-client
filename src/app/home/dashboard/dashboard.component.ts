import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { AppState } from 'src/app/state/app.state';
import { getCurrentUser } from 'src/app/state/users/users.actions';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
import { HomeService, User } from '../home.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UnsubscriberService]
})
export class DashboardComponent implements OnInit {
  preview: string = '../../assets/avatar.png';
  chatsList: any[] = [];
  currentChatId: string;
  currentUser: User;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private chatService: HomeService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRouteParams();
    this.getCurrentUser();
    this.selectUserStore();
  }

  getRouteParams() {
    this.route.firstChild?.params
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(params => {
        this.currentChatId = params.id || '';
      });

    this.router.events
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(val => {
        if (val instanceof NavigationEnd) {
          const urlSplit = val.urlAfterRedirects.split('/');
          const id = urlSplit.reverse()[0];
          this.currentChatId = id !== 'chats' ? id : '';
        }
      });
  }

  getCurrentUser() {
    this.chatService.getCurrentUser()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((user: User) => {
        this.currentUser = user;
        this.store.dispatch(getCurrentUser({ user }));
      });
  }

  selectUserStore() {
    this.store.select(selectCurrentUser)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((user) => {
        if (user && user.avatar) this.preview = user.avatar;
      }
      );
  }

  openUsersList() {
    this.dialog.open(UsersListComponent, { panelClass: 'users-list-modal' });
  }

}