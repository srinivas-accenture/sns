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
  }
}


const EventTile: React.FC<{ event: EventItem }> = ({ event }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const parts: string[] = [event.title]
    if (event.date) {
      const { day, month } = formatDate(event.date)
      parts.push(`${day} ${month}`)
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

  const { day, month } = event.date ? formatDate(event.date) : { day: '—', month: '—' }
  const badgeStyle = badgeColors[event.categoryColor ?? 'blue'] ?? badgeColors.blue!

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-md transition-[transform,box-shadow] duration-300 fine-hover:hover:shadow-xl fine-hover:hover:-translate-y-1" style={{ height: '100%' }}>
      {/* Top row: date + title + copy */}
      <div className="flex items-start gap-3">
        <div
          className="flex shrink-0 flex-col items-center rounded-lg"
          style={{ width: '3.25rem', background: '#1d4ed8', color: '#ffffff', padding: '0.5rem 0' }}
        >
          <span style={{ fontSize: '1.375rem', fontWeight: 800, lineHeight: 1 }}>{day}</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.9, marginTop: '0.125rem' }}>{month}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground leading-snug">{event.title}</p>
          {event.description && (
            <p className="mt-0.5 text-sm text-muted-foreground leading-snug line-clamp-2">{event.description}</p>
          )}
        </div>

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

      {/* Bottom row: meta + badge */}
      <div className="mt-3 flex items-center justify-between" style={{ gap: '0.5rem' }}>
        <div className="flex flex-wrap items-center text-xs text-muted-foreground" style={{ gap: '0.6rem' }}>
          {event.time && (
            <span className="flex items-center gap-1">
              <ClockIcon />
              {event.time}
            </span>
          )}

          {event.location && (
            event.mapUrl ? (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <MapPinIcon />
                {event.location}
              </a>
            ) : (
              <span className="flex items-center gap-1">
                <MapPinIcon />
                {event.location}
              </span>
            )
          )}
        </div>

        {event.category && (
          <span
            className="rounded-full font-semibold whitespace-nowrap shrink-0"
            style={{ ...badgeStyle, padding: '0.25rem 0.75rem', fontSize: '0.7rem' }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
