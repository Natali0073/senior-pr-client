import { chatsListMock, currentUserMock } from "cypress/mocks/home.service.mocks"

describe('My First Test', () => {
  it('Visits the initial page for logged out user', () => {
    cy.visit('/')
    cy.contains('Sign in to manage your account.')
  })

  it('Visits the initial project page for logged in', () => {
    cy.intercept(
      {method: 'GET', url: 'api/current-user'},
      currentUserMock
    ).as('getCurrentUser')

    cy.intercept(
      {method: 'GET', url: 'api/chats?page=0&size=10'},
      chatsListMock
    ).as('getChats')
    
    cy.visit('/')
    cy.wait(['@getCurrentUser', '@getChats'])
    cy.contains('Chats')
  })
})
