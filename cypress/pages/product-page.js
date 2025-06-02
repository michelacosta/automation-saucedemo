class ProductPage {

  visit() {
    cy.visit('/inventory.html')
  }

  verifyIsProductPage() {
    cy.url().should('include', '/inventory.html')
    this.getInventoryItems().should('have.length.greaterThan', 0)
  }

  getInventoryItems() {
    return cy.get('.inventory_item')
  }

  addAllItemsToCart() {
    this.getInventoryItems().each((item) => {
      cy.wrap(item).find('button').click()
    })
  }

  getFirstInventoryItem() {
    return this.getInventoryItems().first()
  }

  getNInventoryItem(itemNumber) {
    return this.getInventoryItems()[itemNumber]
  }

  verifyCartBadgeCount(count) {
    cy.get('.shopping_cart_badge').should('contain', count)
  }

  sortBy(value) {
    cy.get('.product_sort_container').select(value)
  }

  visitCartPage() {
    cy.get('.shopping_cart_link').click()
  }

}

export default new ProductPage()