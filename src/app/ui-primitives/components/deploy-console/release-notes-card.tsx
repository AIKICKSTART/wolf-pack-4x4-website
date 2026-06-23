import {
  RELEASE_CHANGE_LABEL,
  RELEASE_CHANGE_TONE,
  type ReleaseChange,
  type ReleaseNotes,
} from "./deploy-console-types"
import styles from "./release-notes-card.module.css"
import shell from "./deploy-console.module.css"

export interface ReleaseNotesCardProps {
  notes: ReleaseNotes
  className?: string
}

function toneClassFor(change: ReleaseChange): string {
  switch (RELEASE_CHANGE_TONE[change.kind]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    case "violet":
      return shell.toneViolet
    default:
      return shell.toneNeutral
  }
}

export function ReleaseNotesCard({ notes, className }: ReleaseNotesCardProps) {
  const breakingCount = notes.changes.filter((change) => change.kind === "breaking").length
  const securityCount = notes.changes.filter((change) => change.kind === "security").length
  const headerTone =
    breakingCount > 0
      ? shell.toneRed
      : securityCount > 0
      ? shell.toneAmber
      : shell.toneTeal

  return (
    <article
      className={[shell.shell, headerTone, styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Release notes for ${notes.version}`}
    >
      <header className={styles.head}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>Release notes</span>
          <h3 className={styles.title}>
            <span className={shell.mono}>{notes.version}</span>
            {notes.codename ? <span className={styles.codename}>· “{notes.codename}”</span> : null}
          </h3>
          <p className={shell.subtitle}>
            Released <span className={shell.tabular}>{notes.releasedAt}</span>
          </p>
        </div>
        <div className={styles.headChips}>
          {breakingCount > 0 ? (
            <span className={[shell.chip, shell.toneRed].join(" ")}>
              {breakingCount} breaking
            </span>
          ) : null}
          {securityCount > 0 ? (
            <span className={[shell.chip, shell.toneAmber].join(" ")}>
              {securityCount} security
            </span>
          ) : null}
          <span className={[shell.chip, shell.toneTeal].join(" ")}>
            {notes.changes.length} changes
          </span>
        </div>
      </header>

      {notes.summary ? (
        <p className={styles.summary}>{notes.summary}</p>
      ) : null}

      {breakingCount > 0 ? (
        <div className={styles.breakingCallout} role="note">
          <span className={[shell.chip, shell.toneRed].join(" ")}>Breaking</span>
          <p>
            This release contains <strong>{breakingCount}</strong> breaking change
            {breakingCount === 1 ? "" : "s"}. Audit the integrations before promoting to
            production.
          </p>
        </div>
      ) : null}

      <ul className={styles.changes}>
        {notes.changes.map((change, idx) => {
          const toneCls = toneClassFor(change)
          return (
            <li key={`${change.kind}-${idx}`} className={[styles.change, toneCls].join(" ")}>
              <span className={[shell.chip, toneCls].join(" ")}>
                {RELEASE_CHANGE_LABEL[change.kind]}
              </span>
              <span className={styles.changeTitle}>{change.title}</span>
              {change.prNumber ? (
                <span className={styles.pr}>#{change.prNumber}</span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default ReleaseNotesCard
