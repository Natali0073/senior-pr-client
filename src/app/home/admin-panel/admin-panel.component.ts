import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { User, ListPagination, HomeService, UserListDTO } from '../home.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [UnsubscriberService]
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatar', 'name', 'action'];
  filter: string;
  firstName = '';
  firstNameControl = new FormControl();
  formCtrlSub: Subscription;

  usersListTable = new MatTableDataSource<User>([]);
  pagination = { page: 0, size: 10 };
  dataPagination: ListPagination;

  bannedUsers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private chatService: HomeService,
  ) {
  }

  ngAfterViewInit() {
    this.usersListTable.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getBannedUsers();
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

  getBannedUsers() {
    this.chatService.getBannedUsers()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data: User[]) => {
        this.bannedUsers = data;
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

  adminAction(user: User, banned: boolean) {
    this.chatService.banUser({ userId: user.id, isBanned: banned })
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data) => {
        this.getUsers();
        this.getBannedUsers();
      });
  }
}