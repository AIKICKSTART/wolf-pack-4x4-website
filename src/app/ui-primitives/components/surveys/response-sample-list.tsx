import type { ResponseSample } from "./survey-types"

import styles from "./response-sample-list.module.css"

interface ResponseSampleListProps {
  samples: ReadonlyArray<ResponseSample>
  /** Override the surface heading. */
  title?: string
  className?: string
}

export function ResponseSampleList({
  samples,
  title = "Recent responses",
  className,
}: ResponseSampleListProps) {
  const classes = [styles.surface, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count}>{samples.length} shown</span>
      </header>

      <ul className={styles.list}>
        {samples.map((sample) => {
          const completion = Math.max(0, Math.min(100, sample.completion))
          return (
            <li key={sample.id} className={styles.item}>
              <span
                className={[styles.avatar, sample.anonymous ? styles.avatarAnon : null]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              >
                {sample.anonymous ? "?" : initials(sample.respondent)}
              </span>
              <div className={styles.itemBody}>
                <span className={styles.name}>
                  {sample.anonymous ? "Anonymous" : sample.respondent}
                  {sample.anonymous ? <span className={styles.anonBadge}>ANON</span> : null}
                </span>
                <span className={styles.time}>{sample.timestamp}</span>
              </div>
              <div className={styles.progress} aria-label={`${completion}% complete`}>
                <span className={styles.progressTrack}>
                  <span
                    className={styles.progressFill}
                    style={{ width: `${completion}%` }}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.progressLabel}>{completion}%</span>
              </div>
              <button type="button" className={styles.open} aria-label={`Open response from ${sample.anonymous ? "anonymous respondent" : sample.respondent}`}>
                Open
                <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                  <path d="M4 2 8 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const second = parts[1]?.[0] ?? ""
  return `${first}${second}`.toUpperCase() || "??"
}
