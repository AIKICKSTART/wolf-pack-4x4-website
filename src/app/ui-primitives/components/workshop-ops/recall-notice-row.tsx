import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  RECALL_SEVERITY_LABEL,
  RECALL_SEVERITY_TONE,
  RECALL_STATUS_LABEL,
  type RecallRow,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./recall-notice-row.module.css"

interface RecallNoticeRowProps {
  recall: RecallRow
  className?: string
}

const STATUS_TONE: Record<
  RecallRow["status"],
  "neutral" | "amber" | "teal" | "green"
> = {
  open: "neutral",
  "reaching-out": "amber",
  scheduled: "teal",
  completed: "green",
}

const SEVERITY_PROGRESS_TONE: Record<
  RecallRow["severity"],
  "red" | "amber" | "teal" | "green"
> = {
  low: "teal",
  moderate: "amber",
  high: "red",
  "stop-drive": "red",
}

export function RecallNoticeRow({ recall, className }: RecallNoticeRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const severityTone = opsToneToChip(RECALL_SEVERITY_TONE[recall.severity])
  const statusTone = STATUS_TONE[recall.status]
  const reachedPct = recall.affectedCount
    ? (recall.reachedCount / recall.affectedCount) * 100
    : 0
  const isStopDrive = recall.severity === "stop-drive"

  return (
    <article
      className={classes}
      data-severity={recall.severity}
      data-status={recall.status}
      aria-label={`${recall.manufacturer} recall ${recall.campaignCode}: ${recall.title}`}
    >
      <header className={styles.head}>
        <div className={styles.banner}>
          <span className={styles.manufacturer}>{recall.manufacturer}</span>
          <span className={styles.campaign}>{recall.campaignCode}</span>
        </div>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>
            {isStopDrive ? (
              <span className={styles.stopBadge} aria-hidden="true">
                STOP-DRIVE
              </span>
            ) : null}
            {recall.title}
          </h3>
          <span className={styles.subtitle}>
            {recall.affectedYearRange} · {recall.affectedModel} ·{" "}
            <time>{recall.noticeIssuedAt}</time>
          </span>
        </div>
        <div className={styles.chips}>
          <Chip
            label={RECALL_SEVERITY_LABEL[recall.severity]}
            tone={severityTone}
          />
          <Chip
            label={RECALL_STATUS_LABEL[recall.status]}
            tone={statusTone}
          />
        </div>
      </header>

      <p className={styles.description}>{recall.description}</p>

      <section className={styles.metrics} aria-label="Reach metrics">
        <div className={styles.metricBlock}>
          <span className={styles.metricLabel}>Affected fleet</span>
          <span className={styles.metricValue}>
            {recall.affectedCount.toLocaleString("en-AU")}
          </span>
        </div>
        <div className={styles.metricBlock}>
          <span className={styles.metricLabel}>Reached</span>
          <span className={styles.metricValue}>
            {recall.reachedCount.toLocaleString("en-AU")}
          </span>
        </div>
        <div className={styles.metricBlock}>
          <span className={styles.metricLabel}>Reach %</span>
          <span className={styles.metricValue}>{Math.round(reachedPct)}%</span>
        </div>
      </section>

      <ProgressLinear
        value={reachedPct}
        tone={SEVERITY_PROGRESS_TONE[recall.severity]}
        variant="solid"
      />

      <footer className={styles.foot}>
        <span className={styles.footHint}>
          {recall.affectedCount - recall.reachedCount} customers still to reach
        </span>
        <button type="button" className={styles.reachButton}>
          Send reach-out SMS batch
        </button>
      </footer>
    </article>
  )
}

export default RecallNoticeRow
