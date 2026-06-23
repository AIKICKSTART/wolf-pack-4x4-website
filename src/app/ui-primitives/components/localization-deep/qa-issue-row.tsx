"use client"

import { Chip } from "../primitives/chip"
import { isRtlTag } from "../localization/localization-types"

import styles from "./qa-issue-row.module.css"
import {
  QA_KIND_LABEL,
  QA_SEVERITY_TONE,
  type LocalizationTone,
  type QaIssueKind,
  type QaIssueSeverity,
} from "./localization-deep-types"

export interface QaIssueRowProps {
  /** Translation key affected. */
  translationKey: string
  /** Locale where the issue was detected. */
  locale: string
  /** Issue category. */
  kind: QaIssueKind
  /** Severity bucket. */
  severity: QaIssueSeverity
  /** One-line summary of the issue. */
  message: string
  /** Optional offending string snippet for context. */
  snippet?: string
  /** Optional rule code, e.g. "L10N-VAR-001". */
  ruleCode?: string
  /** Optional dismiss handler. */
  onDismiss?: () => void
  /** Optional resolve handler. */
  onResolve?: () => void
}

const SEVERITY_LABEL: Record<QaIssueSeverity, string> = {
  info: "Info",
  warning: "Warning",
  error: "Error",
}

function chipToneFor(severity: QaIssueSeverity): LocalizationTone {
  return QA_SEVERITY_TONE[severity]
}

export function QaIssueRow({
  translationKey,
  locale,
  kind,
  severity,
  message,
  snippet,
  ruleCode,
  onDismiss,
  onResolve,
}: QaIssueRowProps) {
  const dir = isRtlTag(locale) ? "rtl" : "ltr"
  const tone = chipToneFor(severity)

  return (
    <article
      className={styles.row}
      data-severity={severity}
      aria-label={`${SEVERITY_LABEL[severity]} on ${translationKey} (${locale})`}
    >
      <div className={styles.identityCell}>
        <div className={styles.head}>
          <span className={styles.locale}>{locale}</span>
          <Chip label={SEVERITY_LABEL[severity]} tone={tone} />
          <Chip label={QA_KIND_LABEL[kind]} tone="neutral" />
          {ruleCode ? <span className={styles.ruleCode}>{ruleCode}</span> : null}
        </div>
        <code className={styles.key}>{translationKey}</code>
        <p className={styles.message}>{message}</p>
        {snippet ? (
          <pre className={styles.snippet} dir={dir}>
            <code>{snippet}</code>
          </pre>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resolve}
          onClick={onResolve}
        >
          Resolve
        </button>
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </article>
  )
}

export default QaIssueRow
