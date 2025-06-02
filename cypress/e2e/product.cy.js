import ProductPage from '../pages/product-page'
import ValidUsers from '../fixtures/valid-users.json'

describe('Product specs', () => {
  Object.entries(ValidUsers).forEach(([type, user]) => {
    describe(`when user is ${type}`, () => {
      beforeEach(() => {
        cy.login(user.username, user.password)
      })

      it('should allow adding one product to the cart', () => {
        let firstCartButton = ProductPage.getFirstInventoryItem().find('button')
        firstCartButton.click()
        ProductPage.verifyCartBadgeCount(1)
        firstCartButton = ProductPage.getFirstInventoryItem().find('button')
        firstCartButton.should('contain.text', 'Remove')
        firstCartButton.click()
        cy.get('.shopping_cart_badge').should('not.exist')
      })

      it('should allow adding multiple products to the cart', () => {
        ProductPage.addAllItemsToCart()
        ProductPage.verifyCartBadgeCount(6)
      })

      describe('sorting', () => {
        it('should allow sorting by name Z-A', () => {
          let firstItemTitle = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          ProductPage.sortBy('za')
          let newFirstNewItem = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          newFirstNewItem.should('not.contain.text', firstItemTitle)
        })

        it('should allow sorting by price low to high', () => {
          let firstItemTitle = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          ProductPage.sortBy('za')
          let newFirstNewItem = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          newFirstNewItem.should('not.contain.text', firstItemTitle)
        })

        it('should allow sorting by price high to low', () => {
          let firstItemTitle = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          ProductPage.sortBy('za')
          let newFirstNewItem = ProductPage.getFirstInventoryItem().find('.inventory_item_name')
          newFirstNewItem.should('not.contain.text', firstItemTitle)
        })
      })
    })
  });
})