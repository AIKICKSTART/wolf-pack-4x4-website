import { AlertTriangle, Eye, GitCompare, History } from "lucide-react"
import type { CSSProperties } from "react"

import {
  REVISION_ACTION_LABEL,
  REVISION_ACTION_TONE,
  TONE_HEX,
  type RevisionEntry,
} from "./cms-types"

import styles from "./revision-timeline.module.css"

export interface RevisionTimelineProps {
  entries: ReadonlyArray<RevisionEntry>
  loading?: boolean
  error?: string
  className?: string
}

export function RevisionTimeline({
  entries,
  loading = false,
  error,
  className,
}: RevisionTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Revision history">
      <header className={styles.header}>
        <span className={styles.kicker}>Revision history · {entries.length}</span>
        <span className={styles.title}>Versions of this page</span>
      </header>

      <div className={styles.list} role="list">
        {error ? (
          <div className={styles.error} role="alert">
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
            <strong>Timeline unavailable</strong>
            <span>{error}</span>
          </div>
        ) : loading ? (
          <div className={styles.empty}>
            <History size={16} strokeWidth={2} aria-hidden="true" />
            Replaying history…
          </div>
        ) : entries.length === 0 ? (
          <div className={styles.empty}>No revisions yet</div>
        ) : (
          entries.map((entry) => {
            const tone = TONE_HEX[REVISION_ACTION_TONE[entry.action]]
            return (
              <article
                key={entry.id}
                className={styles.entry}
                role="listitem"
                aria-label={`${entry.author.name} ${REVISION_ACTION_LABEL[entry.action].toLowerCase()}`}
                style={{ "--avatar-tone": tone } as CSSProperties}
              >
                <span className={styles.avatar} aria-hidden="true">
                  {entry.author.initials}
                </span>
                <div className={styles.body}>
                  <div className={styles.headRow}>
                    <span className={styles.author}>{entry.author.name}</span>
                    <span className={styles.role}>{entry.author.role}</span>
                    <span className={styles.tag}>{REVISION_ACTION_LABEL[entry.action]}</span>
                    {entry.isLive ? <span className={styles.live}>Live</span> : null}
                  </div>
                  <p className={styles.summary}>{entry.summary}</p>
                  <span className={styles.timestamp}>{entry.timestamp}</span>
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.actionBtn} aria-label="View revision">
                    <Eye size={11} strokeWidth={2.4} aria-hidden="true" /> View
                  </button>
                  <button type="button" className={styles.actionBtn} aria-label="Diff revision">
                    <GitCompare size={11} strokeWidth={2.4} aria-hidden="true" /> Diff
                  </button>
                </div>
              </article>
            )
          })
        )}
      </div>

      <footer className={styles.footer}>
        <span>30-day retention</span>
        <span>{entries.filter((e) => e.isLive).length > 0 ? "Live version pinned" : "No live version"}</span>
      </footer>
    </section>
  )
}

export default RevisionTimeline
