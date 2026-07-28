'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ThemeToggle } from './ThemeToggle'
import { LocaleToggle, LocaleToggleInline } from '@/components/LocaleToggle'
import { MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

function hexToRgba(color: string, alpha: number): string {
  const hex = color.startsWith('#') ? color : null
  if (!hex || hex.length < 7) return color
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  const bgColor = data.backgroundColor || '#3C1500'
  const logoMedia = data?.logo && typeof data.logo === 'object' ? (data.logo as Media) : null

  return (
    <header
      ref={headerRef}
      suppressHydrationWarning
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled && 'shadow-lg backdrop-blur-md',
      )}
      style={{
        backgroundColor: scrolled ? hexToRgba(bgColor, 0.88) : bgColor,
      }}
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      {/* ── Main bar ── */}
      <div className="container flex h-20 items-center gap-4">
        {/* Logo + optional site name text */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 shrink-0 mr-4"
          aria-label="Home"
        >
          {logoMedia?.url ? (
            <img
              src={logoMedia.url}
              alt={logoMedia.alt ?? 'Site logo'}
              className="w-[75px] h-[75px] object-contain flex-shrink-0"
              loading="eager"
            />
          ) : (
            <Logo />
          )}
          {data.logoText && (
            <span className="text-white font-semibold text-base leading-tight max-w-[140px] whitespace-pre-line">
              {data.logoText}
            </span>
          )}
        </Link>

        {/* Desktop nav — centered, hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <HeaderNav data={data} />
        </div>

        {/* Desktop-only icons (hidden on mobile — they appear in the drawer instead) */}
        <div className="hidden md:flex items-center gap-1 ml-0">
          <LocaleToggle />
          <ThemeToggle />
        </div>

        {/* Hamburger — mobile only, far right */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto p-2 md:hidden text-white hover:text-white transition-colors rounded hover:bg-white/10"
        >
          {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile slide-down panel ── */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden w-full border-t border-white/10 overflow-hidden transition-[max-height,padding] duration-300',
          mobileOpen ? 'max-h-[40rem] py-3' : 'max-h-0 py-0',
        )}
        style={{ backgroundColor: scrolled ? hexToRgba(bgColor, 0.95) : bgColor }}
        aria-live="polite"
      >
        <div className="container space-y-1">
          <HeaderNav data={data} mobile onLinkClick={() => setMobileOpen(false)} />

          {/* Utility row — locale / theme */}
          <div className="flex items-center gap-2 border-t border-white/10 pt-3 mt-1 px-1">
            <div className="ml-auto flex items-center gap-2">
              <LocaleToggleInline onSelect={() => setMobileOpen(false)} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
