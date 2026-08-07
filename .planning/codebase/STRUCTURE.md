# Codebase Structure

**Analysis Date:** 2026-08-07

## Directory Layout

```
sns/
├── src/
│   ├── app/
│   │   ├── (frontend)/              # Frontend page routes (public site)
│   │   │   ├── layout.tsx           # Root layout with providers, fonts, GA
│   │   │   ├── page.tsx             # Root → redirect to locale
│   │   │   ├── [locale]/
│   │   │   │   ├── page.tsx         # Home page (/)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Dynamic page routes (/about, /contact, etc.)
│   │   │   ├── (sitemaps)/          # Sitemap routes
│   │   │   ├── next/                # Next.js preview/exit-preview routes
│   │   │   ├── robots.ts            # robots.txt endpoint
│   │   │   ├── sitemap.xml/         # sitemap.xml endpoint
│   │   │   ├── globals.css          # Global CSS
│   │   │   └── master.css           # Theme CSS variables, Tailwind overrides
│   │   └── (payload)/               # Payload-specific routes (admin, API)
│   │       ├── admin/               # /admin - Payload admin UI
│   │       ├── api/                 # /api - REST API (auto-proxied to Payload)
│   │       │   ├── [...]slug]/route.ts   # Catch-all REST routes
│   │       │   ├── graphql/route.ts      # GraphQL endpoint
│   │       │   └── graphql-playground/   # GraphQL IDE
│   │       ├── custom.scss          # Payload admin custom styles
│   │       └── layout.tsx           # Admin layout
│   │
│   ├── collections/                 # Payload collection schemas
│   │   ├── Pages.ts / index.ts       # Pages collection (with blocks, localization)
│   │   ├── Media.ts                 # Media collection (with Cloudinary hooks)
│   │   ├── Users.ts                 # Users collection (with roles)
│   │   └── Categories.ts            # Categories collection
│   │
│   ├── globals/                     # Payload global schemas & components
│   │   ├── Header/
│   │   │   ├── index.ts             # Payload global config
│   │   │   ├── Component.tsx        # Server wrapper
│   │   │   ├── Component.client.tsx # Client component with interactivity
│   │   │   ├── Nav/                 # Navigation sub-component
│   │   │   └── hooks/               # Revalidation hooks
│   │   ├── Footer/
│   │   │   ├── index.ts
│   │   │   ├── Component.tsx
│   │   │   └── hooks/
│   │   └── SiteSettings.ts          # Site-wide settings (GA ID, fonts, etc.)
│   │
│   ├── blocks/                      # Page layout blocks (composable content types)
│   │   ├── Content/                 # Text + columns block
│   │   │   ├── config.ts            # Payload block schema
│   │   │   └── Component.tsx        # React component
│   │   ├── MediaBlock/              # Image/video block
│   │   ├── Gallery/                 # Image gallery block
│   │   ├── Team/                    # Team member grid
│   │   ├── Events/                  # Events listing block
│   │   ├── FAQ/                     # FAQ accordion block
│   │   ├── Form/                    # Form builder (nested field components)
│   │   │   ├── config.ts
│   │   │   ├── Component.tsx
│   │   │   ├── fields.tsx           # Form field array definition
│   │   │   └── [Field]/index.tsx    # Field components (Text, Email, Select, Country, State, Checkbox, etc.)
│   │   ├── Slider/                  # Image carousel block
│   │   ├── CallToAction/            # CTA button block
│   │   └── ContentWithImage/        # Two-column text + image block
│   │
│   ├── heros/                       # Page hero variants (none/low/medium/high impact)
│   │   ├── config.ts                # Payload hero field definition
│   │   ├── LowImpact.tsx            # Text-only hero
│   │   ├── MediumImpact.tsx        # Text + background image
│   │   └── HighImpact.tsx          # Full-screen hero with image
│   │
│   ├── components/                  # Reusable React components
│   │   ├── RenderBlocks.tsx         # Block dispatcher (maps blockType → Component)
│   │   ├── RenderHero.tsx           # Hero dispatcher
│   │   ├── Header/                  # (See globals/Header)
│   │   ├── Footer/                  # (See globals/Footer)
│   │   ├── Link/                    # CMS link component (supports internal/external)
│   │   ├── Media/                   # Image/video rendering
│   │   │   ├── index.tsx
│   │   │   ├── ImageMedia/
│   │   │   └── VideoMedia/
│   │   ├── RichText/                # Lexical rich text renderer
│   │   ├── Card/                    # Content card wrapper
│   │   ├── AdminBar/                # Payload admin bar (edit button)
│   │   ├── Pagination/              # Page navigation (for archives)
│   │   ├── PageRange/               # "Page X of Y" display
│   │   ├── CollectionArchive/       # Generic listing component
│   │   ├── AnimateIn/               # Scroll animation wrapper
│   │   ├── BeforeDashboard/         # Payload admin welcome screen
│   │   ├── BeforeLogin/             # Payload login customization
│   │   ├── LivePreviewListener/     # Live preview sync
│   │   ├── Logo/                    # Site logo component
│   │   ├── LocaleToggle/            # Language switcher
│   │   ├── PayloadRedirects/        # Redirect resolution (handled by Payload plugin)
│   │   └── ui/                      # Shadcn UI primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── scroll-hint.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   │
│   ├── providers/                   # React context providers
│   │   ├── Theme/                   # Dark/light mode context
│   │   │   ├── index.tsx            # ThemeProvider (context + state)
│   │   │   ├── InitTheme/           # Script to sync data-theme on page load
│   │   │   ├── ThemeSelector/       # Theme toggle UI
│   │   │   ├── shared.ts            # Shared theme logic
│   │   │   └── types.ts             # Theme types
│   │   ├── Locale/                  # Locale context (en/mr)
│   │   └── HeaderTheme/             # Header-specific theme overrides
│   │
│   ├── utilities/                   # Helper functions & hooks
│   │   ├── getGlobals.ts            # Fetch globals with unstable_cache
│   │   ├── getLocale.ts             # Get current locale from headers
│   │   ├── getDocument.ts           # Fetch a single document from Payload
│   │   ├── getMeUser.ts             # Get authenticated user
│   │   ├── getMediaUrl.ts           # Build media URLs (Cloudinary or local)
│   │   ├── getURL.ts                # Build full URL (SITE_URL + path)
│   │   ├── getRedirects.ts          # Fetch redirect map
│   │   ├── generatePageMeta.ts      # Generate Next.js metadata for SEO
│   │   ├── generatePreviewPath.ts   # Build live preview URL
│   │   ├── cloudinary.ts            # Cloudinary upload/delete/transform utils
│   │   ├── colorContrast.ts         # Color contrast check (a11y)
│   │   ├── canUseDOM.ts             # Client-side DOM check
│   │   ├── useClickableCard.ts      # Hook for clickable card rows
│   │   ├── deepMerge.ts             # Object merge utility
│   │   ├── toKebabCase.ts           # String formatting
│   │   └── ui.ts                    # Tailwind classname utilities
│   │
│   ├── access/                      # Access control functions
│   │   ├── roles.ts                 # Role definitions & helpers
│   │   ├── anyone.ts                # Public read access
│   │   ├── authenticated.ts         # Require login
│   │   ├── authenticatedOrPublished.ts  # Read if logged in OR published
│   │   ├── isAdminOrHigher.ts       # super-admin, admin
│   │   └── isEditorOrHigher.ts      # super-admin, admin, editor
│   │
│   ├── fields/                      # Reusable Payload field definitions
│   │   ├── link.ts                  # Link field (internal/external)
│   │   ├── linkGroup.ts             # Array of links
│   │   └── defaultLexical.ts        # Default rich text editor config
│   │
│   ├── i18n/                        # Internationalization
│   │   ├── languages.ts             # Single source of truth (en, mr)
│   │   └── getDefaultLocale.ts      # Determine default locale
│   │
│   ├── migrations/                  # Database migrations (auto-generated)
│   │   ├── index.ts
│   │   └── 20260804_*.ts            # Timestamped migration files (DO NOT EDIT)
│   │
│   ├── payload.config.ts            # Payload CMS config (collections, globals, plugins)
│   ├── payload-types.ts             # Auto-generated Payload TypeScript types (DO NOT EDIT)
│   ├── proxy.ts                     # (Utility, purpose TBD)
│   ├── cssVariables.ts              # CSS variable definitions
│   └── globals.css                  # Base global styles
│
├── .env.local                       # Environment variables (secrets, database URL, etc.)
├── .env.production                  # Production environment
├── package.json                     # Dependencies, scripts
├── pnpm-lock.yaml                   # Lock file (use pnpm, never npm/yarn)
├── tsconfig.json                    # TypeScript config
├── next.config.ts                   # Next.js config (Payload integration)
├── payload.config.ts                # (See src/payload.config.ts)
├── vitest.config.mts                # Unit test config
├── playwright.config.ts             # E2E test config
├── next-sitemap.config.cjs          # Sitemap generation config
└── .prettierrc                      # Code formatter config
```

