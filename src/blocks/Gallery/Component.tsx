'use client'

import type { GalleryBlock as GalleryBlockProps, Media as MediaType } from '@/payload-types'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { isLightBackground } from '@/utilities/colorContrast'
import { cn } from '@/utilities/ui'

type GalleryImage = NonNullable<GalleryBlockProps['images']>[0]
type Props = GalleryBlockProps & { className?: string }

const THUMB_W = 220
const THUMB_H = 320
const MAX_ITEMS = 10

function getUrl(image: number | MediaType | null | undefined): string | null {
  if (!image || typeof image !== 'object') return null
  return typeof image.url === 'string' && image.url ? image.url : null
}

function getAlt(item: GalleryImage): string {
  if (item.alt) return item.alt
  const img = item.image
  return img && typeof img === 'object' && typeof img.alt === 'string' ? img.alt : ''
}

function isVideo(image: number | MediaType | null | undefined): boolean {
  if (!image || typeof image !== 'object') return false
  return typeof image.mimeType === 'string' && image.mimeType.startsWith('video/')
}

export const GalleryBlock: React.FC<Props> = ({
  title,
  images,
  ctaTitle,
  ctaLink,
  backgroundColor,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const items = (images ?? []).slice(0, MAX_ITEMS)
  if (!items.length) return null

  const count = items.length
  const hasCta = !!ctaTitle?.trim()
  const isLight = isLightBackground(backgroundColor)

  function scroll(dir: -1 | 1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (THUMB_W + 12), behavior: 'smooth' })
  }

  function openAt(i: number) { setActive(i) }
  function close() { setActive(null) }
  function prev() { setActive(i => i !== null ? (i - 1 + count) % count : null) }
  function next() { setActive(i => i !== null ? (i + 1) % count : null) }

  useEffect(() => {
    if (active === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowLeft') setActive(i => i !== null ? (i - 1 + count) % count : null)
      if (e.key === 'ArrowRight') setActive(i => i !== null ? (i + 1) % count : null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [active, count])

  return (
    <>
      <div
        className={cn('cms-bg w-full', className)}
        style={{
          paddingTop: '5rem',
          paddingBottom: hasCta ? 0 : '5rem',
        }}
      >
        {/* Title */}
        {title && (
          <div className="container mb-8 text-center">
            <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>
          </div>
        )}

        {/* Slider strip */}
        <div style={{ position: 'relative' }}>
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="[&::-webkit-scrollbar]:hidden"
            style={{
              display: 'flex',
              gap: 0,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
            }}
          >
            {items.map((item, i) => {
              const src = getUrl(item.image)
              const video = isVideo(item.image)
              return (
                <div
                  key={i}
                  onClick={() => openAt(i)}
                  className="group"
                  style={{
                    flexShrink: 0,
                    width: THUMB_W,
                    height: THUMB_H,
                    borderRadius: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    scrollSnapAlign: 'start',
                    background: '#e5e7eb',
                    position: 'relative',
                  }}
                >
                  {src ? (
                    video ? (
                      <>
                        <video
                          src={src}
                          muted
                          playsInline
                          preload="metadata"
                          className="transition-transform duration-500 group-hover:scale-110"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
                          <Play size={36} color="#fff" fill="#fff" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={src}
                        alt={getAlt(item)}
                        className="transition-transform duration-500 group-hover:scale-110"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                    )
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#e5e7eb' }} />
                  )}

                  {/* Gradient overlay — always visible, caption on top if set */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    padding: '40px 14px 14px',
                    pointerEvents: 'none',
                  }}>
                    {item.caption && (
                      <p style={{ margin: 0, color: '#fff', fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* CTA strip */}
        {hasCta && (
          <div
            className="cms-bg w-full py-20 lg:py-[7.5rem]"
            style={{ '--cms-bg': backgroundColor || '#3C1500' } as React.CSSProperties}
          >
            <div className="container flex flex-col items-center gap-6 text-center">
              <h3
                className="text-2xl font-extrabold uppercase leading-tight tracking-wide md:text-3xl lg:text-4xl"
                style={{ color: isLight ? undefined : '#ffffff' }}
              >
                {ctaTitle}
              </h3>
              {ctaLink?.label && (
                <CMSLink
                  {...ctaLink}
                  appearance="outline"
                  className={cn(
                    isLight ? 'border-foreground text-foreground hover:bg-foreground hover:text-white'
                             : 'border-white hover:bg-white hover:text-foreground',
                  )}
                  style={isLight ? undefined : { color: '#ffffff', borderColor: '#ffffff' }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────────── */}
      {active !== null && (() => {
        const item = items[active]
        const src = getUrl(item?.image)
        const video = isVideo(item?.image)
        return (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={close}
          >
            {/* Top bar */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', flexShrink: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>
                {active + 1} / {count}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Media area */}
            <div
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 60px' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Prev */}
              {count > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                  style={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              {src && (
                video ? (
                  <video
                    src={src}
                    controls
                    autoPlay
                    style={{ maxWidth: '90vw', maxHeight: '78vh', borderRadius: 8, background: '#000' }}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <img
                    src={src}
                    alt={getAlt(item)}
                    style={{ maxWidth: '90vw', maxHeight: '78vh', objectFit: 'contain', borderRadius: 8, display: 'block' }}
                  />
                )
              )}

              {/* Next */}
              {count > 1 && (
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  style={{ position: 'absolute', right: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  <ChevronRight size={26} />
                </button>
              )}
            </div>

            {/* Caption / dots */}
            <div
              style={{ flexShrink: 0, paddingBottom: 16 }}
              onClick={e => e.stopPropagation()}
            >
              {item?.caption && (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 10, padding: '0 20px' }}>
                  {item.caption}
                </p>
              )}
              {count > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Go to image ${i + 1}`}
                      style={{
                        height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
                        background: i === active ? '#fff' : 'rgba(255,255,255,0.3)',
                        width: i === active ? 20 : 6,
                        transition: 'width 0.3s, background 0.3s',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </>
  )
}
