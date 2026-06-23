import type { FormPublishTarget, PublishMode } from "./forms-platform-types"
import styles from "./form-publish-card.module.css"

interface FormPublishCardProps {
  /** Form being published — drives the title. */
  formName: string
  /** Publishable share link. */
  shareLink: string
  /** Embed snippet preview — must be already escaped HTML / JSX text. */
  embedSnippet: string
  /** Tab targets surfaced as a radio group. */
  targets: ReadonlyArray<FormPublishTarget>
  /** Active tab id. */
  activeTargetId: PublishMode
  /** Whether the form is live. */
  published: boolean
  className?: string
}

export function FormPublishCard({
  formName,
  shareLink,
  embedSnippet,
  targets,
  activeTargetId,
  published,
  className,
}: FormPublishCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const activeTarget = targets.find((target) => target.id === activeTargetId)

  return (
    <section className={classes} aria-label={`Publish ${formName}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Publish form</span>
          <h3 className={styles.title}>{formName}</h3>
        </div>
        {published ? (
          <span className={styles.publishedBadge} aria-label="Form is published">
            <span className={styles.publishedDot} aria-hidden="true" />
            Live
          </span>
        ) : null}
      </header>

      <div
        className={styles.tabs}
        role="radiogroup"
        aria-label="Publish target"
      >
        {targets.map((target) => {
          const isActive = target.id === activeTargetId
          const tabClass = [
            styles.tab,
            isActive ? styles.tabActive : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <button
              key={target.id}
              type="button"
              className={tabClass}
              role="radio"
              aria-checked={isActive}
            >
              <span className={styles.tabLabel}>{target.label}</span>
              <span className={styles.tabDescription}>{target.description}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.snippet}>
        <div className={styles.snippetHead}>
          <span>{activeTarget?.label ?? "Embed"} · snippet</span>
          <button type="button" className={styles.copyBtn}>
            Copy
          </button>
        </div>
        <pre className={styles.snippetPre}>{embedSnippet}</pre>
      </div>

      <div className={styles.shareRow}>
        <a className={styles.shareLink} href={shareLink}>
          {shareLink}
        </a>
        <button type="button" className={styles.copyBtn}>
          Copy link
        </button>
      </div>
    </section>
  )
}
