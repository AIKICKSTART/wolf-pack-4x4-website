"use client"

import { useId, type CSSProperties, type ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  TRIGGER_LABEL,
  TRIGGER_TONE,
  type TriggerKind,
} from "./tour-types"
import styles from "./tour-trigger-condition.module.css"

export interface TriggerCondition {
  kind: TriggerKind
  /** Optional URL pattern when kind === "page-visit". */
  urlPattern?: string
  /** Delay in seconds when kind === "time-delay". */
  delaySeconds?: number
  /** Scroll % (0-100) when kind === "scroll-depth". */
  scrollPercent?: number
  /** Selector when kind === "element-seen". */
  selector?: string
  /** Event name when kind === "custom-event". */
  eventName?: string
}

interface TourTriggerConditionProps {
  tourName: string
  condition: TriggerCondition
  /** Optional callback when a trigger kind is selected. */
  onKindChange?: (kind: TriggerKind) => void
  /** Optional last-fired sample copy. */
  lastFired?: string
  className?: string
}

const KIND_OPTIONS: ReadonlyArray<TriggerKind> = [
  "page-visit",
  "time-delay",
  "scroll-depth",
  "element-seen",
  "custom-event",
  "exit-intent",
]

function describeCondition(condition: TriggerCondition): string {
  switch (condition.kind) {
    case "page-visit":
      return condition.urlPattern
        ? `Visit URL matching ${condition.urlPattern}`
        : "Visit any matching URL"
    case "time-delay": {
      const seconds = condition.delaySeconds ?? 0
      return `Wait ${seconds.toLocaleString("en-AU")}s on page`
    }
    case "scroll-depth":
      return `Scroll past ${condition.scrollPercent ?? 0}% of page height`
    case "element-seen":
      return condition.selector
        ? `When ${condition.selector} enters viewport`
        : "When target element enters viewport"
    case "custom-event":
      return condition.eventName
        ? `Receive ${condition.eventName} app event`
        : "Receive custom app event"
    case "exit-intent":
    default:
      return "Cursor moves toward browser chrome (exit intent)"
  }
}

export function TourTriggerCondition({
  tourName,
  condition,
  onKindChange,
  lastFired,
  className,
}: TourTriggerConditionProps) {
  const headingId = useId()
  const tone = TRIGGER_TONE[condition.kind]

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const description = describeCondition(condition)

  // Visual aid for scroll / delay triggers.
  let progressBlock: ReactNode = null
  if (condition.kind === "scroll-depth") {
    progressBlock = (
      <ProgressLinear
        value={condition.scrollPercent ?? 0}
        max={100}
        tone="teal"
        label={`${condition.scrollPercent ?? 0}% scroll depth`}
        showLabel
      />
    )
  } else if (condition.kind === "time-delay") {
    const max = 30
    const value = Math.min(condition.delaySeconds ?? 0, max)
    progressBlock = (
      <ProgressLinear
        value={value}
        max={max}
        tone="amber"
        label={`${value}s of ${max}s`}
        showLabel
      />
    )
  }

  return (
    <section
      className={classes}
      aria-labelledby={headingId}
      style={{ "--trigger-tone": TONE_VAR[tone] } as CSSProperties}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Trigger · {tourName}</span>
        <h3 id={headingId} className={styles.title}>
          When the tour fires
        </h3>
      </header>

      <div className={styles.kindGrid} role="radiogroup" aria-label="Trigger kind">
        {KIND_OPTIONS.map((kind) => (
          <Chip
            key={kind}
            label={TRIGGER_LABEL[kind]}
            tone={TOUR_TONE_TO_CHIP[TRIGGER_TONE[kind]]}
            selected={condition.kind === kind}
            onSelect={() => onKindChange?.(kind)}
          />
        ))}
      </div>

      <div className={styles.descriptionBlock}>
        <span className={styles.label}>Resolved condition</span>
        <p className={styles.description}>{description}</p>
        {progressBlock}
      </div>

      {lastFired ? (
        <footer className={styles.foot}>
          <span className={styles.label}>Last fired</span>
          <span className={styles.lastFired}>{lastFired}</span>
        </footer>
      ) : null}
    </section>
  )
}

export default TourTriggerCondition
