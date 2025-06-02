const envName = Cypress.env('envName')
const envConfig = Cypress.env(envName)

const baseUrl = envConfig.pokeApiBaseUrl

describe('PokeAPI Tests', () => {
  before(() => {
    // See the different environment and config.
    cy.log(`Using "${envName}" env config`)
    cy.log(`Setting pokeApiBaseUrl as ${baseUrl}`)
  })

  it('should fetch data for Eevee', () => {
    cy.request(`${baseUrl}/pokemon/eevee`)
      .then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body.name).to.eq('eevee')
        expect(response.body.abilities).to.have.length.greaterThan(0)
      })
  })

  it('should return 404 for an invalid pokemon', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pokemon/randompokemon`,
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  })
})