"use client"

import type { ReactNode } from "react"

import styles from "./tour-invitation-card.module.css"

export interface TourInvitationThumbnailStop {
  /** Short stop label that appears on the thumbnail rail. */
  label: string
  /** Single-character glyph. */
  glyph: string
}

interface TourInvitationCardProps {
  /** Eyebrow label. */
  kicker: string
  /** Headline, e.g. "Walk the Oak Flats workshop in 90 seconds". */
  title: string
  /** Supporting paragraph. */
  body: string
  /** Duration chip text. */
  duration: string
  /** Ordered list of tour stops shown on the thumbnail rail. */
  stops: ReadonlyArray<TourInvitationThumbnailStop>
  /** Label for the primary "start tour" CTA. */
  startLabel?: string
  /** Click handler for the start CTA. */
  onStart?: () => void
  /** Optional href instead of onClick. */
  startHref?: string
  /** Label for the dismiss link. */
  dismissLabel?: string
  /** Click handler for the dismiss link. */
  onDismiss?: () => void
  /** Custom trailing slot rendered next to the CTAs (e.g. small icon). */
  trailing?: ReactNode
  className?: string
}

export function TourInvitationCard({
  kicker,
  title,
  body,
  duration,
  stops,
  startLabel = "Start tour",
  onStart,
  startHref,
  dismissLabel = "Maybe later",
  onDismiss,
  trailing,
  className,
}: TourInvitationCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <div className={styles.thumbnail} aria-hidden="true">
        <span className={styles.thumbnailGlow} />
        <ol className={styles.stops}>
          {stops.map((stop, index) => (
            <li key={`${stop.label}-${index}`} className={styles.stop}>
              <span className={styles.stopGlyph}>{stop.glyph}</span>
              <span className={styles.stopLabel}>{stop.label}</span>
              {index < stops.length - 1 ? (
                <span className={styles.stopConnector} />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          <span className={styles.duration}>
            <span aria-hidden="true">◷</span> {duration}
          </span>
        </header>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{body}</p>
        <footer className={styles.foot}>
          {startHref ? (
            <a className={styles.startCta} href={startHref}>
              {startLabel}
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <button type="button" className={styles.startCta} onClick={onStart}>
              {startLabel}
              <span aria-hidden="true">→</span>
            </button>
          )}
          <button type="button" className={styles.dismissLink} onClick={onDismiss}>
            {dismissLabel}
          </button>
          {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
        </footer>
      </div>
    </section>
  )
}

export default TourInvitationCard
