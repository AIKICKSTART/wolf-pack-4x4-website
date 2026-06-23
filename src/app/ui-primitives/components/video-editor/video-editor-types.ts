/** Shared types for the video-editor timeline primitives. */

export type TrackKind = "video" | "audio" | "subtitles" | "effect"

export type TransitionKind = "cut" | "cross-fade" | "dissolve" | "wipe"

export type EffectKind =
  | "color"
  | "blur"
  | "stabilize"
  | "denoise"
  | "lut"
  | "audio-eq"
  | "audio-gate"

export type ClipState = "idle" | "selected" | "trimming" | "locked" | "muted"

export type CueMarkerTone = "neutral" | "amber" | "red" | "teal" | "green"

/** A single image used inside a clip thumbnail strip. */
export interface ClipThumbnail {
  /** Display label or alt text for the frame. */
  label: string
  /** Optional source URL. When omitted a procedural placeholder renders. */
  src?: string
}

/** A range of frames on the timeline, expressed in absolute seconds. */
export interface TimelineRange {
  startSec: number
  endSec: number
}

/** Frame rate used for frame chips. Defaults to 24fps in components. */
export interface FrameRate {
  /** Whole frames per second e.g. 24. */
  fps: number
}

/** A subtitle cue rendered inside SubtitleRow. */
export interface SubtitleCue {
  index: number
  startSec: number
  endSec: number
  text: string
}

/** A keyframe-style anchor on a speed-ramp curve. */
export interface SpeedRampAnchor {
  /** Position along the clip, 0–1. */
  t: number
  /** Playback speed multiplier (0.25 – 4). */
  speed: number
}

/** Three-axis grading wheel state — hue 0–360, saturation 0–1. */
export interface GradingWheelState {
  hueDegrees: number
  saturation: number
  lift: number
}

/** Cue marker rendered on the timeline ruler. */
export interface CueMarker {
  index: number
  atSec: number
  label: string
  tone?: CueMarkerTone
  note?: string
}

/** Effect chip parameter (slider). */
export interface EffectParameter {
  label: string
  /** 0–1 normalised value used to drive a slider thumb. */
  value: number
  /** Optional human-readable display value e.g. "0.65" or "-3 dB". */
  display?: string
}

/** Audio sample envelope used by audio-waveform-track. */
export type WaveformSamples = ReadonlyArray<number>

/** Audio level meter snapshot (0–1 per channel). */
export interface AudioLevelSnapshot {
  left: number
  right: number
}

/** Pixels-per-second multiplier — used by primitives that need to know zoom. */
export type ZoomLevel = number
