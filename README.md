# SauceDemo Automation Tests

End-to-end test automation for [SauceDemo](https://www.saucedemo.com/) using Playwright and TypeScript, with test execution results integrated into Google Sheets.

## Tech Stack

- **Language:** TypeScript
- **Automation:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Test Reporting:** Playwright Custom Reporter
- **Test Tracking:** Google Sheets API
- **Configuration:** dotenv
- **CI:** GitHub Actions

## Project Structure

```text
├── actions/                 # Page actions and business logic
├── locators/                # Centralized page locators
├── tests/                   # Playwright test specifications
├── reporters/
│   └── google-sheet-reporter.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Google account (for Google Sheets reporting)

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd saucedemo
```

Install dependencies:

```bash
npm ci
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Framework Design

The project follows the Page Object Model (POM) to separate test specifications, page actions, and locators.

- **Actions:** Contains page-level functionality and user interactions.
- **Locators:** Maintains centralized selectors for application elements.
- **Tests:** Contains test scenarios and assertions.

Test cases are identified using unique IDs that correspond to the test plan maintained in Google Sheets.

Example:

```typescript
test("[TC_01] Verify successful login", async ({ page }) => {
  // Test implementation
});
```

## Google Sheets Integration

A custom Playwright reporter synchronizes automated test execution results with a Google Sheet.

**Tracked information:**

| Field         | Description                 |
| ------------- | --------------------------- |
| TC ID         | Unique test case identifier |
| Status        | PASSED, FAILED, SKIPPED     |
| Last Executed | Execution timestamp         |

**How it works:**

1. The reporter captures test results after execution.
2. Test IDs are matched against the existing Google Sheet.
3. Corresponding rows are updated with execution status and timestamp.

### Configuration

Create a `.env` file in the project root:

```env
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
```

Place the Google Cloud service account JSON credentials in the project root.

The service account must have Editor access to the target spreadsheet.

**Google Sheet structure:**

| Column | Field         |
| ------ | ------------- |
| A      | TC ID         |
| B      | TEST          |
| C      | STATUS        |
| D      | LAST EXECUTED |

The reporter uses the `Test Coverage` worksheet.

Test titles must contain their corresponding IDs, such as `[TC_01]`, to enable result mapping.

> Keep `.env` and `credentials.json` out of version control. Never commit service account credentials.

## Continuous Integration

GitHub Actions is configured to execute the Playwright test suite on pushes and pull requests targeting `main` or `master`.

The workflow installs dependencies, sets up the browser environment, and runs the automated tests.

Google Sheets reporting in CI requires the spreadsheet ID and service account credentials to be configured securely as GitHub Actions secrets.

## Current Development Status

The project is under active development. The framework structure and Google Sheets reporting integration are being established, while SauceDemo test coverage is being expanded.
