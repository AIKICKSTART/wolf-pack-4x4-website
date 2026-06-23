"use client"

import { useMemo, useState } from "react"

import type { PointInTimeWindow } from "./backup-types"

import styles from "./point-in-time-recovery-slider.module.css"

interface PointInTimeRecoverySliderProps {
  window: PointInTimeWindow
  /** Initial selected timestamp as ISO. Defaults to latest. */
  initialSelected?: string
  /** Lag threshold (seconds) above which a warning is shown. */
  lagWarningThresholdSec?: number
  onChange?: (iso: string) => void
  className?: string
}

function formatLag(lagSec: number): string {
  if (lagSec < 60) return `${lagSec}s`
  if (lagSec < 3600) return `${Math.round(lagSec / 60)}m`
  return `${(lagSec / 3600).toFixed(1)}h`
}

export function PointInTimeRecoverySlider({
  window: pitr,
  initialSelected,
  lagWarningThresholdSec = 600,
  onChange,
  className,
}: PointInTimeRecoverySliderProps) {
  const earliestMs = useMemo(() => new Date(pitr.earliest).getTime(), [pitr.earliest])
  const latestMs = useMemo(() => new Date(pitr.latest).getTime(), [pitr.latest])
  const initialMs = initialSelected ? new Date(initialSelected).getTime() : latestMs
  const [valueMs, setValueMs] = useState<number>(initialMs)

  const pct = latestMs > earliestMs ? ((valueMs - earliestMs) / (latestMs - earliestMs)) * 100 : 100
  const selectedIso = new Date(valueMs).toISOString()
  const lagWarning = pitr.lagSec > lagWarningThresholdSec

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.currentTarget.value)
    setValueMs(next)
    onChange?.(new Date(next).toISOString())
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Point-in-time recovery slider">
      <header className={styles.head}>
        <span className={styles.kicker}>Point-in-time recovery</span>
        <span className={styles.selectedChip}>
          <span className={styles.selectedDot} aria-hidden="true" />
          <time dateTime={selectedIso}>{selectedIso}</time>
        </span>
        {lagWarning ? (
          <span className={styles.lagChip} role="alert">
            Replication lag {formatLag(pitr.lagSec)}
          </span>
        ) : (
          <span className={styles.lagOk}>Lag {formatLag(pitr.lagSec)}</span>
        )}
      </header>

      <div className={styles.axis}>
        <div className={styles.track}>
          <span className={styles.trackFill} style={{ width: `${pct}%` }} />
          <span className={styles.handle} style={{ left: `${pct}%` }} aria-hidden="true" />
        </div>
        <input
          type="range"
          className={styles.range}
          role="slider"
          min={earliestMs}
          max={latestMs}
          step={1000}
          value={valueMs}
          onChange={handleChange}
          aria-label="Restore to point in time"
          aria-valuemin={earliestMs}
          aria-valuemax={latestMs}
          aria-valuenow={valueMs}
          aria-valuetext={selectedIso}
        />
      </div>

      <footer className={styles.bounds}>
        <span>
          <span className={styles.boundLabel}>Earliest</span>
          <time dateTime={pitr.earliest}>{pitr.earliest}</time>
        </span>
        <span>
          <span className={styles.boundLabel}>Latest</span>
          <time dateTime={pitr.latest}>{pitr.latest}</time>
        </span>
      </footer>
    </section>
  )
}

export default PointInTimeRecoverySlider
