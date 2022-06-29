import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['snack-bar.component.scss']
})
export class SnackBarComponent {
  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string = 'alalla') {
  }
}

export const snackBarDefaultOptions = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 3000,
    panelClass: 'snack-bar-success'
  }
};