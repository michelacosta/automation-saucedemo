import LoginPage from '../pages/login-page'
import ProductPage from '../pages/product-page'

Cypress.Commands.add('login', (username, password) => {
  LoginPage.login(username, password)
  ProductPage.verifyIsProductPage()
})