import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'password-field',
  templateUrl: 'password-field.component.html',
  styleUrls: ['password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PassWordFieldComponent),
      multi: true
    }
  ],
})

export class PassWordFieldComponent implements ControlValueAccessor, OnInit {
  constructor(private controlContainer: ControlContainer) {
  }

  control: FormControl;
  showPassword = false;

  @Input() formControlName: string;
  @Input() label = 'Password';
  @Input() passwordInvalid = false;
  @Input() errorMessage = '';

  ngOnInit() {
    if (this.controlContainer && this.controlContainer.control && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
    }
  }

  showHidePassword(event: MouseEvent) {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }

  registerOnChange() {

  }

  registerOnTouched() {

  }

  writeValue() {

  }

  setDisabledState() {

  }
}
