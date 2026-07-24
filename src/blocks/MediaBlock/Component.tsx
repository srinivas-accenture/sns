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

  const isFullscreen = position === 'fullscreen'

  return (
    <figure style={{ margin: 0, width: isFullscreen ? '100vw' : '100%' }}>
      <Image
        src={media.url}
        alt={media.alt ?? ''}
        width={media.width ?? 1600}
        height={media.height ?? 900}
        style={{ width: '100%', height: 'auto' }}
      />
      {caption && (
        <figcaption style={{ textAlign: 'center', marginTop: '0.5rem', opacity: 0.7 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
