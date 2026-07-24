# Pages Collection

## Location

`src/collections/Pages/index.ts`

## Schema overview

| Field    | Type            | Notes                                      |
| -------- | --------------- | ------------------------------------------ |
| `title`  | text            | `localized: true`, used as admin list title |
| `slug`   | text            | unique, indexed, sidebar, filled manually   |
| Hero tab | group           | see Hero section below                     |
| Content tab | blocks       | see Blocks section below                   |
| SEO tab  | group (`meta`) | title, description, image — all optional   |

Drafts are enabled (`versions: { drafts: true }`).

## Hero

Defined in `src/heros/config.ts` as a group field named `hero`.

| Field      | Type          | Shown when            |
| ---------- | ------------- | --------------------- |
| `type`     | select        | always                |
| `richText` | richText      | always                |
| `media`    | upload→media  | highImpact, mediumImpact |
| `links`    | array of link | type ≠ none           |

Hero types: `none` · `lowImpact` · `mediumImpact` · `highImpact`

React components: `src/heros/LowImpact.tsx`, `MediumImpact.tsx`, `HighImpact.tsx`
Switcher: `src/components/RenderHero.tsx`

## Blocks

Layout field accepts three block types:

| Block slug   | Config file                           | Component                              |
| ------------ | ------------------------------------- | -------------------------------------- |
| `content`    | `src/blocks/Content/config.ts`        | `src/blocks/Content/Component.tsx`     |
| `mediaBlock` | `src/blocks/MediaBlock/config.ts`     | `src/blocks/MediaBlock/Component.tsx`  |
| `cta`        | `src/blocks/CallToAction/config.ts`   | `src/blocks/CallToAction/Component.tsx`|

Block switcher: `src/components/RenderBlocks.tsx`

### Adding a new block

1. Create `src/blocks/YourBlock/config.ts` (export a `Block`)
2. Create `src/blocks/YourBlock/Component.tsx` (React component)
3. Add the config to the `blocks` array in `src/collections/Pages/index.ts`
4. Add `blockSlug: YourBlockComponent` to the map in `src/components/RenderBlocks.tsx`
5. Run `pnpm payload migrate:create && pnpm payload migrate && pnpm generate:types`

## Reusable link field

`src/fields/link.ts` — call `linkField()` wherever a link group is needed.
Supports internal (relationship to `pages`) and custom URL, new-tab toggle,
localized label, and appearance (`default` / `outline`).

## SEO

Manual `meta` group (no plugin). Fields: `meta.title`, `meta.description`, `meta.image`.
`generateMetadata` in the page routes reads these and falls back to `page.title`.
