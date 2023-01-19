const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 9000,
  requestTimeout: 7500,
  responseTimeout: 10000,
  viewportWidth: 1500,
  viewportHeight: 1000,
  chromeWebSecurity: true,
  filterSpecs: true,
  reporter: 'cypress-mochawesome-reporter', //reporter Key
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here'
      require('cypress-mochawesome-reporter/plugin')(on) // reporter listner
    },
    specPattern: [
      'cypress/e2e/apiTests/getUsers.spec.cy.js',
      'cypress/e2e/apiTests/postUsers.spec.cy.js',
      'cypress/e2e/apiTests/postUserUsingFaker.cy.js',
    ],
  },
})
