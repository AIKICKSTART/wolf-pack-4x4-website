import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

import { Sparkline } from "../charts/sparkline"

import styles from "./social-scheduler.module.css"
import type { PostEngagement } from "./social-scheduler-types"

interface EngagementAnalyticsStripProps {
  title?: string
  engagement: PostEngagement
  /** Trend series per metric — same index order as the cells below. */
  trends?: {
    likes?: ReadonlyArray<number>
    comments?: ReadonlyArray<number>
    shares?: ReadonlyArray<number>
    saves?: ReadonlyArray<number>
  }
  /** Period deltas as signed percentages (e.g. 0.12 for +12%). */
  deltas?: {
    likes?: number
    comments?: number
    shares?: number
    saves?: number
  }
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}

function deltaClass(value: number | undefined): string {
  if (value === undefined || Math.abs(value) < 0.005) return styles.engagementCellDeltaFlat
  return value > 0 ? styles.engagementCellDeltaUp : styles.engagementCellDeltaDown
}

function deltaText(value: number | undefined): string {
  if (value === undefined) return "—"
  const sign = value > 0 ? "+" : ""
  return `${sign}${(value * 100).toFixed(1)}%`
}

export function EngagementAnalyticsStrip({
  title = "Engagement",
  engagement,
  trends,
  deltas,
}: EngagementAnalyticsStripProps) {
  const cells: ReadonlyArray<{
    key: "likes" | "comments" | "shares" | "saves"
    label: string
    value: number
    icon: typeof Heart
    tone: "red" | "amber" | "teal" | "green"
  }> = [
    { key: "likes", label: "Likes", value: engagement.likes, icon: Heart, tone: "red" },
    { key: "comments", label: "Comments", value: engagement.comments, icon: MessageCircle, tone: "teal" },
    { key: "shares", label: "Shares", value: engagement.shares, icon: Share2, tone: "amber" },
    { key: "saves", label: "Saves", value: engagement.saves, icon: Bookmark, tone: "green" },
  ]

  return (
    <section
      className={`${styles.frame} ${styles.engagementStrip}`}
      aria-label={`${title} analytics, ${(engagement.rate * 100).toFixed(1)} percent rate`}
    >
      <header className={styles.engagementHead}>
        <h3 className={styles.engagementName}>{title}</h3>
        <span className={styles.composerEyebrow}>
          Engagement rate · {(engagement.rate * 100).toFixed(1)}%
        </span>
      </header>

      <div className={styles.engagementCells}>
        {cells.map((cell) => {
          const Icon = cell.icon
          const trend = trends?.[cell.key]
          const delta = deltas?.[cell.key]
          return (
            <article
              key={cell.key}
              className={styles.engagementCell}
              aria-label={`${cell.label}: ${formatCount(cell.value)} (${deltaText(delta)})`}
            >
              <span className={styles.engagementCellLabel}>
                <Icon size={11} aria-hidden="true" /> {cell.label}
              </span>
              <span className={styles.engagementCellValue}>
                {formatCount(cell.value)}
              </span>
              {trend && trend.length > 1 ? (
                <Sparkline
                  points={[...trend]}
                  tone={cell.tone}
                  width={110}
                  height={26}
                  ariaLabel={`${cell.label} trend`}
                />
              ) : null}
              <span
                className={`${styles.engagementCellDelta} ${deltaClass(delta)}`}
              >
                {deltaText(delta)} 7d
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default EngagementAnalyticsStrip
