# SNS — Project Knowledge

## Payload CMS skill

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference.

---

## Project overview

Full-stack CMS + Next.js site. Payload CMS handles content; Next.js App Router handles the frontend.

| Layer           | Tech                                     |
| --------------- | ---------------------------------------- |
| CMS             | Payload 3.86.0                           |
| Framework       | Next.js 16 (App Router)                  |
| Database        | PostgreSQL via `@payloadcms/db-postgres` |
| Styling         | Tailwind CSS v4                          |
| Package manager | pnpm (always — never npm/yarn)           |

## Feature docs (read when working on that area)

- [Internationalization / multilingual](.claude/project/i18n.md)
- [Pages collection — hero, blocks, SEO](.claude/project/pages.md)
- [Frontend routing — locale-prefixed URLs](.claude/project/routing.md)
- [Styling — Tailwind CSS v4 setup](.claude/project/styling.md)
- [Database — migrations workflow](.claude/project/database.md)

## Critical rules (always apply)

1. **pnpm only** — never suggest npm or yarn
2. **All schema changes go through migrations** — `push: false` is set; run `pnpm payload migrate:create` then `pnpm payload migrate` after every collection/global/field change, then `pnpm generate:types`
3. **Adding a language** — only edit `src/i18n/languages.ts`; everything else derives from it automatically
4. **Localized fields** — any field that should differ per language needs `localized: true` in its Payload field config
5. **Dark mode** — uses `data-theme="light"/"dark"` on `<html>`, NOT a `dark` CSS class
