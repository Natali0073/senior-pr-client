import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { currentUserMock } from '../mocks/home.service.mocks';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClientSpy: jasmine.SpyObj<HomeService>;

  beforeEach(async () => {
    const initialState = {};
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [HomeComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HomeService', ['getCurrentUser']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpClientSpy.getCurrentUser.and.returnValue(of(currentUserMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
