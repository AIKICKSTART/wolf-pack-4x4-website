"use client"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./slow-mover-card.module.css"
import type { SlowMoverAction } from "./inventory-deep-types"

export interface SlowMoverCardProps {
  /** SKU code, e.g. "MAN-CB-25-FAL". */
  sku: string
  /** Friendly part title. */
  title: string
  /** Stock on hand. */
  onHand: number
  /** Average landed unit cost (AUD). */
  unitCost: number
  /** Days since the last sale was recorded. */
  daysSinceLastSale: number
  /** Threshold for "stale" — used to scale the days bar. */
  staleThresholdDays?: number
  /** Optional CTA disposition button. Fires onAction when clicked. */
  defaultAction?: SlowMoverAction
  /** Available disposition options. */
  actions?: ReadonlyArray<SlowMoverAction>
  /** Fires when an operator triggers a disposition action. */
  onAction?: (action: SlowMoverAction, sku: string) => void
}

const ACTION_LABEL: Record<SlowMoverAction, string> = {
  discount: "Discount",
  "return-to-supplier": "Return to supplier",
  "write-off": "Write off",
  transfer: "Inter-bay transfer",
}

const ACTION_TONE: Record<
  SlowMoverAction,
  "amber" | "teal" | "red" | "green"
> = {
  discount: "amber",
  "return-to-supplier": "teal",
  "write-off": "red",
  transfer: "green",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function SlowMoverCard({
  sku,
  title,
  onHand,
  unitCost,
  daysSinceLastSale,
  staleThresholdDays = 180,
  actions = ["discount", "transfer", "return-to-supplier", "write-off"],
  defaultAction,
  onAction,
}: SlowMoverCardProps) {
  const value = onHand * unitCost
  const cap = Math.max(staleThresholdDays * 2, daysSinceLastSale)
  const tone: "amber" | "red" = daysSinceLastSale > staleThresholdDays * 1.5 ? "red" : "amber"

  return (
    <article
      className={styles.wrap}
      aria-label={`Slow mover ${sku} ${daysSinceLastSale} days since last sale`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Slow mover</span>
          <h3 className={styles.title}>{sku}</h3>
          <span className={styles.subtitle}>{title}</span>
        </div>
        <Chip
          label={`${daysSinceLastSale}d stale`}
          tone={tone}
        />
      </header>

      <ProgressLinear
        value={daysSinceLastSale}
        max={cap}
        tone={tone}
        variant="striped"
        label={`Days since last sale, threshold ${staleThresholdDays}d`}
      />

      <dl className={styles.metrics}>
        <div className={styles.metric}>
          <dt>On hand</dt>
          <dd>{onHand}</dd>
        </div>
        <div className={styles.metric}>
          <dt>Unit cost</dt>
          <dd>{formatAud(unitCost)}</dd>
        </div>
        <div className={styles.metric}>
          <dt>Tied-up</dt>
          <dd className={styles.tied}>{formatAud(value)}</dd>
        </div>
      </dl>

      <div className={styles.actions} role="group" aria-label="Slow-mover disposition">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            className={`${styles.actionBtn} ${
              defaultAction === action ? styles.primary : ""
            }`}
            onClick={() => onAction?.(action, sku)}
            aria-label={`${ACTION_LABEL[action]} for ${sku}`}
            data-tone={ACTION_TONE[action]}
          >
            {ACTION_LABEL[action]}
          </button>
        ))}
      </div>
    </article>
  )
}

export default SlowMoverCard
