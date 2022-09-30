import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { getCurrentUser } from 'src/app/state/users/users.actions';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
import { HomeService, User } from '../home.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@AutoUnsubscribe
export class DashboardComponent implements OnInit {
  preview: string = '../../assets/avatar.png';
  chatsList: any[] = [];
  currentChatId: string;

  constructor(
    private chatService: HomeService,
    private store: Store,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRouteParams();
    this.getCurrentUser();
    this.selectUserStore();
    this.chatService.getMessage().subscribe(message => {
      console.log('getMessage from socket', message);
    });
  }

  getRouteParams() {
    this.route.firstChild?.params.subscribe(
      (params) => {
        this.currentChatId = params.id || '';
      });

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const urlSplit = val.urlAfterRedirects.split('/');
        const id = urlSplit.reverse()[0];
        this.currentChatId = id !== 'chats' ? id : '';
      }
    });
  }

  getCurrentUser() {
    this.chatService.getCurrentUser()
      .subscribe((user: User) => {
        this.store.dispatch(getCurrentUser({ user }));
      });
  }

  selectUserStore() {
    this.store.select(selectCurrentUser as any).subscribe(
      (user: any) => {
        if (user && user.avatar) this.preview = user.avatar;
      }
    );
  }

  openUsersList() {
    const dialogRef = this.dialog.open(UsersListComponent, { panelClass: 'users-list-modal' });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}