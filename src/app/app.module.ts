import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ErrorCatchingInterceptor } from './shared/utils/error-catching.interceptor';
import { TermsAndPolicy } from './TermsAndPolicy/terms-and-policy.component';
import { material } from './shared/material';
import { PageNotFound } from './PageNotFound/page-not-found.component';

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
    ...material
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
