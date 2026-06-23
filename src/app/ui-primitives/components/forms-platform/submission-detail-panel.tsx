import type {
  FormsPlatformTone,
  SubmissionAnswerRow,
  SubmissionAuditEvent,
  SubmissionStatus,
} from "./forms-platform-types"
import styles from "./submission-detail-panel.module.css"

interface SubmissionDetailPanelProps {
  /** Form title — e.g. "Book a service". */
  formName: string
  /** Submitter display name. */
  submitter: string
  /** Optional submitter email. */
  submitterEmail?: string
  /** Submission status — drives the toned chip in the meta row. */
  status: SubmissionStatus
  /** Submission timestamp label. */
  submittedAt: string
  /** Workshop / location label. */
  workshop?: string
  /** Source channel — e.g. "Embed · Website". */
  sourceLabel?: string
  /** Ordered answer rows. */
  answers: ReadonlyArray<SubmissionAnswerRow>
  /** Audit events surfaced in the side rail. */
  audit: ReadonlyArray<SubmissionAuditEvent>
  className?: string
}

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  approved: "Approved",
  rejected: "Rejected",
  spam: "Spam",
  archived: "Archived",
}

const TONE_DOT_CLASS: Record<FormsPlatformTone, string> = {
  red: styles.auditDotRed,
  amber: styles.auditDotAmber,
  teal: styles.auditDotTeal,
  green: styles.auditDotGreen,
  violet: styles.auditDotViolet,
  neutral: styles.auditDotNeutral,
}

export function SubmissionDetailPanel({
  formName,
  submitter,
  submitterEmail,
  status,
  submittedAt,
  workshop,
  sourceLabel,
  answers,
  audit,
  className,
}: SubmissionDetailPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`${formName} submission detail`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Submission detail</span>
          <h2 className={styles.title}>{formName}</h2>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              From <strong>{submitter}</strong>
            </span>
            {submitterEmail ? (
              <span className={styles.metaItem}>
                <strong>{submitterEmail}</strong>
              </span>
            ) : null}
            <span className={styles.metaItem}>
              Status <strong>{STATUS_LABEL[status]}</strong>
            </span>
            <span className={styles.metaItem}>
              Submitted <strong>{submittedAt}</strong>
            </span>
            {workshop ? (
              <span className={styles.metaItem}>
                Workshop <strong>{workshop}</strong>
              </span>
            ) : null}
            {sourceLabel ? (
              <span className={styles.metaItem}>
                Source <strong>{sourceLabel}</strong>
              </span>
            ) : null}
          </div>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
          >
            Approve
          </button>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
          >
            Reject
          </button>
          <button type="button" className={styles.actionBtn}>
            Reply
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.answers}>
          <h3 className={styles.sectionLabel}>
            Answers · {answers.length}
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
            {answers.map((row) => {
              const rowClass = [
                styles.answerRow,
                row.flagged ? styles.answerRowFlagged : "",
              ]
                .filter(Boolean)
                .join(" ")
              return (
                <li key={row.id} className={rowClass}>
                  <span className={styles.answerLabel}>{row.label}</span>
                  <span>
                    <span className={styles.answerValue}>
                      {row.value}
                      {row.flagged ? (
                        <span className={styles.flagChip}>flag</span>
                      ) : null}
                    </span>
                    {row.meta ? (
                      <span className={styles.answerMeta}>{row.meta}</span>
                    ) : null}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <aside className={styles.audit} aria-label="Audit log">
          <h3 className={styles.sectionLabel}>Audit log</h3>
          <ol className={styles.auditList}>
            {audit.map((event) => {
              const dotClass = [
                styles.auditDot,
                TONE_DOT_CLASS[event.tone ?? "neutral"],
              ]
                .filter(Boolean)
                .join(" ")
              return (
                <li key={event.id} className={styles.auditItem}>
                  <span className={dotClass} aria-hidden="true" />
                  <div className={styles.auditBody}>
                    <span className={styles.auditMessage}>{event.message}</span>
                    <span className={styles.auditMeta}>
                      <span>{event.actor}</span>
                      <span>· {event.timestamp}</span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </aside>
      </div>
    </section>
  )
}
