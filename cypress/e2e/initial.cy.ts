import { chatsListMock, currentUserAdminMock, currentUserMock } from "cypress/mocks/home.service.mocks"

describe('Initials', () => {
  it('Visits the initial page for logged out user', () => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      { statusCode: 401 }
    ).as('getCurrentUser');

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      { statusCode: 401 }
    ).as('getChats');

    cy.visit('/');
    cy.wait(['@getCurrentUser', '@getChats']);
    cy.contains('Sign in to manage your account.');
  })

  it('Visits the initial project page for logged in', () => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserMock
    ).as('getCurrentUser');

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats');

    cy.visit('/');
    cy.wait(['@getCurrentUser', '@getChats']);
    cy.contains('Chats');
  })

  it('Admin panel should not be shown for user', () => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserMock
    ).as('getCurrentUser');

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats');

    cy.visit('/');
    cy.wait(['@getCurrentUser', '@getChats']);
    cy.get('button[aria-label="Menu"]').click();
    cy.get('button').not('Admin panel');
  })

  it('Admin panel should be shown for admin', () => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserAdminMock
    ).as('getCurrentUser');

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats');

    cy.visit('/');
    cy.wait(['@getCurrentUser', '@getChats']);
    cy.get('button[aria-label="Menu"]').click();
    cy.get('button').contains('Admin panel');
  })
})
