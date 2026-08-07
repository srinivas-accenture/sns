# Coding Conventions

**Analysis Date:** 2026-08-07

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `Logo.tsx`, `FAQBlock.tsx`) — file name matches component export
- Utilities: camelCase (e.g., `toKebabCase.ts`, `getDocument.ts`)
- Collections/Globals: PascalCase (e.g., `Users.ts`, `SiteSettings.ts`)
- Blocks: PascalCase with subfolders for components (e.g., `src/blocks/FAQ/Component.tsx`, `src/blocks/FAQ/config.ts`)
- Configuration: descriptive names (e.g., `payload.config.ts`, `eslint.config.mjs`)

**Functions:**
- camelCase for all exported functions: `export const getDocument = (...) => {...}`
- Arrow functions used for exports: `export const functionName = () => {}`
- Internal helper functions: camelCase, often not exported (e.g., `pagePaths()` in `src/collections/Pages/hooks/revalidatePage.ts`)
- React component functions: PascalCase (e.g., `export const FAQBlock: React.FC<Props> = (...) => {...}`)

**Variables:**
- camelCase for all variables and constants
- Unused parameters: prefix with underscore (e.g., `_props`, `_variable`) — see `src/components/Logo/Logo.tsx`
- Constants: camelCase (not UPPER_SNAKE_CASE) — see `src/i18n/languages.ts`

**Types:**
- PascalCase for interfaces and type aliases (e.g., `interface Props`, `type Language`)
- Type imports using `type` keyword: `import type { User } from '@/payload-types'`

**Collections/API slugs:**
- kebab-case or camelCase depending on context (e.g., `users`, `super-admin` for roles)

## Code Style

**Formatting:**
- Tool: Prettier (configured in `.prettierrc.json`)
- Single quotes: enabled
- Trailing commas: all (even on last item)
- Print width: 100 characters
- Semicolons: disabled (`semi: false`)

**Linting:**
- Tool: ESLint (flat config in `eslint.config.mjs`)
- Extends: `next/core-web-vitals` and `next/typescript`
- Key rules:
  - `@typescript-eslint/ban-ts-comment`: warn
  - `@typescript-eslint/no-explicit-any`: warn
  - `@typescript-eslint/no-unused-vars`: warn with underscore prefix pattern
  - Unused variables ignored if prefixed with underscore or "ignore"

**TypeScript:**
- Strict mode: enabled
- Target: ES2022
- Lib: DOM, DOM.Iterable, ES2022
- `noEmit: true` (types only)
- Path aliases configured in `tsconfig.json`:
  - `@/*` → `./src/*`
  - `@payload-config` → `./src/payload.config.ts`

## Import Organization

**Order (strictly followed):**
1. Type imports: `import type { Type } from 'package'`
2. React/framework imports: `import React, { ... } from 'react'`, `import { ... } from 'next/...'`
3. External dependencies: `import { ... } from 'payload'`, `import { ... } from '@payloadcms/...'`
4. Local absolute imports: `import { ... } from '@/...'` (using path aliases)
5. Local relative imports: `import { ... } from '../...'`

**Example from `src/blocks/FAQ/Component.tsx`:**
```typescript
'use client'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

import { Media } from '@/components/Media'
```

**Path Aliases:**
- Always use `@/` prefix for imports from `src/` directory
- Use `@payload-config` for payload configuration
- Avoid relative imports when an alias is available

## Error Handling

**Server-side (Node/API routes):**
- Payload logger: `payload.logger.info(message)`, `payload.logger.error({ err }, message)`
- Redirect for auth flows: `redirect(path)` from `next/navigation`
- Try-catch for external APIs and file operations (e.g., Cloudinary uploads in `src/collections/Media.ts`)

**Client-side:**
- Console methods: `console.error()`, `console.warn()`
- Error boundaries via React error handling
- Try-catch for browser API calls (e.g., localStorage, fetch in theme provider)

**Async/await pattern:**
- Used throughout codebase instead of `.then()` chains
- Exception: Payload's promise chains are awaited directly

## Logging

