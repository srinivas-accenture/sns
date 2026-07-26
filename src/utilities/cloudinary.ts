import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const staticDir = process.env.VERCEL ? '/tmp/media' : path.resolve(process.cwd(), 'public/media')

export async function uploadToCloudinary(
  filename: string,
  publicId: string,
  extraFilenames: string[] = [],
): Promise<string | null> {
  const filePath = path.join(staticDir, filename)
  if (!fs.existsSync(filePath)) return null

  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'auto',
  })

  // Remove the original + all size variants — Cloudinary is the permanent store
  for (const name of [filename, ...extraFilenames]) {
    try {
      fs.unlinkSync(path.join(staticDir, name))
    } catch {
      // non-fatal: file may already be gone
    }
  }

  return result.secure_url
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch {
    // ignore if not found
  }
}

/** Build a Cloudinary delivery URL with optional on-the-fly transformation */
export function buildCloudinaryUrl(
  cloudName: string,
  publicId: string,
  transform?: string,
): string {
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`
  return transform ? `${base}/${transform}/${publicId}` : `${base}/${publicId}`
}

/** Derive a transformation string from a size doc entry */
export function sizeTransform(width?: number | null, height?: number | null): string {
  if (width && height) return `c_fill,w_${width},h_${height}`
  if (width) return `c_scale,w_${width}`
  if (height) return `c_scale,h_${height}`
  return ''
}

// Derives a stable Cloudinary public_id from the media doc id
export const cldPublicId = (docId: string | number) => `cms-media/${docId}`
