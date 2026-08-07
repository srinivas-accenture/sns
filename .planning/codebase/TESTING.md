# Testing Patterns

**Analysis Date:** 2026-08-07

## Test Framework

**Runners:**
- Integration tests: Vitest 4.0.18
- E2E tests: Playwright 1.58.2
- Config: `vitest.config.mts`, `playwright.config.ts`

**Assertion Library:**
- Vitest uses built-in `expect()` API
- Playwright uses `expect()` from `@playwright/test`

**Run Commands:**
```bash
pnpm test:int                    # Run integration tests (Vitest)
pnpm test:e2e                    # Run E2E tests (Playwright)
pnpm test                        # Run both: test:int && test:e2e
```

## Test File Organization

**Location Pattern:**
- Integration tests: `tests/int/**/*.int.spec.ts`
- E2E tests: `tests/e2e/**/*.e2e.spec.ts`
- Helper functions: `tests/helpers/**/*.ts`

**Naming Convention:**
- Integration: `.int.spec.ts` suffix (e.g., `api.int.spec.ts`)
- E2E: `.e2e.spec.ts` suffix (e.g., `admin.e2e.spec.ts`)
- Helpers: descriptive name (e.g., `login.ts`, `seedUser.ts`)

**Directory Structure:**
```
tests/
├── int/
│   └── api.int.spec.ts
├── e2e/
│   ├── admin.e2e.spec.ts
│   └── frontend.e2e.spec.ts
└── helpers/
    ├── login.ts
    └── seedUser.ts
```

## Test Structure

### Integration Tests (Vitest)

**Suite Organization:**
```typescript
// tests/int/api.int.spec.ts
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })
})
```

**Patterns:**
- Setup: `beforeAll()` hook initializes Payload instance
- Suite name: descriptive, single-word or short phrase
- Test description: `it('verb object')`  (e.g., `'fetches users'`, `'can navigate to dashboard'`)
- Assertion: direct Payload API calls, assert on result

### E2E Tests (Playwright)

**Suite Organization:**
```typescript
// tests/e2e/admin.e2e.spec.ts
import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    await seedTestUser()
    const context = await browser.newContext()
    page = await context.newPage()
    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('http://localhost:3000/admin')
    await expect(page).toHaveURL('http://localhost:3000/admin')
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })
})
```

**Patterns:**
- Setup: `test.beforeAll()` handles browser context, login, and seeding
- Teardown: `test.afterAll()` cleans up test data
- Browser management: new context created for each suite
- Navigation: `page.goto()`, `page.waitForURL()` for routing assertions
- Element selection: `page.locator()` with CSS selectors or text matchers
- Assertions: `expect(page).toHaveURL()`, `expect(element).toBeVisible()`

## Configuration

**Vitest (`vitest.config.mts`):**
```typescript
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
  },
})
```
- Environment: jsdom for DOM testing
- Setup file: `vitest.setup.ts` loads env variables
- Include pattern: only `.int.spec.ts` files

**Playwright (`playwright.config.ts`):**
```typescript
export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium' } },
  ],
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: true,
    url: 'http://localhost:3000',
  },
})
```
- Test directory: `./tests/e2e`
- CI retries: 2 retries on CI, 0 locally
- CI workers: 1 worker on CI (sequential), parallel locally
- Trace: collect traces on first retry for debugging
- Web server: starts dev server automatically

## Mocking

**Integration Tests:**
- Real Payload instance used (no mocking)
- Database: real PostgreSQL instance (from `.env` or test config)
- External APIs: not mocked (real API calls made)

**E2E Tests:**
- Real browser (Chromium)
- Real application instance (dev server via `pnpm dev`)
- No HTTP mocking — full request/response cycle

**What NOT to Mock:**
- Payload database operations
- Next.js routes and server functions
- Browser navigation and DOM interactions

## Test Data Management

**Integration Tests:**
- Payload API used for setup: `payload.create()`, `payload.delete()`
- No dedicated factories or fixtures
- Inline test data in helper functions

**E2E Tests:**

**Fixtures Pattern:**
```typescript
// tests/helpers/seedUser.ts
export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
}

export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })
  
  // Delete existing (cleanup)
  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })
  
  // Create fresh
  await payload.create({
    collection: 'users',
    data: testUser,
  })
}

export async function cleanupTestUser(): Promise<void> {
  // Delete after tests
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })
}
```

**Location:**
- `tests/helpers/seedUser.ts` — test data and seeding functions
- `tests/helpers/login.ts` — authentication helper

**Pattern:**
- Exported const for test credentials
- Separate seed and cleanup functions
- Cleanup ensures idempotency (delete before create)

## Common Patterns

**Async Testing:**
```typescript
// Vitest
it('fetches users', async () => {
  const users = await payload.find({ collection: 'users' })
  expect(users).toBeDefined()
})

// Playwright
test('can navigate', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle(/Title/)
})
```

**Helper Functions:**
```typescript
// Login helper for E2E
export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`)
  await page.fill('#field-email', user.email)
  await page.fill('#field-password', user.password)
  await page.click('button[type="submit"]')
  await page.waitForURL(`${serverURL}/admin`)
  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
```

**Page Object Not Used:**
- Tests directly use Playwright page API
- Helpers extract common operations (login, seeding)
- Locators inline in tests (no separate selector file)

## Coverage

**Requirements:**
- No coverage target enforced
- No coverage threshold in config
- Coverage tooling: not configured

**View Coverage:**
- Not available in current setup
- Could be enabled in future with `@vitest/ui` or coverage plugin

## Test Types

**Integration Tests:**
- Scope: API and database operations
- Framework: Vitest with real Payload instance
- Approach: Direct Payload API calls, assertion on results
- Location: `tests/int/**/*.int.spec.ts`
- Example: `api.int.spec.ts` tests user fetching

**E2E Tests:**
- Scope: User workflows through browser (admin panel, frontend)
- Framework: Playwright
- Approach: Browser navigation, element interaction, visual verification
- Location: `tests/e2e/**/*.e2e.spec.ts`
- Examples:
  - `admin.e2e.spec.ts` — admin panel navigation, login
  - `frontend.e2e.spec.ts` — frontend page navigation

**Unit Tests:**
- Not found in codebase
- No Jest configuration
- Type checking via TypeScript instead

## Test Helpers

**Location:** `tests/helpers/`

**login.ts:**
```typescript
export interface LoginOptions {
  page: Page
  serverURL?: string
  user: { email: string; password: string }
}

export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  // Implementation
}
```
- Used in `admin.e2e.spec.ts` for authentication
- Fills form, submits, waits for navigation
- Verifies successful login with dashboard artifact check

**seedUser.ts:**
```typescript
export const testUser = { email: 'dev@payloadcms.com', password: 'test' }

export async function seedTestUser(): Promise<void> {
  // Create test user via Payload API
}

export async function cleanupTestUser(): Promise<void> {
  // Delete test user via Payload API
}
```
- Used in `admin.e2e.spec.ts` for test data management
- Ensures test user exists before tests run
- Cleans up after tests complete

## Debugging

**Playwright Traces:**
- Configured: `trace: 'on-first-retry'`
- Collected when first test retry fails
- View with: `npx playwright show-trace trace.zip` (after test runs)

**Debugging Commands:**
```bash
# Run single test with debug mode
pnpm test:e2e --debug

# Run with headed browser
pnpm test:e2e --headed
```

**Vitest Debugging:**
- Run in watch mode for development: `vitest --watch`
- TypeScript types help catch errors early

---

*Testing analysis: 2026-08-07*
