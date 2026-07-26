# Database & Migrations

## Adapter

`@payloadcms/db-postgres` connecting via `DATABASE_URL` env var.

```ts
// src/payload.config.ts
db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URL || '' },
  push: false,   // ← NEVER auto-apply schema changes
})
```

## Environment files

| File | Purpose | Committed? |
| --- | --- | --- |
| `.env.local` | Local development DB | No (git-ignored) |
| `.env.production` | Production DB | No (git-ignored) |
| `.env.example` | Template with all keys, no values | Yes |

Copy `.env.example` to `.env.local` or `.env.production` and fill in `DATABASE_URL`.

## Migration workflow

Run these commands in order after **any** schema change (new collection, new field,
new global, enabling localization on an existing field, etc.).

**Choose the target environment:**

```bash
# Local DB
pnpm migrate:create:local   # diff schema → generate migration file in src/migrations/
pnpm migrate:local          # apply pending migrations to local DB

# Production DB
pnpm migrate:create:prod    # diff schema → generate migration file in src/migrations/
pnpm migrate:prod           # apply pending migrations to production DB
```

Then always regenerate types:

```bash
pnpm generate:types         # regenerate src/payload-types.ts
```

`pnpm generate:types` is important — it updates the TypeScript types that pages and
components rely on for `page.hero`, `page.layout`, etc.

## Current tables (after all migrations)

| Table                       | Source                           |
| --------------------------- | -------------------------------- |
| `users`                     | Users collection                 |
| `users_sessions`            | Auth sessions                    |
| `media`                     | Media collection                 |
| `pages`                     | Pages collection                 |
| `pages_*` (locale columns)  | Localized fields on Pages        |
| `site_settings`             | SiteSettings global              |
| `payload_migrations`        | Migration history                |
| `payload_preferences`       | Admin UI preferences             |
| `payload_locked_documents`  | Concurrent editing locks         |
| `payload_kv`                | Internal key-value store         |

## Localization and the DB

Payload stores localized field values as extra columns on the same table, not separate
tables. Example: `title` field with `localized: true` → `title_en`, `title_mr` columns
on the `pages` table.

## Other useful commands

```bash
pnpm payload migrate:status   # see which migrations have been applied
pnpm payload migrate:fresh    # drop all tables and re-run all migrations (dev only)
```
