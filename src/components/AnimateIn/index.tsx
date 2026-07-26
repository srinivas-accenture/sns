'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

type Variant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  // null = SSR / pre-mount (no animation class — element fully visible)
  // false = below fold, hidden, waiting for observer
  // true  = in viewport, visible
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in the initial viewport, skip animation entirely
    const rect = el.getBoundingClientRect()
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      setVisible(true)
      return
    }

    // Below fold — hide then reveal on scroll
    setVisible(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        visible === false && `animate-${variant}`,
        visible === true && 'animate-is-visible',
        className,
      )}
      style={
        visible === false && delay
          ? ({ '--animate-delay': `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  )
}
