"use client"

import { Copy, Download, Scissors, Share2 } from "lucide-react"
import { useCallback, useId, useState } from "react"

import styles from "./clip-creator-card.module.css"
import type { ClipMoment } from "./live-broadcast-types"

interface ClipCreatorCardProps {
  moment: ClipMoment
  /** Default window in seconds (clamped 5..120). */
  initialWindow?: number
  /** Optional handler when window changes. */
  onWindowChange?: (next: number) => void
  /** Optional handler when share fires. */
  onShare?: (network: ClipShareTarget) => void
  /** Optional handler when copy fires. */
  onCopyLink?: () => void
  /** Optional handler when download fires. */
  onDownload?: () => void
  className?: string
}

export type ClipShareTarget = "facebook" | "instagram" | "x" | "youtube"

const WINDOW_PRESETS: ReadonlyArray<number> = [15, 30, 60, 90]

const SHARE_OPTIONS: ReadonlyArray<{ id: ClipShareTarget; label: string }> = [
  { id: "facebook", label: "FB" },
  { id: "instagram", label: "IG" },
  { id: "x", label: "X" },
  { id: "youtube", label: "YT" },
]

export function ClipCreatorCard({
  moment,
  initialWindow,
  onWindowChange,
  onShare,
  onCopyLink,
  onDownload,
  className,
}: ClipCreatorCardProps) {
  const headingId = useId()
  const seed = initialWindow ?? moment.windowSeconds
  const [windowSeconds, setWindowSeconds] = useState<number>(seed)

  const handleWindowChange = useCallback(
    (next: number) => {
      const clamped = Math.max(5, Math.min(120, next))
      setWindowSeconds(clamped)
      onWindowChange?.(clamped)
    },
    [onWindowChange]
  )

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-labelledby={headingId}>
      <div
        className={styles.poster}
        style={moment.posterSrc ? { backgroundImage: `url(${moment.posterSrc})` } : undefined}
      >
        <span className={styles.posterScrim} aria-hidden="true" />
        <span className={styles.posterLabel}>
          <Scissors size={11} strokeWidth={2.4} aria-hidden="true" />
          Clip moment
        </span>
        <span className={styles.posterTimestamp}>{moment.capturedAt}</span>
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>Moment clipper</span>
          <h3 id={headingId} className={styles.title}>{moment.label}</h3>
          <span className={styles.creator}>Captured by {moment.creator}</span>
        </header>

        <div className={styles.windowBlock}>
          <span className={styles.windowLabel}>Pre / post window</span>
          <div className={styles.preset} role="radiogroup" aria-label="Clip window in seconds">
            {WINDOW_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                role="radio"
                aria-checked={windowSeconds === preset}
                className={[styles.presetBtn, windowSeconds === preset ? styles.presetActive : ""].filter(Boolean).join(" ")}
                onClick={() => handleWindowChange(preset)}
              >
                {preset}s
              </button>
            ))}
          </div>
          <span className={styles.windowSummary}>
            <span className={styles.windowValue}>{windowSeconds}s</span>
            pre + post around anchor
          </span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.copy} onClick={onCopyLink}>
            <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
            Copy link
          </button>
          <button type="button" className={styles.download} onClick={onDownload}>
            <Download size={13} strokeWidth={2.2} aria-hidden="true" />
            Download MP4
          </button>
          <div className={styles.shareGroup} role="group" aria-label="Share to social network">
            <span className={styles.shareGlyph} aria-hidden="true">
              <Share2 size={13} strokeWidth={2.2} aria-hidden="true" />
            </span>
            {SHARE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.shareBtn}
                onClick={() => onShare?.(option.id)}
                aria-label={`Share to ${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ClipCreatorCard
