import {
  DEPLOY_OUTCOME_LABEL,
  DEPLOY_OUTCOME_TONE,
  type DeployTimelineEntry,
} from "./deploy-console-types"
import styles from "./deploy-timeline.module.css"
import shell from "./deploy-console.module.css"

export interface DeployTimelineProps {
  entries: ReadonlyArray<DeployTimelineEntry>
  caption?: string
  kicker?: string
  className?: string
}

function toneClassFor(entry: DeployTimelineEntry): string {
  switch (DEPLOY_OUTCOME_TONE[entry.outcome]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    default:
      return shell.toneNeutral
  }
}

const TARGET_LABEL: Record<DeployTimelineEntry["target"], string> = {
  production: "Production",
  preview: "Preview",
  staging: "Staging",
}

export function DeployTimeline({
  entries,
  caption = "Deploy timeline",
  kicker = "Deploys",
  className,
}: DeployTimelineProps) {
  return (
    <section
      className={[shell.shell, styles.timeline, className].filter(Boolean).join(" ")}
      aria-label={`${caption} — ${entries.length} deploys`}
    >
      <header className={shell.shellHead}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>{kicker}</span>
          <h3 className={shell.title}>{caption}</h3>
          <p className={shell.subtitle}>
            <span className={shell.tabular}>{entries.length}</span> deploys · most
            recent first
          </p>
        </div>
      </header>

      <ol className={styles.list}>
        {entries.map((entry, idx) => {
          const toneCls = toneClassFor(entry)
          return (
            <li key={entry.id} className={[styles.entry, toneCls].join(" ")}>
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.dot} />
                {idx < entries.length - 1 ? (
                  <span className={styles.line} />
                ) : null}
              </div>
              <article className={styles.card}>
                <header className={styles.cardHead}>
                  <span className={styles.version}>{entry.version}</span>
                  <span className={[shell.chip, toneCls].join(" ")}>
                    {DEPLOY_OUTCOME_LABEL[entry.outcome]}
                  </span>
                  <span className={[shell.chip, shell.chipQuiet].join(" ")}>
                    {TARGET_LABEL[entry.target]}
                  </span>
                  {typeof entry.canaryPercent === "number" ? (
                    <span className={[shell.chip, shell.toneViolet].join(" ")}>
                      Canary {entry.canaryPercent}%
                    </span>
                  ) : null}
                </header>
                <dl className={styles.metaGrid}>
                  <div>
                    <dt>Author</dt>
                    <dd>{entry.author}</dd>
                  </div>
                  <div>
                    <dt>Sha</dt>
                    <dd>
                      <code className={styles.sha}>{entry.sha}</code>
                    </dd>
                  </div>
                  <div>
                    <dt>Started</dt>
                    <dd className={shell.tabular}>{entry.startedAt}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd className={shell.tabular}>{entry.duration}</dd>
                  </div>
                </dl>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default DeployTimeline
