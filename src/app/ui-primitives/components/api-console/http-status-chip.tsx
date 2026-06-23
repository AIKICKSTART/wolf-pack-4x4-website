import { classifyStatus, REASON_PHRASE, type HttpStatusCode, type HttpStatusClass } from "./api-console-types"

import styles from "./http-status-chip.module.css"

interface HttpStatusChipProps {
  code: HttpStatusCode | number
  /** Override the reason phrase. Defaults to the IANA phrase for known codes. */
  reason?: string
  /** Compact mode hides the reason phrase and only shows the numeric code. */
  compact?: boolean
  className?: string
}

const CLASS_TONE: Record<HttpStatusClass, string> = {
  "2xx": styles.tone2xx,
  "3xx": styles.tone3xx,
  "4xx": styles.tone4xx,
  "5xx": styles.tone5xx,
}

function lookupReason(code: number): string {
  if (code in REASON_PHRASE) {
    return REASON_PHRASE[code as HttpStatusCode]
  }
  return "Status"
}

export function HttpStatusChip({ code, reason, compact = false, className }: HttpStatusChipProps) {
  const statusClass = classifyStatus(code)
  const label = reason ?? lookupReason(code)
  const classes = [styles.chip, CLASS_TONE[statusClass], compact && styles.compact, className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} role="status" aria-label={`HTTP ${code} ${label}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.code}>{code}</span>
      {!compact && <span className={styles.reason}>{label}</span>}
    </span>
  )
}

export default HttpStatusChip
