import { Check, Minus, X } from "lucide-react"

import type {
  LandingComparisonAxis,
  LandingComparisonCell,
  LandingComparisonRow,
} from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface ComparisonTableSectionProps {
  kicker?: string
  heading: string
  body?: string
  axes: ReadonlyArray<LandingComparisonAxis>
  rows: ReadonlyArray<LandingComparisonRow>
  /** Axis id treated as "us" — highlighted column. */
  selfAxisId: string
  className?: string
}

function CellIcon({ state }: { state: LandingComparisonCell["state"] }) {
  if (state === "yes") {
    return <Check size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  if (state === "partial") {
    return <Minus size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  return <X size={14} strokeWidth={2.2} aria-hidden="true" />
}

function cellLabel(state: LandingComparisonCell["state"]): string {
  switch (state) {
    case "yes":
      return "Included"
    case "partial":
      return "Partial"
    case "no":
      return "Not included"
  }
}

/**
 * Primitive 07 — Vs-competitor comparison matrix. Renders a table with one
 * column per axis, one row per capability, and check / minus / X icons per
 * cell. The `selfAxisId` column is highlighted so the workshop's offer stands
 * out clearly.
 */
export function ComparisonTableSection({
  kicker,
  heading,
  body,
  axes,
  rows,
  selfAxisId,
  className,
}: ComparisonTableSectionProps) {
  const sectionClasses = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses} aria-labelledby="comparison-heading">
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="comparison-heading" className={styles.heading}>
          {heading}
        </h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <div className={styles.comparison}>
        <div className={styles.comparisonScroll}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Capability</th>
                {axes.map((axis) => (
                  <th
                    key={axis.id}
                    scope="col"
                    data-self={axis.id === selfAxisId ? "true" : "false"}
                  >
                    {axis.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <span className={styles.comparisonRowLabel}>{row.label}</span>
                  </th>
                  {row.values.map((value, index) => {
                    const axis = axes[index]
                    const isSelf = axis?.id === selfAxisId
                    return (
                      <td
                        key={axis ? axis.id : index}
                        data-self={isSelf ? "true" : "false"}
                      >
                        <span
                          className={styles.comparisonCell}
                          data-state={value.state}
                          aria-label={cellLabel(value.state)}
                        >
                          <CellIcon state={value.state} />
                          <span>{cellLabel(value.state)}</span>
                        </span>
                        {value.detail ? (
                          <span className={styles.comparisonCellDetail}>
                            {value.detail}
                          </span>
                        ) : null}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ComparisonTableSection
