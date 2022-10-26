import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/utils/admin-guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },
      {
        path: 'chats',
        component: DashboardComponent,
        children: [
          { path: ':id', component: PersonalChatComponent },
        ]
      },
      { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard]  },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