## Directory Purposes

**`src/app/(frontend)/`:**
- Purpose: Public-facing website pages and routes
- Contains: Page layouts, route handlers, CSS
- Key files: `layout.tsx` (root), `[locale]/page.tsx` (home), `[locale]/[slug]/page.tsx` (dynamic)
- Accessed: Browser requests to `/` and `/*`

**`src/app/(payload)/`:**
- Purpose: Payload-specific routes (admin UI, REST API, GraphQL)
- Contains: Admin page routes, auto-generated API routes, custom API handlers
- Key files: `admin/[[...segments]]/page.tsx`, `api/[...slug]/route.ts`
- Accessed: Requests to `/admin`, `/api/*`

**`src/collections/`:**
- Purpose: Define Payload CMS content schemas (what editors create)
- Contains: Pages (with blocks), Media, Users, Categories
- Key patterns: Access control, hooks for revalidation, field definitions
- Modified: When adding new content types or changing existing schemas

**`src/globals/`:**
- Purpose: Define Payload global data (site-wide, single instance)
- Contains: Header (nav), Footer (links), SiteSettings (GA ID, fonts)
- Key pattern: Each global has `index.ts` (Payload config), `Component.tsx` (server wrapper), `Component.client.tsx` (interactivity)
- Revalidated: When editors change globals, afterChange hooks trigger `revalidateTag()`

