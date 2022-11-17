import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NetworkBarAppearance } from '../../directives/network-bar.directive';
import { NetworkBannerComponent } from './network-banner.component';

describe('NetworkBannerComponent', () => {
  let component: NetworkBannerComponent;
  let fixture: ComponentFixture<NetworkBannerComponent>;
  let bannerEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkBannerComponent, NetworkBarAppearance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NetworkBannerComponent);
    bannerEl = fixture.debugElement.query(By.directive(NetworkBarAppearance));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible when offline', () => {
    window.dispatchEvent(new Event('offline'));
    const bgColor = bannerEl.nativeElement.style.backgroundColor;
    const height = bannerEl.nativeElement.style.height;
    const innerText = bannerEl.nativeElement.innerText;

    expect(bgColor).toBe('black');
    expect(height).toBe('20px');
    expect(innerText).toBe(`You're offline!`);
  });

  it('should be hidden when online', () => {
    window.dispatchEvent(new Event('online'));
    const bgColor = bannerEl.nativeElement.style.backgroundColor;
    const innerText = bannerEl.nativeElement.innerText;
    fixture.detectChanges();

    expect(bgColor).toBe('green');
    expect(innerText).toBe(`You're online!`);
  });

  it("tests the exit button click", fakeAsync(() => {
    window.dispatchEvent(new Event('online'));
    tick(1000);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const height = bannerEl.nativeElement.style.height;
      expect(height).toBe('0px');
    })
  }))
});
