import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appSideBarSwitch]'
})
export class SideBarSwitchDirective implements OnChanges {
  @Input() appSideBarSwitch: string;
  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
this.renderer.setStyle(this.elmRef.nativeElement, 'width', !!this.appSideBarSwitch ? '40%' : '100%');
  }
}