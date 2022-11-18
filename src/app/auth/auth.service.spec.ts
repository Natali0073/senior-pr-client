import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { fbStatusResponseMock, newUser } from '../mocks/auth.service.mocks';
import { AuthService, NewUserDto } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('callNextOnSubject() should emit data to fbLoginSubject Subject',
    inject([AuthService], (authService: AuthService) => {
      service.fbLoginSubject.subscribe((message) => {
        expect(message).toBe(fbStatusResponseMock);
      })

      authService.setFbStatusResponse(fbStatusResponseMock);
    }))

  it('register should send data', () => {
    httpClient.post<NewUserDto>('/api/auth/register', newUser)
      .subscribe(data =>
        expect(data).toEqual(newUser)
      );

    const req = httpTestingController.expectOne('/api/auth/register');
    expect(req.request.method).toEqual('POST');
    req.flush(newUser);
  })

  afterEach(() => {
    httpTestingController.verify();
  });
});
