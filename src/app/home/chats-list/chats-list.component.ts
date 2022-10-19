import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chat, ChatsPagination, HomeService } from '../home.service';
import { Store } from '@ngrx/store';
import { getChats, getChatsPagination } from 'src/app/state/chats/chats.actions';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { selectChats, selectChatsPagination } from 'src/app/state/chats/chats.selectors';
import { AppState } from 'src/app/state/app.state';
@Component({
  selector: 'chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
  providers: [UnsubscriberService]
})
export class ChatsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['avatar', 'name', 'lastMessage', 'action'];
  preview: string = '../../assets/avatar.png';
  chatsListTable = new MatTableDataSource<Chat>([]);
  pagination = { page: 0, size: 10 };
  dataPagination: ChatsPagination;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() openUsersListHandler = new EventEmitter();
  @Input() currentChatId: string;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public dialog: MatDialog,
    private chatService: HomeService,
    private store: Store<AppState>
  ) {
  }

  ngAfterViewInit() {
    this.chatsListTable.paginator = this.paginator;
  }

  ngOnInit() {
    this.getAllChats(this.pagination);
    this.chatsUpdateEvent();
  }

  getAllChats(paginationData: { page: number; size: number; }) {
    const pagination = {
      page: paginationData.page,
      size: paginationData.size
    };
    this.chatService.getAllChats(pagination)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data) => {
        this.store.dispatch(getChats({ data }));
        this.store.dispatch(getChatsPagination({ data }));
        this.selectChatsData();
      });
  }

  selectChatsStore() {
    this.store.select(selectChats)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((chats) => {
        this.chatsListTable.data = chats;
      });
  }

  selectChatsPaginationStore() {
    this.store.select(selectChatsPagination)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data) => {
        this.dataPagination = data;
      });
  }

  chatsUpdateEvent() {
    this.chatService.chatsUpdate.subscribe(() => {
      this.selectChatsData();
    })
  }

  selectChatsData() {
    this.selectChatsStore();
    this.selectChatsPaginationStore();
  }

  openUsersList() {
    this.openUsersListHandler.emit();
  }

  pageChanged(event: PageEvent) {
    this.getAllChats({ page: event.pageIndex, size: event.pageSize });
  }
}
