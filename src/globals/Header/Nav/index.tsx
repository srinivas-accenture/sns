'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface HeaderNavProps {
  data: HeaderType
  mobile?: boolean
  onLinkClick?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mobile = false, onLinkClick }) => {
  const navItems = data?.navItems || []

  return (
    <nav aria-label="Main navigation">
      <ul
        className={cn(
          'flex list-none m-0 p-0',
          mobile ? 'flex-col gap-0' : 'flex-row items-center gap-1',
        )}
      >
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
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
        ))}
      </ul>
    </nav>
  )
}
