import { chatsListMock, currentUserMock, messagesMock } from "cypress/mocks/home.service.mocks";

describe('Chats', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserMock
    ).as('getCurrentUser');

    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats');

    cy.intercept(
      { method: 'GET', url: '/api/chat/aeea4be4-91d4-436a-804a-cf6565261a6a/messages?size=10' },
      messagesMock
    ).as('getMessages');

    cy.visit('/#/home/chats/aeea4be4-91d4-436a-804a-cf6565261a6a');
  })

  it('Send button should be disabled by default', () => {
    cy.get('button[aria-label="Send"]').should('be.disabled');
  })

  it('Send button should be enabled with text', () => {
    cy.get('textarea').type('Hello');
    cy.get('button[aria-label="Send"]').should('be.enabled');
  })

  it('Back button returns to home screen', () => {
    cy.get('button[aria-label="back icon"]').click();
  })

})