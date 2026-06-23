"use client"

import { useId, useState } from "react"
import type { ChangeEvent } from "react"

import type { TrafficShiftState } from "./deploy-console-types"
import styles from "./traffic-shift-card.module.css"
import shell from "./deploy-console.module.css"

export interface TrafficShiftCardProps {
  initial: TrafficShiftState
  /** Disable inputs for showcase-only / read-only states. */
  readonly?: boolean
  className?: string
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function TrafficShiftCard({
  initial,
  readonly = false,
  className,
}: TrafficShiftCardProps) {
  const [bluePercent, setBluePercent] = useState(clamp(initial.bluePercent))
  const [stickiness, setStickiness] = useState(initial.stickiness)
  const sliderId = useId()
  const stickyId = useId()
  const greenPercent = 100 - bluePercent

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readonly) return
    const value = Number.parseInt(event.target.value, 10)
    if (!Number.isNaN(value)) {
      setBluePercent(clamp(value))
    }
  }

  const handleSnap = (value: number) => () => {
    if (readonly) return
    setBluePercent(clamp(value))
  }

  const handleStickyToggle = () => {
    if (readonly) return
    setStickiness((current) => !current)
  }

  const headingTone =
    bluePercent === 100
      ? shell.toneTeal
      : bluePercent === 0
      ? shell.toneGreen
      : shell.toneViolet

  return (
    <section
      className={[shell.shell, headingTone, styles.card, className].filter(Boolean).join(" ")}
      aria-labelledby={`${sliderId}-label`}
    >
      <header className={styles.head}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>Blue / Green</span>
          <h3 className={shell.title} id={`${sliderId}-label`}>
            Traffic shift
          </h3>
          <p className={shell.subtitle}>
            Steer production traffic between the current (blue) and new (green) revisions.
          </p>
        </div>
        <span className={[shell.chip, headingTone].join(" ")}>
          {bluePercent === 100
            ? "All blue"
            : bluePercent === 0
            ? "All green"
            : "Shifting"}
        </span>
      </header>

      <div className={styles.split} aria-hidden="true">
        <span
          className={styles.splitBlue}
          style={{ flexBasis: `${bluePercent}%` }}
        >
          {bluePercent > 6 ? (
            <>
              <span className={styles.splitLabel}>{initial.blueLabel}</span>
              <span className={styles.splitPercent}>{bluePercent}%</span>
            </>
          ) : null}
        </span>
        <span
          className={styles.splitGreen}
          style={{ flexBasis: `${greenPercent}%` }}
        >
          {greenPercent > 6 ? (
            <>
              <span className={styles.splitLabel}>{initial.greenLabel}</span>
              <span className={styles.splitPercent}>{greenPercent}%</span>
            </>
          ) : null}
        </span>
      </div>

      <div className={styles.sliderRow}>
        <input
          id={sliderId}
          className={styles.slider}
          type="range"
          min={0}
          max={100}
          value={bluePercent}
          step={1}
          onChange={handleSliderChange}
          disabled={readonly}
          aria-label={`Blue / green traffic split — ${bluePercent}% blue, ${greenPercent}% green`}
        />
        <div className={styles.snapButtons} role="group" aria-label="Snap to common splits">
          {[100, 75, 50, 25, 0].map((value) => (
            <button
              key={value}
              type="button"
              className={[
                shell.button,
                shell.buttonGhost,
                bluePercent === value ? styles.snapActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={handleSnap(value)}
              disabled={readonly}
              aria-pressed={bluePercent === value}
            >
              {value === 100
                ? "All blue"
                : value === 0
                ? "All green"
                : `${value}/${100 - value}`}
            </button>
          ))}
        </div>
      </div>

      <footer className={styles.foot}>
        <label className={styles.sticky} htmlFor={stickyId}>
          <span className={shell.sectionLabel}>Session stickiness</span>
          <span
            className={[styles.switch, stickiness ? styles.switchOn : "", headingTone]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <span className={styles.switchThumb} />
          </span>
          <input
            id={stickyId}
            type="checkbox"
            checked={stickiness}
            onChange={handleStickyToggle}
            disabled={readonly}
            className={styles.toggleInput}
            aria-label={`Session stickiness ${stickiness ? "enabled" : "disabled"}`}
          />
          <span className={styles.stickyHint}>
            {stickiness
              ? "Users keep the colour they first hit"
              : "Each request is re-rolled"}
          </span>
        </label>
      </footer>
    </section>
  )
}

export default TrafficShiftCard
