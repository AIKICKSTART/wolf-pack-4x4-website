import { Chip } from "../primitives/chip"

import styles from "./backorder-preorder-chip.module.css"
import type { BackorderKind } from "./inventory-types"

export interface BackorderPreorderChipProps {
  /** Kind of unfulfilled state. */
  kind: BackorderKind
  /** Estimated arrival, e.g. "12 Jun" or "Wk 24". */
  eta: string
  /** Count of customers waiting on this SKU. */
  customerImpact: number
}

const KIND_LABEL: Record<BackorderKind, string> = {
  backorder: "Back order",
  preorder: "Pre-order",
  "drop-ship": "Drop ship",
}

const KIND_TONE: Record<BackorderKind, "red" | "amber" | "teal"> = {
  backorder: "red",
  preorder: "amber",
  "drop-ship": "teal",
}

export function BackorderPreorderChip({
  kind,
  eta,
  customerImpact,
}: BackorderPreorderChipProps) {
  const customerLabel = `${customerImpact} customer${customerImpact === 1 ? "" : "s"}`

  return (
    <span
      className={styles.wrap}
      aria-label={`${KIND_LABEL[kind]}: ETA ${eta}, ${customerLabel} waiting`}
    >
      <Chip label={KIND_LABEL[kind]} tone={KIND_TONE[kind]} />
      <span className={styles.divider} aria-hidden="true">
        ·
      </span>
      <Chip label={`ETA ${eta}`} tone="neutral" />
      <span className={styles.divider} aria-hidden="true">
        ·
      </span>
      <Chip
        label={customerLabel}
        tone={customerImpact > 4 ? "red" : "amber"}
      />
    </span>
  )
}

export default BackorderPreorderChip
