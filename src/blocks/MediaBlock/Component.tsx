import Image from 'next/image'
import React from 'react'

type MediaBlockProps = {
  media?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  caption?: string
  position?: 'default' | 'fullscreen'
}

export function MediaBlock({ media, caption, position = 'default' }: MediaBlockProps) {
  if (!media?.url) return null

  return (
    <figure className={position === 'fullscreen' ? 'my-0' : 'mx-auto my-12 max-w-6xl px-6'}>
      <div className={position === 'fullscreen' ? 'relative h-[60vh] w-full' : 'overflow-hidden rounded-lg'}>
        {position === 'fullscreen' ? (
          <Image
            src={media.url}
            alt={media.alt ?? ''}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={media.url}
            alt={media.alt ?? ''}
            width={media.width ?? 1600}
            height={media.height ?? 900}
            className="h-auto w-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">{caption}</figcaption>
      )}
    </figure>
  )
}
