import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersListComponent } from '../users-list/users-list.component';
import { HomeService } from '../home.service';
import { Store } from '@ngrx/store';
import { getChats } from 'src/app/state/chats/chats.actions';

@Component({
  selector: 'chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
@AutoUnsubscribe
export class ChatsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatar', 'name', 'lastMessage', 'action'];
  preview: string = '../../assets/avatar.png';
  chatsListTable = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() openUsersListHandler = new EventEmitter();
  @Input() currentChatId: string;

  constructor(
    public dialog: MatDialog,
    private chatService: HomeService,
    private store: Store
  ) {
  }

  ngAfterViewInit() {
    this.chatsListTable.paginator = this.paginator;
  }

  ngOnInit() {
    this.getAllChats();
  }

  getAllChats() {
    this.chatService.getAllChats({ page: 0, size: 10 }).subscribe((data: any) => {
      this.chatsListTable.data = data.chats;
      console.log(1);

      this.store.dispatch(getChats({ chats: data }))
    });
  }

  openUsersList() {
    this.openUsersListHandler.emit();
  }
}