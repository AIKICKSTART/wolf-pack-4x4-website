import { Chip } from "../primitives/chip"

import styles from "./variance-report-row.module.css"

export type SuggestedAction =
  | "investigate-receipt"
  | "raise-write-off"
  | "verify-pick"
  | "cycle-recount"
  | "absorb-positive"

export interface VarianceReportRowProps {
  /** SKU code. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Expected (book) quantity. */
  expectedQty: number
  /** Actual counted quantity. */
  actualQty: number
  /** Suggested next action. */
  suggestedAction: SuggestedAction
}

const ACTION_LABEL: Record<SuggestedAction, string> = {
  "investigate-receipt": "Investigate receipt",
  "raise-write-off": "Raise write-off",
  "verify-pick": "Verify pick history",
  "cycle-recount": "Schedule recount",
  "absorb-positive": "Absorb positive",
}

const ACTION_TONE: Record<SuggestedAction, "amber" | "red" | "teal" | "green"> = {
  "investigate-receipt": "amber",
  "raise-write-off": "red",
  "verify-pick": "amber",
  "cycle-recount": "teal",
  "absorb-positive": "green",
}

function deltaTone(delta: number): "green" | "amber" | "red" {
  if (delta === 0) return "green"
  if (Math.abs(delta) <= 2) return "amber"
  return "red"
}

export function VarianceReportRow({
  sku,
  title,
  expectedQty,
  actualQty,
  suggestedAction,
}: VarianceReportRowProps) {
  const delta = actualQty - expectedQty
  const sign = delta > 0 ? "+" : ""

  return (
    <article
      className={styles.row}
      role="status"
      aria-live="polite"
      aria-label={`${sku} variance ${sign}${delta} units`}
    >
      <div className={styles.identity}>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <dl className={styles.counts}>
        <div className={styles.countCell}>
          <dt>Expected</dt>
          <dd>{expectedQty}</dd>
        </div>
        <div className={styles.countCell}>
          <dt>Actual</dt>
          <dd>{actualQty}</dd>
        </div>
        <div className={styles.countCell}>
          <dt>Delta</dt>
          <dd>
            <Chip label={`${sign}${delta}`} tone={deltaTone(delta)} />
          </dd>
        </div>
      </dl>
      <div className={styles.action}>
        <Chip
          label={ACTION_LABEL[suggestedAction]}
          tone={ACTION_TONE[suggestedAction]}
        />
      </div>
    </article>
  )
}

export default VarianceReportRow
