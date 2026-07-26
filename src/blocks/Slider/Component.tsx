'use client'

import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = SliderBlockProps & { className?: string; disableInnerContainer?: boolean }
type Slide = NonNullable<SliderBlockProps['slides']>[0]

// Overlay gradient: position → strength → Tailwind classes
const OVERLAY_GRADIENT: Record<string, Record<string, string>> = {
  'bottom-left': {
    light:  'bg-gradient-to-t from-black/50 via-black/15 to-transparent',
    medium: 'bg-gradient-to-t from-black/75 via-black/30 to-transparent',
    strong: 'bg-gradient-to-t from-black/90 via-black/55 to-black/10',
  },
  'bottom-center': {
    light:  'bg-gradient-to-t from-black/50 via-black/15 to-transparent',
    medium: 'bg-gradient-to-t from-black/75 via-black/30 to-transparent',
    strong: 'bg-gradient-to-t from-black/90 via-black/55 to-black/10',
  },
  center: {
    light:  'bg-black/25',
    medium: 'bg-black/45',
    strong: 'bg-black/65',
  },
}

// Flex alignment of the overlay layer
const OVERLAY_ALIGN: Record<string, string> = {
  'bottom-left':   'items-end justify-start',
  'bottom-center': 'items-end justify-center',
  center:          'items-center justify-center',
}

// Text alignment of the content block
const TEXT_ALIGN: Record<string, string> = {
  'bottom-left':   'text-left',
  'bottom-center': 'text-center',
  center:          'text-center',
}

// Padding inside the overlay layer (more at bottom for bottom positions)
const OVERLAY_PAD: Record<string, string> = {
  'bottom-left':   'px-6 pb-14 pt-8 md:px-14 md:pb-20',
  'bottom-center': 'px-6 pb-14 pt-8 md:px-14 md:pb-20',
  center:          'px-6 py-8 md:px-14 md:py-14',
}

function IconChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const isRichTextEmpty = (value: any): boolean => {
  if (!value) return true
  if (typeof value !== 'object') return !value
  const root = value.root
  if (!root) return true
  const children = root.children
  if (!Array.isArray(children) || children.length === 0) return true

  const hasTextOrContent = (nodes: any[]): boolean => {
    return nodes.some((node) => {
      if (node && typeof node === 'object') {
        if (typeof node.text === 'string' && node.text.trim() !== '') return true
        if (Array.isArray(node.children) && hasTextOrContent(node.children)) return true
        if (node.type === 'block' && node.fields) return true
      }
      return false
    })
  }
  return !hasTextOrContent(children)
}

