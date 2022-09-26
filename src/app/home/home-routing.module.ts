import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { HomeComponent } from './home.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: ':id', component: PersonalChatComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
