import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { chatsListMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
import { ChatsListComponent } from './chats-list.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('ChatsListComponent', () => {
  const initialState = {};
  let component: ChatsListComponent;
  let fixture: ComponentFixture<ChatsListComponent>;
  let httpClientSpy: jasmine.SpyObj<HomeService>;

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
      declarations: [ ChatsListComponent, UserVatarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HomeService', ['getAllChats']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    httpClientSpy.getAllChats.and.returnValue(of(chatsListMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
