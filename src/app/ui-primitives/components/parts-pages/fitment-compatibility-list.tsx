import { Chip } from "../primitives/chip"

import type { FitmentNote } from "./parts-pages-types"

import styles from "./fitment-compatibility-list.module.css"

export interface FitmentCompatibilityListProps {
  heading?: string
  kicker?: string
  fitments: ReadonlyArray<FitmentNote>
  className?: string
}

export function FitmentCompatibilityList({
  heading = "Confirmed fitment",
  kicker,
  fitments,
  className,
}: FitmentCompatibilityListProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={heading}
    >
      <header className={styles.header}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <h2 className={styles.heading}>{heading}</h2>
      </header>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.thMake}>Make</th>
            <th scope="col" className={styles.thModel}>Model</th>
            <th scope="col" className={styles.thYears}>Years</th>
            <th scope="col" className={styles.thBody}>Body</th>
            <th scope="col" className={styles.thEngine}>Engine</th>
            <th scope="col" className={styles.thNotes}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {fitments.map((fit) => (
            <tr key={fit.id} className={styles.row}>
              <th scope="row" className={styles.cellMake}>{fit.make}</th>
              <td className={styles.cellModel}>{fit.model}</td>
              <td className={styles.cellYears}>{fit.years}</td>
              <td className={styles.cellBody}>{fit.body ?? "—"}</td>
              <td className={styles.cellEngine}>{fit.engine ?? "—"}</td>
              <td className={styles.cellNotes}>
                <div className={styles.noteChipRow}>
                  {fit.notes && <Chip label={fit.notes} tone="amber" />}
                  {fit.adapterRequired && <Chip label="Adapter required" tone="red" />}
                  {!fit.notes && !fit.adapterRequired && <Chip label="Direct fit" tone="green" />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default FitmentCompatibilityList
