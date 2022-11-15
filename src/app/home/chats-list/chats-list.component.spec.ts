import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { chatsListMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { ChatListDTO, HomeService, Pagination } from '../home.service';
import { ChatsListComponent } from './chats-list.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('ChatsListComponent', () => {
  const initialState = {};
  let component: ChatsListComponent;
  let fixture: ComponentFixture<ChatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientModule,
        SocketIoModule.forRoot(config)
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
      declarations: [ ChatsListComponent, UserVatarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
