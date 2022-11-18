import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { chatsListMock, currentUserMock } from '../mocks/home.service.mocks';

import { HomeService } from './home.service';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SocketIoModule.forRoot(config)
      ],
    });
    service = TestBed.inject(HomeService);
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    socketSpy = jasmine.createSpyObj('Socket', ['get']);
    service = new HomeService(httpClientSpy, socketSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user', (done: DoneFn) => {
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

  it('should return chats list', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(chatsListMock));

    service.getAllChats({ page: 0, size: 10 }).subscribe({
      next: user => {
        expect(user)
          .withContext('expected chats list')
          .toEqual(chatsListMock);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  })
});
