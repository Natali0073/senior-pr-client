import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { createOutputSpy } from "cypress/angular"
import { AppButtonComponent } from "src/app/shared/components/in-app-button/app-button.component"
import { PassWordFieldComponent } from "src/app/shared/components/password-field/password-field.component"
import { LoginComponent } from "./login.component"

describe('My First Test', () => {
  beforeEach(() => {
    cy.mount(LoginComponent, {
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      declarations: [AppButtonComponent, PassWordFieldComponent],
    })
  })

  it('Login button should be disabled', () => {
    cy.get('button[type=submit]').should('be.disabled');
  })

  it('Form should be valid', () => {
    cy.get('input[formControlName=email]').type('mail1@mail.com');
    cy.get('password-field').type('Sombra1234');
    cy.get('button[type=submit]').should('not.be.disabled');
  })

  it('Email error should appear', () => {
    cy.get('input[formControlName=email]').type('mail');
    cy.get('mat-error').contains('Email is invalid');
  })
})
