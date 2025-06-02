class CheckOutPage {
  verifyInfoPage() {
    cy.url().should('include', '/checkout-step-one.html')
  }

  verifyOverviewPage() {
    cy.url().should('include', '/checkout-step-two.html')
  }

  verifyCheckoutCompletePage() {
    cy.url().should('include', '/checkout-complete.html')
    cy.contains('Thank you for your order!')
    cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }

  fillFirstName(value) {
    cy.get('#first-name').type(value)
  }

  fillLastName(value) {
    cy.get('#last-name').type(value)
  }

  fillPostalCode(value) {
    cy.get('#postal-code').type(value)
  }

  fillCheckout(firstName, lastName, postalCode) {
    this.fillFirstName(firstName)
    this.fillLastName(lastName)
    this.fillPostalCode(postalCode)
  }

  continueCheckout() {
    cy.get('.cart_button').click()
  }

  finishCheckout() {
    cy.get('[data-test="finish"]').click()
  }

  cancelCheckout() {
    cy.get('.cart_cancel_link').click()
  }

  getErrorMessage() {
    return cy.get('.error-message-container')
  }
}

export default new CheckOutPage()