import ProductPage from '../pages/product-page'
import ValidUsers from '../fixtures/valid-users.json'
import CartPage from '../pages/cart-page'

describe('Cart specs', () => {
  Object.entries(ValidUsers).forEach(([type, user]) => {
    describe(`when user is ${type}`, () => {
      beforeEach(() => {
        cy.login(user.username, user.password)
        ProductPage.addAllItemsToCart()
        ProductPage.visitCartPage()
      })

      it('should display all items in cart', () => {
        cy.get('.cart_item').should('have.length.at.least', 6)
      })

      it('should remove a product from the cart', () => {
        let productName = 'Sauce Labs Backpack'
        CartPage.verifyProductInCart(productName)
        CartPage.removeProduct(productName)
        CartPage.notProductInCart(productName)
      })
    })
  })
})
