import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { material } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './UserProfile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ...material
  ],
  declarations: [
    HomeComponent,
    UserProfileComponent
  ]
})
export class HomeModule { }
