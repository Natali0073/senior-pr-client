import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SnackBarComponent, snackBarDefaultOptions } from "./snack-bar/snack-bar.component";
import { material } from "./material";
import { UserVatarComponent } from "./user-avatar/user-avatar.component";
import { PassWordFieldComponent } from "./password-field/password-field.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...material
  ],
  declarations: [
    SnackBarComponent,
    UserVatarComponent,
    PassWordFieldComponent
  ],
  exports: [
    UserVatarComponent,
    PassWordFieldComponent
  ],
  providers: [
    snackBarDefaultOptions
  ]
})
export class SharedModule { }
