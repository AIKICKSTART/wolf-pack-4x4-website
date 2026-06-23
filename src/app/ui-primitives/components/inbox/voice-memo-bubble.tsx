import { Play } from "lucide-react"

import { AudioWaveform } from "../audio/audio-waveform"
import type {
  AudioWaveformSamples,
  AudioWaveformTone,
} from "../audio/audio-types"

import styles from "./voice-memo-bubble.module.css"
import type { MessageSender } from "./inbox-types"

interface VoiceMemoBubbleProps {
  sender: MessageSender
  /** Pre-computed waveform samples (0-1) for the memo. */
  samples?: AudioWaveformSamples
  /** Playback progress (0-1). Defaults to 0. */
  progress?: number
  /** Memo duration label, e.g. "0:38". */
  duration: string
  /** Optional caption for context. */
  caption?: string
  /** Author label rendered for screen readers. */
  authorName?: string
  className?: string
}

export function VoiceMemoBubble({
  sender,
  samples,
  progress = 0,
  duration,
  caption,
  authorName,
  className,
}: VoiceMemoBubbleProps) {
  const isMine = sender === "me"
  const tone: AudioWaveformTone = isMine ? "red" : "teal"
  const classes = [
    styles.bubble,
    isMine ? styles.bubbleMine : styles.bubbleTheirs,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={
        authorName
          ? `Voice memo from ${authorName}, ${duration}`
          : `Voice memo, ${duration}`
      }
    >
      <button
        type="button"
        className={styles.playBtn}
        aria-label="Play voice memo"
      >
        <Play size={16} strokeWidth={2.4} fill="currentColor" aria-hidden="true" />
      </button>
      <div className={styles.body}>
        <AudioWaveform
          samples={samples}
          progress={progress}
          variant="compact"
          tone={tone}
          ariaLabel="Voice memo waveform"
        />
        <div className={styles.metaRow}>
          <span className={styles.duration}>{duration}</span>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
        </div>
      </div>
    </article>
  )
}

export default VoiceMemoBubble
