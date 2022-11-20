import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { currentUserMock, messagesFormattedMock, messagesMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
import { PersonalChatComponent } from './personal-chat.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('PersonalChatComponent', () => {
  let component: PersonalChatComponent;
  let fixture: ComponentFixture<PersonalChatComponent>;
  let service: HomeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let socketSpy: jasmine.SpyObj<Socket>;

  let store: MockStore;
  const initialState = {
    chatsStore: {
      chatsData: []
    },
    usersStore: {}
  }; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config),
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
      declarations: [PersonalChatComponent, UserVatarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    socketSpy = jasmine.createSpyObj('Socket', ['get']);
    service = new HomeService(httpClientSpy, socketSpy);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalChatComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty message should not call send message svc func', () => {
    spyOn(component, 'sendMessage');
    spyOn(component, 'sendMessageSvc');
    expect(component.message).toBe('');
    component.onEnter();
    expect(component.sendMessage).toHaveBeenCalledTimes(1);
    expect(component.sendMessageSvc).toHaveBeenCalledTimes(0);
  });

  it('message with text should not call send message svc func', () => {
    spyOn(component, 'sendMessage');
    spyOn(component, 'sendMessageSvc');
    expect(component.message).toBe('');
    component.message = 'Hello';
    component.onEnter();
    expect(component.sendMessage).toHaveBeenCalledTimes(1);
    expect(component.sendMessageSvc).toHaveBeenCalledTimes(0);
  });

  it('should reformat the message', () => {
    component.message = 'Hello';
    component.currentChatId = 'currentChatId';
    component.currentUser = currentUserMock;

    const newMessage = component.formatMessage();
    const expectedMessage = {
      chatId: 'currentChatId',
      createdAt: new Date().toISOString(),
      userId: currentUserMock.id,
      text: 'Hello'
    }
    expect(newMessage).toEqual(expectedMessage);
  });

  it('messages should be equal as response after first messages get', () => {
    spyOn(service, 'getMessagesByChat').and.returnValue(of(messagesMock));
    component.getMessages({});
    expect(service.getMessagesByChat).toHaveBeenCalledTimes(1);
    expect(component.messages.length).toEqual(messagesMock.length);
  })

  it('messages should be formatted', () => {
    spyOn(service, 'getMessagesByChat').and.returnValue(of(messagesMock));
    component.getMessages({});
    expect(component.messages).toEqual(messagesFormattedMock);
  })

  it('should update messages after async fync', (done: DoneFn) => {
    spyOn(service, 'getMessagesByChat').and.returnValue(of(messagesMock));
    fixture.detectChanges();
    service.getMessagesByChat('chatId', { size: 10 }).subscribe({
      next: user => {
        expect(user)
          .withContext('expected messages')
          .toEqual(messagesMock);
        done();
      }
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.messages).toEqual(messagesFormattedMock);
    });
  });
});
