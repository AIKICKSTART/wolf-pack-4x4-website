import { AlertOctagon, ChevronRight, Info } from "lucide-react"
import Link from "next/link"

import { Chip } from "../primitives/chip"

import {
  DTC_SEVERITY_LABEL,
  DTC_SEVERITY_TONE,
  DTC_SYSTEM_LABEL,
  type DtcSeverity,
  type DtcSystem,
} from "./vehicle-data-types"
import styles from "./diagnostic-code-row.module.css"

interface DiagnosticCodeRowProps {
  /** Standard OBD-II code, e.g. P0420 or P0171. */
  code: string
  /** Short description ("Catalyst efficiency below threshold"). */
  description: string
  severity: DtcSeverity
  system: DtcSystem
  /** ISO timestamp captured by the scan tool. */
  detectedISO?: string
  /** Optional freeze-frame summary (rpm + load). */
  freezeFrame?: string
  /** Link to the workshop's fix playbook for this DTC. */
  fixHref?: string
  fixLabel?: string
  className?: string
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

export function DiagnosticCodeRow({
  code,
  description,
  severity,
  system,
  detectedISO,
  freezeFrame,
  fixHref,
  fixLabel = "Open playbook",
  className,
}: DiagnosticCodeRowProps) {
  const isCritical = severity === "critical"
  const classes = [styles.row, isCritical ? styles.rowCritical : null, className]
    .filter(Boolean)
    .join(" ")

  return (
    <tr className={classes} {...(isCritical ? { role: "alert" } : {})}>
      <th scope="row" className={styles.codeCell}>
        <span className={styles.glyph} aria-hidden="true">
          {isCritical ? <AlertOctagon size={14} strokeWidth={2.4} /> : <Info size={14} strokeWidth={2.2} />}
        </span>
        <span className={styles.codeId}>{code}</span>
      </th>
      <td className={styles.descCell}>
        <strong className={styles.descTitle}>{description}</strong>
        <span className={styles.descMeta}>
          <span>{DTC_SYSTEM_LABEL[system]}</span>
          {detectedISO ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{formatDate(detectedISO)}</span>
            </>
          ) : null}
          {freezeFrame ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{freezeFrame}</span>
            </>
          ) : null}
        </span>
      </td>
      <td className={styles.sevCell}>
        <Chip
          label={DTC_SEVERITY_LABEL[severity]}
          tone={DTC_SEVERITY_TONE[severity]}
        />
      </td>
      <td className={styles.actionCell}>
        {fixHref ? (
          <Link href={fixHref} className={styles.fixLink}>
            <span>{fixLabel}</span>
            <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        ) : (
          <span className={styles.fixEmpty}>No playbook</span>
        )}
      </td>
    </tr>
  )
}

export default DiagnosticCodeRow
