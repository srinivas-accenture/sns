'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface HeaderNavProps {
  data: HeaderType
  mobile?: boolean
  bgColor?: string
  onLinkClick?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  mobile = false,
  bgColor = '#3C1500',
  onLinkClick,
}) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (openIndex === null) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openIndex])

  const handleClose = () => {
    setOpenIndex(null)
    onLinkClick?.()
  }

  return (
    <nav ref={navRef} aria-label="Main navigation">
      <ul
        className={cn(
          'flex list-none m-0 p-0',
          mobile ? 'flex-col gap-0' : 'flex-row items-center gap-1',
        )}
      >
        {navItems.map((item, i) => {
          const subLinks = (item as any).subLinks || []
          const hasSubLinks = subLinks.length > 0
          const isOpen = openIndex === i

          if (!hasSubLinks) {
            return (
              <li key={i}>
                <CMSLink
                  {...item.link}
                  appearance="link"
                  showArrow={false}
                  className={cn(
                    'font-medium tracking-wide transition-colors duration-150 no-underline',
                    mobile
                      ? 'block w-full px-4 py-3 text-base text-white/80 hover:text-white hover:bg-white/10 rounded'
                      : 'px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded',
                  )}
                  onClick={onLinkClick}
                />
              </li>
            )
          }

          return (
            <li
              key={i}
              className={cn('relative', mobile && 'w-full')}
              onMouseEnter={() => !mobile && setOpenIndex(i)}
              onMouseLeave={() => !mobile && setOpenIndex(null)}
            >
              {/* Parent row: link text + chevron toggle */}
              <div className={cn('flex items-center', mobile && 'w-full')}>
                <CMSLink
                  {...item.link}
                  appearance="link"
                  showArrow={false}
                  className={cn(
                    'font-medium tracking-wide transition-colors duration-150 no-underline',
                    mobile
                      ? 'flex-1 px-4 py-3 text-base text-white/80 hover:text-white'
                      : 'px-3 py-2 text-sm text-white/80 hover:text-white',
                  )}
                  onClick={() => {
                    if (mobile) setOpenIndex(isOpen ? null : i)
                    else onLinkClick?.()
                  }}
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label="Toggle sub-menu"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    'flex items-center justify-center text-white/60 hover:text-white transition-colors',
                    mobile ? 'px-4 py-3' : 'pr-2 py-2',
                  )}
                >
                  <ChevronDownIcon
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
              </div>

              {/* Desktop: absolute dropdown panel */}
              {!mobile && (
                <ul
                  className={cn(
                    'absolute top-full left-0 z-50 mt-1 min-w-[200px] flex flex-col py-1 rounded-lg border border-black/10 shadow-xl transition-all duration-200 bg-white',
                    isOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none',
                  )}
                >
                  {subLinks.map(({ link: subLink }: any, j: number) => (
                    <li key={j}>
                      <CMSLink
                        {...subLink}
                        appearance="link"
                        showArrow={false}
                        className="block w-full px-4 py-2.5 text-sm text-black hover:bg-orange-500 hover:text-white transition-colors no-underline whitespace-nowrap"
                        onClick={handleClose}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* Mobile: inline accordion */}
              {mobile && (
                <ul
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-96' : 'max-h-0',
                  )}
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  {subLinks.map(({ link: subLink }: any, j: number) => (
                    <li key={j}>
                      <CMSLink
                        {...subLink}
                        appearance="link"
                        showArrow={false}
                        className="block w-full pl-8 pr-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors no-underline"
                        onClick={handleClose}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
