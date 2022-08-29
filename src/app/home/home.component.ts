import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { UserProfileComponent } from './UserProfile/user-profile.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@AutoUnsubscribe
export class HomeComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['name', 'email'];

  constructor(
    private userService: HomeService,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.usersList = users);
  }

  openMyProfile() {
    const dialogRef = this.dialog.open(UserProfileComponent, { panelClass: 'my-profile-modal' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

  fileUpload(event: any) {
    console.log(event.target.files[0]);
  }
}
