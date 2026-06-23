import styles from "./manual-review-banner.module.css"

export interface ManualReviewBannerProps {
  /** Headline label, e.g. "Under manual review by compliance team". */
  title: string
  /** Body copy explaining the next step. */
  body: string
  /** ETA chip text, e.g. "~ 2 business days". */
  eta: string
  /** Reference number / case ID for tracking. */
  reference: string
  /** Contact CTA href — e.g. mailto:compliance@verridian.ai. */
  contactHref: string
  /** Contact CTA label. */
  contactLabel?: string
  className?: string
}

export function ManualReviewBanner({
  title,
  body,
  eta,
  reference,
  contactHref,
  contactLabel = "Contact compliance",
  className,
}: ManualReviewBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} role="alert">
      <span className={styles.iconWrap} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.2" fill="currentColor" />
        </svg>
      </span>

      <div className={styles.copy}>
        <span className={styles.kicker}>Manual review</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.etaChip}>
          <span className={styles.etaLabel}>ETA</span>
          <span className={styles.etaValue}>{eta}</span>
        </span>
        <span className={styles.reference}>{reference}</span>
        <a className={styles.contactCta} href={contactHref}>
          {contactLabel}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  )
}

export default ManualReviewBanner
