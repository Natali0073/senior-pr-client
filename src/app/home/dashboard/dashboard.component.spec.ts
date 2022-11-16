import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatSwitchDirective } from 'src/app/shared/directives/chat-width-switch.directive';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { DashboardComponent } from './dashboard.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('DashboardComponent', () => {
  const initialState = {};

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        RouterTestingModule,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [ DashboardComponent, ChatSwitchDirective, ChatsListComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
