'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Page } from '@/payload-types'
import { LANGUAGES } from '@/i18n/languages'

const LOCALE_CODES = LANGUAGES.map((l) => l.code)

const ARROW_APPEARANCES = new Set(['default', 'outline', 'link'])

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  onClick?: React.MouseEventHandler<HTMLElement>
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
  } | null
  showArrow?: boolean
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

function addLocale(path: string, locale: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  if (LOCALE_CODES.some((l) => path === `/${l}` || path.startsWith(`/${l}/`))) return path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick,
    reference,
    showArrow: showArrowProp,
    size: sizeFromProps,
    url,
  } = props

  const pathname = usePathname()
  const locale = LOCALE_CODES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  ) ?? 'en'

  const rawHref =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference?.relationTo !== 'pages'
        ? `/${reference.relationTo}/${reference.value.slug}`
        : reference.value.slug === 'home'
          ? '/'
          : `/${reference.value.slug}`
      : url

  const href = rawHref ? addLocale(rawHref, locale) : null

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const showArrow = showArrowProp ?? ARROW_APPEARANCES.has(appearance ?? '')

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild showArrow={false} className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
        {showArrow && size !== 'icon' && (
          <span
            className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        )}
      </Link>
    </Button>
  )
}
