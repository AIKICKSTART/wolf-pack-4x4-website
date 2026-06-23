import { BellOff } from "lucide-react"

import styles from "./unsubscribe-page-template.module.css"

interface UnsubscribePageTemplateProps {
  kicker?: string
  headline: string
  subline: string
  listName: string
  recipientEmail: string
  resubscribeHref: string
  managePreferencesHref: string
  footnote?: string
  className?: string
}

export function UnsubscribePageTemplate({
  kicker = "Unsubscribed",
  headline,
  subline,
  listName,
  recipientEmail,
  resubscribeHref,
  managePreferencesHref,
  footnote = "If this was a mistake, you can re-subscribe at any time.",
  className,
}: UnsubscribePageTemplateProps) {
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Unsubscribe confirmation">
      <article className={styles.card}>
        <span className={styles.iconBox} aria-hidden="true">
          <BellOff size={26} strokeWidth={2} />
        </span>
        <header>
          <span className={styles.kicker}>{kicker}</span>
          <h1 className={styles.headline}>{headline}</h1>
        </header>
        <p className={styles.sub}>{subline}</p>

        <div className={styles.context}>
          <span className={styles.contextLabel}>List</span>
          <p className={styles.contextValue}>{listName}</p>
          <span className={styles.contextLabel}>Email</span>
          <p className={styles.contextValue}>{recipientEmail}</p>
        </div>

        <div className={styles.actions}>
          <a href={resubscribeHref} className={styles.primaryBtn}>
            Re-subscribe
          </a>
          <a href={managePreferencesHref} className={styles.secondaryBtn}>
            Manage preferences
          </a>
        </div>

        <p className={styles.foot}>{footnote}</p>
      </article>
    </section>
  )
}

export default UnsubscribePageTemplate
