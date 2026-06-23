import { RefreshCcw, Slash } from "lucide-react"

import { HttpStatusChip } from "../api-console/http-status-chip"
import type { ErrorCodeEntry } from "./api-explorer-types"

import styles from "./error-code-row.module.css"

interface ErrorCodeRowProps extends ErrorCodeEntry {
  className?: string
}

export function ErrorCodeRow({
  code,
  httpStatus,
  title,
  description,
  retryGuidance,
  retryable,
  className,
}: ErrorCodeRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article className={classes} aria-label={`Error ${code}`}>
      <div className={styles.head}>
        <HttpStatusChip code={httpStatus} compact />
        <code className={styles.code}>{code}</code>
        <span className={styles.title}>{title}</span>
        <span
          className={[styles.retryFlag, retryable ? styles.retryYes : styles.retryNo].join(" ")}
        >
          {retryable ? (
            <RefreshCcw size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Slash size={11} strokeWidth={2.4} aria-hidden="true" />
          )}
          {retryable ? "Retryable" : "Do not retry"}
        </span>
      </div>
      <p className={styles.desc}>{description}</p>
      <p className={styles.guidance}>
        <span className={styles.guidanceLabel}>Guidance</span>
        <span className={styles.guidanceBody}>{retryGuidance}</span>
      </p>
    </article>
  )
}

export default ErrorCodeRow
