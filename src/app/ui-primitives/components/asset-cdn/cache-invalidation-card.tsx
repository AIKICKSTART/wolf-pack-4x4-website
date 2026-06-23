import {
  CACHE_SCOPE_LABEL,
  INVALIDATION_STRATEGY_LABEL,
  INVALIDATION_STRATEGY_TONE,
  type CacheInvalidation,
  type CdnTone,
} from "./asset-cdn-types"

import styles from "./cache-invalidation-card.module.css"

interface CacheInvalidationCardProps {
  invalidation: CacheInvalidation
  className?: string
}

const TONE_CLASS: Record<CdnTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime()
  if (!Number.isFinite(then)) return "—"
  const now = Date.UTC(2026, 4, 29, 12, 0, 0)
  const diffSec = Math.max(0, Math.round((now - then) / 1000))
  if (diffSec < 60) return `${diffSec}s ago`
  if (diffSec < 3600) return `${Math.round(diffSec / 60)}m ago`
  if (diffSec < 86_400) return `${Math.round(diffSec / 3600)}h ago`
  return `${Math.round(diffSec / 86_400)}d ago`
}

export function CacheInvalidationCard({
  invalidation,
  className,
}: CacheInvalidationCardProps) {
  const tone = INVALIDATION_STRATEGY_TONE[invalidation.strategy]
  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Cache invalidation ${invalidation.pattern}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Cache · {CACHE_SCOPE_LABEL[invalidation.scope]}</span>
        <span className={styles.strategy}>
          {INVALIDATION_STRATEGY_LABEL[invalidation.strategy]}
        </span>
      </header>

      <code className={styles.pattern} title={invalidation.pattern}>
        {invalidation.pattern}
      </code>

      <dl className={styles.stats}>
        <div className={styles.statRow}>
          <dt>Affected</dt>
          <dd className={styles.numeric}>{invalidation.affectedCount.toLocaleString("en-AU")} URLs</dd>
        </div>
        <div className={styles.statRow}>
          <dt>Issued</dt>
          <dd className={styles.numeric}>{formatRelative(invalidation.issuedAt)}</dd>
        </div>
      </dl>

      <footer className={styles.foot}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.footLabel}>Propagating to {invalidation.scope === "global" ? "all PoPs" : "edge PoPs"}</span>
      </footer>
    </article>
  )
}

export default CacheInvalidationCard
