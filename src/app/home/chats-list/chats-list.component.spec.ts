import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
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
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Chats"', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.innerHTML).toBe('Chats');
  });
});
