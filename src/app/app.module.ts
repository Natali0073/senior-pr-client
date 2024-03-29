import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ErrorCatchingInterceptor } from './shared/utils/error-catching.interceptor';
import { TermsAndPolicy } from './components/terms-and-policy/terms-and-policy.component';
import { material } from './shared/material/material';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { usersReducer } from './state/users/users.reducer';
import { chatssReducer } from './state/chats/chats.reducer';
import { metaReducers } from './state/global/metaReducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { fbAppInitializer } from './shared/utils/fbAppInitializer';
import { googleAppInitializer } from './shared/utils/googleAppInitializer';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TermsAndPolicy,
    PageNotFound
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    HomeModule,
    StoreModule.forRoot(
      { usersStore: usersReducer, chatsStore: chatssReducer },
      { metaReducers }
    ),
    SocketIoModule.forRoot(config),
    ...material,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: fbAppInitializer,
      deps: [AuthService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: googleAppInitializer,
      deps: [AuthService, NgZone, Router],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
