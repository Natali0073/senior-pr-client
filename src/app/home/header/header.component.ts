import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { UserProfileComponent } from '../userProfile/user-profile.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@AutoUnsubscribe
export class HeaderComponent {
  @Input() preview: string;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router
  ) {
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