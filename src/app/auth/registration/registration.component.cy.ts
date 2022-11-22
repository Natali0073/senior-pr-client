import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { createOutputSpy } from "cypress/angular"
import { AppButtonComponent } from "src/app/shared/components/in-app-button/app-button.component"
import { PassWordFieldComponent } from "src/app/shared/components/password-field/password-field.component"
import { material } from "src/app/shared/material/material"
import { RegistrationComponent } from "./registration.component"

describe('RegistrationComponent', () => {
  beforeEach(() => {
    cy.mount(RegistrationComponent, {
      imports: [
        ...material,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [RegistrationComponent, AppButtonComponent, PassWordFieldComponent]
    })
  })

  it('Login button should be disabled', () => {
    cy.get('button[type=submit]').should('be.disabled');
  })

  it('Email error should appear', () => {
    cy.get('input[formControlName=email]').type('mail').blur();
    cy.get('mat-error').contains('Email is invalid');
  })

  it('Password error should appear', () => {
    cy.get('password-field').eq(0).type('sombra').find('input').blur();
    cy.get('mat-error').contains('Password must include upper case character, number. Min 8 symbols.');
  })

  it('Password does not match error should appear', () => {
    cy.get('password-field').eq(0).type('Sombra1234');
    cy.get('password-field').eq(1).type('Sombra1').find('input').blur();
    cy.get('mat-error').contains('Password does not match!');
  })

  it('Form should be valid', () => {
    cy.get('input[formControlName=firstName]').type('Name');
    cy.get('input[formControlName=lastName]').type('LastName');
    cy.get('input[formControlName=email]').type('mail@mail.com');
    cy.get('password-field').eq(0).type('Sombra1234');
    cy.get('password-field').eq(1).type('Sombra1234');
    cy.get('mat-checkbox').find('input').click({ force: true });
    cy.get('button[type=submit]').should('be.enabled');
  })
})
