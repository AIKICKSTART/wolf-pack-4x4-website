"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  NPS_TIMING_LABEL,
  TOUR_TONE_TO_CHIP,
  type NpsTimingRule,
  type TourTone,
} from "./tour-types"
import styles from "./nps-prompt-trigger.module.css"

export interface NpsPromptConfig {
  timing: NpsTimingRule
  /** Audience segment label. */
  segment: string
  /** Survey question copy. */
  question: string
  /** Optional sampling rate 0..100. */
  samplingRate?: number
  /** Optional cool-down days between prompts. */
  cooldownDays?: number
}

interface NpsPromptTriggerProps {
  config: NpsPromptConfig
  onChange: (patch: Partial<NpsPromptConfig>) => void
  tone?: TourTone
  className?: string
}

const TIMING_OPTIONS: ReadonlyArray<NpsTimingRule> = [
  "after-quote",
  "after-service",
  "weekly-active",
  "monthly-active",
  "custom",
]

const COOLDOWN_PRESETS: ReadonlyArray<number> = [30, 60, 90, 180]

export function NpsPromptTrigger({
  config,
  onChange,
  tone = "green",
  className,
}: NpsPromptTriggerProps) {
  const segmentId = useId()
  const questionId = useId()
  const samplingPct = config.samplingRate ?? 100
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="NPS prompt configurator"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>NPS prompt · Net promoter</span>
        <h3 className={styles.title}>Net Promoter Score trigger</h3>
        <p className={styles.subtitle}>
          Configure when, who, and what we ask. Recurrence respects cool-down to keep customers
          unbothered.
        </p>
      </header>

      <div className={styles.block}>
        <span className={styles.label}>Timing</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="NPS timing rule">
          {TIMING_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={NPS_TIMING_LABEL[option]}
              tone={TOUR_TONE_TO_CHIP[tone]}
              selected={config.timing === option}
              onSelect={() => onChange({ timing: option })}
            />
          ))}
        </div>
      </div>

      <label htmlFor={segmentId} className={styles.field}>
        <span className={styles.label}>Segment</span>
        <input
          id={segmentId}
          className={styles.input}
          type="text"
          value={config.segment}
          onChange={(event) => onChange({ segment: event.target.value })}
          placeholder="e.g. Fleet operators on monthly plan"
        />
      </label>

      <label htmlFor={questionId} className={styles.field}>
        <span className={styles.label}>Question</span>
        <textarea
          id={questionId}
          className={styles.textarea}
          rows={2}
          value={config.question}
          onChange={(event) => onChange({ question: event.target.value })}
        />
      </label>

      <div className={styles.row}>
        <div className={styles.col}>
          <span className={styles.label}>Sampling rate</span>
          <ProgressLinear
            value={samplingPct}
            max={100}
            tone="teal"
            label={`${samplingPct}% of eligible users`}
            showLabel
          />
          <div className={styles.sliderRow}>
            <input
              className={styles.slider}
              type="range"
              min={5}
              max={100}
              step={5}
              value={samplingPct}
              onChange={(event) => onChange({ samplingRate: Number(event.target.value) })}
              aria-label="Sampling rate percentage"
            />
          </div>
        </div>
        <div className={styles.col}>
          <span className={styles.label}>Cool-down</span>
          <div className={styles.chipRow} role="radiogroup" aria-label="NPS cool-down">
            {COOLDOWN_PRESETS.map((days) => (
              <Chip
                key={days}
                label={`${days}d`}
                tone={TOUR_TONE_TO_CHIP[tone]}
                selected={config.cooldownDays === days}
                onSelect={() => onChange({ cooldownDays: days })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NpsPromptTrigger
