class LoginPage {
    visit() {
        cy.visit('/')
    }

    typeUsername(username) {
        cy.get('[data-test="username"]').type(username)
    }

    typePassword(password) {
        cy.get('[data-test="password"]').type(password)
    }

    loginButton() {
        return cy.get('[data-test="login-button"]')
    }

    submitForm() {
        this.loginButton().click()
    }

    login(username, password) {
        this.visit()
        this.typeUsername(username)
        this.typePassword(password)
        this.submitForm()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }
}

export default new LoginPage()