describe('Login', () => {
  beforeEach(() => {
    cy.visit('/#/login');
  })

  it('Login button should be disabled', () => {
    cy.get('button[type=submit]').should('be.disabled');
  })

  it('Form should be valid', () => {
    cy.get('input[formControlName=email]').type('mail1@mail.com');
    cy.get('password-field').type('Sombra1234');
    cy.get('button[type=submit]').should('be.enabled');
  })

  it('Email error should appear', () => {
    cy.get('input[formControlName=email]').type('mail').blur();
    cy.get('mat-error').contains('Email is invalid');
  })

  it('Should get login error with invalid credentials', () => {
    cy.intercept(
      {method: 'POST', url: 'api/auth/login'},
      {
        statusCode: 401,
        body: {
          message: 'Email is already in use',
        },
      }
    ).as('login')

    cy.get('input[formControlName=email]').type('mail1@mail.com');
    cy.get('password-field').type('Sombra12345');
    cy.get('button[type=submit]').click();
    
    cy.wait(['@login']);
    cy.contains('Credentials are invalid! Please check email and password');
  })
})
