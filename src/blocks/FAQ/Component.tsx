'use client'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

import { Media } from '@/components/Media'

type Props = FAQBlockProps & { className?: string; disableInnerContainer?: boolean }

function FAQItem({ question, answer }: { question: string; answer: any }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-semibold"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        >
          ▼
        </span>
      </button>

      <div className={cn('faq-answer', open && 'faq-open')}>
        <div className="faq-answer-inner">
          <div className="mt-4 text-muted-foreground">
            <RichText data={answer} enableGutter={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const FAQBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  items,
  image,
  imagePosition = 'left',
  backgroundColor,
}) => {
  if (!items?.length) return null

  const hasImage = Boolean(image)

  const header = (title || subtitle) ? (
    <div className={cn('mb-8', !hasImage && 'text-center')}>
      {title && <h2 className="text-3xl font-bold lg:text-4xl text-brand-primary">{title}</h2>}
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  ) : null

  const accordion = (
    <div>
      {items.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  )

  return (
    <div
      className={cn('cms-bg w-full', className)}
      style={backgroundColor ? { '--cms-bg': backgroundColor } as React.CSSProperties : undefined}
    >
      <div className="container py-20 lg:py-[7.5rem]">
        {hasImage ? (
          <div className="flex flex-col gap-10 md:flex-row md:items-start lg:gap-16">
            {imagePosition === 'left' && (
              <div className="w-full shrink-0 md:w-[45%] md:sticky md:top-24 md:self-center">
                <Media resource={image} imgClassName="w-full rounded-xl object-cover" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {header}
              {accordion}
            </div>

            {imagePosition === 'right' && (
              <div className="w-full shrink-0 md:w-[45%] md:sticky md:top-24 md:self-center">
                <Media resource={image} imgClassName="w-full rounded-xl object-cover" />
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {header}
            {accordion}
          </div>
        )}
      </div>
    </div>
  )
}
