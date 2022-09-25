import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { material } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';
import { HeaderComponent } from './header/header.component';

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
    UserProfileComponent,
    ChatsListComponent,
    UsersListComponent,
    PersonalChatComponent,
    HeaderComponent
  ]
})
export class HomeModule { }
