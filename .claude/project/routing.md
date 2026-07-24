# Frontend Routing

## URL structure

| URL                  | Behaviour                                              |
| -------------------- | ------------------------------------------------------ |
| `/`                  | Redirects to `/{defaultLocale}` from SiteSettings      |
| `/{locale}`          | Home page (`slug: 'home'`) in the given locale         |
| `/{locale}/{slug}`   | Any other page in the given locale                     |

Invalid locale codes (e.g. `/xyz/about`) return 404 — validated against `LANGUAGES`.

## File map

```
src/app/(frontend)/
├── layout.tsx              ← root layout; sets <html lang> from x-locale header
├── page.tsx                ← redirects / → /{defaultLocale}
└── [locale]/
    ├── page.tsx            ← renders home page in locale
    └── [slug]/
        └── page.tsx        ← renders any page in locale
```

## Middleware

`src/middleware.ts` runs on every frontend request (excludes `_next`, `admin`, `api`).

- Reads the first URL segment
- Validates against `LANGUAGES`; falls back to `DEFAULT_LANGUAGE_CODE`
- Writes the result as the `x-locale` response header

`src/app/(frontend)/layout.tsx` reads `x-locale` via `headers()` and sets `<html lang>`.
This is the Next.js-recommended pattern for passing request-time data into layouts.

## Locale in Payload queries

All page routes pass `locale` to `payload.find`:

```ts
await payload.find({
  collection: 'pages',
  where: { slug: { equals: slug } },
  locale: locale as any,   // 'en' | 'mr' | …
  draft: false,
})
```

Payload returns the content for that locale; missing values fall back to `defaultLocale`
because `fallback: true` is set in `payload.config.ts`.

## Default locale redirect

`src/app/(frontend)/page.tsx` calls `getDefaultLocale()` from `src/i18n/getDefaultLocale.ts`
which reads the `site-settings` global. If the DB is unreachable it falls back to
`DEFAULT_LANGUAGE_CODE`. The redirect is a hard `redirect()` (307).

## generateStaticParams

`[locale]/[slug]/page.tsx` exports `generateStaticParams` wrapped in try/catch so
builds succeed even when the DB has no pages yet. It cross-products all locales × all
page slugs.
