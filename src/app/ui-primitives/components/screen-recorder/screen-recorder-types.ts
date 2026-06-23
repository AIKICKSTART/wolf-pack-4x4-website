/** Shared types for the screen-recorder primitives (Loom / Snagit style). */

/** Capture sources available to the operator. */
export type RecordMode = "screen+camera" | "screen-only" | "camera-only" | "audio-only"

/** Lifecycle states for the recording flow. */
export type RecordingState =
  | "idle"
  | "arming"
  | "countdown"
  | "recording"
  | "paused"
  | "stopping"
  | "stopped"

/** Status of the post-record transcription pipeline. */
export type TranscriptStatus = "queued" | "processing" | "ready" | "failed"

/** Common output resolutions for the captured viewport. */
export type RecordingResolution = "720p" | "1080p" | "1440p" | "4K"

/** Where the webcam PIP bubble lands relative to the recording region. */
export type BubblePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

/** A capture device exposed to getUserMedia / getDisplayMedia. */
export interface CaptureDevice {
  /** Stable device id. */
  id: string
  /** Human-readable label. */
  label: string
  /** Whether the device is currently the active selection. */
  active?: boolean
  /** Optional channel / interface hint, e.g. "Built-in" or "USB 2.0". */
  subtitle?: string
}

/** Live-annotation tool palette. */
export type AnnotationTool = "pen" | "arrow" | "box" | "text"

/** Share-link privacy posture. */
export type SharePrivacy = "private" | "team" | "public-link"
