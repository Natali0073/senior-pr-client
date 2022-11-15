import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { currentUserMock } from '../mocks/home.service.mocks';

import { HomeService } from './home.service';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SocketIoModule.forRoot(config)
      ],
    });
    service = TestBed.inject(HomeService);
  });

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    socketSpy = jasmine.createSpyObj('Socket', ['get']);
    service = new HomeService(httpClientSpy, socketSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return surrent user', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(currentUserMock));

    service.getCurrentUser().subscribe({
      next: user => {
        expect(user)
          .withContext('expected user')
          .toEqual(currentUserMock);
        done();
      },
      error: done.fail
    });
    
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  })
});
