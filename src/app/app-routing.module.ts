import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { TermsAndPolicy } from './components/terms-and-policy/terms-and-policy.component';

const routes: Routes = [
  { path: 'chats', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'terms-and-policy', component: TermsAndPolicy },
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
