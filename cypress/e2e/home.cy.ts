import { currentUserMock } from "cypress/mocks/home.service.mocks"

describe('My First Test', () => {
  beforeEach(() => {
    cy.intercept(
      {method: 'GET', url: 'api/current-user'},
      currentUserMock
    ).as('getCurrentUser')

    cy.intercept(
      {method: 'GET', url: 'api/chats?page=0&size=10'},
      []
    ).as('getChats')
  })

  it('Visits the initial project page for logged in', () => {
    cy.visit('/')
    cy.wait(['@getCurrentUser', '@getChats'])
    cy.contains('Chats')
  })
})
