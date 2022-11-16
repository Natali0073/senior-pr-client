import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { environment } from 'src/environments/environment';
import { UsersListComponent } from './users-list.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('UsersListComponent', () => {
  const initialState = {};

  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [ UsersListComponent, UserVatarComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