**Server-side:**
- `payload.logger.info(message)` for informational logs (e.g., revalidation actions)
- `payload.logger.error({ err }, message)` for errors with stack traces
- Examples in `src/collections/Pages/hooks/revalidatePage.ts`, `src/globals/SiteSettings.ts`

**Client-side:**
- `console.error()` for errors (e.g., Cloudinary errors in `src/collections/Media.ts`)
- `console.warn()` for warnings (e.g., form submission issues in `src/blocks/Form/Component.tsx`)
- No structured logging framework used

## Comments

**When to Comment:**
- JSDoc comments for all exported functions and components
- Inline comments for complex logic or non-obvious decisions
- Comments explaining why, not what (the code explains what)

**JSDoc/TSDoc Format:**
```typescript
/**
 * Logs the user into the admin panel via the login page.
 */
export async function login({ page, serverURL, user }: LoginOptions): Promise<void> {
  ...
}
```

**Inline Comments:**
- Used sparingly, only for subtle logic
- Example: `// Token will exist here because if it doesn't the user will be redirected` in `src/utilities/getMeUser.ts`
- Example: `// Store in JWT so access control never needs a DB lookup` in `src/collections/Users.ts`

## Function Design

**Size:**
- Prefer small, focused functions
- Single responsibility principle applied
- Helper functions extracted to separate constants within same file (e.g., `pagePaths()` in `src/collections/Pages/hooks/revalidatePage.ts`)

**Parameters:**
- Use typed objects instead of multiple parameters: `{ page, serverURL, user }: LoginOptions`
- Optional parameters in object form with defaults: `{ nullUserRedirect, validUserRedirect } = args || {}`
- Type annotations always provided

**Return Values:**
- Always type return values explicitly
- Async functions return `Promise<Type>`
- Payload hooks return the document: `return doc`

**Arrow Function Pattern:**
```typescript
export const functionName = (param: Type): ReturnType => {
  // implementation
}
```

## Module Design

**Exports:**
- Named exports preferred (no default exports unless required)
- Single export per file common pattern (e.g., `export const Users: CollectionConfig`)
- Multiple exports when logical grouping (e.g., `export const seedTestUser()` and `export const cleanupTestUser()` in `tests/helpers/seedUser.ts`)

**Barrel Files:**
- Not extensively used in project
- When used, centralize related exports (e.g., `src/access/` could have index, but doesn't)

**File Structure for Components:**
- Components: `src/blocks/BlockName/Component.tsx`, `src/blocks/BlockName/config.ts`
- Utilities: `src/utilities/functionName.ts` (one utility per file)
- Access controls: `src/access/accessName.ts` (one access rule per file)
- Hooks: `src/collections/CollectionName/hooks/hookName.ts`

**Payload Configuration:**
- Collections: `src/collections/CollectionName.ts` with `export const CollectionName: CollectionConfig`
- Globals: `src/globals/GlobalName/index.ts` (folder when complex, single file when simple)
- Fields: `src/fields/fieldName.ts` with reusable field factories
- Blocks: `src/blocks/BlockName/config.ts` with component alongside

## Client vs Server Code

**'use client' Directive:**
- Added at top of interactive React components
- Examples: `src/blocks/FAQ/Component.tsx`, `src/providers/Theme/index.tsx`
- Not used for presentational components that don't need interactivity

**Server Functions:**
- Async functions that access database or external APIs
- RPC routes in `src/app/(payload)/api/` and `src/app/(frontend)/` directories
- Return type always specified

## Naming Specific Patterns

**Test Utilities:**
- Helper functions: camelCase (e.g., `seedTestUser()`, `cleanupTestUser()`)
- Test data: named export const (e.g., `export const testUser = {...}`)
- Test user suffix convention: "User" and functions use "TestUser" (e.g., `seedTestUser`, `cleanupTestUser`)

**Payload Hooks:**
- Function name matches hook type: `export const revalidatePage: CollectionAfterChangeHook<Page>`
- Always export with full type annotation from Payload

**Access Controls:**
- File per access rule: `src/access/accessName.ts`
- Exported as `export const accessName: Access = ({ req: { user } }) => ...`
- Role helper functions in separate file: `src/access/roles.ts`

---

*Convention analysis: 2026-08-07*
