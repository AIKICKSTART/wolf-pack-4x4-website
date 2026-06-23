import { ProgressLinear } from "../primitives/progress-linear"

import {
  TRANSCODE_STATUS_LABEL,
  TRANSCODE_STATUS_TONE,
  VIDEO_CODEC_LABEL,
  VIDEO_PROFILE_LABEL,
  VIDEO_PROFILE_RESOLUTION,
  formatBytes,
  formatEta,
  type CdnTone,
  type VideoTranscodeJob,
} from "./asset-cdn-types"

import styles from "./video-transcode-row.module.css"

interface VideoTranscodeRowProps {
  job: VideoTranscodeJob
  className?: string
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

function getStatusGlyph(progress: number, status: VideoTranscodeJob["status"]): string {
  if (status === "complete") return "✓"
  if (status === "failed") return "!"
  if (status === "queued") return "·"
  if (progress >= 75) return "▰▰▰▰"
  if (progress >= 50) return "▰▰▰▱"
  if (progress >= 25) return "▰▰▱▱"
  return "▰▱▱▱"
}

export function VideoTranscodeRow({ job, className }: VideoTranscodeRowProps) {
  const tone = TRANSCODE_STATUS_TONE[job.status]
  const isActive = job.status === "encoding" || job.status === "uploading"
  const isTerminal = job.status === "complete" || job.status === "failed"
  const classes = [styles.row, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Transcode job ${job.source}, ${TRANSCODE_STATUS_LABEL[job.status]}`}
    >
      <span className={styles.statusDot} aria-hidden="true">
        {getStatusGlyph(job.progress, job.status)}
      </span>

      <div className={styles.meta}>
        <span className={styles.source} title={job.source}>
          {job.source}
        </span>
        <span className={styles.profile}>
          {VIDEO_PROFILE_LABEL[job.profile]} ·{" "}
          <span className={styles.numeric}>
            {VIDEO_PROFILE_RESOLUTION[job.profile]}
          </span>{" "}
          · {VIDEO_CODEC_LABEL[job.codec]}
        </span>
      </div>

      <div className={styles.progressCol}>
        <ProgressLinear
          value={isTerminal && job.status === "complete" ? 100 : job.progress}
          tone={TONE_TO_PROGRESS[tone]}
          variant={isActive && job.progress < 100 ? "striped" : "solid"}
          className={styles.progress}
          label={`${job.progress}%`}
        />
        <span className={styles.progressValue}>{job.progress}%</span>
      </div>

      <div className={styles.right}>
        <span className={styles.statusChip}>
          {TRANSCODE_STATUS_LABEL[job.status]}
        </span>
        <span className={styles.etaLabel}>
          {job.status === "complete"
            ? job.outputSize !== undefined
              ? formatBytes(job.outputSize)
              : "done"
            : job.status === "failed"
              ? "retry"
              : `ETA ${formatEta(job.etaSec)}`}
        </span>
      </div>
    </article>
  )
}

export default VideoTranscodeRow
