import { Clock, Radio, Timer } from "lucide-react"

import {
  CATEGORY_LABEL,
  CATEGORY_TONE,
  formatAbsoluteDate,
  formatRelativeTime,
  type NewsCategory,
  type NewsTone,
} from "./news-types"

import styles from "./news-meta-row.module.css"

export interface NewsMetaRowProps {
  source: string
  publishedAt: string
  readMinutes?: number
  category?: NewsCategory
  /** Use relative ("3 hrs ago") or absolute ("May 29, 2026") timestamp. */
  timestamp?: "relative" | "absolute"
  /** Compact drops the source-tag pill and read-time. */
  size?: "default" | "compact"
  className?: string
}

const TONE_CLASS: Record<NewsTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function NewsMetaRow({
  source,
  publishedAt,
  readMinutes,
  category,
  timestamp = "relative",
  size = "default",
  className,
}: NewsMetaRowProps) {
  const tone: NewsTone = category ? CATEGORY_TONE[category] : "neutral"
  const timeLabel =
    timestamp === "absolute" ? formatAbsoluteDate(publishedAt) : formatRelativeTime(publishedAt)
  const classes = [styles.row, size === "compact" ? styles.compact : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      {category && (
        <span className={[styles.tag, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.tagDot} aria-hidden="true" />
          {CATEGORY_LABEL[category]}
        </span>
      )}

      <span className={styles.source}>
        <Radio size={12} strokeWidth={2.2} aria-hidden="true" />
        {source}
      </span>

      <span className={styles.dot} aria-hidden="true" />

      <time className={styles.time} dateTime={publishedAt}>
        <Clock size={12} strokeWidth={2.2} aria-hidden="true" />
        {timeLabel}
      </time>

      {size !== "compact" && typeof readMinutes === "number" && (
        <>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.read}>
            <Timer size={12} strokeWidth={2.2} aria-hidden="true" />
            {readMinutes} min read
          </span>
        </>
      )}
    </div>
  )
}

export default NewsMetaRow
