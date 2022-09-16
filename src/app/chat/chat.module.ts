import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { material } from '../shared/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserVatarComponent } from '../shared/components/user-avatar/user-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ...material
  ],
  declarations: [
  ]
})
export class ChatModule { }
