import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SnackBarComponent, snackBarDefaultOptions } from "./snack-bar/snack-bar.component";
import { material } from "./material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...material
  ],
  declarations: [
    SnackBarComponent
  ],
  exports: [],
  providers: [
    snackBarDefaultOptions
  ]
})
export class SharedModule { }
