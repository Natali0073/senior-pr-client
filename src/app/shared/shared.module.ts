import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { material } from "./material/material";
import { AppButtonComponent } from "./components/in-app-button/app-button.component";
import { PassWordFieldComponent } from "./components/password-field/password-field.component";
import { SnackBarComponent, snackBarDefaultOptions } from "./components/snack-bar/snack-bar.component";
import { UserVatarComponent } from "./components/user-avatar/user-avatar.component";
import { PassedTimePipe } from "./pipes/passedTime.pipe";
import { SideBarWidthSwitchDirective } from "./directives/side-bar-width-switch.directive";
import { ChatSwitchDirective } from "./directives/chat-width-switch.directive";

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
    PassedTimePipe,
    SideBarWidthSwitchDirective,
    ChatSwitchDirective
  ],
  exports: [
    UserVatarComponent,
    PassWordFieldComponent,
    AppButtonComponent,
    PassedTimePipe,
    SideBarWidthSwitchDirective,
    ChatSwitchDirective
  ],
  providers: [
    snackBarDefaultOptions
  ]
})
export class SharedModule { }
