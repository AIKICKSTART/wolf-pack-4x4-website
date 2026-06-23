"use client"

import type { CSSProperties, ReactNode } from "react"

import { CoachMark } from "../help-docs/coach-mark"
import {
  TONE_VAR,
  type TooltipAlign,
  type TooltipDirection,
  type TourTone,
} from "./tour-types"
import styles from "./tooltip-preview-overlay.module.css"

interface TooltipPreviewOverlayProps {
  /** Title used by the tooltip surface. */
  title: string
  body: string
  /** Tooltip direction relative to the sample target. */
  direction: TooltipDirection
  /** Edge alignment of the tooltip. */
  align?: TooltipAlign
  /** Tone hint — drives accent. */
  tone?: TourTone
  /** Optional close-CTA toggle. */
  showCloseCta?: boolean
  /** Optional primary label. */
  ctaLabel?: string
  /** Sample target content drawn inside the preview frame. */
  sampleTarget?: ReactNode
  /** Optional caption above the preview. */
  caption?: string
  className?: string
}

export function TooltipPreviewOverlay({
  title,
  body,
  direction,
  align = "center",
  tone = "teal",
  showCloseCta = true,
  ctaLabel = "Got it",
  sampleTarget,
  caption,
  className,
}: TooltipPreviewOverlayProps) {
  const classes = [styles.frame, className].filter(Boolean).join(" ")

  return (
    <figure
      className={classes}
      style={{ "--preview-tone": TONE_VAR[tone] } as CSSProperties}
      aria-label={`Tooltip preview — ${title}, anchored ${direction}`}
    >
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}

      <div className={styles.stage}>
        <div className={styles.target} data-tour="preview-target">
          {sampleTarget ?? (
            <div className={styles.targetDemo}>
              <span className={styles.targetGlyph} aria-hidden="true">★</span>
              <div className={styles.targetLines}>
                <span className={styles.targetLineMuted} />
                <span className={styles.targetLineStrong} />
                <span className={styles.targetLineMuted} />
              </div>
            </div>
          )}
        </div>

        <div
          className={[styles.markWrap, styles[`mark_${direction}`], styles[`mark_align_${align}`]]
            .filter(Boolean)
            .join(" ")}
        >
          <CoachMark
            title={title}
            body={body}
            placement={direction}
            primaryLabel={ctaLabel}
            secondaryLabel={showCloseCta ? "Close" : undefined}
            onPrimary={() => undefined}
            onSecondary={showCloseCta ? () => undefined : undefined}
          />
        </div>
      </div>
    </figure>
  )
}

export default TooltipPreviewOverlay
