import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appNetworkBarAppearance]'
})
export class NetworkBarAppearance {

  public innerWidth: number;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:online', ['$event'])
  onOnline(event: Event) {
    this.showOnline();
  }

  @HostListener('window:offline', ['$event'])
  onOffline(event: Event) {
    this.showOffline();
  }

  showOffline() {
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', 'black');
    this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'block');
    this.elmRef.nativeElement.innerText = `You're offline!`;
  }

  showOnline() {
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', 'green');
    this.elmRef.nativeElement.innerText = `You're online!`;
    setTimeout(() => {
      this.renderer.setStyle(this.elmRef.nativeElement, 'display', 'none');
    }, 1000)
  }

}