class CartPage {

  verifyCartPage() {
    cy.url().should('include', '/cart.html')
  }

  productInCart(productName) {
    return cy.contains('.inventory_item_name', productName)
  }

  verifyProductInCart(productName) {
    this.productInCart(productName).should('exist')
  }

  notProductInCart(productName) {
    this.productInCart(productName).should('not.exist')
  }

  removeProduct(productName) {
    this.productInCart(productName).parents('.cart_item').find('button').click()
  }

  visitCheckOut() {
    cy.get('.checkout_button').click()
  }
}

export default new CartPage()