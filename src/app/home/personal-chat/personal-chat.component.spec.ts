import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { currentUserMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { PersonalChatComponent } from './personal-chat.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('PersonalChatComponent', () => {
  let component: PersonalChatComponent;
  let fixture: ComponentFixture<PersonalChatComponent>;

  beforeEach(async () => {
    const initialState = {};

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
    fixture = TestBed.createComponent(PersonalChatComponent);
    component = fixture.componentInstance;
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
});
