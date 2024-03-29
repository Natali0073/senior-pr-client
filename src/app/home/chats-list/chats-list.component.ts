import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chat, ChatListDTO, ListPagination, HomeService, User } from '../home.service';
import { Store } from '@ngrx/store';
import { getChat, getChats, getChatsPagination } from 'src/app/state/chats/chats.actions';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { selectChats, selectChatsPagination } from 'src/app/state/chats/chats.selectors';
import { AppState } from 'src/app/state/app.state';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
@Component({
  selector: 'chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
  providers: [UnsubscriberService]
})
export class ChatsListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'name', 'lastMessageDate', 'lastMessage', 'action'];
  preview: string = '../../assets/avatar.png';
  chatsListTable = new MatTableDataSource<Chat>([]);
  pagination = { page: 0, size: 10 };
  dataPagination: ListPagination;

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

  ngOnInit() {
    this.getAllChats(this.pagination);
    this.selectUserStore();
    this.selectChatsData();
    this.networkUpdateSubscribe();
  }

  getAllChats(paginationData: { page: number; size: number; }) {
    const pagination = {
      page: paginationData.page,
      size: paginationData.size
    };
    this.chatService.getAllChats(pagination)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((data: ChatListDTO) => {
        this.store.dispatch(getChats({ data }));
        this.store.dispatch(getChatsPagination({ data }));
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

  socketChatsSubscribe(user: User) {
    this.chatService.socketGlobalSubscribe(user.id)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((chat: Chat) => {
        this.store.dispatch(getChat({ chat: chat }));
      });
  }

  selectUserStore() {
    this.store.select(selectCurrentUser)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(
        (user) => {
          this.socketChatsSubscribe(user);
        }
      );
  }

  networkUpdateSubscribe() {
    this.chatService.networkOnline
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(isOnline => isOnline && this.getAllChats(this.pagination))
  }
}
