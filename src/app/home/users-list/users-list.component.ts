import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { AppState } from 'src/app/state/app.state';
import { getChat } from 'src/app/state/chats/chats.actions';
import { HomeService, ListPagination, User, UserListDTO } from '../home.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UnsubscriberService]
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'name', 'action'];
  filter: string;
  firstName = '';
  firstNameControl = new UntypedFormControl();
  formCtrlSub: Subscription;

  usersListTable = new MatTableDataSource<User>([]);
  pagination = { page: 0, size: 10 };
  dataPagination: ListPagination;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public dialogRef: MatDialogRef<UsersListComponent>,
    private chatService: HomeService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.findUser();
  }

  getUsers() {
    this.chatService.getUsers(this.firstName.trim(), this.pagination)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data: UserListDTO) => {
        this.usersListTable.data = data.users;
        this.dataPagination = {
          currentPage: data.currentPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        }
      });
  }

  findUser() {
    this.formCtrlSub = this.firstNameControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(newValue => {
        this.firstName = newValue;
        this.getUsers();
      });
  }

  pageChanged(event: PageEvent) {
    this.pagination = { page: event.pageIndex, size: event.pageSize }
    this.getUsers();
  }

  startConversation(user: User) {
    this.chatService.startConversation({ receiverId: user.id })
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((chat) => {
        this.router.navigate([`/home/chats/${chat.id}`]);
        this.store.dispatch(getChat({ chat }));
        this.dialogRef.close();
      });
  }

}