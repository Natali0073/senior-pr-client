import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html',
  styleUrls: ['app-button.component.scss'],
})

export class AppButtonComponent {
  constructor() {
  }

  @Input() loading = false;
  @Input() label: string;
  @Input() type = 'button';
  @Input() materialType = 'matFlatButton';
  @Input() color = 'primary';
  @Input() disabled = false;
  @Input() class: string;

  @Output() onClick = new EventEmitter();

  clickEvent() {
    this.onClick.emit();
  }

}
