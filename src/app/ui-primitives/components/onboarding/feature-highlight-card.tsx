"use client"

import type { ReactNode } from "react"

import styles from "./feature-highlight-card.module.css"

export type FeatureHighlightAccent = "red" | "amber" | "teal" | "green"

interface FeatureHighlightCardProps {
  /** Animated kicker chip text, e.g. "New". */
  kicker: string
  /** Big headline. */
  headline: string
  /** Supporting body copy. */
  body: string
  /** Label for the primary "try it" CTA. */
  tryLabel?: string
  /** href for the CTA, prefer over onTry. */
  href?: string
  /** Click handler if no href provided. */
  onTry?: () => void
  /** Optional dismiss handler. */
  onDismiss?: () => void
  /** Dismiss accessibility label. */
  dismissAriaLabel?: string
  accent?: FeatureHighlightAccent
  /** Optional illustration / icon slot. */
  illustration?: ReactNode
  className?: string
}

const ACCENT_CLASS: Record<FeatureHighlightAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export function FeatureHighlightCard({
  kicker,
  headline,
  body,
  tryLabel = "Try it",
  href,
  onTry,
  onDismiss,
  dismissAriaLabel = "Dismiss feature highlight",
  accent = "amber",
  illustration,
  className,
}: FeatureHighlightCardProps) {
  const classes = [styles.card, ACCENT_CLASS[accent], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={headline}>
      <header className={styles.head}>
        <span className={styles.kickerChip}>
          <span className={styles.kickerPulse} aria-hidden="true" />
          {kicker}
        </span>
        {onDismiss ? (
          <button
            type="button"
            className={styles.dismiss}
            onClick={onDismiss}
            aria-label={dismissAriaLabel}
          >
            <svg viewBox="0 0 16 16" width="12" height="12">
              <path
                d="M4 4 L12 12 M12 4 L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </header>
      <div className={styles.body}>
        {illustration ? (
          <span className={styles.illustration} aria-hidden="true">
            {illustration}
          </span>
        ) : null}
        <div className={styles.copy}>
          <h3 className={styles.headline}>{headline}</h3>
          <p className={styles.text}>{body}</p>
        </div>
      </div>
      <footer className={styles.foot}>
        {href ? (
          <a className={styles.tryCta} href={href}>
            {tryLabel}
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <button type="button" className={styles.tryCta} onClick={onTry}>
            {tryLabel}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </footer>
    </article>
  )
}

export default FeatureHighlightCard
