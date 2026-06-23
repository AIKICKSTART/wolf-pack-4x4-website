"use client"

import type { CSSProperties, ReactNode } from "react"

import { Reveal } from "../motion/reveal"
import { Chip } from "../primitives/chip"
import {
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  type TourTone,
} from "./tour-types"
import styles from "./feature-hint-spotlight.module.css"

interface FeatureHintSpotlightProps {
  /** Badge copy e.g. "What's new", "Beta", "Just shipped". */
  badge?: string
  title: string
  body: string
  /** Optional CTA label. */
  ctaLabel?: string
  /** Optional click handler. */
  onCta?: () => void
  /** Optional dismiss handler — renders the small dismiss button. */
  onDismiss?: () => void
  /** Optional decoration glyph inside the halo. */
  glyph?: ReactNode
  tone?: TourTone
  className?: string
}

export function FeatureHintSpotlight({
  badge = "What's new",
  title,
  body,
  ctaLabel,
  onCta,
  onDismiss,
  glyph = "✨",
  tone = "violet",
  className,
}: FeatureHintSpotlightProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <Reveal as="section" from="below" className={classes}>
      <div
        className={styles.card}
        style={{ "--hint-tone": TONE_VAR[tone] } as CSSProperties}
        role="region"
        aria-label={`${badge}: ${title}`}
      >
        <span className={styles.halo} aria-hidden="true">
          <span className={styles.haloRing} />
          <span className={styles.haloRingDelayed} />
          <span className={styles.glyph}>{glyph}</span>
        </span>

        <div className={styles.body}>
          <span className={styles.badge}>
            <Chip label={badge} tone={TOUR_TONE_TO_CHIP[tone]} />
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.copy}>{body}</p>
          {ctaLabel ? (
            <button type="button" className={styles.cta} onClick={onCta}>
              {ctaLabel}
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>

        {onDismiss ? (
          <button
            type="button"
            className={styles.dismiss}
            aria-label="Dismiss feature hint"
            onClick={onDismiss}
          >
            ×
          </button>
        ) : null}
      </div>
    </Reveal>
  )
}

export default FeatureHintSpotlight
