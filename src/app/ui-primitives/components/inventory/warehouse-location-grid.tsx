import { Chip } from "../primitives/chip"

import styles from "./warehouse-location-grid.module.css"

export interface WarehouseZone {
  /** Bin location code, e.g. "A3-B2". */
  bin: string
  /** SKU density 0-100 (percent of capacity). */
  density: number
  /** Number of distinct SKUs in this zone. */
  skuCount: number
}

export interface WarehouseAisle {
  /** Aisle label, e.g. "A". */
  aisle: string
  /** Zones in this aisle, left-to-right. */
  zones: ReadonlyArray<WarehouseZone>
}

export interface WarehouseLocationGridProps {
  /** Warehouse display name. */
  warehouseName: string
  /** Aisles, top-to-bottom. */
  aisles: ReadonlyArray<WarehouseAisle>
  /** Optional currently-selected bin code, e.g. "A3-B2". */
  activeBin?: string
}

function densityClass(density: number): string {
  if (density >= 90) return styles.densityFull
  if (density >= 65) return styles.densityHigh
  if (density >= 35) return styles.densityMid
  if (density > 0) return styles.densityLow
  return styles.densityEmpty
}

function densityLabel(density: number): string {
  if (density >= 90) return "Capped"
  if (density >= 65) return "Dense"
  if (density >= 35) return "Active"
  if (density > 0) return "Light"
  return "Empty"
}

export function WarehouseLocationGrid({
  warehouseName,
  aisles,
  activeBin,
}: WarehouseLocationGridProps) {
  return (
    <section
      role="region"
      aria-label={`${warehouseName} warehouse zone grid`}
      className={styles.wrap}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Zone density</span>
        <h3 className={styles.title}>{warehouseName}</h3>
        <div className={styles.legend} aria-label="Density legend">
          <Chip label="Empty" tone="neutral" />
          <Chip label="Light" tone="teal" />
          <Chip label="Active" tone="green" />
          <Chip label="Dense" tone="amber" />
          <Chip label="Capped" tone="red" />
        </div>
      </header>

      <div className={styles.grid}>
        {aisles.map((aisle) => (
          <div key={aisle.aisle} className={styles.aisleRow}>
            <span className={styles.aisleLabel}>Aisle {aisle.aisle}</span>
            <div className={styles.bayRow}>
              {aisle.zones.map((zone) => {
                const isActive = activeBin === zone.bin
                const classes = [
                  styles.bay,
                  densityClass(zone.density),
                  isActive ? styles.bayActive : null,
                ]
                  .filter(Boolean)
                  .join(" ")
                return (
                  <span
                    key={zone.bin}
                    className={classes}
                    role="gridcell"
                    aria-label={`Bin ${zone.bin} ${densityLabel(zone.density)} ${zone.skuCount} SKUs`}
                    title={`${zone.bin} · ${densityLabel(zone.density)} · ${zone.skuCount} SKUs`}
                  >
                    <span className={styles.bayBin}>{zone.bin}</span>
                    <span className={styles.baySku}>{zone.skuCount}</span>
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WarehouseLocationGrid
