import ProductPage from '../pages/product-page'
import ValidUsers from '../fixtures/valid-users.json'
import CartPage from '../pages/cart-page'
import CheckoutPage from '../pages/checkout-page'

describe('Checkout specs', () => {
  Object.entries(ValidUsers).forEach(([type, user]) => {
    describe(`when user is ${type}`, () => {
      beforeEach(() => {
        cy.login(user.username, user.password)
        ProductPage.addAllItemsToCart()
        ProductPage.visitCartPage()
        CartPage.visitCheckOut()
      })

      describe('Validating information form', () => {
        it('should display information form', () => {
          CheckoutPage.verifyInfoPage()
        })

        it('should return name required message error', () => {
          CheckoutPage.continueCheckout()
          CheckoutPage.getErrorMessage().contains('Error: First Name is required')
        })

        it('should return last name required message error', () => {
          CheckoutPage.fillFirstName('Test')
          CheckoutPage.continueCheckout()
          CheckoutPage.getErrorMessage().contains('Error: Last Name is required')
        })

        it('should return postal code name required message error', () => {
          CheckoutPage.fillFirstName('Test')
          CheckoutPage.fillLastName('Test')
          CheckoutPage.continueCheckout()
          CheckoutPage.getErrorMessage().contains('Error: Postal Code is required')
        })
      })

      it('should complete the checkout process', () => {
        CheckoutPage.fillCheckout('Random', 'Lastname', '12345')
        CheckoutPage.continueCheckout()

        CheckoutPage.verifyOverviewPage()
        CheckoutPage.finishCheckout()

        CheckoutPage.verifyCheckoutCompletePage()
      })

      describe('cancelling checkout', () => {
        it('should allow cancelling the checkout process from information form', () => {
          CheckoutPage.verifyInfoPage()
          CheckoutPage.cancelCheckout()

          CartPage.verifyCartPage()
        })

        it('should allow cancelling the checkout process from overview page', () => {
          CheckoutPage.verifyInfoPage()
          CheckoutPage.fillCheckout('Random', 'Lastname', '12345')
          CheckoutPage.continueCheckout()

          CheckoutPage.cancelCheckout()

          ProductPage.verifyIsProductPage()
        })
      })
    })
  })
})
