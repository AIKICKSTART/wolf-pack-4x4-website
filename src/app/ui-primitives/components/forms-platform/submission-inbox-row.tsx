import type { SubmissionInboxEntry, SubmissionStatus } from "./forms-platform-types"
import styles from "./submission-inbox-row.module.css"

interface SubmissionInboxRowProps {
  entry: SubmissionInboxEntry
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

const STATUS_CLASS: Record<SubmissionStatus, string> = {
  new: styles.statusNew,
  reviewing: styles.statusReviewing,
  approved: styles.statusApproved,
  rejected: styles.statusRejected,
  spam: styles.statusSpam,
  archived: styles.statusArchived,
}

export function SubmissionInboxRow({ entry, className }: SubmissionInboxRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const dotClass = [
    styles.unreadDot,
    entry.unread ? styles.unreadDotOn : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      aria-label={`Open submission from ${entry.submitter} for ${entry.formName}`}
    >
      <span
        className={dotClass}
        aria-hidden="true"
      />
      <span className={styles.formCell}>
        <span className={styles.formName}>{entry.formName}</span>
        <span className={styles.preview}>{entry.preview}</span>
      </span>
      <span className={styles.submitterCell}>
        <span className={styles.submitterName}>{entry.submitter}</span>
        {entry.submitterEmail ? (
          <span className={styles.submitterEmail}>{entry.submitterEmail}</span>
        ) : null}
      </span>
      {entry.amount ? (
        <span className={styles.amount} aria-label={`Amount ${entry.amount}`}>
          {entry.amount}
        </span>
      ) : (
        <span />
      )}
      <span
        className={`${styles.statusChip} ${STATUS_CLASS[entry.status]}`}
        aria-label={`Status ${STATUS_LABEL[entry.status]}`}
      >
        {STATUS_LABEL[entry.status]}
      </span>
      <time className={styles.date} dateTime={entry.submittedAt}>
        {entry.submittedAt}
      </time>
    </button>
  )
}
