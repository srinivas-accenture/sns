import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md',
        outline:
          'border-2 border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground',
        link:
          'text-brand-primary underline-offset-4 hover:underline p-0 h-auto rounded-none font-medium tracking-normal',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
      },
      size: {
        default: 'h-11 px-6 py-2.5 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10 rounded-full',
        clear: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const ARROW_VARIANTS = new Set(['default', 'outline', 'link'])

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  showArrow?: boolean
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  loading = false,
  showArrow,
  className,
  size,
  variant,
  children,
  disabled,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  const resolvedVariant = variant ?? 'default'
  const resolvedSize = size ?? 'default'
  const wantsArrow = showArrow ?? (ARROW_VARIANTS.has(resolvedVariant) && resolvedSize !== 'icon')

  const inner = loading && !asChild ? (
    <>
      <svg
        className="animate-spin size-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {children}
    </>
  ) : !asChild && wantsArrow ? (
    <>
      {children}
      <span
        className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </>
  ) : (
    children
  )

  return (
    <Comp
      data-slot="button"
      disabled={disabled || loading}
      aria-busy={loading && !asChild ? true : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export { Button, buttonVariants }
