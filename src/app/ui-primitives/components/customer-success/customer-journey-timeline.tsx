import type { CSSProperties } from "react"

import {
  LIFECYCLE_LABEL,
  LIFECYCLE_ORDER,
  type CustomerLifecycleStage,
} from "./cs-types"
import styles from "./customer-journey-timeline.module.css"

export interface JourneyStageEntry {
  stage: CustomerLifecycleStage
  /** ISO date when stage was entered. */
  enteredOnIso?: string
  /** Optional note for the stage. */
  note?: string
}

interface CustomerJourneyTimelineProps {
  customerName: string
  currentStage: CustomerLifecycleStage
  history?: ReadonlyArray<JourneyStageEntry>
  className?: string
}

const STAGE_GLYPH: Record<CustomerLifecycleStage, string> = {
  acquisition: "◐",
  onboarding: "◑",
  adoption: "◓",
  expansion: "◒",
  renewal: "◉",
}

function formatDate(iso?: string): string | null {
  if (!iso) return null
  try {
    const date = new Date(iso)
    return new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  } catch {
    return null
  }
}

export function CustomerJourneyTimeline({
  customerName,
  currentStage,
  history,
  className,
}: CustomerJourneyTimelineProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const currentIndex = LIFECYCLE_ORDER.indexOf(currentStage)

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Customer lifecycle for ${customerName}. Current stage: ${LIFECYCLE_LABEL[currentStage]}.`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Lifecycle · {customerName}</span>
        <h3 className={styles.title}>{LIFECYCLE_LABEL[currentStage]}</h3>
      </header>

      <ol className={styles.stages} aria-label="Lifecycle stages">
        {LIFECYCLE_ORDER.map((stage, index) => {
          const state =
            index < currentIndex
              ? "past"
              : index === currentIndex
              ? "current"
              : "future"
          const entry = history?.find((h) => h.stage === stage)
          const enteredOn = formatDate(entry?.enteredOnIso)
          return (
            <li
              key={stage}
              className={styles.stage}
              data-state={state}
              style={{ "--stage-index": index } as CSSProperties}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className={styles.dot} aria-hidden="true">
                {STAGE_GLYPH[stage]}
              </span>
              <div className={styles.body}>
                <span className={styles.stageLabel}>{LIFECYCLE_LABEL[stage]}</span>
                {enteredOn ? <span className={styles.stageDate}>{enteredOn}</span> : null}
                {entry?.note ? <span className={styles.stageNote}>{entry.note}</span> : null}
              </div>
              {index < LIFECYCLE_ORDER.length - 1 ? (
                <span className={styles.connector} aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default CustomerJourneyTimeline
