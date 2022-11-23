import { chatsListMock, currentUserMock, messagesMock } from "cypress/mocks/home.service.mocks";

describe('Chats', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: 'api/current-user' },
      currentUserMock
    ).as('getCurrentUser')
  })

  it('Shows Chats list is empty', () => {
    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      []
    ).as('getChats')

    cy.visit('/#/home/chats');
    cy.contains(`You don't have active chats yet.`)
  })

  it('Shows Chats table', () => {
    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats')

    cy.visit('/#/home/chats');
    cy.get('table').should('exist');
  })

  it('Chats table should contain banned', () => {
    cy.intercept(
      { method: 'GET', url: 'api/chats?page=0&size=10' },
      chatsListMock
    ).as('getChats')

    cy.visit('/#/home/chats');
    cy.get('table').contains('Banned');
  })
})