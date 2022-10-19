import { Component, Input, OnChanges, OnInit } from '@angular/core';

const defaultWidth = '40px';
const defaultHeight = '40px';

@Component({
  selector: 'user-avatar',
  templateUrl: 'user-avatar.component.html',
  styleUrls: ['user-avatar.component.scss']
})

export class UserVatarComponent implements OnChanges {
  constructor() {
  }

  @Input() preview?: string;
  @Input() widthFromProp: string;
  @Input() heightFromProp: string;

  imgDefault = '../../../assets/avatar.png';
  avatarImg: string;
  width = defaultWidth;
  height = defaultHeight;

  ngOnChanges() {
    this.avatarImg = this.preview || this.imgDefault;
    this.width = this.widthFromProp || defaultWidth;
    this.height = this.heightFromProp || defaultHeight;
  }
}
