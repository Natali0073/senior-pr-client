import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appSideBarWidthSwitch]'
})
export class SideBarWidthSwitchDirective implements OnInit, OnChanges {
  @Input() appSideBarWidthSwitch: string;
  
  public innerWidth: number;
  
  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.setContainerWidth();
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setContainerWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    this.setContainerWidth();
  }

  setContainerWidth() {
    const width = this.getContainerWidth()
    
    this.renderer.setStyle(this.elmRef.nativeElement, 'width', width);
    this.renderer.setStyle(this.elmRef.nativeElement, 'display', width !== '0px' ? 'block' : 'none');
  }

  getContainerWidth() {
    let width = !!this.appSideBarWidthSwitch ? '40%' : '100%'
    if (this.innerWidth < 980 && !!this.appSideBarWidthSwitch) {
      width = '0px';
    }

    return width;
  }
}