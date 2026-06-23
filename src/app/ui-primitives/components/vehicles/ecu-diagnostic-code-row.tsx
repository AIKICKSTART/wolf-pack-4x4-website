import { AlertOctagon, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Chip, type ChipTone } from "../primitives/chip"

import {
  ECU_SEVERITY_LABEL,
  ECU_SEVERITY_TONE,
  type EcuSeverity,
} from "./vehicles-types"
import styles from "./ecu-diagnostic-code-row.module.css"

interface EcuDiagnosticCodeRowProps {
  /** Standard OBD-II code, e.g. P0420. */
  code: string
  description: string
  severity: EcuSeverity
  /** ISO timestamp when the code was first flagged. */
  detectedISO?: string
  /** Number of times the code has triggered. */
  occurrenceCount?: number
  /** Optional link to the suggested fix. */
  suggestedFixHref?: string
  suggestedFixLabel?: string
  className?: string
}

const TONE_TO_CHIP: Record<ReturnType<typeof toneOf>, ChipTone> = {
  green: "green",
  amber: "amber",
  red: "red",
  teal: "teal",
  neutral: "neutral",
}

function toneOf(severity: EcuSeverity) {
  return ECU_SEVERITY_TONE[severity]
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function EcuDiagnosticCodeRow({
  code,
  description,
  severity,
  detectedISO,
  occurrenceCount,
  suggestedFixHref,
  suggestedFixLabel = "Open fix",
  className,
}: EcuDiagnosticCodeRowProps) {
  const isCritical = severity === "critical"
  const classes = [styles.row, isCritical ? styles.critical : null, className]
    .filter(Boolean)
    .join(" ")
  const tone = TONE_TO_CHIP[toneOf(severity)]

  return (
    <tr
      className={classes}
      {...(isCritical ? { role: "alert" } : {})}
    >
      <th scope="row" className={styles.codeCell}>
        <span className={styles.codeGlyph} aria-hidden="true">
          {isCritical ? <AlertOctagon size={14} strokeWidth={2.4} /> : code[0]}
        </span>
        <span className={styles.codeId}>{code}</span>
      </th>
      <td className={styles.descCell}>
        <strong className={styles.descTitle}>{description}</strong>
        {detectedISO || occurrenceCount != null ? (
          <span className={styles.descMeta}>
            {detectedISO ? formatDate(detectedISO) : null}
            {occurrenceCount != null
              ? ` · seen ${occurrenceCount}x`
              : null}
          </span>
        ) : null}
      </td>
      <td className={styles.sevCell}>
        <Chip label={ECU_SEVERITY_LABEL[severity]} tone={tone} />
      </td>
      <td className={styles.actionCell}>
        {suggestedFixHref ? (
          <Link href={suggestedFixHref} className={styles.fixLink}>
            <span>{suggestedFixLabel}</span>
            <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        ) : (
          <span className={styles.fixEmpty}>No fix linked</span>
        )}
      </td>
    </tr>
  )
}

export default EcuDiagnosticCodeRow
