'use client'

import type { EventsBlock as EventsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { AnimateIn } from '@/components/AnimateIn'
import React, { useEffect, useRef, useState } from 'react'

type EventItem = NonNullable<EventsBlockProps['events']>[0]

const badgeColorClass: Record<string, string> = {
  blue:   'bg-blue-600 text-white',
  green:  'bg-green-600 text-white',
  purple: 'bg-purple-600 text-white',
  orange: 'bg-brand-primary text-white',
  red:    'bg-red-600 text-white',
  gray:   'bg-gray-500 text-white',
}

const ClockIcon = () => (
  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CopyIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="20 6 9 20 4 15" strokeLinecap="round" />
  </svg>
)

const GoogleMapsIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const WazeIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.5 2C6.81 2 3 5.81 3 10.5c0 2.64 1.18 5 3.04 6.62L6 20l3.43-.86C10.27 19.37 11.38 19.5 11.5 19.5c4.69 0 8.5-3.81 8.5-8.5S16.19 2 11.5 2zm.5 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4h-2V7h2v4z" />
  </svg>
)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getUTCDate(),
    month: d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
  }
}

function buildWazeUrl(location: string, mapUrl?: string | null): string {
  if (mapUrl) {
    try {
      const url = new URL(mapUrl)
      const q = url.searchParams.get('q') || url.searchParams.get('query')
      if (q) return `https://waze.com/ul?q=${encodeURIComponent(q)}`
    } catch {}
  }
  return `https://waze.com/ul?q=${encodeURIComponent(location)}`
}

const EventTile: React.FC<{ event: EventItem }> = ({ event }) => {
  const [mapOpen, setMapOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMapOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mapOpen])

  const handleCopy = () => {
    const parts: string[] = [event.title]
    if (event.date) {
      const { day, month } = formatDate(event.date)
      parts.push(`${day} ${month}`)
    }
    if (event.time) parts.push(event.time)
    if (event.location) parts.push(event.location)
    navigator.clipboard.writeText(parts.join(' · ')).then(() => {
      setCopied(true)
      const id = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(id)
    }).catch(() => {})
  }

  const { day, month } = event.date ? formatDate(event.date) : { day: '—', month: '—' }
  const badgeClass = badgeColorClass[event.categoryColor ?? 'blue'] ?? badgeColorClass.blue
  const hasMap = Boolean(event.mapUrl || event.location)
  const wazeUrl = event.location ? buildWazeUrl(event.location, event.mapUrl) : null

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-md transition-[transform,box-shadow] duration-300 fine-hover:hover:shadow-xl fine-hover:hover:-translate-y-1">
      <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-blue-700 py-2 text-white">
        <span className="text-2xl font-extrabold leading-none">{day}</span>
        <span className="mt-0.5 text-xs font-semibold tracking-wider opacity-90">{month}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground leading-snug">{event.title}</p>
        {event.description && (
          <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{event.description}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {event.time && (
            <span className="flex items-center gap-1">
              <ClockIcon />
              {event.time}
            </span>
          )}

          {event.location && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMapOpen((v) => !v)}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                aria-label="View on map"
              >
                <MapPinIcon />
                {event.location}
              </button>

              {mapOpen && hasMap && (
                <div className="absolute left-0 top-full z-20 mt-1.5 min-w-[190px] overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
                  {event.mapUrl && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMapOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <GoogleMapsIcon />
                      Open in Google Maps
                    </a>
                  )}
                  {wazeUrl && (
                    <a
                      href={wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMapOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                    >
                      <WazeIcon />
                      Open in Waze
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        {event.category && (
          <span className={cn('rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap', badgeClass)}>
            {event.category}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy event details"
          className="rounded p-1.5 text-muted-foreground/40 hover:text-foreground transition-colors"
          aria-label="Copy event details"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
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

        <div className="flex flex-col gap-3">
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
