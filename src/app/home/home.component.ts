import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/users/users.selectors';
import { getCurrentUser } from '../state/users/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UsersListComponent } from './users-list/users-list.component';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe
export class HomeComponent implements OnInit {
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
