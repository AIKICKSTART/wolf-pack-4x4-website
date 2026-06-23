"use client"

import {
  Activity,
  Hand,
  Mic,
  MicOff,
  Power,
  ShieldAlert,
  Square,
  Users,
} from "lucide-react"
import { useCallback, useId, useState } from "react"

import styles from "./host-backstage-panel.module.css"

export type BackstageStreamPhase = "offline" | "starting" | "live" | "ending"

interface BackstageOpsCounters {
  pendingRaiseHands: number
  reportsToReview: number
  newSupporters: number
}

interface HostBackstagePanelProps {
  /** Current stream phase determines the start/stop button label + color. */
  phase: BackstageStreamPhase
  /** Counters surfaced in the ops strip. */
  counters: BackstageOpsCounters
  /** Initial state for the mic toggle. */
  micInitial?: boolean
  /** Initial state for the slow-mode toggle. */
  slowModeInitial?: boolean
  /** Optional callback when phase change requested. */
  onTogglePhase?: (next: BackstageStreamPhase) => void
  /** Optional callback when slow-mode toggled. */
  onSlowModeChange?: (next: boolean) => void
  /** Optional callback when broadcaster mic muted. */
  onMicChange?: (next: boolean) => void
  /** Optional callback when "raise viewer" action fired. */
  onPromoteViewer?: () => void
  /** Optional callback when "review reports" action fired. */
  onReviewReports?: () => void
  className?: string
}

const PHASE_LABEL: Record<BackstageStreamPhase, string> = {
  offline: "Go live",
  starting: "Starting…",
  live: "End broadcast",
  ending: "Ending…",
}

const PHASE_TONE: Record<BackstageStreamPhase, string> = {
  offline: "tonePrimary",
  starting: "toneStarting",
  live: "toneDanger",
  ending: "toneStarting",
}

export function HostBackstagePanel({
  phase,
  counters,
  micInitial = true,
  slowModeInitial = false,
  onTogglePhase,
  onSlowModeChange,
  onMicChange,
  onPromoteViewer,
  onReviewReports,
  className,
}: HostBackstagePanelProps) {
  const headingId = useId()
  const [micOn, setMicOn] = useState<boolean>(micInitial)
  const [slowMode, setSlowMode] = useState<boolean>(slowModeInitial)

  const handlePhase = useCallback(() => {
    const next: BackstageStreamPhase = phase === "live" ? "ending" : "starting"
    onTogglePhase?.(next)
  }, [phase, onTogglePhase])

  const handleMic = useCallback(() => {
    setMicOn((prev) => {
      const next = !prev
      onMicChange?.(next)
      return next
    })
  }, [onMicChange])

  const handleSlow = useCallback(() => {
    setSlowMode((prev) => {
      const next = !prev
      onSlowModeChange?.(next)
      return next
    })
  }, [onSlowModeChange])

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-labelledby={headingId}>
      <header className={styles.head}>
        <span className={styles.kicker}>Backstage · Host controls</span>
        <h3 id={headingId} className={styles.title}>Mufflermen broadcast deck</h3>
      </header>

      <div className={styles.primaryRow}>
        <button
          type="button"
          className={[styles.phase, styles[PHASE_TONE[phase]]].join(" ")}
          onClick={handlePhase}
          aria-pressed={phase === "live"}
        >
          {phase === "live" ? (
            <Square size={14} strokeWidth={2.2} aria-hidden="true" fill="currentColor" />
          ) : (
            <Power size={14} strokeWidth={2.2} aria-hidden="true" />
          )}
          {PHASE_LABEL[phase]}
        </button>

        <div className={styles.toggleGroup} role="group" aria-label="Stream tools">
          <button
            type="button"
            className={[styles.toggle, micOn ? styles.toggleOn : ""].filter(Boolean).join(" ")}
            aria-pressed={micOn}
            aria-label={micOn ? "Mute host mic" : "Unmute host mic"}
            onClick={handleMic}
          >
            {micOn ? (
              <Mic size={13} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <MicOff size={13} strokeWidth={2.2} aria-hidden="true" />
            )}
            <span>Host mic</span>
          </button>
          <button
            type="button"
            className={[styles.toggle, slowMode ? styles.toggleOn : ""].filter(Boolean).join(" ")}
            aria-pressed={slowMode}
            aria-label={slowMode ? "Disable slow mode" : "Enable slow mode"}
            onClick={handleSlow}
          >
            <Activity size={13} strokeWidth={2.2} aria-hidden="true" />
            <span>Slow mode</span>
          </button>
        </div>
      </div>

      <div className={styles.ops} role="group" aria-label="Operations queue">
        <button type="button" className={styles.opsItem} onClick={onPromoteViewer}>
          <span className={styles.opsIcon} aria-hidden="true">
            <Hand size={13} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className={styles.opsBody}>
            <span className={styles.opsValue}>{counters.pendingRaiseHands}</span>
            <span className={styles.opsLabel}>Raised hands</span>
          </span>
          <span className={styles.opsAction}>Promote</span>
        </button>
        <button type="button" className={styles.opsItem} onClick={onReviewReports}>
          <span className={styles.opsIcon} aria-hidden="true">
            <ShieldAlert size={13} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className={styles.opsBody}>
            <span className={styles.opsValue}>{counters.reportsToReview}</span>
            <span className={styles.opsLabel}>Mod reports</span>
          </span>
          <span className={styles.opsAction}>Review</span>
        </button>
        <span className={styles.opsItem}>
          <span className={styles.opsIcon} aria-hidden="true">
            <Users size={13} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className={styles.opsBody}>
            <span className={styles.opsValue}>{counters.newSupporters}</span>
            <span className={styles.opsLabel}>New supporters</span>
          </span>
        </span>
      </div>
    </section>
  )
}

export default HostBackstagePanel
