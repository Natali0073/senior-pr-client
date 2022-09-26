import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../shared/utils/AutoUnsubscribe';
import { User, HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../state/users/users.selectors';
import { getCurrentUser } from '../state/users/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UsersListComponent } from './users-list/users-list.component';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

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
    // this.route.paramMap.subscribe(params => {
    //   console.log(1111, params);
      
    //   this.currentChatId = params.get('id') || '';
    // });

//     this.router.events.subscribe(val => {
// console.log(111, val);

//       if (val instanceof RoutesRecognized) {

//           console.log(val.state.root.firstChild.params);

//       }
//   });
 
     this.route.firstChild?.params.subscribe(
      (params) => 
      { 
        this.currentChatId = params.id || '';
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
