# External Integrations

**Analysis Date:** 2026-08-07

## APIs & External Services

**Image Management:**
- Cloudinary - Image storage, delivery, and on-the-fly transformation
  - SDK/Client: `cloudinary` package (v2.10.0)
  - Auth: Environment variables (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
  - Usage: Automatic upload on media creation/update; delivery URL override in afterRead hook
  - Implementation: `src/utilities/cloudinary.ts`, `src/collections/Media.ts`
  - Features: Public ID management, on-the-fly transformations (auto format/quality), size variant generation

**Analytics:**
- Google Analytics - Website traffic and user behavior tracking
  - Integration: Google Tag Manager (GTM) with measurement ID
  - Configuration: `googleAnalyticsId` field in `SiteSettings` global (localized)
  - Implementation: `src/app/(frontend)/layout.tsx` (lines 70-93)
  - Conditional: Only loads if `googleAnalyticsId` is configured in CMS
  - Script: `https://www.googletagmanager.com/gtag/js?id={gaId}`

## Data Storage

**Databases:**
- PostgreSQL
  - Client: `@payloadcms/db-postgres` adapter
  - Connection: `DATABASE_URL` environment variable
  - Configuration: `src/payload.config.ts` (lines 74-79)
  - ORM: Payload's built-in query system (handles schema/migrations)

**File Storage:**
- Cloudinary (primary when configured)
  - Storage location configured in `src/collections/Media.ts` (lines 25-29)
  - Fallback to local filesystem: `public/media/` (development) or `/tmp/media/` (Vercel)
  - Automatic cleanup: Local files removed after Cloudinary upload succeeds
- Local filesystem (fallback)
  - Development path: `public/media/`
  - Production path: `/tmp/media/` on Vercel

**Caching:**
- Next.js built-in caching (revalidateTag)
  - Cache invalidation: `revalidateTag('global_site-settings', 'max')` on SiteSettings change
  - Implementation: `src/globals/SiteSettings.ts` (lines 6-9)

## Authentication & Identity

**Auth Provider:**
- Custom (Payload built-in)
  - Implementation: Users collection in `src/collections/Users.ts`
  - Admin panel authentication via Payload
  - Role-based access control: Admin, Editor, higher roles
  - Preview secret for draft preview: `PREVIEW_SECRET` environment variable
  - Preview route: `src/app/(frontend)/next/preview/route.ts`

**Access Control:**
- Row-level security via Payload access functions
  - `anyone` - Public read access
  - `isEditorOrHigher` - Content creation/update
  - `isAdminOrHigher` - Admin operations

## Monitoring & Observability

**Error Tracking:**
- None detected - errors logged to console in hooks

**Logs:**
- Console logging in application code
- Payload logger: `req.payload.logger.info()` for system events
- Example: Cache revalidation logging in `src/globals/SiteSettings.ts`

**Debugging:**
- Next.js dev server debugging
- Playwright test reporting: HTML reporter to `/playwright-report/`

## CI/CD & Deployment

**Hosting:**
- Vercel (supported/detected)
  - Detection via `VERCEL` environment variable
  - Special handling for temp files: `/tmp/media/`
  - Build optimization: Cross-env with large memory allocation

**CI Pipeline:**
- None detected in repository
- Test commands available:
  - `pnpm test:int` - Run integration tests (Vitest)
  - `pnpm test:e2e` - Run E2E tests (Playwright)
  - `pnpm test` - Run both test suites

**Build Process:**
- `pnpm build` - Full production build
  - Runs Next.js build
  - Generates sitemap and robots.txt via next-sitemap
  - Memory: 8GB allocation for build process

## Environment Configuration

**Required env vars:**
- `DATABASE_URL` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Encryption key for Payload

**Optional env vars:**
- `NEXT_PUBLIC_SERVER_URL` - Frontend server URL (used for preview, sitemap, etc.)
- `VERCEL_PROJECT_PRODUCTION_URL` - Vercel production URL (auto-detected on Vercel)
- `NEXT_PUBLIC_SITE_NAME` - Display name (defaults to 'SNS')
- `PREVIEW_SECRET` - Preview/draft mode authentication key
- Cloudinary:
  - `CLOUDINARY_CLOUD_NAME` - Cloud account identifier
  - `CLOUDINARY_API_KEY` - API key
  - `CLOUDINARY_API_SECRET` - API secret
  - (If not set, media stays local; Cloudinary is optional)
- Email (Nodemailer/SMTP):
  - `SMTP_HOST` - Email server hostname
  - `SMTP_PORT` - Email server port (default: 587)
  - `SMTP_USER` - Authentication username
  - `SMTP_PASS` - Authentication password
  - `SMTP_FROM` - Default sender address (default: 'noreply@example.com')
  - `SMTP_FROM_NAME` - Default sender name (default: 'SNS')

**Secrets location:**
- Local development: `.env.local` (excluded from git)
- Production: `.env.production` (excluded from git)
- Vercel: Environment variables configured in Vercel dashboard
- All .env files in `.gitignore`

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Cloudinary integration:
  - `uploadToCloudinary()` - Triggered by Media afterChange hook on create/update
  - `deleteFromCloudinary()` - Triggered by Media afterDelete hook
  - Implementation: `src/utilities/cloudinary.ts`

## Content Management Features

**Collections (via Payload):**
- Users - Admin accounts
- Media - Image/file storage with Cloudinary integration
- Pages - Content pages with SEO metadata
- Categories - Content categorization

**Globals (via Payload):**
- Header - Navigation, site header configuration
- Footer - Footer links and social media
- SiteSettings - Google Analytics ID, Devanagari font selection, SEO/robots config

**Localization:**
- Languages: English, Marathi (defined in `src/i18n/languages.ts`)
- Localized fields: Title, description, and other content fields per language
- Default: English

**Blocks (Content Components):**
- Form - Dynamic form builder output
- Events - Events listing
- Gallery - Image gallery display
- Team - Team member profiles

## Payload CMS Plugins

**Form Builder Plugin:**
- Allows CMS admins to create forms
- Supported field types: text, textarea, select, email, state, country, checkbox, number, message
- Payment fields disabled
- Implementation: `src/payload.config.ts` (lines 82-95)

**SEO Plugin:**
- Manages SEO metadata for Pages collection
- Custom fields: keywords, noIndex checkbox
- Auto-generated: title, meta description, canonical URL, OG image
- Implementation: `src/payload.config.ts` (lines 96-126)

**Rich Text Editor (Lexical):**
- Used in Media captions, Pages content
- Features: Fixed toolbar, inline toolbar
- Implementation: Various collection/field configs

**Admin Bar:**
- Inline editing in frontend (context-aware editing)
- Package: `@payloadcms/admin-bar`

## Frontend/CMS Integration

**Live Preview:**
- Draft preview mode via PREVIEW_SECRET
- Route: `src/app/(frontend)/next/preview/route.ts`
- Mechanism: Next.js draft mode + Payload preview URL

**Revalidation:**
- Next.js ISR (Incremental Static Revalidation)
- Cache busting: `revalidateTag()` on CMS changes
- Applies to: Site settings, pages, navigation

**API Routes:**
- REST API: Auto-generated by Payload
  - Route: `/api/[...slug]` - Payload REST endpoints
- GraphQL: Available via Payload
  - Route: `/api/graphql` - GraphQL endpoint
  - Playground: `/api/graphql-playground`

---

*Integration audit: 2026-08-07*