**`src/blocks/`:**
- Purpose: Reusable page content modules
- Contains: Content, Gallery, Team, Form, FAQ, Events, Slider, CTA, etc.
- Key pattern: Each block has `config.ts` (Payload field definition) + `Component.tsx` (React renderer)
- Pages use: `layout` array field containing blocks; `RenderBlocks` component dispatches render

**`src/heros/`:**
- Purpose: Page hero section variants
- Contains: LowImpact (text), MediumImpact (text + bg image), HighImpact (full-screen)
- Key pattern: Page's `hero` field can select type; `RenderHero` dispatches render

**`src/components/`:**
- Purpose: Reusable UI components
- Contains: Page-level (RenderBlocks, RenderHero), global (Header, Footer), utility (Link, Media, RichText, Card)
- Sub-directory `ui/`: Shadcn UI primitives (button, card, input, select, checkbox, pagination)

**`src/providers/`:**
- Purpose: React context providers for shared state
- Contains: Theme (dark/light toggle), Locale (en/mr language context)
- Wraps: Root layout, manages state via hooks

**`src/utilities/`:**
- Purpose: Helper functions for data fetching, URL building, media handling
- Contains: Payload API wrappers (getGlobals, getDocument), Cloudinary helpers, string/color utilities
- Pattern: Data-fetching utilities use `unstable_cache()` with revalidation tags

**`src/access/`:**
- Purpose: Role-based access control functions for Payload
- Contains: Role definitions (super-admin, admin, editor, viewer), permission checks
- Used by: Payload collection `access` config (create, read, update, delete)

**`src/fields/`:**
- Purpose: Reusable Payload field definitions
- Contains: `link()` (link field), `linkGroup()` (array of links), `defaultLexical()` (rich text)
- Imported by: Collections and blocks to keep schemas DRY

**`src/i18n/`:**
- Purpose: Internationalization configuration
- Contains: `languages.ts` (single source of truth for supported languages)
- Pattern: Single array; changing this automatically updates Payload locale config and frontend routing

**`src/migrations/`:**
- Purpose: Database schema changes (auto-generated by Payload)
- Contains: Timestamped migration files
- Workflow: Run `pnpm payload migrate:create` → edit migration → `pnpm payload migrate`
- **DO NOT edit** migration files manually after creation

## Key File Locations

**Entry Points:**
- `src/app/(frontend)/layout.tsx`: Root HTML, providers, fonts, GA script
- `src/app/(frontend)/page.tsx`: Locale redirect logic
- `src/app/(frontend)/[locale]/page.tsx`: Home page (/en, /mr)
- `src/app/(frontend)/[locale]/[slug]/page.tsx`: Dynamic pages (/en/about, etc.)
- `src/app/(payload)/api/[...slug]/route.ts`: REST API proxy

**Configuration:**
- `src/payload.config.ts`: Payload CMS setup (collections, globals, plugins, database)
- `next.config.ts`: Next.js config (image handling, webpack, Payload integration)
- `src/cssVariables.ts`: CSS custom properties
- `src/i18n/languages.ts`: Supported languages (en, mr)

**Core Logic:**
- `src/components/RenderBlocks.tsx`: Dispatch layout blocks to components
- `src/components/RenderHero.tsx`: Dispatch hero variants to components
- `src/utilities/getGlobals.ts`: Fetch globals with caching & revalidation
- `src/utilities/generatePageMeta.ts`: Generate SEO metadata
- `src/collections/Pages/hooks/revalidatePage.ts`: Trigger ISR on content changes

**Testing:**
- `vitest.config.mts`: Unit test setup
- `playwright.config.ts`: E2E test setup
- (Test files co-located with source; naming: `*.test.ts`, `*.spec.ts`)

## Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `RenderBlocks.tsx`, `AdminBar.tsx`)
- Utilities/Hooks: `camelCase.ts` (e.g., `getGlobals.ts`, `useClickableCard.ts`)
- Styles: `globals.css`, `master.css`, `custom.scss`
- Config: `config.ts`, `*.config.ts` (e.g., `payload.config.ts`, `next.config.ts`)
- Migrations: `YYYYMMDD_HHMMSS.ts` (auto-generated by Payload)
- Types: `types.ts` (e.g., `src/providers/Theme/types.ts`)

**Directories:**
- Features/domains: `PascalCase/` (e.g., `src/blocks/Content/`, `src/globals/Header/`)
- Utilities: `lowercase/` (e.g., `src/utilities/`, `src/access/`, `src/i18n/`)
- Shadcn UI components: `lowercase-with-dashes/` (e.g., `src/components/ui/scroll-hint.tsx`)

**Functions:**
- Server functions: `camelCase` (e.g., `getGlobals()`, `generatePageMeta()`)
- React components: `PascalCase` (e.g., `RenderBlocks`, `Header`, `ContentBlock`)
- Hooks: `useNameHook` (e.g., `useClickableCard()`, `useTheme()`)
- Access checks: `isRole()` or `has<Permission>()` (e.g., `isAdminOrHigher()`, `isEditorOrHigher()`)

**Variables & Constants:**
- Constants: `UPPER_SNAKE_CASE` (e.g., `LANGUAGES`, `DEFAULT_LANGUAGE_CODE`, `SOCIAL_ICONS`)
- Types: `PascalCase` (e.g., `Theme`, `UserRole`, `Block`)
- Everything else: `camelCase` (e.g., `locale`, `blockComponents`, `headerData`)

## Where to Add New Code

**New Page/Route:**
1. Add `/[slug]` variant to `src/collections/Pages.ts` (CMS content)
2. Create route: `src/app/(frontend)/[locale]/[slug]/page.tsx` (already handles all via `generateStaticParams()`)
3. No new files needed if page uses existing blocks

**New Block Type:**
1. Create `src/blocks/MyBlock/config.ts` — Payload schema definition
2. Create `src/blocks/MyBlock/Component.tsx` — React component
3. Add import + mapping to `src/components/RenderBlocks.tsx` line 19
4. Add import + export to Pages collection's block array

**New Global Data:**
1. Create `src/globals/MyGlobal.ts` — Payload config
2. Create `src/globals/MyGlobal/Component.tsx` — React component (if needed)
3. Add to `src/payload.config.ts` globals array line 51
4. Create utility in `src/utilities/` if fetching is needed

**New Utility Function:**
1. Add to `src/utilities/newUtil.ts`
2. If fetching from Payload, use `unstable_cache()` with revalidation tags
3. Export and import where needed

**New Access Control Rule:**
1. Add function to `src/access/newRule.ts`
2. Takes `user: User | null | undefined`, returns `boolean`
3. Use in collection/global `access` config

**New Language:**
1. Add to `src/i18n/languages.ts` array (only place to edit!)
2. Payload localization auto-updates
3. Frontend routing auto-updates
4. Collections with `localized: true` fields auto-support new language

**Database Schema Change:**
1. Edit `src/collections/*.ts`, `src/globals/*.ts`, or `src/blocks/*/config.ts`
2. Run `pnpm payload migrate:create`
3. Review generated migration in `src/migrations/`
4. Run `pnpm payload migrate`
5. Run `pnpm generate:types` to update TypeScript types

**New Styling:**
- Use Tailwind CSS classes (v4)
- CSS custom properties: `--theme-primary`, `--font-devanagari`, etc. (defined in `src/cssVariables.ts`)
- Dark mode: Use `data-theme="light"` / `data-theme="dark"` in selectors, not `.dark` class

## Special Directories

**`src/migrations/`:**
- Purpose: Database schema version history
- Generated: Automatically by Payload during `migrate:create`
- Committed: Yes (must be committed to git)
- Manual edit: No (modifications could break rollback)
- Cleanup: Don't delete old migrations; they define the schema history

**`src/payload-types.ts`:**
- Purpose: TypeScript types auto-generated from Payload schema
- Generated: Automatically by Payload during `generate:types`
- Committed: Yes (must be committed for type checking)
- Manual edit: No (changes will be overwritten)
- When to regenerate: After every schema change (`pnpm generate:types`)

**`.next/`:**
- Purpose: Next.js build output (production builds)
- Generated: During `next build`
- Committed: No (in `.gitignore`)
- Purpose: Local development cache and build artifacts

**`node_modules/`:**
- Purpose: npm/pnpm dependencies
- Generated: By `pnpm install`
- Committed: No (in `.gitignore`)

---

*Structure analysis: 2026-08-07*
