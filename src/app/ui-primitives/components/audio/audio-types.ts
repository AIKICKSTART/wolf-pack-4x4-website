export type AudioWaveformVariant = "compact" | "detailed"
export type AudioWaveformTone = "red" | "amber" | "teal" | "green" | "neutral"

/**
 * A normalized list of amplitude samples (0–1) used to render a waveform.
 * Typically 24–256 samples; primitives downsample or pad as needed.
 */
export type AudioWaveformSamples = ReadonlyArray<number>

export interface AudioTrack {
  id: string
  title: string
  /** Optional artist / host / source label. */
  artist?: string
  /** Optional album / show / collection label. */
  album?: string
  /** Audio source URL. Primitives must tolerate missing src gracefully. */
  src?: string
  /** Duration in seconds. May be 0 when unknown. */
  duration: number
  /** Pre-computed waveform samples for fast first paint. */
  waveform?: AudioWaveformSamples
  /** Optional cover-art src. Renders gradient placeholder when omitted. */
  cover?: string
  /** Optional accent tone applied to play controls and waveform fill. */
  tone?: AudioWaveformTone
}

export interface AudioChapter {
  id: string
  /** Chapter start time in seconds. */
  start: number
  /** Chapter end time in seconds. */
  end: number
  title: string
}

export interface AudioOutputDevice {
  id: string
  label: string
  /** Device kind used for icon and copy hints. */
  kind: "speakers" | "headphones" | "bluetooth" | "av-receiver" | "phone" | "tv"
  /** Whether this device is currently active. */
  active?: boolean
  /** Optional friendly subtitle, e.g. signal strength. */
  subtitle?: string
}

export interface VoiceMemoEntry {
  id: string
  label: string
  /** Recording duration in seconds. */
  duration: number
  /** ISO timestamp of when the memo was captured. */
  capturedAt: string
}
