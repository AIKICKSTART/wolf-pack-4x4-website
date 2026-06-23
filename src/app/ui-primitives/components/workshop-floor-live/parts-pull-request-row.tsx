import { PackageSearch } from "lucide-react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import {
  PARTS_PULL_STATUS_LABEL,
  PARTS_PULL_STATUS_TONE,
  type PartsPullStatus,
} from "./workshop-floor-types"
import styles from "./parts-pull-request-row.module.css"

export interface PartsPullRequestRowProps {
  sku: string
  /** Plain part name e.g. "Manta 3in mid-muffler". */
  partName: string
  /** Qty requested. */
  qty: number
  bay: BayId
  status: PartsPullStatus
  /** Requested by — technician initials/name. */
  requestedBy: string
  /** Request time stamp e.g. "11:42". */
  at: string
  className?: string
}

export function PartsPullRequestRow({
  sku,
  partName,
  qty,
  bay,
  status,
  requestedBy,
  at,
  className,
}: PartsPullRequestRowProps) {
  const tone = PARTS_PULL_STATUS_TONE[status]
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-status={status}
      aria-label={`Parts pull ${sku} from ${BAY_LABEL[bay]} — ${PARTS_PULL_STATUS_LABEL[status]}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <PackageSearch size={16} strokeWidth={2.2} />
      </span>
      <div className={styles.identity}>
        <span className={styles.sku}>{sku}</span>
        <strong className={styles.name}>{partName}</strong>
        <span className={styles.meta}>
          {at} · {requestedBy}
        </span>
      </div>
      <div className={styles.qty}>
        <em>Qty</em>
        <strong>{qty}</strong>
      </div>
      <div className={styles.tail}>
        <Chip label={BAY_LABEL[bay]} tone="teal" />
        <Chip label={PARTS_PULL_STATUS_LABEL[status]} tone={tone} />
      </div>
    </article>
  )
}

export default PartsPullRequestRow
