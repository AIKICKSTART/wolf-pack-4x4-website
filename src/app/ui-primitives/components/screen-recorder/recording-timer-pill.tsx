import styles from "./recording-timer-pill.module.css"

interface RecordingTimerPillProps {
  /** Elapsed time in seconds. */
  elapsedSec: number
  /** Optional bandwidth chip value, e.g. "4.2 Mbps". */
  bandwidthLabel?: string
  /** Visual emphasis — `floating` adds drop shadow + scanline. */
  variant?: "inline" | "floating"
}

function formatHMS(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const hh = Math.floor(total / 3600)
  const mm = Math.floor((total % 3600) / 60)
  const ss = total % 60
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`
}

export function RecordingTimerPill({
  elapsedSec,
  bandwidthLabel,
  variant = "floating",
}: RecordingTimerPillProps) {
  return (
    <div
      className={[styles.wrap, styles[`variant-${variant}`]].join(" ")}
      role="status"
      aria-live="polite"
      aria-label={`Recording elapsed ${formatHMS(elapsedSec)}`}
    >
      <span className={styles.pulseDot} aria-hidden="true" />
      <span className={styles.label}>REC</span>
      <span className={styles.elapsed}>{formatHMS(elapsedSec)}</span>
      {bandwidthLabel ? (
        <>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.bandwidth}>
            <span className={styles.bandwidthGlyph} aria-hidden="true">↑</span>
            {bandwidthLabel}
          </span>
        </>
      ) : null}
    </div>
  )
}