export const SliderBlock: React.FC<Props> = (props) => {
  const {
    className,
    title,
    autoplay = false,
    autoplaySpeed = 4000,
    showArrows = true,
    showDots = true,
    slides,
  } = props

  const showScrollIndicator = props.showScrollIndicator ?? false

  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const count = slides?.length ?? 0

  const go = useCallback(
    (index: number) => {
      setCurrent((index + count) % count)
      setProgressWidth(0)
    },
    [count],
  )

  const prev = useCallback(() => go(current - 1), [current, go])
  const next = useCallback(() => go(current + 1), [current, go])

  // Autoplay timer
  useEffect(() => {
    if (!autoplay || count < 2) return
    timerRef.current = setTimeout(next, autoplaySpeed ?? 4000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [autoplay, autoplaySpeed, current, count, next])

  // Autoplay progress bar
  useEffect(() => {
    if (!autoplay || count < 2) return
    setProgressWidth(0)
    const speed = autoplaySpeed ?? 4000
    const tick = 50
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    progressIntervalRef.current = setInterval(() => {
      setProgressWidth(w => Math.min(w + (tick / speed) * 100, 100))
    }, tick)
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current) }
  }, [current, autoplay, autoplaySpeed, count])

  // Keyboard navigation
  useEffect(() => {
    if (count < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, count])

  // Scroll past the hero section on click
  const handleScrollDown = useCallback(() => {
    const section = rootRef.current?.closest('section') ?? rootRef.current
    if (!section) return
    const bottom = section.getBoundingClientRect().bottom + window.scrollY
    window.scrollTo({ top: bottom, behavior: 'smooth' })
  }, [])

  if (!slides?.length) return null

  return (
    <div
      ref={rootRef}
      className={cn('w-full', className)}
      role="region"
      aria-label={title || 'Hero slideshow'}
      aria-roledescription="carousel"
    >
      {/* Screen-reader live region announces slide changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {slides[current]?.title
          ? `Slide ${current + 1} of ${count}: ${slides[current].title}`
          : `Slide ${current + 1} of ${count}`}
      </div>

      {/* Optional above-slider section title */}
      {title && (
        <h2 className="mb-6 px-4 text-2xl font-bold text-brand-primary">{title}</h2>
      )}

      <div className="relative w-full overflow-hidden">
        {/* Autoplay progress bar */}
        {autoplay && count > 1 && (
          <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/20" aria-hidden="true">
            <div
              className="hero-progress-fill h-full bg-primary"
              style={{ '--progress': `${progressWidth}%` } as React.CSSProperties}
            />
          </div>
        )}

        {/* Slide track */}
        <div
          className="hero-slide-track flex"
          style={{ '--slide-index': current } as React.CSSProperties}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
            touchStartX.current = null
          }}
        >
          {slides.map((slide: Slide, i) => {
            const s = slide as any
            const pos: string = s.overlayPosition ?? 'bottom-left'
            const strength: string = s.overlayStrength ?? 'medium'
            const tag = s.headingTag
            const HeadingTag = (tag === 'h1' || tag === 'h2' || tag === 'h3' ? tag : 'h2') as 'h1' | 'h2' | 'h3'
            const hasDescription = slide.description && !isRichTextEmpty(slide.description)
            const hasSlideContent = !!(slide.title || hasDescription || slide.enableLink || s.eyebrow)
            const hasContent = hasSlideContent || showScrollIndicator
            const gradientClass = OVERLAY_GRADIENT[pos]?.[strength] ?? OVERLAY_GRADIENT['bottom-left'].medium
            const image = isMobile && s.mobileImage ? s.mobileImage : slide.image

            return (
              <div
                key={i}
                className="relative min-w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={slide.title ? `Slide ${i + 1}: ${slide.title}` : `Slide ${i + 1} of ${count}`}
                aria-hidden={i !== current ? 'true' : undefined}
              >
                {/* Full-viewport background image — fill mode positions img absolutely inside the frame */}
                <div className="hero-slide-frame w-full">
                  <Media
                    resource={image}
                    fill
                    htmlElement={null}
                    imgClassName="object-cover"
                    priority={i === 0}
                    alt={s.imageAlt || undefined}
                  />
                </div>

                {/* Gradient overlay — only rendered when there is slide content to ensure text readability */}
                {hasSlideContent && (
                  <div className={cn('absolute inset-0', gradientClass)} aria-hidden="true" />
                )}

                {/* Content — only mounted on active slide so CSS animation fires on entry */}
                {hasContent && i === current && (
                  <div
                    className={cn(
                      'absolute inset-0 flex',
                      OVERLAY_ALIGN[pos] ?? OVERLAY_ALIGN['bottom-left'],
                      OVERLAY_PAD[pos] ?? OVERLAY_PAD['bottom-left'],
                    )}
                  >
                    <div
                      className={cn(
                        'hero-slide-content flex flex-col gap-4',
                        TEXT_ALIGN[pos] ?? TEXT_ALIGN['bottom-left'],
                        pos === 'center' ? 'items-center max-w-3xl' : 'max-w-2xl',
                      )}
                    >
                      {/* Eyebrow label */}
                      {s.eyebrow && (
                        <span className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase text-white/80">
                          <span className="w-6 h-px bg-primary shrink-0" aria-hidden="true" />
                          {s.eyebrow}
                        </span>
                      )}

                      {/* Main heading — font size via .hero-heading CSS class */}
                      {slide.title && (
                        <HeadingTag className="hero-heading font-extrabold text-white text-balance">
                          {slide.title}
                        </HeadingTag>
                      )}

                      {/* Description */}
                      {slide.description && (
                        <div className="hero-description text-white/90 [&_*]:text-white/90 max-w-xl">
                          <RichText data={slide.description} enableGutter={false} enableProse={false} />
                        </div>
                      )}

                      {/* CTA */}
                      {slide.enableLink && slide.link && (
                        <div
                          className={cn(
                            'flex flex-wrap gap-3 mt-2',
                            pos !== 'bottom-left' && 'justify-center',
                          )}
                        >
                          <CMSLink
                            {...slide.link}
                            appearance={slide.link.appearance ?? 'default'}
                          />
                        </div>
                      )}

                      {/* Scroll indicator — sits below the CTA in content flow */}
                      {showScrollIndicator && (
                        <button
                          type="button"
                          onClick={handleScrollDown}
                          className="self-center flex flex-col items-center gap-1.5 text-white/60 hero-scroll-indicator hover:text-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:text-white mt-2"
                          aria-label="Scroll to next section"
                        >
                          <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
                          <span className="animate-bounce">
                            <IconChevronDown />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Prev / Next arrows */}
        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 hover:bg-black/65 fine-hover:hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <IconChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 hover:bg-black/65 fine-hover:hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <IconChevronRight />
            </button>
          </>
        )}

        {/* Slide counter */}
        {count > 1 && (
          <div
            aria-hidden="true"
            className="absolute bottom-6 right-6 z-20 font-mono text-xs tracking-widest text-white/55 select-none"
          >
            {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(count).padStart(2, '0')}
          </div>
        )}

        {/* Bottom-centre dots */}
        {showDots && count > 1 && (
          <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2" role="tablist" aria-label="Slide indicators">
            {slides.map((_: Slide, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === current ? 'true' : 'false'}
                className={cn(
                  'h-2 rounded-full transition-[width,background-color] duration-300',
                  i === current
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/70',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
