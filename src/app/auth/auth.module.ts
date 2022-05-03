import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { material } from '../shared/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ...material
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
  ]
})
export class AuthModule {}