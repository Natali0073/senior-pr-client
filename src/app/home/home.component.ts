import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/users.selectors';
import { getCurrentUser } from '../state/users.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router,
    private store: Store,
  ) {
  }


  ngOnInit(): void {
    this.getCurrentUser();
    this.getUsers();
    this.chatService.getMessage().subscribe(message => {
    });

    this.store.select(selectCurrentUser as any).subscribe(
      (user: any) => {
        if (user && user.avatar) this.preview = user.avatar;
      }
    );
  }

  sendMessage() {
    this.chatService.sendMessage('lalala');
  }

  getUsers() {
    this.chatService.getUsers()
      .subscribe((users: User[]) => {
        this.chatsList = users;
        
      });
  }

  getCurrentUser() {
    this.chatService.getCurrentUser()
      .subscribe((user: User) => {
        this.store.dispatch(getCurrentUser({ user }))
      });
  }

  openMyProfile() {
    const dialogRef = this.dialog.open(UserProfileComponent, { panelClass: 'my-profile-modal' });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }
}
