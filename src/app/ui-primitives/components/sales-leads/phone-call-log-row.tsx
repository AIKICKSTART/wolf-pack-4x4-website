"use client"

import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Play } from "lucide-react"
import { useId, useState } from "react"

import { Chip } from "../primitives/chip"
import type { CallOutcome } from "./sales-leads-types"

import styles from "./phone-call-log-row.module.css"

export type CallDirection = "inbound" | "outbound" | "missed"

interface PhoneCallLogRowProps {
  id: string
  callerName: string
  callerNumber: string
  /** Vehicle / topic context — short. */
  topic?: string
  durationSeconds: number
  outcome: CallOutcome
  direction: CallDirection
  /** ISO timestamp of when the call took place. */
  timestamp: string
  timestampIso?: string
  recordingHref?: string
  className?: string
}

const OUTCOME_LABEL: Record<CallOutcome, string> = {
  connected: "Connected",
  voicemail: "Voicemail",
  "no-answer": "No answer",
  callback: "Callback set",
  booked: "Booked in",
  "not-interested": "Not interested",
}

const OUTCOME_TONE: Record<
  CallOutcome,
  "green" | "amber" | "red" | "teal" | "neutral"
> = {
  connected: "green",
  voicemail: "amber",
  "no-answer": "neutral",
  callback: "teal",
  booked: "green",
  "not-interested": "red",
}

function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

function DirectionIcon({ direction }: { direction: CallDirection }) {
  if (direction === "inbound") {
    return <PhoneIncoming size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  if (direction === "outbound") {
    return <PhoneOutgoing size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  return <PhoneMissed size={14} strokeWidth={2.2} aria-hidden="true" />
}

export function PhoneCallLogRow({
  id,
  callerName,
  callerNumber,
  topic,
  durationSeconds,
  outcome,
  direction,
  timestamp,
  timestampIso,
  recordingHref,
  className,
}: PhoneCallLogRowProps) {
  const [playing, setPlaying] = useState(false)
  const labelId = useId()
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-call-id={id}
      data-direction={direction}
      aria-labelledby={labelId}
    >
      <div className={styles.directionGlyph} aria-hidden="true">
        <DirectionIcon direction={direction} />
      </div>
      <div className={styles.identity}>
        <span id={labelId} className={styles.callerName}>
          {callerName}
        </span>
        <a className={styles.callerNumber} href={`tel:${callerNumber.replace(/\s/g, "")}`}>
          {callerNumber}
        </a>
        {topic ? <span className={styles.topic}>{topic}</span> : null}
      </div>
      <div className={styles.meta}>
        <time className={styles.timestamp} dateTime={timestampIso ?? timestamp}>
          {timestamp}
        </time>
        <span className={styles.duration}>{formatDuration(durationSeconds)}</span>
      </div>
      <Chip label={OUTCOME_LABEL[outcome]} tone={OUTCOME_TONE[outcome]} />
      {recordingHref ? (
        <button
          type="button"
          className={styles.recording}
          onClick={() => setPlaying((prev) => !prev)}
          aria-pressed={playing}
          aria-label={playing ? "Pause recording" : "Play recording"}
        >
          {playing ? (
            <span className={styles.playingBars} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          ) : (
            <Play size={12} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span className={styles.recordingLabel}>
            {playing ? "Playing" : "Recording"}
          </span>
        </button>
      ) : (
        <span className={styles.noRecording}>
          <Phone size={12} strokeWidth={2} aria-hidden="true" />
          <span>No recording</span>
        </span>
      )}
    </article>
  )
}

export default PhoneCallLogRow
