const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 9000,
  requestTimeout: 7500,
  responseTimeout: 10000,
  viewportWidth: 1500,
  viewportHeight: 1000,
  chromeWebSecurity: true,
  filterSpecs: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here'
    },
  },
})
