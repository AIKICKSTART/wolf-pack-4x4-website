import {
  STATUS_LABEL,
  type ReviewerRef,
  type VerificationStatus,
} from "./kyc-types"
import styles from "./document-verification-status.module.css"

export interface DocumentVerificationStatusProps {
  /** Eyebrow label, e.g. "Document review". */
  kicker: string
  /** Document title, e.g. "NSW driver licence". */
  documentLabel: string
  /** Numeric reference number, e.g. "DOC-204-9913". */
  reference: string
  status: VerificationStatus
  /** ETA chip text, e.g. "~ 18 min". */
  eta?: string
  /** Reviewer reference; appears under the status meta. */
  reviewer?: ReviewerRef
  /** Body copy describing the state. */
  body: string
  className?: string
}

const STATUS_TONE: Record<VerificationStatus, string> = {
  pending: "pending",
  "under-review": "review",
  approved: "approved",
  rejected: "rejected",
  "requires-additional-info": "action",
}

const STATUS_GLYPH: Record<VerificationStatus, string> = {
  pending: "◌",
  "under-review": "⟳",
  approved: "✓",
  rejected: "✕",
  "requires-additional-info": "!",
}

export function DocumentVerificationStatus({
  kicker,
  documentLabel,
  reference,
  status,
  eta,
  reviewer,
  body,
  className,
}: DocumentVerificationStatusProps) {
  const tone = STATUS_TONE[status]
  const classes = [styles.card, styles[`tone_${tone}`], className]
    .filter(Boolean)
    .join(" ")
  const isAlert = status === "rejected" || status === "requires-additional-info"

  return (
    <section
      className={classes}
      data-status={status}
      aria-live="polite"
      role={isAlert ? "alert" : undefined}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>{kicker}</span>
          <h3 className={styles.title}>{documentLabel}</h3>
          <span className={styles.reference}>{reference}</span>
        </div>
        <span className={styles.statusChip} data-tone={tone}>
          <span className={styles.statusGlyph} aria-hidden="true">
            {STATUS_GLYPH[status]}
          </span>
          {STATUS_LABEL[status]}
        </span>
      </header>

      <p className={styles.body}>{body}</p>

      <footer className={styles.foot}>
        {eta ? (
          <span className={styles.etaChip}>
            <span className={styles.etaLabel}>ETA</span>
            <span className={styles.etaValue}>{eta}</span>
          </span>
        ) : null}
        {reviewer ? (
          <span className={styles.reviewer}>
            <span className={styles.reviewerLabel}>Reviewer</span>
            <span className={styles.reviewerName}>{reviewer.name}</span>
            <span className={styles.reviewerTeam}>· {reviewer.team}</span>
          </span>
        ) : null}
      </footer>
    </section>
  )
}

export default DocumentVerificationStatus
