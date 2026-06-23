import type { ReactNode } from "react"

import styles from "./dashboard-tile.module.css"

export type DashboardTileTone = "red" | "amber" | "teal" | "green" | "neutral"
export type DashboardTileSpan = 1 | 2 | 3 | 4

interface DashboardTileProps {
  /** Eyebrow label rendered at top-left. */
  label: string
  /** Optional small text rendered top-right (e.g. "Live", "30d"). */
  aside?: string
  /** Number of grid columns to span (matches the shell's grid). */
  span?: DashboardTileSpan
  /** Accent tone for the top edge stripe. */
  tone?: DashboardTileTone
  children: ReactNode
  className?: string
}

const TONE_CLASS: Record<DashboardTileTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

const SPAN_CLASS: Record<DashboardTileSpan, string> = {
  1: styles.span1,
  2: styles.span2,
  3: styles.span3,
  4: styles.span4,
}

export function DashboardTile({
  label,
  aside,
  span = 1,
  tone = "neutral",
  children,
  className,
}: DashboardTileProps) {
  const classes = [styles.tile, SPAN_CLASS[span], TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes}>
      <header className={styles.head}>
        <span className={styles.label}>{label}</span>
        {aside ? <span className={styles.aside}>{aside}</span> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  )
}

export default DashboardTile
