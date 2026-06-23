import styles from "./email-digest-preview.module.css"

export interface EmailDigestPreviewProps {
  senderName: string
  senderEmail?: string
  subject: string
  preheader?: string
  excerpt?: string
  timestamp: string
  tags?: ReadonlyArray<string>
  unread?: boolean
  starred?: boolean
  className?: string
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function EmailDigestPreview({
  senderName,
  senderEmail,
  subject,
  preheader,
  excerpt,
  timestamp,
  tags,
  unread = false,
  starred = false,
  className,
}: EmailDigestPreviewProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-unread={unread ? "true" : "false"}
      aria-label={`Email from ${senderName}: ${subject}`}
    >
      <span className={styles.senderAvatar} aria-hidden="true">
        {initialsOf(senderName)}
      </span>
      <div className={styles.body}>
        <div className={styles.metaRow}>
          <span className={styles.sender} title={senderEmail}>
            {senderName}
          </span>
          <time className={styles.timestamp}>{timestamp}</time>
        </div>
        <h4 className={styles.subject}>{subject}</h4>
        {preheader && <p className={styles.preheader}>{preheader}</p>}
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className={styles.tagRow}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.rightCol}>
        <button
          type="button"
          className={styles.starBtn}
          aria-pressed={starred}
          aria-label={starred ? "Unstar email" : "Star email"}
        >
          {starred ? "★" : "☆"}
        </button>
      </div>
    </article>
  )
}

export default EmailDigestPreview
