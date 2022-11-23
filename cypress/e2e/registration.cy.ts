import { newUser } from "cypress/mocks/auth.service.mocks";

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/#/registration');
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
    cy.get('button[type=submit]').click();
  })

  it('Form should finish registration', () => {
    cy.intercept(
      {method: 'POST', url: 'api/auth/register'},
      newUser
    ).as('registerNewUser')

    cy.get('input[formControlName=firstName]').type('Name');
    cy.get('input[formControlName=lastName]').type('LastName');
    cy.get('input[formControlName=email]').type('mail11@mail.com');
    cy.get('password-field').eq(0).type('Sombra1234');
    cy.get('password-field').eq(1).type('Sombra1234');
    cy.get('mat-checkbox').find('input').click({ force: true });
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('button[type=submit]').click();
    
    cy.wait(['@registerNewUser']);
    cy.contains('Account created successfully');
  })

  it('Form should reject existed email registration', () => {
    cy.intercept(
      {method: 'POST', url: 'api/auth/register'},
      {
        statusCode: 500,
        body: {
          message: 'Email is already in use',
        },
      }
    ).as('registerNewUser')

    cy.get('input[formControlName=firstName]').type('Name');
    cy.get('input[formControlName=lastName]').type('LastName');
    cy.get('input[formControlName=email]').type('mail11@mail.com');
    cy.get('password-field').eq(0).type('Sombra1234');
    cy.get('password-field').eq(1).type('Sombra1234');
    cy.get('mat-checkbox').find('input').click({ force: true });
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('button[type=submit]').click();
    
    cy.wait(['@registerNewUser']);
    cy.contains('Email is already in use');
  })
})
