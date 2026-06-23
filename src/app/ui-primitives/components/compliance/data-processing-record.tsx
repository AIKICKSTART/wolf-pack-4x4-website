import {
  LEGAL_BASIS_LABEL,
  type LegalBasis,
} from "./compliance-types"
import styles from "./data-processing-record.module.css"

export interface DataProcessingRecordProps {
  /** ROPA / Article-30-style record id, e.g. "ROPA-2026-014". */
  recordId: string
  /** Activity name, e.g. "Workshop quoting + invoicing". */
  activityName: string
  /** Data category, e.g. "Customer + vehicle identifiers". */
  dataCategory: string
  /** Purpose of processing. */
  purpose: string
  /** Legal basis under the Privacy Act 1988 / GDPR. */
  legalBasis: LegalBasis
  /** Retention duration, e.g. "7 years post-service (AU tax)". */
  retention: string
  /** Recipient list. */
  recipients: ReadonlyArray<string>
  /** Cross-border transfer description. Null means kept onshore. */
  crossBorderTransfer?: string
  className?: string
}

export function DataProcessingRecord({
  recordId,
  activityName,
  dataCategory,
  purpose,
  legalBasis,
  retention,
  recipients,
  crossBorderTransfer,
  className,
}: DataProcessingRecordProps) {
  return (
    <article
      className={[styles.record, className].filter(Boolean).join(" ")}
      aria-labelledby={`dpr-${recordId}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Record of processing</span>
        <h3 id={`dpr-${recordId}`} className={styles.title}>
          {activityName}
        </h3>
        <code className={styles.id}>{recordId}</code>
      </header>

      <dl className={styles.list}>
        <dt>Data category</dt>
        <dd>{dataCategory}</dd>

        <dt>Purpose</dt>
        <dd>{purpose}</dd>

        <dt>Legal basis</dt>
        <dd>
          <span className={styles.legalBasis}>{LEGAL_BASIS_LABEL[legalBasis]}</span>
        </dd>

        <dt>Retention</dt>
        <dd>{retention}</dd>

        <dt>Recipients</dt>
        <dd>
          <ul className={styles.recipientList}>
            {recipients.map((r) => (
              <li key={r} className={styles.recipientChip}>
                {r}
              </li>
            ))}
          </ul>
        </dd>

        <dt>Transfers</dt>
        <dd>
          {crossBorderTransfer ? (
            <span className={styles.crossBorder}>
              <span className={styles.crossBorderDot} aria-hidden="true" />
              {crossBorderTransfer}
            </span>
          ) : (
            <span className={styles.domestic}>
              <span className={styles.domesticDot} aria-hidden="true" />
              Onshore (AU) — no cross-border transfer
            </span>
          )}
        </dd>
      </dl>
    </article>
  )
}

export default DataProcessingRecord
