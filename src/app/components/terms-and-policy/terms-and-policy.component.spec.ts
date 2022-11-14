import { ComponentFixture, TestBed } from '@angular/core/testing';
import { material } from 'src/app/shared/material/material';
import { TermsAndPolicy } from './terms-and-policy.component';


describe('TermsAndPolicy', () => {
  let component: TermsAndPolicy;
  let fixture: ComponentFixture<TermsAndPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...material],
      declarations: [ TermsAndPolicy ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
