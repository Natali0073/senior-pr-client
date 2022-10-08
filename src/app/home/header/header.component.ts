import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { logoutAction } from 'src/app/state/global/global.actions';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UnsubscriberService]
})
export class HeaderComponent {
  @Input() preview: string;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router,
    protected store: Store
  ) {
  }

  openMyProfile() {
    this.dialog.open(UserProfileComponent, { panelClass: 'my-profile-modal' });
  }


  logout() {
    this.authService.logout()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(() => {
        this.store.dispatch(logoutAction());
        this.router.navigate(['/login']);
      })
  }

}