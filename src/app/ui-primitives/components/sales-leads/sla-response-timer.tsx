"use client"

import { useEffect, useState } from "react"
import { AlarmClock } from "lucide-react"

import { ProgressRadial } from "../primitives/progress-radial"
import type { SlaTone } from "./sales-leads-types"

import styles from "./sla-response-timer.module.css"

interface SlaResponseTimerProps {
  leadName: string
  /** ISO timestamp of when the lead came in. */
  receivedAtIso: string
  /** Target response SLA in minutes. */
  slaMinutes: number
  /** Optional override for "now" — testable. Defaults to Date.now(). */
  nowMs?: number
  className?: string
}

const TONE_LABEL: Record<SlaTone, string> = {
  fresh: "Fresh",
  "due-soon": "Due soon",
  overdue: "Overdue",
  missed: "Missed SLA",
}

const TONE_VAR: Record<SlaTone, "green" | "amber" | "red"> = {
  fresh: "green",
  "due-soon": "amber",
  overdue: "red",
  missed: "red",
}

function pickTone(remainingRatio: number): SlaTone {
  if (remainingRatio >= 0.5) return "fresh"
  if (remainingRatio > 0.15) return "due-soon"
  if (remainingRatio > -0.25) return "overdue"
  return "missed"
}

function formatRemaining(seconds: number): string {
  const abs = Math.abs(seconds)
  const m = Math.floor(abs / 60)
  const s = Math.floor(abs % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function SlaResponseTimer({
  leadName,
  receivedAtIso,
  slaMinutes,
  nowMs,
  className,
}: SlaResponseTimerProps) {
  const [now, setNow] = useState<number>(() => nowMs ?? Date.now())

  useEffect(() => {
    if (nowMs !== undefined) {
      return
    }

    const tick = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(tick)
  }, [nowMs])

  const currentNow = nowMs ?? now
  const receivedMs = Date.parse(receivedAtIso)
  const slaMs = slaMinutes * 60_000
  const elapsedMs = currentNow - receivedMs
  const remainingMs = slaMs - elapsedMs
  const remainingRatio = remainingMs / slaMs
  const tone = pickTone(remainingRatio)
  const remainingSec = remainingMs / 1000
  const isOverdue = remainingSec < 0

  // ProgressRadial visualises remaining time. When overdue we keep the full ring.
  const value = Math.max(0, Math.min(slaMs, slaMs - Math.max(0, elapsedMs)))

  const classes = [styles.timer, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-tone={tone}
      aria-label={`SLA response timer for ${leadName}: ${TONE_LABEL[tone]}, ${formatRemaining(
        remainingSec,
      )}`}
    >
      <ProgressRadial
        size="lg"
        tone={TONE_VAR[tone]}
        value={value}
        max={slaMs}
        thickness={6}
      />
      <div className={styles.body}>
        <span className={styles.label}>
          <AlarmClock size={12} strokeWidth={2.2} aria-hidden="true" />
          {TONE_LABEL[tone]}
        </span>
        <span className={styles.lead}>{leadName}</span>
        <span className={styles.countdown} aria-live="polite">
          {isOverdue ? "+" : ""}
          {formatRemaining(remainingSec)}
        </span>
        <span className={styles.meta}>
          SLA {slaMinutes} min · {isOverdue ? "over by" : "remaining"}
        </span>
      </div>
    </article>
  )
}

export default SlaResponseTimer
