import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { UserProfileComponent } from './UserProfile/user-profile.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/users.selectors';
import { getCurrentUser } from '../state/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe
export class HomeComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role'];
  preview: string = '../../assets/avatar.png';

  currentUserSelector: any = this.store.select(selectCurrentUser as any).subscribe(
    (user: any) => {
      if (user && user.avatar) this.preview = user.avatar;
    }
  );

  constructor(
    private userService: HomeService,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: User[]) => this.usersList = users);
  }

  getCurrentUser() {
    this.userService.getCurrentUser()
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
