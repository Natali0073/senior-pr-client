import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppButtonComponent } from 'src/app/shared/components/in-app-button/app-button.component';
import { PassWordFieldComponent } from 'src/app/shared/components/password-field/password-field.component';
import { material } from 'src/app/shared/material/material';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...material,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [ RegistrationComponent, AppButtonComponent, PassWordFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
