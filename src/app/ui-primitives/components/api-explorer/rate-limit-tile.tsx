import { Timer } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"
import { Sparkline } from "../charts/sparkline"
import type { ProgressLinearTone } from "../primitives/progress-linear"
import type { RateLimitTileData } from "./api-explorer-types"

import styles from "./rate-limit-tile.module.css"

interface RateLimitTileProps extends RateLimitTileData {
  className?: string
}

function pickTone(ratio: number): ProgressLinearTone {
  if (ratio >= 0.85) return "red"
  if (ratio >= 0.6) return "amber"
  return "teal"
}

export function RateLimitTile({
  label,
  used,
  limit,
  resetsAt,
  recentUsage,
  className,
}: RateLimitTileProps) {
  const safeLimit = Math.max(limit, 1)
  const ratio = Math.min(used / safeLimit, 1.2)
  const percent = Math.round(ratio * 100)
  const tone = pickTone(ratio)
  const sparkTone = tone === "red" ? "red" : tone === "amber" ? "amber" : "teal"
  const remaining = Math.max(safeLimit - used, 0)
  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`${label} rate limit`}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Rate limit</span>
          <h3 className={styles.title}>{label}</h3>
        </div>
        <span className={styles.reset}>
          <Timer size={11} strokeWidth={2.4} aria-hidden="true" />
          Resets {resetsAt}
        </span>
      </header>

      <div className={styles.numbers}>
        <span className={styles.used}>{used.toLocaleString("en-AU")}</span>
        <span className={styles.divider}>/</span>
        <span className={styles.limit}>{limit.toLocaleString("en-AU")}</span>
        <span className={styles.unit}>req/min</span>
      </div>

      <ProgressLinear
        value={Math.min(used, safeLimit)}
        max={safeLimit}
        tone={tone}
        variant="solid"
        label={`${percent}% used`}
        showLabel
      />

      <footer className={styles.foot}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Remaining</span>
          <span className={styles.statValue}>{remaining.toLocaleString("en-AU")}</span>
        </div>
        <div className={styles.spark}>
          <Sparkline
            points={[...recentUsage]}
            tone={sparkTone}
            width={120}
            height={36}
            ariaLabel={`Recent ${label} usage trend`}
          />
        </div>
      </footer>
    </article>
  )
}

export default RateLimitTile
