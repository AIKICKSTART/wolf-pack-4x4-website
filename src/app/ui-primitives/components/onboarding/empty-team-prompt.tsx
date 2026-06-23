"use client"

import styles from "./empty-team-prompt.module.css"

interface EmptyTeamPromptProps {
  /** Eyebrow label, e.g. "Team". */
  kicker?: string
  /** Headline. */
  title: string
  /** Body / explainer copy. */
  body: string
  /** Primary "invite team" CTA label. */
  inviteLabel?: string
  /** Primary CTA href. */
  inviteHref?: string
  /** Click handler used when no href provided. */
  onInvite?: () => void
  /** Secondary CTA label, e.g. "Import from CSV". */
  secondaryLabel?: string
  /** Secondary CTA href. */
  secondaryHref?: string
  /** Click handler for the secondary CTA. */
  onSecondary?: () => void
  /** ARIA label for the surface. */
  ariaLabel?: string
  className?: string
}

export function EmptyTeamPrompt({
  kicker = "Team",
  title,
  body,
  inviteLabel = "Invite team members",
  inviteHref,
  onInvite,
  secondaryLabel = "Import from CSV",
  secondaryHref,
  onSecondary,
  ariaLabel,
  className,
}: EmptyTeamPromptProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={ariaLabel ?? title}>
      <figure className={styles.illustration} aria-hidden="true">
        <svg viewBox="0 0 240 140" width="100%" height="100%">
          <defs>
            <linearGradient id="emptyTeamBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
          </defs>
          <rect
            x="14"
            y="14"
            width="212"
            height="112"
            rx="14"
            fill="url(#emptyTeamBg)"
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="6 5"
          />
          <g transform="translate(70, 50)">
            <circle cx="14" cy="14" r="14" fill="#1c1f29" stroke="#3a3d4a" />
            <path d="M0 44 C 0 28, 28 28, 28 44 Z" fill="#1c1f29" stroke="#3a3d4a" />
          </g>
          <g transform="translate(112, 38)" opacity="0.85">
            <circle cx="16" cy="16" r="16" fill="#2a1418" stroke="#a8141a" />
            <path d="M0 50 C 0 32, 32 32, 32 50 Z" fill="#2a1418" stroke="#a8141a" />
          </g>
          <g transform="translate(160, 50)" opacity="0.7">
            <circle cx="14" cy="14" r="14" fill="#1a1c14" stroke="#a07f17" />
            <path d="M0 44 C 0 28, 28 28, 28 44 Z" fill="#1a1c14" stroke="#a07f17" />
          </g>
          <g transform="translate(112, 50)">
            <circle cx="16" cy="16" r="20" fill="none" stroke="rgba(255, 193, 79, 0.5)" strokeWidth="1.4" strokeDasharray="3 4" />
          </g>
          <text
            x="120"
            y="116"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.16em"
            fill="rgba(255,255,255,0.45)"
          >
            INVITE THE CREW
          </text>
        </svg>
      </figure>
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
        <div className={styles.ctas}>
          {inviteHref ? (
            <a className={styles.inviteCta} href={inviteHref}>
              <span aria-hidden="true">＋</span>
              {inviteLabel}
            </a>
          ) : (
            <button type="button" className={styles.inviteCta} onClick={onInvite}>
              <span aria-hidden="true">＋</span>
              {inviteLabel}
            </button>
          )}
          {secondaryHref ? (
            <a className={styles.secondaryCta} href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : (
            <button
              type="button"
              className={styles.secondaryCta}
              onClick={onSecondary}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default EmptyTeamPrompt
