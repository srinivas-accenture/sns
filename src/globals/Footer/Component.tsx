import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocale } from '@/utilities/getLocale'
import Link from 'next/link'
import React from 'react'

import type { TypedLocale } from 'payload'
import type { Footer as FooterType, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

const MapPinIcon = () => (
  <svg
    className="h-4 w-4 shrink-0 mt-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const ClockIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
)

export async function Footer() {
  const locale = await getLocale()
  const footerData = (await getCachedGlobal('footer', 1, locale as TypedLocale)()) as FooterType

  const navItems = footerData?.navItems || []
  const logoMedia =
    footerData?.logo && typeof footerData.logo === 'object' ? (footerData.logo as Media) : null

  const bgColor = footerData?.backgroundColor || '#0f172a'
  const year = new Date().getFullYear()
  const copyright = (footerData?.copyrightText || `© {year} All rights reserved.`).replace(
    '{year}',
    String(year),
  )

  const hasContact =
    footerData?.address || footerData?.phone || footerData?.email || footerData?.hours

  return (
    <footer className="mt-auto text-white" style={{ backgroundColor: bgColor }}>
      {/* ── Main columns ─────────────────────────────────────────────────────── */}
      <div className="container py-14 lg:py-16">
        <div className={`grid gap-10 ${hasContact ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center">
              {logoMedia?.url ? (
                <img
                  src={logoMedia.url}
                  alt={logoMedia.alt ?? 'Site logo'}
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
              ) : (
                <Logo />
              )}
            </Link>
            {footerData?.tagline && (
              <p className="text-sm leading-relaxed text-white/60 max-w-[260px]">
                {footerData.tagline}
              </p>
            )}
          </div>

          {/* Col 2 — Nav links */}
          {navItems.length > 0 && (
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {footerData?.navColumnLabel || 'Quick Links'}
              </h4>
              <nav>
                <ul className="flex flex-col gap-2.5">
                  {navItems.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink
                        {...link}
                        appearance="inline"
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-white"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Col 3 — Contact */}
          {hasContact && (
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {footerData?.contactColumnLabel || 'Contact Us'}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerData?.address && (
                  <li className="flex items-start gap-2.5 text-sm text-white/70">
                    <MapPinIcon />
                    <span>{footerData.address}</span>
                  </li>
                )}
                {footerData?.phone && (
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <PhoneIcon />
                    <a
                      href={`tel:${footerData.phone.replace(/\s/g, '')}`}
                      className="hover:text-white transition-colors"
                    >
                      {footerData.phone}
                    </a>
                  </li>
                )}
                {footerData?.email && (
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <MailIcon />
                    <a
                      href={`mailto:${footerData.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {footerData.email}
                    </a>
                  </li>
                )}
                {footerData?.hours && (
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <ClockIcon />
                    <span>{footerData.hours}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-center gap-2 py-5 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
