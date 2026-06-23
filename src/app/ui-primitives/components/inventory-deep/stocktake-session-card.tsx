import { ProgressRadial } from "../primitives/progress-radial"
import { Chip } from "../primitives/chip"

import styles from "./stocktake-session-card.module.css"
import {
  STOCKTAKE_TONE,
  type StocktakeStatus,
  type InventoryTone,
} from "./inventory-deep-types"

export interface StocktakeSessionCardProps {
  /** Session label, e.g. "Q2 2026 Cycle Count #047". */
  sessionLabel: string
  /** Status pill driving tone + radial halo. */
  status: StocktakeStatus
  /** Lines counted so far. */
  counted: number
  /** Total lines in the count. */
  total: number
  /** Auditor running the session. */
  auditor: string
  /** Optional aisle / zone scope, e.g. "A1-G12". */
  scope?: string
  /** Optional ISO start timestamp for the elapsed footer. */
  startedAt?: string
}

const STATUS_LABEL: Record<StocktakeStatus, string> = {
  scheduled: "Scheduled",
  active: "Active",
  paused: "Paused",
  review: "Review",
  closed: "Closed",
}

function toChipTone(
  tone: InventoryTone | "neutral",
): "red" | "amber" | "teal" | "green" | "neutral" {
  return tone
}

function toRadialTone(
  tone: InventoryTone | "neutral",
): "red" | "amber" | "teal" | "green" | "neutral" {
  return tone
}

function formatRelative(iso?: string): string | null {
  if (!iso) return null
  const started = new Date(iso)
  if (Number.isNaN(started.getTime())) return null
  const diffMs = Date.now() - started.getTime()
  if (diffMs < 0) return "starts soon"
  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 60) return `${minutes}m elapsed`
  const hours = Math.floor(minutes / 60)
  const rem = minutes % 60
  return `${hours}h ${rem.toString().padStart(2, "0")}m elapsed`
}

export function StocktakeSessionCard({
  sessionLabel,
  status,
  counted,
  total,
  auditor,
  scope,
  startedAt,
}: StocktakeSessionCardProps) {
  const tone = STOCKTAKE_TONE[status]
  const safeTotal = Math.max(total, 1)
  const safeCounted = Math.max(0, Math.min(counted, safeTotal))
  const percent = Math.round((safeCounted / safeTotal) * 100)
  const elapsed = formatRelative(startedAt)

  return (
    <article
      className={styles.wrap}
      aria-label={`Stocktake session ${sessionLabel}, ${STATUS_LABEL[status]}, ${safeCounted} of ${safeTotal} counted`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Stocktake · {auditor}</span>
          <h3 className={styles.title}>{sessionLabel}</h3>
          {scope ? <span className={styles.scope}>Scope · {scope}</span> : null}
        </div>
        <Chip label={STATUS_LABEL[status]} tone={toChipTone(tone)} />
      </header>

      <div className={styles.body}>
        <ProgressRadial
          value={safeCounted}
          max={safeTotal}
          tone={toRadialTone(tone)}
          size="lg"
          showLabel
          label={`${percent}% counted`}
        />
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Counted</dt>
            <dd className={styles.statValue}>{safeCounted}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Total lines</dt>
            <dd className={styles.statValue}>{safeTotal}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Remaining</dt>
            <dd className={styles.statValue}>{safeTotal - safeCounted}</dd>
          </div>
        </dl>
      </div>

      <footer className={styles.foot}>
        <span>Auditor · {auditor}</span>
        {elapsed ? <span aria-hidden="true">·</span> : null}
        {elapsed ? <span>{elapsed}</span> : null}
      </footer>
    </article>
  )
}

export default StocktakeSessionCard
