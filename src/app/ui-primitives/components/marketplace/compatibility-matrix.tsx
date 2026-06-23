import { AlertTriangle, Check, X } from "lucide-react"
import type { ReactNode } from "react"

import {
  COMPATIBILITY_SURFACE_LABEL,
  type CompatibilityCell,
  type CompatibilitySurface,
} from "./marketplace-types"
import styles from "./compatibility-matrix.module.css"

export interface CompatibilityMatrixRow {
  id: string
  feature: string
  cells: Record<CompatibilitySurface, CompatibilityCell>
  notes?: Partial<Record<CompatibilitySurface, string>>
}

export interface CompatibilityMatrixProps {
  rows: ReadonlyArray<CompatibilityMatrixRow>
  surfaces?: ReadonlyArray<CompatibilitySurface>
  title?: string
  className?: string
}

const DEFAULT_SURFACES: ReadonlyArray<CompatibilitySurface> = [
  "site",
  "mufflerpulse",
  "hermes",
  "api",
  "cli",
]

const CELL_TONE_CLASS: Record<CompatibilityCell, string> = {
  supported: styles.toneSupported,
  partial: styles.tonePartial,
  unsupported: styles.toneUnsupported,
}

const CELL_LABEL: Record<CompatibilityCell, string> = {
  supported: "Supported",
  partial: "Partial",
  unsupported: "Unsupported",
}

function CellIcon({ value }: { value: CompatibilityCell }): ReactNode {
  const props = { size: 13, strokeWidth: 2.6, "aria-hidden": true } as const
  if (value === "supported") {
    return <Check {...props} />
  }
  if (value === "partial") {
    return <AlertTriangle {...props} />
  }
  return <X {...props} />
}

export function CompatibilityMatrix({
  rows,
  surfaces = DEFAULT_SURFACES,
  title = "Compatibility",
  className,
}: CompatibilityMatrixProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {surfaces.map((surface) => (
                <th key={surface} scope="col">
                  {COMPATIBILITY_SURFACE_LABEL[surface]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.feature}</th>
                {surfaces.map((surface) => {
                  const value = row.cells[surface]
                  const note = row.notes?.[surface]
                  const ariaLabel = note
                    ? `${row.feature} on ${COMPATIBILITY_SURFACE_LABEL[surface]}: ${CELL_LABEL[value]} — ${note}`
                    : `${row.feature} on ${COMPATIBILITY_SURFACE_LABEL[surface]}: ${CELL_LABEL[value]}`
                  return (
                    <td key={surface}>
                      <span
                        className={[styles.cell, CELL_TONE_CLASS[value]].join(" ")}
                        title={note}
                        aria-label={ariaLabel}
                      >
                        <CellIcon value={value} />
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={styles.legend} aria-label="Compatibility legend">
        <li>
          <span className={[styles.legendDot, styles.toneSupported].join(" ")} aria-hidden="true">
            <Check size={11} strokeWidth={2.6} />
          </span>
          Supported
        </li>
        <li>
          <span className={[styles.legendDot, styles.tonePartial].join(" ")} aria-hidden="true">
            <AlertTriangle size={11} strokeWidth={2.6} />
          </span>
          Partial
        </li>
        <li>
          <span
            className={[styles.legendDot, styles.toneUnsupported].join(" ")}
            aria-hidden="true"
          >
            <X size={11} strokeWidth={2.6} />
          </span>
          Unsupported
        </li>
      </ul>
    </section>
  )
}

export default CompatibilityMatrix
