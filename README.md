# One Platform Automation (Playwright)

End-to-end UI automation suite powered by Playwright with Allure reporting and optional Jenkins container setup.

## Highlights

- Playwright-based E2E coverage
- Allure reports with screenshots, video, and trace artifacts
- Organized test suites (smoke, regression, dashboard, user management)
- Jenkins container for CI experimentation
- Environment-based configuration

## Tech Stack

- Playwright Test
- TypeScript
- Allure Report
- Docker (Jenkins)

## Repository Structure

- Tests and specs: [tests](tests)
- Utilities: [utils](utils)
- Example specs: [partner-onboarding.spec.ts](partner-onboarding.spec.ts)
- Playwright config: [playwright.config.ts](playwright.config.ts)
- Jenkins container: [jenkins](jenkins)
- Allure outputs: [allure-results](allure-results), [allure-report](allure-report)

## Prerequisites

- Node.js 18+ (recommended)
- pnpm or npm
- Docker (optional, for Jenkins)

## Setup

1) Install dependencies

- pnpm: `pnpm install`
- npm: `npm install`

2) Install Playwright browsers

- `npx playwright install --with-deps`

3) Configure environment

Create a local environment file based on your needs. Common options:

- [\.env.local](.env.local) (recommended for local overrides)
- [\.env](.env)

Suggested variables (adapt to your app):

- `BASE_URL` (defaults are in config)
- `USERNAME`
- `PASSWORD`
- `IMAP_HOST`, `IMAP_USER`, `IMAP_PASS` (if email flows are used)

## Running Tests

Common scripts (see [package.json](package.json)):

- Smoke (OAT): `npm run pw:smoke:oat`
- Smoke (Prod): `npm run pw:smoke:prod`
- Dashboard: `npm run pw:dashboard`
- All tests: `npm run pw:test`
- Headed mode: `npm run pw:headed`
- UI mode: `npm run pw:ui`
- Debug: `npm run pw:debug`
- Retry last failed: `npm run pw:retry`

User management suites:

- Internal create: `npm run pw:internal:create`
- Internal edit: `npm run pw:internal:edit`
- External create: `npm run pw:external:create`
- External edit: `npm run pw:external:edit`

Login setup:

- `npm run pw:login`
- `npm run pw:login:force`

## Reporting (Allure)

Generate and open the report:

- Generate: `npm run pw:allure:serve`
- Open: `npm run pw:allure:open`

Artifacts (screenshots/video/trace) are enabled in [playwright.config.ts](playwright.config.ts).

## Jenkins (Optional)

Spin up Jenkins with Docker Compose:

- `docker compose up -d`
- Jenkins UI: http://localhost:8080

Compose file: [docker-compose.yml](docker-compose.yml)

## Configuration Notes

Key defaults live in [playwright.config.ts](playwright.config.ts). You can override base URL and other settings via environment variables or by editing the config.

## Troubleshooting

- If browsers are missing: run `npx playwright install --with-deps`.
- If Allure is missing: run `npx allure --version` to verify it is available.
- If tests are slow locally: increase timeouts or enable `slowMo` in [playwright.config.ts](playwright.config.ts).

## License

ISC (see [package.json](package.json)).
