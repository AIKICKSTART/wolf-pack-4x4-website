"use client"

import { Chip } from "../primitives/chip"

import styles from "./cycle-count-row.module.css"
import type { CycleVariance } from "./inventory-deep-types"

export interface CycleCountRowProps {
  /** SKU code. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Bin location, e.g. "A1-04". */
  bin: string
  /** Book / expected qty. */
  expectedQty: number
  /** Counted qty from auditor. */
  countedQty: number
  /** Optional counter identifier. */
  countedBy?: string
  /** Fires when the auditor accepts the variance line. */
  onAccept?: (sku: string) => void
  /** Fires when the auditor rejects the line (forces recount). */
  onReject?: (sku: string) => void
}

const VARIANCE_LABEL: Record<CycleVariance, string> = {
  match: "Match",
  minor: "Minor",
  major: "Major",
}

const VARIANCE_TONE: Record<CycleVariance, "green" | "amber" | "red"> = {
  match: "green",
  minor: "amber",
  major: "red",
}

function classifyVariance(delta: number, expected: number): CycleVariance {
  if (delta === 0) return "match"
  const ratio = expected > 0 ? Math.abs(delta) / expected : 1
  if (ratio <= 0.05 && Math.abs(delta) <= 2) return "minor"
  return "major"
}

export function CycleCountRow({
  sku,
  title,
  bin,
  expectedQty,
  countedQty,
  countedBy,
  onAccept,
  onReject,
}: CycleCountRowProps) {
  const delta = countedQty - expectedQty
  const variance = classifyVariance(delta, expectedQty)
  const sign = delta > 0 ? "+" : ""

  return (
    <tr
      className={styles.row}
      aria-label={`Cycle count ${sku} variance ${sign}${delta}`}
    >
      <th scope="row" className={styles.skuCell}>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.bin}>Bin · {bin}</span>
      </th>
      <td className={styles.numCell}>
        <span className={styles.numValue}>{expectedQty}</span>
      </td>
      <td className={styles.numCell}>
        <span className={styles.numValue}>{countedQty}</span>
        {countedBy ? <span className={styles.countedBy}>· {countedBy}</span> : null}
      </td>
      <td className={styles.deltaCell}>
        <Chip
          label={`${sign}${delta} · ${VARIANCE_LABEL[variance]}`}
          tone={VARIANCE_TONE[variance]}
        />
      </td>
      <td className={styles.actionCell}>
        <div className={styles.actions} role="group" aria-label="Variance verdict">
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.accept}`}
            onClick={() => onAccept?.(sku)}
            aria-label={`Accept variance for ${sku}`}
          >
            Accept
          </button>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.reject}`}
            onClick={() => onReject?.(sku)}
            aria-label={`Reject variance for ${sku} — recount`}
          >
            Recount
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CycleCountRow
