import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  // { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
