"use client"

import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import {
  STEP_SHAPE_LABEL,
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  type TourStepShape,
  type TourTone,
} from "./tour-types"
import styles from "./tour-step-thumbnail.module.css"

interface TourStepThumbnailProps {
  index: number
  title: string
  excerpt: string
  shape: TourStepShape
  /** Optional CSS-selector hint shown as code text. */
  targetSelector?: string
  /** Optional delay copy e.g. "Auto in 1.5s". */
  delayLabel?: string
  tone?: TourTone
  selected?: boolean
  onClick?: () => void
  className?: string
}

const SHAPE_GLYPH: Record<TourStepShape, string> = {
  tooltip: "◉",
  modal: "▣",
  spotlight: "◎",
  hint: "✦",
  announcement: "✉",
}

export function TourStepThumbnail({
  index,
  title,
  excerpt,
  shape,
  targetSelector,
  delayLabel,
  tone = "teal",
  selected = false,
  onClick,
  className,
}: TourStepThumbnailProps) {
  const classes = [
    styles.thumb,
    selected ? styles.selected : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      style={{ "--thumb-tone": TONE_VAR[tone] } as CSSProperties}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Step ${index}: ${title}`}
    >
      <span className={styles.index} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <span className={styles.glyph} aria-hidden="true">
        {SHAPE_GLYPH[shape]}
      </span>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.excerpt}>{excerpt}</span>
        <div className={styles.meta}>
          <Chip label={STEP_SHAPE_LABEL[shape]} tone={TOUR_TONE_TO_CHIP[tone]} />
          {delayLabel ? <span className={styles.metaTag}>{delayLabel}</span> : null}
        </div>
        {targetSelector ? (
          <code className={styles.selector}>{targetSelector}</code>
        ) : null}
      </div>
    </button>
  )
}

export default TourStepThumbnail
