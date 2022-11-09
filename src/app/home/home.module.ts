import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { material } from '../shared/material/material';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

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
    DashboardComponent,
    HomeComponent,
    UserProfileComponent,
    ChatsListComponent,
    UsersListComponent,
    PersonalChatComponent,
    AdminPanelComponent
  ]
})
export class HomeModule { }
