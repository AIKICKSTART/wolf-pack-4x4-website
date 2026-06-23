"use client"

import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

import type { PwaHomeTileMetric, PwaShortcutTone } from "./pwa-shell-types"
import styles from "./home-screen-tile.module.css"

interface HomeScreenTileProps {
  title: string
  hint?: string
  icon?: ReactNode
  badgeCount?: number
  badgeLabel?: string
  tone?: PwaShortcutTone
  metrics?: ReadonlyArray<PwaHomeTileMetric>
  onActivate?: () => void
  ariaLabel?: string
  className?: string
}

const TONE_CLASS: Record<PwaShortcutTone, string> = {
  neutral: "",
  red: styles.toneRed,
  amber: "",
  teal: styles.toneTeal,
}

const ICON_TONE_CLASS: Record<PwaShortcutTone, string> = {
  neutral: "",
  red: styles.iconRed,
  amber: "",
  teal: styles.iconTeal,
}

const TREND_GLYPH: Record<"up" | "down" | "flat", string> = {
  up: "▲",
  down: "▼",
  flat: "·",
}

const TREND_CLASS: Record<"up" | "down" | "flat", string> = {
  up: styles.trendUp,
  down: styles.trendDown,
  flat: styles.trendFlat,
}

export function HomeScreenTile({
  title,
  hint,
  icon,
  badgeCount,
  badgeLabel,
  tone = "amber",
  metrics,
  onActivate,
  ariaLabel,
  className,
}: HomeScreenTileProps) {
  const classes = [styles.root, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const showBadge = (badgeCount && badgeCount > 0) || Boolean(badgeLabel)
  return (
    <button
      type="button"
      className={classes}
      onClick={onActivate}
      aria-label={ariaLabel ?? title}
    >
      <header className={styles.head}>
        {icon && (
          <span className={[styles.icon, ICON_TONE_CLASS[tone]].filter(Boolean).join(" ")} aria-hidden="true">
            {icon}
          </span>
        )}
        {showBadge && (
          <span className={styles.badge}>
            {badgeLabel ?? (badgeCount && `${badgeCount} new`)}
          </span>
        )}
        {!showBadge && <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />}
      </header>
      <h3 className={styles.title}>{title}</h3>
      {hint && <p className={styles.hint}>{hint}</p>}
      {metrics && metrics.length > 0 && (
        <dl className={styles.metrics}>
          {metrics.map((entry) => (
            <div key={entry.label} className={styles.metric}>
              <dt className={styles.metricLabel}>{entry.label}</dt>
              <dd className={styles.metricValue}>
                {entry.value}
                {entry.trend && (
                  <span
                    className={[styles.trend, TREND_CLASS[entry.trend]].join(" ")}
                    aria-label={`Trending ${entry.trend}`}
                  >
                    {TREND_GLYPH[entry.trend]}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </button>
  )
}

export default HomeScreenTile
