"use client"

import { useCallback, useState } from "react"

import { RolloutSlider } from "../feature-flags/rollout-slider"
import { Chip } from "../primitives/chip"

import styles from "./holdout-group-toggle.module.css"

export interface HoldoutAudienceFilter {
  id: string
  label: string
  /** When true the audience is included in the holdout. */
  enabled: boolean
}

export interface HoldoutGroupToggleProps {
  /** Initial enabled state. */
  defaultEnabled?: boolean
  /** Initial holdout percent (0..100). */
  defaultPercent?: number
  audiences: ReadonlyArray<HoldoutAudienceFilter>
  onChange?: (next: {
    enabled: boolean
    percent: number
    audiences: ReadonlyArray<HoldoutAudienceFilter>
  }) => void
  className?: string
}

export function HoldoutGroupToggle({
  defaultEnabled = true,
  defaultPercent = 10,
  audiences,
  onChange,
  className,
}: HoldoutGroupToggleProps) {
  const [enabled, setEnabled] = useState<boolean>(defaultEnabled)
  const [percent, setPercent] = useState<number>(defaultPercent)
  const [audienceState, setAudienceState] =
    useState<ReadonlyArray<HoldoutAudienceFilter>>(audiences)

  const emit = useCallback(
    (next: {
      enabled?: boolean
      percent?: number
      audiences?: ReadonlyArray<HoldoutAudienceFilter>
    }) => {
      const merged = {
        enabled: next.enabled ?? enabled,
        percent: next.percent ?? percent,
        audiences: next.audiences ?? audienceState,
      }
      onChange?.(merged)
    },
    [enabled, percent, audienceState, onChange],
  )

  const handleToggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      emit({ enabled: next })
      return next
    })
  }, [emit])

  const handlePercent = useCallback(
    (next: number) => {
      setPercent(next)
      emit({ percent: next })
    },
    [emit],
  )

  const toggleAudience = useCallback(
    (id: string) => {
      setAudienceState((prev) => {
        const next = prev.map((a) =>
          a.id === id ? { ...a, enabled: !a.enabled } : a,
        )
        emit({ audiences: next })
        return next
      })
    },
    [emit],
  )

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Holdout group settings"
    >
      <div className={styles.head}>
        <span className={styles.kicker}>Holdout group</span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Holdout group enabled"
          className={[styles.switch, enabled ? styles.switchOn : ""].join(" ")}
          onClick={handleToggle}
        >
          <span className={styles.switchThumb} aria-hidden="true" />
          <span className={styles.switchText}>{enabled ? "On" : "Off"}</span>
        </button>
      </div>

      <div className={enabled ? undefined : styles.disabled}>
        <RolloutSlider
          label="Holdout percent"
          value={percent}
          onChange={handlePercent}
          snap
          hint="0-100% — held out from exposure"
        />
      </div>

      <div className={styles.audienceRow}>
        <span className={styles.label}>Audience filters</span>
        <div className={styles.chips}>
          {audienceState.map((aud) => (
            <Chip
              key={aud.id}
              label={aud.label}
              tone={aud.enabled ? "teal" : "neutral"}
              selected={aud.enabled}
              onSelect={() => toggleAudience(aud.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HoldoutGroupToggle
