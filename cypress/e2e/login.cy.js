const envName = Cypress.env('envName')
const envConfig = Cypress.env(envName)

import LoginPage from '../pages/login-page'

describe('Login spec', () => {
  before(() => {
    // See the different environment and config.
    cy.log(`Using "${envName}" env config`)
    cy.log(`Setting baseUrl as ${envConfig.baseUrl}`)
  })
  beforeEach(() => {
    LoginPage.visit()
  })

  it('visits the page', () => {
    LoginPage.loginButton().should('be.visible')
  })

  describe('validations', () => {
    it('should display username required error when username field is empty', () => {
      LoginPage.typePassword('random')
      LoginPage.submitForm()

      LoginPage.getErrorMessage()
        .should('be.visible')
        .should(
          'include.text',
          'Username is required'
        )
    })

    it('should display password required error when password field is empty', () => {
      LoginPage.typeUsername('random')
      LoginPage.submitForm()

      LoginPage.getErrorMessage()
        .should('be.visible')
        .should(
          'include.text',
          'Password is required'
        )

    })
  })

  describe('when the credentials are correct', () => {
    let validUsers

    before(() => {
      cy.fixture('valid-users').then((data) => {
        validUsers = data
      })
    })
    it('login with a valid user', () => {
      let standardUser = validUsers.standardUser
      LoginPage.typeUsername(standardUser.username)
      LoginPage.typePassword(standardUser.password)

      LoginPage.submitForm()

      cy.url().should('include', '/inventory.html')
    })

    it('login with a valid user when it presses enter', () => {
      let standardUser = validUsers.standardUser
      LoginPage.typeUsername(standardUser.username)
      LoginPage.typePassword(standardUser.password)

      LoginPage.typePassword('{Enter}')

      cy.url().should('include', '/inventory.html')
    })
  })

  describe('when the credentials are incorrect', () => {
    it('returns an error with an invalid user', () => {
      cy.fixture('invalid-users').then(({ randomUser }) => {
        LoginPage.typeUsername(randomUser.username)
        LoginPage.typePassword(randomUser.password)

        LoginPage.submitForm()

        LoginPage.getErrorMessage()
          .should('be.visible')
          .should(
            'include.text',
            'Username and password do not match any user in this service'
          )
      })
    })
  })

  describe('when the user is blocked', () => {
    it('returns an error with an blocked user', () => {
      cy.fixture('invalid-users').then(({ lockedOutUser }) => {
        LoginPage.typeUsername(lockedOutUser.username)
        LoginPage.typePassword(lockedOutUser.password)

        LoginPage.submitForm()

        LoginPage.getErrorMessage()
          .should('be.visible')
          .should(
            'include.text',
            'Sorry, this user has been locked out.'
          )
      })
    })
  })
})