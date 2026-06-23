"use client"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"
import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import {
  CERTIFICATION_LEVEL_LABEL,
  type CertificationLevel,
} from "./roster-types"
import styles from "./skill-cert-matrix.module.css"

export interface SkillCertCell {
  level: CertificationLevel
  /** Optional expiry date display, triggers a warning chip when set + close. */
  expiresOn?: string
  /** Days until expiry. <= 30 shows amber warning, <= 0 shows red expired. */
  daysToExpiry?: number
}

export interface SkillCertRow {
  technicianId: string
  technicianName: string
  /** Map keyed by skill id → cell. */
  cells: Readonly<Record<string, SkillCertCell>>
}

export interface SkillCertColumn {
  id: string
  /** Short header label — e.g. "TIG cert". */
  label: string
}

interface SkillCertMatrixProps {
  technicians: ReadonlyArray<SkillCertRow>
  skills: ReadonlyArray<SkillCertColumn>
  className?: string
}

const LEVEL_TONE: Record<CertificationLevel, ChipTone> = {
  novice: "neutral",
  competent: "teal",
  proficient: "amber",
  master: "green",
}

function expiryTone(days: number | undefined): ChipTone | null {
  if (days === undefined) {
    return null
  }
  if (days <= 0) {
    return "red"
  }
  if (days <= 30) {
    return "amber"
  }
  return null
}

function expiryLabel(cell: SkillCertCell): string | null {
  if (cell.daysToExpiry === undefined) {
    return null
  }
  if (cell.daysToExpiry <= 0) {
    return "Expired"
  }
  if (cell.daysToExpiry <= 30) {
    return `${cell.daysToExpiry}d left`
  }
  return null
}

export function SkillCertMatrix({
  technicians,
  skills,
  className,
}: SkillCertMatrixProps) {
  const techColumn: DataTableColumn<SkillCertRow> = {
    id: "tech",
    header: "Technician",
    cell: (row) => (
      <span className={styles.techCell}>
        <Avatar name={row.technicianName} size="sm" tone="amber" />
        {row.technicianName}
      </span>
    ),
    width: "200px",
  }

  const skillColumns: ReadonlyArray<DataTableColumn<SkillCertRow>> = skills.map(
    (skill) => ({
      id: skill.id,
      header: skill.label,
      cell: (row) => {
        const cell = row.cells[skill.id]
        if (!cell) {
          return <span className={styles.empty}>—</span>
        }
        const warn = expiryTone(cell.daysToExpiry)
        const warnLabel = expiryLabel(cell)
        return (
          <span className={styles.matrixCell}>
            <Chip
              label={CERTIFICATION_LEVEL_LABEL[cell.level]}
              tone={LEVEL_TONE[cell.level]}
            />
            {warn && warnLabel ? <Chip label={warnLabel} tone={warn} /> : null}
          </span>
        )
      },
    }),
  )

  const columns: ReadonlyArray<DataTableColumn<SkillCertRow>> = [
    techColumn,
    ...skillColumns,
  ]

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="grid" aria-label="Skill and certification matrix">
      <DataTable
        rows={technicians as SkillCertRow[]}
        columns={columns}
        getRowId={(row) => row.technicianId}
        density="comfortable"
        kicker="Skills × certifications"
        caption="Technician competency matrix"
      />
    </div>
  )
}

export default SkillCertMatrix
