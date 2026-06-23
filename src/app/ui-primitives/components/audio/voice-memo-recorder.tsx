"use client"

import { Check, Mic, Square, Trash2 } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"

import styles from "./voice-memo-recorder.module.css"

export type VoiceMemoStatus = "idle" | "recording" | "stopped"

interface VoiceMemoRecorderProps {
  /** Maximum recording length in seconds. */
  maxDuration?: number
  onSave?: (durationSeconds: number) => void
  onDiscard?: () => void
  className?: string
}

const SPIKE_COUNT = 36

function formatElapsed(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00"
  }
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function makeSpikes(seed: number): ReadonlyArray<number> {
  return Array.from({ length: SPIKE_COUNT }, (_, index) => {
    const offset = Math.sin((index + seed) * 0.42) * 0.4
    const swell = Math.sin(seed * 0.09 + index * 0.18) * 0.35
    return Math.max(0.08, Math.min(0.98, 0.5 + offset + swell))
  })
}

export function VoiceMemoRecorder({
  maxDuration = 60,
  onSave,
  onDiscard,
  className,
}: VoiceMemoRecorderProps) {
  const [status, setStatus] = useState<VoiceMemoStatus>("idle")
  const [elapsed, setElapsed] = useState<number>(0)
  const [spikes, setSpikes] = useState<ReadonlyArray<number>>(() => makeSpikes(0))
  const timerRef = useRef<number | null>(null)
  const tickRef = useRef<number>(0)
  const labelId = useId()

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTicker = () => {
    if (timerRef.current !== null) return
    timerRef.current = window.setInterval(() => {
      tickRef.current += 1
      setSpikes(makeSpikes(tickRef.current))
      setElapsed((prev) => {
        const next = prev + 0.2
        if (next >= maxDuration) {
          stopTicker()
          setStatus("stopped")
          return maxDuration
        }
        return next
      })
    }, 200)
  }

  const stopTicker = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const handleRecord = () => {
    if (status === "recording") {
      stopTicker()
      setStatus("stopped")
      return
    }
    setElapsed(0)
    setStatus("recording")
    tickRef.current = 0
    startTicker()
  }

  const handleDiscard = () => {
    stopTicker()
    setStatus("idle")
    setElapsed(0)
    setSpikes(makeSpikes(0))
    onDiscard?.()
  }

  const handleSave = () => {
    stopTicker()
    onSave?.(elapsed)
    setStatus("idle")
    setElapsed(0)
    setSpikes(makeSpikes(0))
  }

  const statusCopy: Record<VoiceMemoStatus, string> = {
    idle: "Tap to record a voice memo",
    recording: "Recording in progress",
    stopped: "Review your memo",
  }

  const classes = [styles.recorder, styles[`status-${status}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      aria-labelledby={labelId}
      data-status={status}
    >
      <header className={styles.head}>
        <span id={labelId} className={styles.kicker}>
          Voice memo
        </span>
        <output className={styles.elapsed} aria-live="polite">
          {formatElapsed(elapsed)}
          <span className={styles.elapsedMax} aria-hidden="true">
            / {formatElapsed(maxDuration)}
          </span>
        </output>
      </header>

      <div
        className={styles.spikeWell}
        role="presentation"
        aria-label={`Voice memo waveform — ${statusCopy[status]}`}
      >
        {spikes.map((sample, index) => (
          <span
            key={index}
            className={styles.spike}
            style={{ height: `${Math.round(sample * 100)}%` }}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className={styles.copy} role="status">
        {statusCopy[status]}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.recordBtn}
          onClick={handleRecord}
          aria-pressed={status === "recording"}
          aria-label={
            status === "recording"
              ? "Stop recording"
              : status === "stopped"
                ? "Record again"
                : "Start recording"
          }
        >
          {status === "recording" ? (
            <Square size={16} strokeWidth={2.6} fill="currentColor" />
          ) : (
            <Mic size={20} strokeWidth={2.4} />
          )}
        </button>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={handleDiscard}
          disabled={status === "idle"}
          aria-label="Discard memo"
        >
          <Trash2 size={14} strokeWidth={2.2} />
          <span>Discard</span>
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleSave}
          disabled={status !== "stopped"}
          aria-label="Save memo"
        >
          <Check size={14} strokeWidth={2.6} />
          <span>Save</span>
        </button>
      </div>
    </section>
  )
}

export default VoiceMemoRecorder
