"use client"

import { ProgressLinear } from "../primitives/progress-linear"

import {
  BULK_KIND_LABEL,
  BULK_STATUS_TONE,
  formatEta,
  type BulkJob,
  type BulkJobStatus,
  type CdnTone,
} from "./asset-cdn-types"

import styles from "./bulk-process-job-row.module.css"

interface BulkProcessJobRowProps {
  job: BulkJob
  onPause?: (job: BulkJob) => void
  onResume?: (job: BulkJob) => void
  onCancel?: (job: BulkJob) => void
  className?: string
}

const STATUS_LABEL: Record<BulkJobStatus, string> = {
  queued: "Queued",
  running: "Running",
  paused: "Paused",
  complete: "Complete",
  failed: "Failed",
}

const TONE_TO_PROGRESS: Record<CdnTone, "red" | "amber" | "teal" | "green"> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "teal",
}

const TONE_CLASS: Record<CdnTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function BulkProcessJobRow({
  job,
  onPause,
  onResume,
  onCancel,
  className,
}: BulkProcessJobRowProps) {
  const tone = BULK_STATUS_TONE[job.status]
  const classes = [styles.row, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Bulk job ${BULK_KIND_LABEL[job.kind]}, ${STATUS_LABEL[job.status]}`}
    >
      <header className={styles.head}>
        <span className={styles.kindBadge}>{BULK_KIND_LABEL[job.kind]}</span>
        <span className={styles.id} title={job.id}>
          {job.id}
        </span>
        <span className={styles.status}>{STATUS_LABEL[job.status]}</span>
      </header>

      <div className={styles.progressBlock}>
        <ProgressLinear
          value={job.progress}
          tone={TONE_TO_PROGRESS[tone]}
          variant={job.status === "running" ? "striped" : job.status === "queued" ? "indeterminate" : "solid"}
          className={styles.progress}
        />
        <span className={styles.progressValue}>{job.progress}%</span>
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Done</dt>
          <dd className={styles.statValue}>{job.done.toLocaleString("en-AU")}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Total</dt>
          <dd className={styles.statValue}>{job.total.toLocaleString("en-AU")}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Failed</dt>
          <dd className={`${styles.statValue} ${job.failed > 0 ? styles.statFailed : ""}`}>
            {job.failed.toLocaleString("en-AU")}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>ETA</dt>
          <dd className={styles.statValue}>
            {job.status === "complete" ? "—" : formatEta(job.etaSec)}
          </dd>
        </div>
      </dl>

      <div className={styles.actions}>
        {job.status === "running" ? (
          <button type="button" className={styles.action} onClick={() => onPause?.(job)}>
            Pause
          </button>
        ) : null}
        {job.status === "paused" ? (
          <button type="button" className={`${styles.action} ${styles.actionPrimary}`} onClick={() => onResume?.(job)}>
            Resume
          </button>
        ) : null}
        {job.status !== "complete" && job.status !== "failed" ? (
          <button
            type="button"
            className={`${styles.action} ${styles.actionDanger}`}
            onClick={() => onCancel?.(job)}
            aria-label={`Cancel ${BULK_KIND_LABEL[job.kind]} job`}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default BulkProcessJobRow
