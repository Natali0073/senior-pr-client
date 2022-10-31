import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UnsubscriberService]
})
export class DashboardComponent implements OnInit {
  preview: string = '../../assets/avatar.png';
  currentChatId: string;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRouteParams();
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

  openUsersList() {
    this.dialog.open(UsersListComponent, { panelClass: 'users-list-modal' });
  }

}