import { currentUserMock } from "cypress/mocks/home.service.mocks"

describe('My First Test', () => {
  it('Visits the initial project page for logged out', () => {
    cy.visit('/')

    cy.contains('Sign in to manage your account.')
  })
})
