const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",
  },
  env: {
    envName: 'staging', // Set the default env.
    staging: {
      baseUrl: 'https://www.saucedemo.com',
      pokeApiBaseUrl: 'https://pokeapi.co/api/v2'
    },
    production: {
      baseUrl: 'https://www.saucedemo.com',
      pokeApiBaseUrl: 'https://pokeapi.co/api/v2'
    }
  }
});
