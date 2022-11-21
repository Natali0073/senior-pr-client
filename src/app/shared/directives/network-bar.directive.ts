import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appNetworkBarAppearance]'
})
export class NetworkBarAppearance implements OnInit {

  public innerWidth: number;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:online', ['$event'])
  onOnline() {
    this.showOnline();
  }

  @HostListener('window:offline', ['$event'])
  onOffline() {
    this.showOffline();
  }

  ngOnInit(): void {
    !navigator.onLine && this.showOffline();
  }

  showOffline() {
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', 'black');
    this.renderer.setStyle(this.elmRef.nativeElement, 'height', '20px');
    this.renderer.setStyle(this.elmRef.nativeElement, 'color', 'var(--light)');
    this.elmRef.nativeElement.innerText = `You're offline!`;
  }

  showOnline() {
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', 'green');
    this.elmRef.nativeElement.innerText = `You're online!`;
    setTimeout(() => {
      this.renderer.setStyle(this.elmRef.nativeElement, 'height', '0px');
      this.renderer.setStyle(this.elmRef.nativeElement, 'color', 'transparent');
    }, 1000)
  }

}