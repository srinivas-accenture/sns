# Media Collection & Cloudinary

## How it works

Payload handles the initial upload and local storage. After each create/update,
an `afterChange` hook uploads the file to Cloudinary and stores the `cloudinaryId`
on the document. An `afterRead` hook then overrides `url` (and all size URLs) with
Cloudinary delivery URLs so the frontend always uses CDN-served images.

## Flow

```
Browser upload → Payload saves to local disk → afterChange hook → Cloudinary upload
                                                                 ↓
Frontend request ← afterRead hook rewrites url ← Payload read ← cloudinaryId stored
```

## Key files

| File                           | Role                                          |
| ------------------------------ | --------------------------------------------- |
| `src/collections/Media.ts`     | Collection config with upload hooks           |
| `src/utilities/cloudinary.ts`  | SDK config + upload/delete/URL helpers        |

## Environment variables (required in .env)

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

All three must be set or Cloudinary sync is silently skipped (local URLs used instead).

## Image sizes

Defined in `Media.ts` upload config. Cloudinary serves them with on-the-fly transforms:

| Size      | Dimensions        | Transform              |
| --------- | ----------------- | ---------------------- |
| thumbnail | 300w              | `c_scale,w_300`        |
| square    | 500×500           | `c_fill,w_500,h_500`   |
| small     | 600w              | `c_scale,w_600`        |
| medium    | 900w              | `c_scale,w_900`        |
| large     | 1400w             | `c_scale,w_1400`       |
| xlarge    | 1920w             | `c_scale,w_1920`       |
| og        | 1200×630          | `c_fill,w_1200,h_630`  |

## next.config.ts

`res.cloudinary.com` is added to `images.remotePatterns` so `next/image` can
serve Cloudinary URLs without the `unoptimized` prop.

## Access control

| Operation | Required role    |
| --------- | ---------------- |
| read      | anyone (public)  |
| create    | editor or higher |
| update    | editor or higher |
| delete    | admin or higher  |
