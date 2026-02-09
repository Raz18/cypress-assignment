# Vulcan Cyber Playground - Cypress Test Suite

This repository contains automated end-to-end tests for the Vulcan Cyber Playground application using Cypress.

## 📋 Test Cases

### TC1: Login
Verifies user can successfully login with valid credentials.

### TC2: Create & Validate Automation
Creates an automation playbook that sends an email for each asset affected by CVE-2022-25235:

**Test Steps:**
1. Navigate to Automations page
2. Click "New Playbook"
3. Set playbook name: `"CVE-2022-25235 Jira automation playbook"`
4. Configure filter: Vulnerability → CVE → CVE-2022-25235
5. Click "Preview Vulnerability Instances"
6. **Validate counts**: Verify "Vulnerabilities (0)" and "Assets (0)" appear
7. Select "Assign via email" remediation action
8. Add recipient: `abel.tuter@example.com`
9. Click "Save & Run"
10. Search for the created playbook in the Automations list
11. Open the playbook and click "Activity Log" to view execution details

**Important Notes:**
- The test validates that exactly **0 vulnerabilities** and **0 assets** match the CVE-2022-25235 filter in the current environment
- This validation ensures the playbook filter is working correctly
- ⏱️ **Execution logs are not displayed instantly** - After the playbook runs, you may need to wait 2-5 minutes for the Activity Log to populate with execution details
- The Activity Log will show the actual number of actions taken, which should match the preview counts

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
### Preview Validation Fails (Vulnerabilities/Assets Count Mismatch)
- If the counts don't match "Vulnerabilities (0)" and "Assets (0)":
  - The CVE-2022-25235 data may differ in your environment
  - Check the actual counts displayed after clicking "Preview Vulnerability Instances"
  - Update the expected values in lines 127-130 of the test file to match your environment

### Activity Log Shows No Data
- The Activity Log takes **2-5 minutes** to populate after the playbook executes
- This is expected behavior - the system processes the actions asynchronously
- Wait a few minutes, then manually refresh or re-run the playbook query
- The automated test may complete before logs appear - manual verification may be needed
### Popup Handling Issues
- The `clearPopups()` command waits up to 10 seconds
- If popups still interfere, you can manually add `cy.clearPopups()` after navigation steps

### Timeout Errors
- Default command timeout is 15 seconds
- Page load timeout is 30 seconds
- Adjust these in `cypress.config.js` if needed

## 📝 Test Execution Notes

- TC2 test validates that the CVE-2022-25235 filter correctly identifies **0 vulnerabilities** affecting **0 assets** (in the current environment state)
- After running the playbook, the test searches for it and opens the Activity Log
- **⏱️ Important**: Execution logs in the Activity Log are **not displayed instantly** - allow 2-5 minutes for the system to process and display the execution results
- The Activity Log results should match the preview validation counts (0 vulnerabilities, 0 assets)
- Tests use `scrollIntoView()` to ensure elements are visible before interaction
- The playbook created in TC2 is named: `"CVE-2022-25235 Jira automation playbook"`


This project is for testing purposes only.
