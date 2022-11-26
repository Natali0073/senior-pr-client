import { chatsListMock, currentUserMock } from "cypress/mocks/home.service.mocks";

describe('Personal profile', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserMock
    ).as('getCurrentUser')

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats');
    cy.visit('/');
    cy.get('button[aria-label="Menu"]').click();
    cy.get('button[aria-label="My profile"]').click();
  })

  it('Profile modal window should be shown', () => {
    cy.contains('Manage your account');
    cy.get('mat-dialog-content').should('exist');
  })

  it('Should be two tabs', () => {
    cy.get('div.mat-tab-label').its('length').should('eq', 2);
    cy.contains('Edit Information');
    cy.contains('Change Password');
  })

  it('Email should be disabled and with value', () => {
    cy.get('input[formControlName=email]').should('be.disabled');
  })

  it('Form should contains current user value', () => {
    cy.get('input[formControlName=email]').should('have.value', currentUserMock.email);
    cy.get('input[formControlName=firstName]').should('have.value', currentUserMock.firstName);
    cy.get('input[formControlName=lastName]').should('have.value', currentUserMock.lastName);
  })

  it('Should show error after clear the fields', () => {
    cy.get('input[formControlName=firstName]').clear();
    cy.get('input[formControlName=lastName]').clear();
    cy.contains('Field is required');
  })

  it('Should update user info', () => {
    cy.intercept(
      { method: 'PUT', url: 'api/user-update' },
      { ...currentUserMock, firstName: 'Test', lastName: 'Name' }
    ).as('updateCurrentUser')

    cy.get('input[formControlName=firstName]').clear().type('Test');
    cy.get('input[formControlName=lastName]').clear().type('Name');
    cy.get('button.submit').click();
    cy.contains('Account updated successfully');
    cy.get('button[aria-label="Menu"]').click();
    cy.get('button[aria-label="My profile"]').click();
    cy.get('input[formControlName=firstName]').should('have.value', 'Test');
    cy.get('input[formControlName=lastName]').should('have.value', 'Name');
  })

  it('Cancel should close the modal', () => {
    cy.get('[mat-dialog-close]').click();
    cy.get('mat-dialog-content').should('not.exist');
  })
})