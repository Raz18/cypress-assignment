

 //adding getby data-test attribute command
 Cypress.Commands.add('getByDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

// Custom Commands for Vulcan Cyber Playground

 

/**
 * Login to Vulcan Cyber Playground
 */
Cypress.Commands.add('vulcanLogin', (username = 'qatest', password = 'QQQQaaaa1234!') => {
  cy.visit('/')
  cy.get('input[placeholder="Username"]').clear().type(username)
  cy.get('input[placeholder="Password"]').clear().type(password)
  cy.contains('button', 'Login').click()
  // Wait for the dashboard to load
  cy.url({ timeout: 20000 }).should('include', '/app/dashboard')
})

 // Custom command to clear popups/overlays if they exist  
 Cypress.Commands.add('clearPopups', () => {
  // Wait and check multiple times over 10 seconds for popup to appear
  const checkAndClose = (attemptsLeft) => {
    if (attemptsLeft === 0) {
      cy.log('No popup found after 10 seconds')
      return
    }
    
    cy.wait(1000).then(() => {
      cy.get('body').then($body => {
        if ($body.find('.p-dialog-header-close:visible').length > 0) {
          cy.get('.p-dialog-header-close')
            .first()
            .click({ force: true })
          cy.log('Popup closed')
        } else {
          checkAndClose(attemptsLeft - 1)
        }
      })
    })
  }
  
  checkAndClose(10) // Check up to 10 times (10 seconds total)
})
/**
 * Navigate to a specific section via sidebar menu
 */
Cypress.Commands.add('navigateTo', (menuItem) => {
  cy.contains('a', menuItem).click()
  cy.wait(1000)
})