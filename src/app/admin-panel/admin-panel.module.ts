import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { material } from '../shared/material/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';

@NgModule({
  imports: [
    AdminPanelRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ...material
  ],
  declarations: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule { }
