"use client"

import styles from "./after-record-preview.module.css"

interface AfterRecordPreviewProps {
  /** Title shown above the player. */
  title: string
  /** Duration in seconds. */
  durationSec: number
  /** File size label, e.g. "184 MB" or "1.2 GB". */
  sizeLabel: string
  /** Optional resolution chip, e.g. "1080p · 30fps". */
  resolutionLabel?: string
  /** Optional preview poster URL. */
  posterUrl?: string
  onRetake?: () => void
  onTrim?: () => void
  onSaveShare?: () => void
}

function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const hh = Math.floor(total / 3600)
  const mm = Math.floor((total % 3600) / 60)
  const ss = total % 60
  const pad = (n: number) => n.toString().padStart(2, "0")
  return hh > 0 ? `${pad(hh)}:${pad(mm)}:${pad(ss)}` : `${pad(mm)}:${pad(ss)}`
}

export function AfterRecordPreview({
  title,
  durationSec,
  sizeLabel,
  resolutionLabel = "1080p · 30fps",
  posterUrl,
  onRetake,
  onTrim,
  onSaveShare,
}: AfterRecordPreviewProps) {
  return (
    <section className={styles.card} aria-labelledby="after-record-title">
      <header className={styles.head}>
        <span className={styles.kicker}>Recording captured</span>
        <h3 className={styles.title} id="after-record-title">{title}</h3>
      </header>

      <div className={styles.playerWell}>
        <video
          className={styles.video}
          poster={posterUrl}
          aria-label={`Preview of ${title}`}
          controls
          preload="none"
        >
          <track kind="captions" srcLang="en-AU" label="English (AU)" />
        </video>
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.posterFallback} aria-hidden="true">
          <span className={styles.posterGlyph}>▶</span>
          <span className={styles.posterText}>Preview ready</span>
        </span>
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(durationSec)}</dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>{sizeLabel}</dd>
        </div>
        <div>
          <dt>Format</dt>
          <dd>{resolutionLabel}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={[styles.btn, styles.retake].join(" ")}
          onClick={onRetake}
        >
          <span aria-hidden="true">↺</span> Retake
        </button>
        <button
          type="button"
          className={[styles.btn, styles.trim].join(" ")}
          onClick={onTrim}
        >
          <span aria-hidden="true">✂</span> Trim
        </button>
        <button
          type="button"
          className={[styles.btn, styles.saveShare].join(" ")}
          onClick={onSaveShare}
        >
          <span aria-hidden="true">↗</span> Save &amp; share
        </button>
      </div>
    </section>
  )
}
