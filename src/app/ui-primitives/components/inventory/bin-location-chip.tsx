import { Chip } from "../primitives/chip"

import styles from "./bin-location-chip.module.css"

export interface BinLocationChipProps {
  /** Aisle code, e.g. "A3". */
  aisle: string
  /** Bay code, e.g. "B2". */
  bay: string
  /** Shelf code, e.g. "S4". */
  shelf: string
  /** Optional handler — fires when the user clicks to "find" the bin in the grid. */
  onFind?: (binId: string) => void
}

export function BinLocationChip({ aisle, bay, shelf, onFind }: BinLocationChipProps) {
  const binId = `${aisle}-${bay}-${shelf}`
  const label = `Bin ${binId}`

  return (
    <span className={styles.wrap}>
      <Chip
        label={label}
        tone="teal"
        icon={<span aria-hidden="true">⌖</span>}
        onSelect={onFind ? () => onFind(binId) : undefined}
      />
    </span>
  )
}

export default BinLocationChip
