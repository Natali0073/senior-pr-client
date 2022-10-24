import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appChatWidthSwitch]'
})
export class ChatSwitchDirective implements OnInit, OnChanges {
  @Input() appChatWidthSwitch: string;
  
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
  onResize() {
    this.innerWidth = window.innerWidth;
    this.setContainerWidth();
  }

  setContainerWidth() {
    const width = this.getContainerWidth()
    
    this.renderer.setStyle(this.elmRef.nativeElement, 'width', width);
  }

  getContainerWidth() {
    let width = !!this.appChatWidthSwitch ? '60%' : '0px'
    if (this.innerWidth < 980 && !!this.appChatWidthSwitch) width = '100%';

    return width;
  }
}