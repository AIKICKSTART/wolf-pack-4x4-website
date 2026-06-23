import type { PartSpecGroup } from "./parts-pages-types"

import styles from "./part-spec-table.module.css"

export interface PartSpecTableProps {
  /** Title shown above the spec table. */
  heading?: string
  /** Optional kicker e.g. "Workshop specs". */
  kicker?: string
  groups: ReadonlyArray<PartSpecGroup>
  className?: string
}

export function PartSpecTable({ heading = "Part specs", kicker, groups, className }: PartSpecTableProps) {
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
            <th scope="col" aria-sort="none" className={styles.thLabel}>Specification</th>
            <th scope="col" aria-sort="none" className={styles.thValue}>Value</th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.id} className={styles.groupBody}>
            <tr className={styles.groupHead}>
              <th colSpan={2} scope="colgroup" className={styles.groupHeading}>
                <span aria-hidden="true" className={styles.groupBar} />
                {group.title}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={`${group.id}-${row.label}`} className={styles.row}>
                <th scope="row" className={styles.cellLabel}>{row.label}</th>
                <td className={styles.cellValue}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  )
}

export default PartSpecTable
