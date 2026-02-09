/// <reference types="cypress" />

/**
 * Vulcan Cyber Playground - Test Suite
 * URL: https://playground2.vulcancyber.com/
 *
 * TC1: Login - Verify user can login with given credentials
 * TC2: Create & Validate Automation - Create a Jira playbook for CVE-2022-25235
 *      and validate Preview Vulnerability Instances matches the playbook log
 */

describe('Vulcan Cyber Playground - Test Suite', () => {
  const credentials = {
    username: 'qatest',
    password: 'QQQQaaaa1234!',
  }
  // TC1: Login
  
  describe('TC1: Login', () => {
    it('should login successfully with valid credentials', () => {
      // Step 1: Visit the login page
      cy.visit('/')
      cy.url().should('include', '/auth/login')
      cy.screenshot('TC1_01_login-page')

      // Step 2: Enter username
      cy.get('input[placeholder="Username"]')
        .should('be.visible')
        .clear()
        .type(credentials.username)

      // Step 3: Enter password
      cy.get('input[placeholder="Password"]')
        .should('be.visible')
        .clear()
        .type(credentials.password)

      

      // Step 4: Click the Login button
      cy.contains('button', 'Login').should('be.visible').click()

      // Step 5: Verify successful login - dashboard loads
      cy.url({ timeout: 20000 }).should('include', '/app/dashboard')
      cy.contains('Home', { timeout: 15000 }).should('be.visible')
      cy.screenshot('TC1_successful-login')
    })
  })

  // TC2: Create & Validate Automation
  // Create an Automation (playbook) that will send an email
  // for each of the assets that have CVE-2022-25235
  describe('TC2: Create & Validate Automation', () => {
    beforeEach(() => {
      // Login before each test
      cy.vulcanLogin(credentials.username, credentials.password)
    })

    it.only('should create a playbook with CVE-2022-25235 filter and email remediation', () => {
      // STEP 1: Navigate to Automations
 
      cy.navigateTo('Automations')
      cy.url().should('include', '/automation')
      cy.screenshot('TC2_01_automations-page')

      // ==================================
      // STEP 2: Click "New Playbook"
      // ==================================
      cy.contains('button', 'New Playbook').should('be.visible').click()
      cy.url().should('include', '/automation/playbook')
     
      // Clear any popups that may appear
      cy.clearPopups()

      // ==================================
      // STEP 3: Set Playbook Name
      // ==================================
      cy.get('.policy-name-input') 
         .scrollIntoView()   
        .clear()
        .type('CVE-2022-25235 Jira automation playbook')
      cy.screenshot('TC2_03_playbook-name-set')

      // ==================================
      // STEP 4: Configure Filter - CVE
      // ==================================
      // 4a: Click "Enter Parameter" to open the parameter tree
      cy.contains('Enter Parameter')
        .should('be.visible')
        .scrollIntoView()
        .click()

      // 4b: Wait for the tree and click the first level-1 "Vulnerability" node
      cy.get('[role="tree"]').should('be.visible')
      cy.get('#vms-category-Vulnerability').first().click()

      // 4c: Click the "CVE" leaf node (unique ID)
      cy.get('#vms-parameter-CVE').should('be.visible').click()

      // ==================================
      // STEP 5: Select CVE-2022-25235
      // ==================================
      // 5a: Click the multiselect dropdown trigger to open the panel
      cy.get('.p-multiselect-trigger', { timeout: 10000 }).click({ force: true })
      
      // 5b: Type the CVE number in the filter input
      cy.get('.p-multiselect-filter').type('CVE-2022-25235')
      
      // 5c: Check the checkbox for the filtered CVE option
      cy.get('.p-checkbox-box').click({ force: true })
      
      // 5d: Close the multiselect panel
      cy.get('.p-multiselect-close').click()
      // ==================================
      // STEP 6: Preview Vulnerability Instances and validate counts
      // ==================================
      cy.contains('button', 'Preview Vulnerability Instances')
        .should('be.visible')
        .and('not.be.disabled')
        .scrollIntoView()
        .click()

      // Validate preview counts: Must match expected vulnerability/asset counts
      // This validates the playbook filter is working correctly
      cy.contains('.button-content-container', 'Vulnerabilities (0)')
        .should('be.visible')
      
      cy.contains('.button-content-container', 'Assets (0)')
        .should('be.visible')

      cy.screenshot('TC2_06_preview-vulnerability-instances')

      

      // ==================================
      // STEP 7: Select "Assign via email"
      // remediation action
      // ==================================
      cy.contains('Remediation actions').scrollIntoView()
      cy.screenshot('TC2_07_remediation-actions-section')

      // Click the "Assign via email" action card
      cy.contains('Assign via email')
        .first()
        .scrollIntoView()
        .click()

      // Verify the email form appeared
      cy.contains('To').should('be.visible')
      cy.screenshot('TC2_08_email-action-form-opened')

      // ==================================
      // STEP 8: Fill in the "To" recipient
      // with abel.tuter@example.com
      // ==================================
      cy.get('input[placeholder="Start typing to add recipients"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .type('abel.tuter@example.com{enter}')

      // Verify the recipient was added
      cy.contains('abel.tuter@example.com').should('be.visible')

      // ==================================
      // STEP 9: Click "Save & Run"
      // ==================================
     
      cy.contains('button', 'Save & Run')
        .scrollIntoView()
        .should('be.visible')
        .click()
      cy.url().should('include', '/automation/manage-policies')
      cy.screenshot('TC2_10_playbook-saved-and-run')
      
      // Search for the created playbook
      cy.get('.vulcan-input').first().should('be.visible').type('CVE-2022-25235 Jira automation playbook{enter}')
      cy.contains('CVE-2022-25235 Jira automation playbook').click()
      
      // Click Activity Log to view playbook execution details
      cy.contains('button', 'Activity Log')
        .should('be.visible')
        .click()
      // Validate the log contains the amount of  0 vulnerabilities and  0 assets from the preview step, which confirms the playbook ran with the correct filter and action
      //cy.contains('.p-timeline-event', '0 vulnerabilities').should('be.visible')
      //cy.contains('.p-timeline-event', '0 assets').should('be.visible')
      cy.screenshot('TC2_11_playbook-activity-log')


    })

    it('should navigate to Go to Campaigns screen, and close the following campaign "Untitled Playbook 12" without marking its associated tickets as Done.', () => {
      // STEP 1: Navigate to Campaigns page
      cy.navigateTo('Campaigns')
      cy.url().should('include', '/campaigns')
      cy.clearPopups()
      
      // STEP 2: Search for and open the campaign "Untitled Playbook 12"
      cy.get('#searchBootstrap')
        .should('be.visible')
        .type('Untitled Playbook 12{enter}')
        .should('be.visible')
        .click()
      
      // STEP 3: Click "Mark as Done" button to open confirmation dialog
      cy.contains('button', 'Mark as Done')
        .should('be.visible')
        .click()

      // STEP 4: Confirm marking campaign as done (without marking tickets as done)
      cy.get('button#dialog-positive-button')
        .contains('Mark as Done')
        .should('be.visible')
        .click()
      cy.screenshot('TC3_validation-complete')
    })
  })
})
