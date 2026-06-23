import styles from "./stock-movement-timeline.module.css"
import type { MovementKind } from "./inventory-deep-types"

export interface StockMovementEntry {
  /** Stable id. */
  id: string
  /** Movement classifier. */
  kind: MovementKind
  /** Quantity change (positive in, negative out). */
  delta: number
  /** Resulting balance after the movement. */
  balanceAfter: number
  /** ISO timestamp. */
  at: string
  /** Optional source reference, e.g. "PO-2026-0481" or "Pickwave 12". */
  reference?: string
  /** Optional human actor, e.g. "Brad" or "Jase". */
  actor?: string
}

export interface StockMovementTimelineProps {
  /** SKU label. */
  sku: string
  /** Newest-first list of entries. */
  entries: ReadonlyArray<StockMovementEntry>
}

const KIND_LABEL: Record<MovementKind, string> = {
  receipt: "Receipt",
  pick: "Pick",
  "transfer-in": "Transfer in",
  "transfer-out": "Transfer out",
  adjustment: "Adjustment",
  "write-off": "Write-off",
}

const KIND_TONE: Record<MovementKind, "green" | "amber" | "teal" | "red"> = {
  receipt: "green",
  pick: "amber",
  "transfer-in": "teal",
  "transfer-out": "teal",
  adjustment: "amber",
  "write-off": "red",
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export function StockMovementTimeline({
  sku,
  entries,
}: StockMovementTimelineProps) {
  return (
    <section
      className={styles.wrap}
      aria-label={`Stock movement timeline for ${sku}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Stock movements</span>
        <h3 className={styles.title}>{sku}</h3>
      </header>

      <ol className={styles.list}>
        {entries.map((entry) => {
          const isIn = entry.delta > 0
          const sign = isIn ? "+" : ""
          const toneClass = styles[`tone${KIND_TONE[entry.kind][0].toUpperCase()}${KIND_TONE[entry.kind].slice(1)}`]
          return (
            <li key={entry.id} className={styles.item}>
              <span className={`${styles.dot} ${toneClass}`} aria-hidden="true" />
              <div className={styles.itemBody}>
                <div className={styles.itemHead}>
                  <span className={`${styles.kind} ${toneClass}`}>
                    {KIND_LABEL[entry.kind]}
                  </span>
                  <span className={`${styles.delta} ${toneClass}`}>
                    {sign}
                    {entry.delta}
                  </span>
                  <span className={styles.balance}>= {entry.balanceAfter}</span>
                </div>
                <div className={styles.itemMeta}>
                  <time dateTime={entry.at}>{formatTime(entry.at)}</time>
                  {entry.reference ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{entry.reference}</span>
                    </>
                  ) : null}
                  {entry.actor ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{entry.actor}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default StockMovementTimeline
