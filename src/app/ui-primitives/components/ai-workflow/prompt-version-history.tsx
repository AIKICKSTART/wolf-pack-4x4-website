import { GitCommit } from "lucide-react"

import { Sparkline } from "../charts/sparkline"
import {
  formatRate,
  workflowScoreTone,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./prompt-version-history.module.css"

export interface PromptVersionEntry {
  id: string
  /** Version label e.g. "v3.2". */
  version: string
  /** Wall-clock or relative label. */
  timestamp: string
  /** Author handle. */
  author: string
  /** Short summary of what changed in this version. */
  summary: string
  /** Win rate of this version vs prior (0..1). */
  winRate: number
  /** Run count for the win-rate sample. */
  runs: number
  /** Tokens used per run on average. */
  avgTokens: number
  /** Optional trend tail used in the sparkline. */
  trend?: ReadonlyArray<number>
  /** True if this version is currently live. */
  live?: boolean
}

interface PromptVersionHistoryProps {
  title: string
  versions: ReadonlyArray<PromptVersionEntry>
  kicker?: string
  className?: string
}

const TONE_TO_SPARK: Record<
  WorkflowTone,
  "red" | "amber" | "teal" | "green"
> = {
  neutral: "teal",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  violet: "teal",
}

export function PromptVersionHistory({
  title,
  versions,
  kicker = "Prompt history",
  className,
}: PromptVersionHistoryProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={`Prompt version history · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <GitCommit size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.count}>
          {versions.length} version{versions.length === 1 ? "" : "s"}
        </span>
      </header>

      <ol className={styles.timeline} aria-label="Prompt versions, newest first">
        {versions.map((entry, idx) => {
          const isLatest = idx === 0
          const tone = workflowScoreTone(entry.winRate * 100)
          return (
            <li
              key={entry.id}
              className={styles.row}
              data-live={entry.live ? "true" : "false"}
              data-latest={isLatest ? "true" : "false"}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.spine} aria-hidden="true" />
              <div className={styles.body}>
                <header className={styles.rowHead}>
                  <span className={styles.versionBlock}>
                    <span className={styles.versionTag}>{entry.version}</span>
                    {entry.live ? (
                      <span className={styles.liveChip}>Live</span>
                    ) : null}
                    <span className={styles.timestamp}>{entry.timestamp}</span>
                    <span className={styles.author}>· {entry.author}</span>
                  </span>
                  <span
                    className={styles.winRate}
                    data-tone={tone}
                    aria-label={`Win rate ${formatRate(entry.winRate)} over ${entry.runs} runs`}
                  >
                    {formatRate(entry.winRate)}
                  </span>
                </header>
                <p className={styles.summary}>{entry.summary}</p>
                <footer className={styles.meta}>
                  <span className={styles.metaChip}>
                    {entry.runs.toLocaleString()} runs
                  </span>
                  <span className={styles.metaChip}>
                    {entry.avgTokens.toLocaleString()} tok/run
                  </span>
                  {entry.trend && entry.trend.length > 0 ? (
                    <span className={styles.sparkWrap}>
                      <Sparkline
                        points={[...entry.trend]}
                        tone={TONE_TO_SPARK[tone]}
                        width={88}
                        height={28}
                        ariaLabel={`Win-rate trend for ${entry.version}`}
                      />
                    </span>
                  ) : null}
                </footer>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default PromptVersionHistory
