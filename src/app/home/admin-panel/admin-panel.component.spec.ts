import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { AdminGuard } from 'src/app/shared/utils/admin-guard';
import { environment } from 'src/environments/environment';
import { AdminPanelComponent } from './admin-panel.component';
import { cold } from 'jasmine-marbles';
import { currentUserAdminMock, currentUserMock } from 'src/app/mocks/home.service.mocks';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let guard: AdminGuard;
  let store: MockStore;
  const initialState = {
    usersStore: {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [AdminPanelComponent, UserVatarComponent],
      providers: [
        AdminGuard,
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AdminGuard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if the user not in the store', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user in the store and role is "admin"', () => {
    store.setState({
      usersStore: { currentUser: currentUserAdminMock }
    });

    const expected = cold('(a|)', { a: true });
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return false if the user in the store and role is not "admin"', () => {
    store.setState({
      usersStore: { currentUser: currentUserMock }
    });

    const expected = cold('(a|)', { a: false });
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
