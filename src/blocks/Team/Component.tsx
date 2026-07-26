'use client'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { cn } from '@/utilities/ui'
import { AnimateIn } from '@/components/AnimateIn'
import React, { useState } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Member = NonNullable<TeamBlockProps['members']>[number]

// Extend with new fields until generate:types catches up
type Props = TeamBlockProps & {
  className?: string
  disableInnerContainer?: boolean
  topContent?: DefaultTypedEditorState | null
  bottomContent?: DefaultTypedEditorState | null
  otherMembersTitle?: string | null
}

const COLOR_COUNT = 8

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/* ── Social icons ────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const WebsiteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-5 w-5"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const SocialIcon: Record<string, React.FC> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  github: GitHubIcon,
  website: WebsiteIcon,
}

const socialLabel: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  github: 'GitHub',
  website: 'Website',
}

/* ── Main portrait card (first 4 members) ────────────────── */
function MainMemberCard({ member, index }: { member: Member; index: number }) {
  const [flipped, setFlipped] = useState(false)

  const name = member.name ?? ''
  const initials = getInitials(name)
  const colorIndex = index % COLOR_COUNT
  const hasBioOrLinks = member.bio || (member.socialLinks && member.socialLinks.length > 0)

  return (
    <div className="team-main-card" data-color={colorIndex}>
      <div className={cn('team-main-card-inner', flipped && 'is-flipped')}>
        {/* Front — large portrait photo */}
        <button
          type="button"
          className="team-main-card-face team-main-card-front"
          onClick={() => hasBioOrLinks && setFlipped(true)}
          aria-label={hasBioOrLinks ? `View bio for ${name}` : name}
          style={!hasBioOrLinks ? { cursor: 'default' } : undefined}
        >
          <div className="team-main-photo">
            {member.photo ? (
              <Media resource={member.photo} imgClassName="h-full w-full object-cover object-top" />
            ) : (
              <div className="team-main-avatar">{initials}</div>
            )}
          </div>
          <div className="team-main-overlay">
            <p className="team-main-member-name">{name}</p>
            {member.role && <p className="team-main-member-role">{member.role}</p>}
            {hasBioOrLinks && <span className="team-main-hint">Tap to learn more →</span>}
          </div>
        </button>

        {/* Back — bio + social */}
        <div className="team-main-card-face team-main-card-back" aria-hidden={!flipped}>
          <div className="team-card-accent" />
          <p className="font-bold text-foreground text-base leading-tight">{name}</p>
          {member.role && <p className="team-role-back">{member.role}</p>}

          {member.bio ? (
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 overflow-auto mt-1">
              {member.bio}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/50 italic flex-1 mt-1">No bio available.</p>
          )}

          {member.socialLinks && member.socialLinks.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              {member.socialLinks.map((link, j) => {
                const Icon = SocialIcon[link.platform ?? ''] ?? SocialIcon['website']!
                return (
                  <a
                    key={j}
                    href={link.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={socialLabel[link.platform ?? ''] ?? link.platform ?? ''}
                    className="team-social-link"
                  >
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="mt-3 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors self-end italic cursor-pointer bg-transparent border-0 p-0"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Compact tile (remaining members) ────────────────────── */
function OtherMemberTile({ member, index }: { member: Member; index: number }) {
  const name = member.name ?? ''
  const colorIndex = index % COLOR_COUNT

  return (
    <div className="team-other-tile" data-color={colorIndex}>
      {member.photo && (
        <div className="team-other-avatar-img">
          <Media resource={member.photo} imgClassName="h-full w-full object-cover" />
        </div>
      )}
      <div>
        <p className="team-other-name">{name}</p>
        {member.role && <p className="team-other-role">{member.role}</p>}
      </div>
    </div>
  )
}

/* ── Main block export ───────────────────────────────────── */
export const TeamBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  topContent,
  bottomContent,
  otherMembersTitle,
  members,
}) => {
  if (!members?.length) return null

  const mainMembers = members.slice(0, 4)
  const otherMembers = members.slice(4)

  return (
    <div className={cn('container py-20 lg:py-[7.5rem]', className)}>
      {/* Section header */}
      {(title || subtitle) && (
        <AnimateIn variant="fade-up">
          <div className="mb-6">
            {title && <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>}
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
        </AnimateIn>
      )}

      {/* Top rich text */}
      {topContent && (
        <AnimateIn variant="fade-up">
          <RichText data={topContent} enableGutter={false} className="mb-10" />
        </AnimateIn>
      )}

      {/* Main members — large portrait grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {mainMembers.map((member, i) => (
          <AnimateIn key={member.id ?? i} variant="fade-up" delay={i * 120}>
            <MainMemberCard member={member} index={i} />
          </AnimateIn>
        ))}
      </div>

      {/* Other members section */}
      {otherMembers.length > 0 && (
        <div className="mb-10">
          {otherMembersTitle && (
            <AnimateIn variant="fade-up">
              <h3 className="text-xl font-semibold text-foreground mb-5">{otherMembersTitle}</h3>
            </AnimateIn>
          )}
          <div className="flex flex-wrap gap-3">
            {otherMembers.map((member, i) => (
              <AnimateIn key={member.id ?? i} variant="fade-up" delay={Math.min(i, 8) * 60}>
                <OtherMemberTile member={member} index={mainMembers.length + i} />
              </AnimateIn>
            ))}
          </div>
        </div>
      )}

      {/* Bottom rich text */}
      {bottomContent && (
        <AnimateIn variant="fade-up">
          <RichText data={bottomContent} enableGutter={false} className="mt-4" />
        </AnimateIn>
      )}
    </div>
  )
}
