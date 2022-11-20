import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { chatsMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { AppState } from 'src/app/state/app.state';
import { selectChats, selectChatsPagination } from 'src/app/state/chats/chats.selectors';
import { environment } from 'src/environments/environment';
import { Chat, ListPagination } from '../home.service';
import { ChatsListComponent } from './chats-list.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('ChatsListComponent', () => {
  let component: ChatsListComponent;
  let fixture: ComponentFixture<ChatsListComponent>;
  let store: MockStore;
  let selectChatsSelector: MemoizedSelector<AppState, Chat[]>;
  let selectChatsPaginationSelector: MemoizedSelector<AppState, ListPagination>;
  const initialState = {
    chatsStore: {
      chatsData: [],
      chatsPagination: {}
    },
    usersStore: {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
      declarations: [ChatsListComponent, UserVatarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    selectChatsSelector = store.overrideSelector(selectChats, []);
    selectChatsPaginationSelector = store.overrideSelector(selectChatsPagination, {} as ListPagination);
    store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Chats"', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Chats');
  });

  it('should update component prop after sstoretate update', () => {
    selectChatsSelector.setResult(chatsMock);
    store.refreshState();
    fixture.detectChanges();
    expect(component.chatsListTable.data).toEqual(chatsMock);
  });
});
