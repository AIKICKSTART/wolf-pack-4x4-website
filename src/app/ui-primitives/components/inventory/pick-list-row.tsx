import { Chip } from "../primitives/chip"

import { BinLocationChip } from "./bin-location-chip"

import styles from "./pick-list-row.module.css"
import type { PickStatus } from "./inventory-types"

export interface PickListRowProps {
  /** Sequential pick number, e.g. 1. */
  pickNumber: number
  /** SKU code. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Quantity to pick. */
  qty: number
  /** Bin segments — aisle / bay / shelf. */
  bin: { aisle: string; bay: string; shelf: string }
  /** Current pick status. */
  status: PickStatus
  /** Optional click-to-find handler from the bin chip. */
  onLocateBin?: (binId: string) => void
}

const STATUS_LABEL: Record<PickStatus, string> = {
  queued: "Queued",
  picking: "Picking",
  picked: "Picked",
  shortfall: "Shortfall",
}

const STATUS_TONE: Record<PickStatus, "neutral" | "amber" | "green" | "red"> = {
  queued: "neutral",
  picking: "amber",
  picked: "green",
  shortfall: "red",
}

export function PickListRow({
  pickNumber,
  sku,
  title,
  qty,
  bin,
  status,
  onLocateBin,
}: PickListRowProps) {
  return (
    <tr className={styles.row}>
      <th scope="row" className={styles.numCell}>
        <span className={styles.num}>{pickNumber.toString().padStart(2, "0")}</span>
      </th>
      <td className={styles.skuCell}>
        <span className={styles.sku}>{sku}</span>
        <span className={styles.title}>{title}</span>
      </td>
      <td className={styles.qtyCell}>
        <span className={styles.qty}>{qty}</span>
        <span className={styles.qtyUnit}>units</span>
      </td>
      <td className={styles.binCell}>
        <BinLocationChip {...bin} onFind={onLocateBin} />
      </td>
      <td className={styles.statusCell}>
        <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
      </td>
    </tr>
  )
}

export default PickListRow
