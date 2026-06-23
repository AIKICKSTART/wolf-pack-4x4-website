"use client"

import styles from "./onboarding-email-reminder.module.css"

interface OnboardingEmailReminderProps {
  /** Eyebrow label, e.g. "Up next in your inbox". */
  kicker?: string
  /** When the email sends, e.g. "Sends Wednesday 9am AEST". */
  sendsAt: string
  /** Subject line as it'll appear in inbox. */
  subject: string
  /** From / sender. */
  from: string
  /** A short preview/snippet of the email body. */
  preview: string
  /** Optional pause / opt-out link label. */
  pauseLabel?: string
  /** Pause action href. */
  pauseHref?: string
  /** Click handler when no href. */
  onPause?: () => void
  className?: string
}

export function OnboardingEmailReminder({
  kicker = "Next email reminder",
  sendsAt,
  subject,
  from,
  preview,
  pauseLabel = "Pause reminders",
  pauseHref,
  onPause,
  className,
}: OnboardingEmailReminderProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={subject}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <span className={styles.sendsAt}>
          <span aria-hidden="true">◷</span> {sendsAt}
        </span>
      </header>

      <div className={styles.envelope}>
        <div className={styles.envHead}>
          <span className={styles.envFromLabel}>From</span>
          <span className={styles.envFrom}>{from}</span>
        </div>
        <div className={styles.envSubjectRow}>
          <span className={styles.envSubjectLabel}>Subject</span>
          <h3 className={styles.envSubject}>{subject}</h3>
        </div>
        <p className={styles.envPreview}>{preview}</p>
        <span className={styles.envSeam} aria-hidden="true" />
      </div>

      <footer className={styles.foot}>
        {pauseHref ? (
          <a className={styles.pauseLink} href={pauseHref}>
            {pauseLabel}
          </a>
        ) : (
          <button type="button" className={styles.pauseLink} onClick={onPause}>
            {pauseLabel}
          </button>
        )}
      </footer>
    </article>
  )
}

export default OnboardingEmailReminder
