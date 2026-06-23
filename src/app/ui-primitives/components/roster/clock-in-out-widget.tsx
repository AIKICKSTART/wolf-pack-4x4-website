"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import styles from "./clock-in-out-widget.module.css"

export type ClockState = "clocked-out" | "clocked-in" | "on-break"

interface ClockInOutWidgetProps {
  /** Initial state — defaults to "clocked-out". */
  initialState?: ClockState
  /** Already-elapsed shift time when this widget mounts, e.g. "06:42". */
  elapsedLabel?: string
  /** Already-used break time, e.g. "00:18 of 00:30". */
  breakLabel?: string
  onStateChange?: (state: ClockState) => void
  className?: string
}

const STATE_LABEL: Record<ClockState, string> = {
  "clocked-out": "Clocked out",
  "clocked-in": "On shift",
  "on-break": "On break",
}

export function ClockInOutWidget({
  initialState = "clocked-out",
  elapsedLabel = "00:00",
  breakLabel = "00:00 of 00:30",
  onStateChange,
  className,
}: ClockInOutWidgetProps) {
  const [state, setState] = useState<ClockState>(initialState)

  const updateState = (next: ClockState) => {
    setState(next)
    onStateChange?.(next)
  }

  const classes = [styles.widget, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label="Clock in and out"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Time clock</span>
        <Chip
          label={STATE_LABEL[state]}
          tone={state === "clocked-in" ? "green" : state === "on-break" ? "amber" : "neutral"}
        />
      </header>

      <div className={styles.readout}>
        <strong className={styles.elapsed}>{elapsedLabel}</strong>
        <span className={styles.elapsedLabel}>Shift elapsed</span>
      </div>

      <div className={styles.breakRow}>
        <span className={styles.kicker}>Break</span>
        <strong>{breakLabel}</strong>
      </div>

      <div className={styles.actions}>
        {state === "clocked-out" ? (
          <button
            type="button"
            className={styles.btnIn}
            onClick={() => updateState("clocked-in")}
          >
            Clock in
          </button>
        ) : (
          <>
            {state === "clocked-in" ? (
              <button
                type="button"
                className={styles.btnBreak}
                onClick={() => updateState("on-break")}
              >
                Start break
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnBreak}
                onClick={() => updateState("clocked-in")}
              >
                End break
              </button>
            )}
            <button
              type="button"
              className={styles.btnOut}
              onClick={() => updateState("clocked-out")}
            >
              Clock out
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export default ClockInOutWidget
