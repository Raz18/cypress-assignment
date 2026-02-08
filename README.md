# Vulcan Cyber Playground - Cypress Test Suite

This repository contains automated end-to-end tests for the Vulcan Cyber Playground application using Cypress.

## 📋 Test Cases

### TC1: Login
Verifies user can successfully login with valid credentials.

### TC2: Create & Validate Automation
Creates an automation playbook that sends an email for each asset affected by CVE-2022-25235:
- Navigates to Automations
- Creates a new playbook
- Filters by Vulnerability → CVE → CVE-2022-25235
- Configures "Assign via email" remediation action
- Sets recipient as test user `abel.tuter@example.com`
- Saves and runs the playbook

### TC3: Close Campaign
Navigates to Campaigns and closes a specific campaign without marking associated tickets as done.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## ▶️ Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npx cypress open
```

### Run Tests in Headless Mode
```bash
npx cypress run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/tenable-cypress-assignmnet/vulcan-automation.cy.js"
```

## ⚙️ Configuration

### Test Credentials
- **Username**: `qatest`
- **Password**: `QQQQaaaa1234!`
- **Base URL**: `https://playground2.vulcancyber.com`

### Browser Settings
- Default viewport: 1920x1080
- Chrome web security: Disabled (for testing purposes)
- Auto file watch: Disabled to prevent auto-rerun on file changes

## ⚠️ Important Notes

### Campaign Test Configuration
**The campaign test (TC3) requires manual configuration before running:**

The test searches for a campaign named `"Untitled Playbook 12"` (line 179). **You must update this campaign name** to match an actual campaign that exists in your Vulcan Cyber Playground environment.

To update:
1. Open `cypress/e2e/tenable-cypress-assignmnet/vulcan-automation.cy.js`
2. Find line 179: `.type('Untitled Playbook 12{enter}')`
3. Replace `"Untitled Playbook 12"` with your actual campaign name
4. Also update line 182 where the campaign name is referenced in the assertion

Example:
```javascript
// Change this:
.type('Untitled Playbook 12{enter}')
cy.contains('Untitled Playbook 12')

// To match your campaign name:
.type('Your Campaign Name{enter}')
cy.contains('Your Campaign Name')
```

### Popup Handling
The test suite includes a custom `cy.clearPopups()` command that automatically handles the "New Feature!" dialog that may appear. It will wait up to 10 seconds for the popup to appear and close it if found.

## 📁 Project Structure

```
cypressio/
├── cypress/
│   ├── e2e/
│   │   └── tenable-cypress-assignmnet/
│   │       └── vulcan-automation.cy.js    # Main test suite
│   ├── fixtures/
│   │   └── example.json
│   ├── screenshots/                        # Test screenshots (auto-generated)
│   └── support/
│       ├── commands.js                     # Custom Cypress commands
│       ├── e2e.js                          # Global test configuration
│       └── component.js
├── cypress.config.js                       # Cypress configuration
├── package.json
└── README.md
```

## 🔧 Custom Commands

### `cy.vulcanLogin(username, password)`
Performs login to Vulcan Cyber Playground.

### `cy.navigateTo(menuItem)`
Navigates to a specific section via the sidebar menu.

### `cy.clearPopups()`
Automatically detects and closes popup dialogs (waits up to 10 seconds).

### `cy.getByDataTest(selector)`
Gets elements by `data-test` attribute.

##  Screenshots
Screenshots are automatically captured at key points during test execution and saved to `cypress/screenshots/`.

##  Troubleshooting

### Test Fails on Campaign Search
- Verify the campaign name exists in your environment
- Update the campaign name in the test file (see Important Notes above)

### Popup Handling Issues
- The `clearPopups()` command waits up to 10 seconds
- If popups still interfere, you can manually add `cy.clearPopups()` after navigation steps

### Timeout Errors
- Default command timeout is 15 seconds
- Page load timeout is 30 seconds
- Adjust these in `cypress.config.js` if needed

## 📝 Test Execution Notes
- Tests use `scrollIntoView()` to ensure elements are visible before interaction
- The playbook created in TC2 is named: `"CVE-2022-25235 Jira automation playbook"`


This project is for testing purposes only.
