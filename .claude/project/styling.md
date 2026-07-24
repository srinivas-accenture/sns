# Styling — Tailwind CSS v4

## Setup files

| File                                    | Role                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| `postcss.config.mjs`                    | Registers `@tailwindcss/postcss` plugin                     |
| `tailwind.config.mjs`                   | Content paths only; referenced by `@config` in globals.css  |
| `src/app/(frontend)/globals.css`        | Main CSS entry — imports Tailwind, tw-animate-css, master   |
| `src/app/(frontend)/master.css`         | Full design system / layout CSS                             |

`globals.css` is imported in `src/app/(frontend)/layout.tsx` — **not** `styles.css`.

## globals.css structure

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import './master.css';

@config '../../../tailwind.config.mjs';

/* custom variants, @theme tokens, base layer, brand tokens … */
```

## Tailwind v4 — key differences from v3

- No `tailwind.config.ts` for theme — use `@theme { }` in CSS instead
- Dark mode: `@custom-variant dark (&:is([data-theme='dark'] *))` — set `data-theme="light"/"dark"` on `<html>`, NOT a `dark` class
- Plugins: `@plugin "@tailwindcss/typography"` in CSS (not in JS config)
- Content scanning: `tailwind.config.mjs` lists `./src/**/*.{js,ts,jsx,tsx,mdx}`

## Brand tokens (defined in globals.css :root)

| CSS var                  | Value (light)            | Use                      |
| ------------------------ | ------------------------ | ------------------------ |
| `--brand-primary`        | oklch(62% 0.182 52deg)   | Saffron orange ~#e07800  |
| `--brand-primary-hover`  | oklch(54% 0.170 50deg)   | Darker saffron on hover  |
| `--brand-accent`         | oklch(70% 0.150 73deg)   | Golden amber             |
| `--brand-surface`        | oklch(99% 0.010 58deg)   | Warm white background    |

All brand tokens are also exposed as Tailwind utilities via `@theme inline`:
`bg-brand-primary`, `text-brand-primary`, `border-brand-accent`, etc.

## Dark mode toggle

`<html>` must have `data-theme="light"` or `data-theme="dark"`.
The FOUC guard in globals.css hides the page (`html { opacity: 0 }`) until `data-theme`
is present (`html[data-theme='dark'], html[data-theme='light'] { opacity: initial }`).
Currently hardcoded to `data-theme="light"` in layout.tsx; add a theme-toggle component
to make it user-switchable.

## Typography plugin

`@tailwindcss/typography` is installed. Use the `prose` class on rich text containers:

```tsx
<div className="prose max-w-none">
  <RichText data={richText} />
</div>
```
