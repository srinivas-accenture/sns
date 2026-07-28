'use client'

import type { EventsBlock as EventsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { AnimateIn } from '@/components/AnimateIn'
import React, { useState } from 'react'

type EventItem = NonNullable<EventsBlockProps['events']>[0]

const badgeColors: Record<string, { background: string; color: string }> = {
  blue:   { background: '#2563eb', color: '#fff' },
  green:  { background: '#16a34a', color: '#fff' },
  purple: { background: '#9333ea', color: '#fff' },
  orange: { background: '#e07800', color: '#fff' },
  red:    { background: '#dc2626', color: '#fff' },
  gray:   { background: '#6b7280', color: '#fff' },
}

const ICON_SM: React.CSSProperties = { width: '0.875rem', height: '0.875rem', display: 'inline-block', flexShrink: 0, verticalAlign: 'middle' }
const ICON_MD: React.CSSProperties = { width: '1rem', height: '1rem', display: 'inline-block', flexShrink: 0, verticalAlign: 'middle' }

const ClockIcon = () => (
  <svg style={ICON_SM} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
)

const MapPinIcon = () => (
  <svg style={ICON_SM} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CopyIcon = () => (
  <svg style={ICON_MD} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg style={ICON_MD} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="20 6 9 20 4 15" strokeLinecap="round" />
  </svg>
)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getUTCDate(),
    month: d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    year: d.getUTCFullYear(),
  }
}


const EventTile: React.FC<{ event: EventItem }> = ({ event }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const parts: string[] = [event.title]
    if (event.date) {
      const { day, month, year } = formatDate(event.date)
      parts.push(`${day} ${month} ${year}`)
    }
    if (event.time) parts.push(event.time)
    if (event.location) parts.push(event.location)
    if (event.mapUrl) parts.push(event.mapUrl)
    navigator.clipboard.writeText(parts.join(' · ')).then(() => {
      setCopied(true)
      const id = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(id)
    }).catch(() => {})
  }

  const { day, month, year } = event.date ? formatDate(event.date) : { day: '—', month: '—', year: '' }
  const badgeStyle = badgeColors[event.categoryColor ?? 'blue'] ?? badgeColors.blue!

  return (
    <div
      className="rounded-2xl border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-300 fine-hover:hover:shadow-lg fine-hover:hover:-translate-y-0.5"
      style={{ display: 'flex', flexDirection: 'column', padding: '1rem', height: '100%' }}
    >
      {/* Top: date badge + title/description + copy */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {/* Date badge */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0,
          width: '3.25rem', background: '#1d4ed8', color: '#ffffff',
          borderRadius: '0.5rem', padding: '0.4rem 0.25rem',
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>{day}</span>
          <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.08em', marginTop: '0.1rem' }}>{month}</span>
          <span style={{ fontSize: '0.55rem', fontWeight: 500, opacity: 0.7, marginTop: '0.15rem', letterSpacing: '0.04em' }}>{year}</span>
        </div>

        {/* Title + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 600, lineHeight: 1.35, fontSize: '0.9375rem' }} className="text-foreground">
            {event.title}
          </p>
          {event.description && (
            <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem', lineHeight: 1.45 }} className="text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy event details"
          className="shrink-0 rounded p-1 text-muted-foreground/40 hover:text-foreground transition-colors"
          aria-label="Copy event details"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '0.75rem 0' }} />

      {/* Footer: time/location stacked + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem' }} className="text-muted-foreground">
          {event.time && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ClockIcon />{event.time}
            </span>
          )}
          {event.location && (
            event.mapUrl ? (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                className="hover:text-foreground transition-colors"
              >
                <MapPinIcon />{event.location}
              </a>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPinIcon />{event.location}
              </span>
            )
          )}
        </div>

        {event.category && (
          <span
            style={{ ...badgeStyle, padding: '0.25rem 0.75rem', fontSize: '0.7rem', borderRadius: '100px', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {event.category}
          </span>
        )}
      </div>
    </div>
  )
}

type Props = EventsBlockProps & { className?: string }

export const EventsBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  backgroundColor,
  events,
}) => {
  if (!events?.length) return null

  return (
    <div
      className={cn('cms-bg w-full', className)}
      style={backgroundColor ? ({ '--cms-bg': backgroundColor } as React.CSSProperties) : undefined}
    >
      <div className="container py-20 lg:py-[7.5rem]">
        {(title || subtitle) && (
          <AnimateIn variant="fade-up">
            <div className="mb-10">
              {title && <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>}
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </AnimateIn>
        )}

        <div className="events-grid">
          {events.map((event, i) => (
            <AnimateIn key={i} variant="fade-up" delay={Math.min(i, 4) * 150}>
              <EventTile event={event} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}
