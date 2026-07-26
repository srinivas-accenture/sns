import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { isAdminOrHigher } from '../access/isAdminOrHigher'
import { isEditorOrHigher } from '../access/isEditorOrHigher'
import {
  buildCloudinaryUrl,
  cldPublicId,
  deleteFromCloudinary,
  sizeTransform,
  uploadToCloudinary,
} from '../utilities/cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME

const cloudinaryEnabled = Boolean(
  CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: anyone,
    update: isEditorOrHigher,
  },
  hooks: {
    // ── afterChange: upload to Cloudinary, store cloudinaryId ────────────────
    afterChange: [
      async ({ doc, req, operation }) => {
        if (!cloudinaryEnabled) return doc
        if (req.context?.skipCloudinarySync) return doc
        if (operation !== 'create' && operation !== 'update') return doc
        if (!doc.filename) return doc
        if (doc.cloudinaryId) return doc // already synced

        try {
          const publicId = cldPublicId(doc.id)
          const uploaded = await uploadToCloudinary(doc.filename, publicId)
          if (!uploaded) return doc

          // Store the cloudinaryId; afterRead will derive the URL from it
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: { cloudinaryId: publicId },
            context: { skipCloudinarySync: true },
            req,
          })

          return { ...doc, cloudinaryId: publicId }
        } catch (err) {
          console.error('Cloudinary upload error:', err)
          return doc
        }
      },
    ],

    // ── afterRead: override url (and size urls) with Cloudinary delivery URLs ─
    afterRead: [
      ({ doc }) => {
        if (!cloudinaryEnabled) return doc
        const cloudinaryId: string | undefined = doc.cloudinaryId
        if (!cloudinaryId) return doc

        const url = buildCloudinaryUrl(CLOUD_NAME!, cloudinaryId, 'f_auto,q_auto')

        // Override each size entry with a Cloudinary on-the-fly transformation URL
        const sizes: Record<string, unknown> = {}
        for (const [name, sizeData] of Object.entries(
          (doc.sizes ?? {}) as Record<string, Record<string, unknown>>,
        )) {
          const w = sizeData?.width as number | undefined
          const h = sizeData?.height as number | undefined
          const transform = sizeTransform(w, h)
          sizes[name] = {
            ...sizeData,
            url: buildCloudinaryUrl(CLOUD_NAME!, cloudinaryId, transform || undefined),
          }
        }

        return {
          ...doc,
          url,
          ...(Object.keys(sizes).length > 0 && { sizes }),
        }
      },
    ],

    afterDelete: [
      async ({ doc }) => {
        if (!cloudinaryEnabled) return
        const publicId: string | undefined = doc.cloudinaryId
        if (!publicId) return
        try {
          await deleteFromCloudinary(publicId)
        } catch (err) {
          console.error('Cloudinary delete error:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      admin: { hidden: true },
    },
  ],
  upload: {
    staticDir: process.env.VERCEL ? '/tmp/media' : path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
