import { Fuel, Check, X, AlertTriangle } from "lucide-react"
import type { ReactNode } from "react"

import { Chip, type ChipTone } from "../primitives/chip"

import {
  FUEL_GRADE_LABEL,
  FUEL_GRADE_TONE,
  type FuelGrade,
} from "./vehicle-data-types"
import styles from "./fuel-grade-row.module.css"

export type FuelCompatibility = "recommended" | "compatible" | "warning" | "not-compatible"

interface FuelGradeRowProps {
  grade: FuelGrade
  /** Compatibility with the vehicle being inspected. */
  compatibility: FuelCompatibility
  /** Pump RON / cetane number (e.g. 91, 95, 98, 51 cetane). */
  rating: string
  /** Optional pump price ($/L). */
  pricePerLitre?: number
  /** Short note explaining the verdict. */
  note?: string
  className?: string
}

interface VisualSpec {
  icon: ReactNode
  label: string
  tone: ChipTone
}

const COMPATIBILITY: Readonly<Record<FuelCompatibility, VisualSpec>> = {
  recommended: {
    icon: <Check size={14} strokeWidth={2.6} aria-hidden="true" />,
    label: "Recommended",
    tone: "green",
  },
  compatible: {
    icon: <Check size={14} strokeWidth={2.4} aria-hidden="true" />,
    label: "Compatible",
    tone: "teal",
  },
  warning: {
    icon: <AlertTriangle size={14} strokeWidth={2.4} aria-hidden="true" />,
    label: "Use sparingly",
    tone: "amber",
  },
  "not-compatible": {
    icon: <X size={14} strokeWidth={2.6} aria-hidden="true" />,
    label: "Do not use",
    tone: "red",
  },
}

function formatCurrencyPerLitre(value: number): string {
  return `${new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} / L`
}

export function FuelGradeRow({
  grade,
  compatibility,
  rating,
  pricePerLitre,
  note,
  className,
}: FuelGradeRowProps) {
  const visual = COMPATIBILITY[compatibility]
  const classes = [styles.row, styles[`compat-${compatibility}`], className]
    .filter(Boolean)
    .join(" ")
  return (
    <tr className={classes}>
      <th scope="row" className={styles.gradeCell}>
        <span className={styles.glyph} aria-hidden="true">
          <Fuel size={14} strokeWidth={2.2} />
        </span>
        <span className={styles.gradeBody}>
          <strong>{FUEL_GRADE_LABEL[grade]}</strong>
          <span className={styles.rating}>{rating}</span>
        </span>
      </th>
      <td className={styles.compatCell}>
        <span className={[styles.statusBadge, styles[`badge-${compatibility}`]].join(" ")}>
          {visual.icon}
          <span>{visual.label}</span>
        </span>
      </td>
      <td className={styles.priceCell}>
        {pricePerLitre != null ? formatCurrencyPerLitre(pricePerLitre) : "—"}
      </td>
      <td className={styles.tagCell}>
        <Chip label={FUEL_GRADE_LABEL[grade]} tone={FUEL_GRADE_TONE[grade]} />
      </td>
      {note ? (
        <td className={styles.noteCell} colSpan={1}>
          <span className={styles.note}>{note}</span>
        </td>
      ) : (
        <td className={styles.noteCell} />
      )}
    </tr>
  )
}

export default FuelGradeRow
