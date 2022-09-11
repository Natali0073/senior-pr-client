import { Component, Input, OnInit } from '@angular/core';

const defaultWidth = '40px';
const defaultHeight = '40px';

@Component({
  selector: 'user-avatar',
  templateUrl: 'user-avatar.component.html',
  styleUrls: ['user-avatar.component.scss']
})

export class UserVatarComponent implements OnInit {
  constructor() {
  }

  @Input() preview = '../../../assets/avatar.png';
  @Input() widthFromProp = '';
  @Input() heightFromProp = '';

  width = defaultWidth;
  height = defaultHeight;

  ngOnInit() {
    this.width = this.widthFromProp || defaultWidth;
    this.height = this.heightFromProp || defaultHeight;
  }
}
