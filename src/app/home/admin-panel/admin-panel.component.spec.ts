import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { usersListMock, usersMock } from 'src/app/mocks/home.service.mocks';
import { UserVatarComponent } from 'src/app/shared/components/user-avatar/user-avatar.component';
import { material } from 'src/app/shared/material/material';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
import { AdminPanelComponent } from './admin-panel.component';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let httpClientSpy: jasmine.SpyObj<HomeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [AdminPanelComponent, UserVatarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HomeService', ['getUsers', 'getBannedUsers']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;

    httpClientSpy.getUsers.and.returnValue(of(usersListMock));
    httpClientSpy.getBannedUsers.and.returnValue(of(usersMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
