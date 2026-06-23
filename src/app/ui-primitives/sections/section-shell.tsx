import type { ReactNode } from "react"

import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"

export type AuditStatus = "covered" | "new" | "gap"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  children: ReactNode
}

/** Split an eyebrow like "02 / Actions" into its numeric index and label so
 *  the index can carry tabular-nums and the two parts gain scale contrast.
 *  Falls back to rendering the whole string when there is no leading index. */
function splitEyebrow(eyebrow: string): { index: string | null; label: string } {
  const match = eyebrow.match(/^(\d+)\s*\/\s*(.+)$/)
  if (!match) {
    return { index: null, label: eyebrow }
  }
  return { index: match[1], label: match[2] }
}

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  const { index, label } = splitEyebrow(eyebrow)

  return (
    <div className={styles.sectionHeader}>
      <span className={local.headerEyebrow}>
        {index ? (
          <>
            <span className={local.headerIndex}>{index}</span>
            <span aria-hidden="true">/</span>
            <span>{label}</span>
          </>
        ) : (
          label
        )}
      </span>
      <div>
        <h2 className={local.headerTitle}>{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  )
}

interface StatusPillProps {
  status: AuditStatus
}

export function StatusPill({ status }: StatusPillProps) {
  const label = status === "covered" ? "Covered" : status === "new" ? "Added" : "Gap"

  return (
    <span className={`${styles.statusPill} ${styles[status]} ${local.pill}`}>
      <span className={local.pillDot} aria-hidden="true" />
      {label}
    </span>
  )
}

export function ArrowGlyph() {
  return <span className={styles.arrowGlyph} aria-hidden="true" />
}
