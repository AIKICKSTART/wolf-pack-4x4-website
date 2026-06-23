import { EqualizerBars } from "./equalizer-bars"
import type { AudioWaveformTone } from "./audio-types"
import styles from "./audio-loading-state.module.css"

interface AudioLoadingStateProps {
  /** Headline shown above the equalizer. */
  title?: string
  /** Detail copy below the equalizer. */
  detail?: string
  tone?: AudioWaveformTone
  className?: string
}

export function AudioLoadingState({
  title = "Buffering…",
  detail = "Streaming the next chunk over the workshop network.",
  tone = "teal",
  className,
}: AudioLoadingStateProps) {
  const classes = [styles.state, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="status" aria-live="polite">
      <EqualizerBars
        bars={12}
        active
        tone={tone}
        height={56}
        ariaLabel="Audio buffering equalizer"
      />
      <div className={styles.copy}>
        <span className={styles.kicker}>Buffer</span>
        <strong className={styles.title}>{title}</strong>
        <span className={styles.detail}>{detail}</span>
      </div>
    </div>
  )
}

export default AudioLoadingState
