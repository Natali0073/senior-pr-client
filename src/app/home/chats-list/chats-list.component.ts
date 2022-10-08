import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../home.service';
import { Store } from '@ngrx/store';
import { getChats } from 'src/app/state/chats/chats.actions';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';

@Component({
  selector: 'chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
  providers: [UnsubscriberService]
})
export class ChatsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatar', 'name', 'lastMessage', 'action'];
  preview: string = '../../assets/avatar.png';
  chatsListTable = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() openUsersListHandler = new EventEmitter();
  @Input() currentChatId: string;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
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
    this.chatService.getAllChats({ page: 0, size: 10 })
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data: any) => {
        this.chatsListTable.data = data.chats;
        this.store.dispatch(getChats({ chats: data }))
      });
  }

  openUsersList() {
    this.openUsersListHandler.emit();
  }
}