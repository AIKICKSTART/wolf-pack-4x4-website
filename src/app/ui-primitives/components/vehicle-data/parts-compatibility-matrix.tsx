import { Check, Minus, AlertTriangle, X } from "lucide-react"
import type { ReactNode } from "react"

import {
  FITMENT_STATUS_LABEL,
  type FitmentStatus,
} from "./vehicle-data-types"
import styles from "./parts-compatibility-matrix.module.css"

export interface CompatibilityVehicleColumn {
  id: string
  label: string
  /** Short identifier (e.g. rego) rendered in the header sub-line. */
  sub?: string
}

export interface CompatibilityPartRow {
  id: string
  label: string
  /** Part number used by the workshop catalogue. */
  partNumber: string
  /** Status per vehicle column. Indexed by `CompatibilityVehicleColumn.id`. */
  byVehicle: Readonly<Record<string, FitmentStatus>>
}

interface PartsCompatibilityMatrixProps {
  vehicles: ReadonlyArray<CompatibilityVehicleColumn>
  parts: ReadonlyArray<CompatibilityPartRow>
  /** Optional caption rendered above the matrix. */
  caption?: string
  className?: string
}

interface StatusVisual {
  icon: ReactNode
  className: string
}

const STATUS_VISUAL: Readonly<Record<FitmentStatus, StatusVisual>> = {
  match: {
    icon: <Check size={14} strokeWidth={2.6} aria-hidden="true" />,
    className: "statusMatch",
  },
  partial: {
    icon: <AlertTriangle size={14} strokeWidth={2.4} aria-hidden="true" />,
    className: "statusPartial",
  },
  mismatch: {
    icon: <X size={14} strokeWidth={2.6} aria-hidden="true" />,
    className: "statusMismatch",
  },
  unknown: {
    icon: <Minus size={14} strokeWidth={2.6} aria-hidden="true" />,
    className: "statusUnknown",
  },
}

export function PartsCompatibilityMatrix({
  vehicles,
  parts,
  caption,
  className,
}: PartsCompatibilityMatrixProps) {
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Parts compatibility matrix">
      {caption ? (
        <header className={styles.head}>
          <span className={styles.kicker}>Compatibility grid</span>
          <h3 className={styles.heading}>{caption}</h3>
        </header>
      ) : null}
      <div className={styles.tableWrap}>
        <table className={styles.matrix}>
          <caption className={styles.srOnly}>
            Part × vehicle compatibility grid. Rows are parts, columns are
            vehicles in the workshop pool.
          </caption>
          <thead>
            <tr>
              <th scope="col" className={styles.partHeader}>
                Part
              </th>
              {vehicles.map((vehicle) => (
                <th
                  key={vehicle.id}
                  scope="col"
                  className={styles.vehicleHeader}
                >
                  <span>{vehicle.label}</span>
                  {vehicle.sub ? (
                    <small className={styles.vehicleSub}>{vehicle.sub}</small>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id}>
                <th scope="row" className={styles.partCell}>
                  <span className={styles.partLabel}>{part.label}</span>
                  <small className={styles.partNumber}>{part.partNumber}</small>
                </th>
                {vehicles.map((vehicle) => {
                  const status = part.byVehicle[vehicle.id] ?? "unknown"
                  const visual = STATUS_VISUAL[status]
                  return (
                    <td
                      key={vehicle.id}
                      className={[styles.cell, styles[visual.className]].join(" ")}
                    >
                      <span
                        className={styles.cellInner}
                        aria-label={`${part.label} on ${vehicle.label}: ${FITMENT_STATUS_LABEL[status]}`}
                        title={FITMENT_STATUS_LABEL[status]}
                      >
                        {visual.icon}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={styles.legend} aria-label="Status legend">
        {(Object.keys(STATUS_VISUAL) as ReadonlyArray<FitmentStatus>).map((status) => (
          <li key={status} className={styles.legendItem}>
            <span className={[styles.legendSwatch, styles[STATUS_VISUAL[status].className]].join(" ")}>
              {STATUS_VISUAL[status].icon}
            </span>
            <span>{FITMENT_STATUS_LABEL[status]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PartsCompatibilityMatrix
