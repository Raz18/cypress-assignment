const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://playground2.vulcancyber.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotsFolder: "cypress/screenshots",
    video: false,
    chromeWebSecurity: false,
    scrollBehavior: false,
    waitForAnimations: true,
    animationDistanceThreshold: 5,
  },

});
