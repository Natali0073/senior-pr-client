import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
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
        HttpClientModule,
        SocketIoModule.forRoot(config),
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
      declarations: [PersonalChatComponent]
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
});
