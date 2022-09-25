import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { material } from "./material";
import { AppButtonComponent } from "./components/in-app-button/app-button.component";
import { PassWordFieldComponent } from "./components/password-field copy/password-field.component";
import { SnackBarComponent, snackBarDefaultOptions } from "./components/snack-bar/snack-bar.component";
import { UserVatarComponent } from "./components/user-avatar/user-avatar.component";
import { PassedTimePipe } from "./pipes/passedTime.pipe";

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
    PassWordFieldComponent,
    AppButtonComponent,
    PassedTimePipe
  ],
  exports: [
    UserVatarComponent,
    PassWordFieldComponent,
    AppButtonComponent,
    PassedTimePipe
  ],
  providers: [
    snackBarDefaultOptions
  ]
})
export class SharedModule { }
