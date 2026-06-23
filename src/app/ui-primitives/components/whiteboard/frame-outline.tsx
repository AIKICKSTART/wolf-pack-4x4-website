import type { ReactNode } from "react"

import styles from "./frame-outline.module.css"

export type FrameTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface FrameOutlineProps {
  /** Frame title — shown in the chip above the frame. */
  title: string
  /** Frame id (e.g. "F-04") shown as a monospace badge. */
  frameId: string
  /** Frame width in pixels (visual). */
  width: number
  /** Frame height in pixels (visual). */
  height: number
  /** Optional dimension label override (default w × h). */
  dimensions?: string
  /** Tone — drives outline + chip colour. */
  tone?: FrameTone
  /** Frame content. */
  children?: ReactNode
  /** Optional className passthrough. */
  className?: string
}

const TONE_CLASS: Record<FrameTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function FrameOutline({
  title,
  frameId,
  width,
  height,
  dimensions,
  tone = "teal",
  children,
  className,
}: FrameOutlineProps) {
  const classes = [styles.frame, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const dimLabel = dimensions ?? `${width} × ${height}`

  return (
    <section
      role="group"
      aria-label={`Frame ${frameId} — ${title}`}
      className={classes}
      style={{ width, height }}
    >
      <header className={styles.head}>
        <span className={styles.title}>{title}</span>
        <span className={styles.id}>{frameId}</span>
      </header>
      <span className={styles.dim} aria-hidden="true">
        {dimLabel}
      </span>
      <div className={styles.inner}>{children}</div>
    </section>
  )
}

export default FrameOutline
