# SNS — Posts Collection

## What This Is

A Posts collection for the existing SNS Payload CMS + Next.js site. Editors can publish general-purpose content (news, articles, announcements) using the existing block library, with multilingual support, draft/publish workflow, and a public-facing listing and detail page.

## Core Value

Editors can create, publish, and manage posts using the same block library already powering Pages — no new UI patterns to learn, no re-implementing blocks.

## Requirements

### Validated

- ✓ Block library (Content, Gallery, Team, Events, FAQ, Form, Slider, CTA, ContentWithImage, MediaBlock) — existing in `src/blocks/`
- ✓ Categories collection — existing in `src/collections/Categories.ts`
- ✓ Media collection with Cloudinary integration — existing in `src/collections/Media.ts`
- ✓ SEO plugin (`@payloadcms/plugin-seo`) — already installed and configured
- ✓ Multilingual infrastructure (en + mr via `src/i18n/languages.ts`) — existing
- ✓ Draft/publish workflow (Payload versions) — established pattern in Pages collection
- ✓ Role-based access control (super-admin, admin, editor, viewer) — existing in `src/access/`
- ✓ ISR revalidation pattern via `revalidateTag()` hooks — established in Pages
- ✓ Locale-prefixed routing (`/[locale]/[slug]`) — existing frontend pattern

### Active

- [ ] Posts Payload collection with: title (localized), slug, author (plain text name), categories (relationship), published date, featured image (Media relationship), excerpt (richtext, localized), layout blocks (all existing blocks), SEO fields, draft + publish
- [ ] Individual post frontend page at `/[locale]/posts/[slug]` with hero (featured image), excerpt, and block content
- [ ] Posts listing page at `/[locale]/posts` with paginated post cards, category filter
- [ ] Cache revalidation hooks on post save/delete (same pattern as Pages)
- [ ] Posts included in sitemap (`next-sitemap.config.cjs`)

### Out of Scope

- Comments system — separate capability, own phase
- RSS/Atom feed — not requested
- Author user accounts — plain text name chosen; relationship to Users deferred
- Email notifications on publish — not requested
- Social sharing buttons — not requested

## Context

This project extends an existing, production-ready Payload CMS + Next.js site. The codebase map (`.planning/codebase/`) provides full detail on current architecture. Key reference points:

- Pages collection pattern: `src/collections/Pages/index.ts` — the Posts collection should follow this closely
- Block registration: `src/blocks/` and `src/components/RenderBlocks.tsx` — Posts reuses as-is
- SEO plugin pattern: see how it's configured in `src/payload.config.ts`
- Frontend page pattern: `src/app/(frontend)/[locale]/[slug]/page.tsx` — Posts pages follow this structure under a `/posts/` segment
- Multilingual: all user-facing text fields need `localized: true`; slug may be shared across locales

## Constraints

- **Tech stack**: Payload CMS 3.86.0 + Next.js 16 App Router — no framework changes
- **Database**: PostgreSQL via `@payloadcms/db-postgres`; every schema change requires `pnpm payload migrate:create` + `pnpm payload migrate` + `pnpm generate:types`
- **Package manager**: pnpm only
- **Blocks**: reuse existing blocks — do not create new block types in this project
- **Localization**: all content text fields must be `localized: true` to support en + mr

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Author as plain text, not User relationship | Simpler editor UX; no requirement to tie posts to user accounts | — Pending |
| Reuse existing Categories collection | Already in codebase; no new collection needed | — Pending |
| `/posts/[slug]` URL namespace | Clear separation from top-level pages | — Pending |
| Reuse all existing blocks unchanged | Avoids duplication; blocks are already rendering correctly | — Pending |
| SEO fields via existing plugin | Consistency with Pages; plugin already installed | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-07 after initialization*
