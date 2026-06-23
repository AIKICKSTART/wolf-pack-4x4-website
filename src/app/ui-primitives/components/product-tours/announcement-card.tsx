"use client"

import { X } from "lucide-react"
import Image from "next/image"
import type { CSSProperties } from "react"

import { GlassSurface } from "../surfaces/glass-surface"
import { Chip } from "../primitives/chip"
import {
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  type TourTone,
} from "./tour-types"
import styles from "./announcement-card.module.css"

interface AnnouncementCardProps {
  /** Small kicker e.g. "What's new · 14 May". */
  kicker?: string
  title: string
  body: string
  /** Optional image URL. */
  imageSrc?: string
  /** Optional alt text. Required when imageSrc set. */
  imageAlt?: string
  /** Optional CTA label. */
  ctaLabel?: string
  /** Optional CTA click handler. */
  onCta?: () => void
  /** Optional dismiss handler — renders × button when set. */
  onDismiss?: () => void
  tone?: TourTone
  /** When true, render a compact one-line announcement bar instead of a card. */
  compact?: boolean
  className?: string
}

export function AnnouncementCard({
  kicker,
  title,
  body,
  imageSrc,
  imageAlt = "",
  ctaLabel,
  onCta,
  onDismiss,
  tone = "amber",
  compact = false,
  className,
}: AnnouncementCardProps) {
  const classes = [
    styles.card,
    compact ? styles.compact : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <GlassSurface
      tone={tone === "amber" ? "amber" : "obsidian"}
      intensity="med"
      className={classes}
    >
      <div
        className={styles.layout}
        style={{ "--ann-tone": TONE_VAR[tone] } as CSSProperties}
        role="region"
        aria-label={title}
      >
        {!compact && imageSrc ? (
          <span className={styles.imageWrap}>
            <Image
              className={styles.image}
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="168px"
              loading="lazy"
            />
          </span>
        ) : null}

        <div className={styles.body}>
          {kicker ? (
            <span className={styles.kicker}>
              <Chip label={kicker} tone={TOUR_TONE_TO_CHIP[tone]} />
            </span>
          ) : null}
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
            aria-label="Dismiss announcement"
            onClick={onDismiss}
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </GlassSurface>
  )
}

export default AnnouncementCard
