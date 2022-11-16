import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppButtonComponent } from 'src/app/shared/components/in-app-button/app-button.component';
import { PassWordFieldComponent } from 'src/app/shared/components/password-field/password-field.component';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent, AppButtonComponent, PassWordFieldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two input fields', () => {
    const inoutElements = fixture.debugElement.nativeElement.querySelectorAll('input');
    expect(inoutElements.length).toEqual(2);
  });

  it('should get initial form values', () => {
    const form = component.loginForm;
    const initials = {
      email: '',
      password: ''
    };

    expect(form.value).toEqual(initials);
  })

  it('should be form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should button be disabled by defauls', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('.login-button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should email be invalid when empty', () => {
    let errors: ValidationErrors = {};
    const email = component.loginForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should email be invalid by format', () => {
    let errors: ValidationErrors = {};
    const email = component.loginForm.controls['email'];
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should password be valid with data', () => {
    let errors: ValidationErrors = {};
    const password = component.loginForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should form be valid with data', () => {
    const form = component.loginForm;
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue("mail@mail.com");
    password.setValue("password");
    expect(form.valid).toBeTruthy();
  });

  it('should form be submitted', () => {
    spyOn(component, 'onSubmit');
    const form = component.loginForm;
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    expect(form.valid).toBeFalsy();
    email.setValue("mail@mail.com");
    password.setValue("password");
    expect(form.valid).toBeTruthy();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should loading be false on submit', () => {
    spyOn(component, 'onSubmit');
    const form = component.loginForm;
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    expect(form.valid).toBeFalsy();
    email.setValue("mail@mail.com");
    password.setValue("password");
    component.onSubmit();
    expect(component.loading).toBeFalse();
  })

  it('should facebook button should call fbLogin', () => {
    spyOn(component, 'fbLogin');
    const button = fixture.debugElement.nativeElement.querySelector('.facebook-button');
    button.click();
    expect(component.fbLogin).toHaveBeenCalled();
  });
});
