"use client"

import { useState } from "react"

import type { TriggerEvent, TriggerRecord, TriggerTiming } from "./db-admin-types"
import styles from "./trigger-card.module.css"

interface TriggerCardProps {
  trigger: TriggerRecord
  /** Called when the enabled toggle changes. */
  onToggle?: (enabled: boolean) => void
  className?: string
}

const TIMING_LABEL: Record<TriggerTiming, string> = {
  before: "Before",
  after: "After",
  instead_of: "Instead of",
}

const TIMING_CLASS: Record<TriggerTiming, string> = {
  before: styles.timingBefore,
  after: styles.timingAfter,
  instead_of: styles.timingInsteadOf,
}

const EVENT_CLASS: Record<TriggerEvent, string> = {
  insert: styles.eventInsert,
  update: styles.eventUpdate,
  delete: styles.eventDelete,
  truncate: styles.eventTruncate,
}

export function TriggerCard({ trigger, onToggle, className }: TriggerCardProps) {
  const [enabled, setEnabled] = useState<boolean>(trigger.enabled)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleToggle = () => {
    const next = !enabled
    setEnabled(next)
    onToggle?.(next)
  }

  return (
    <article className={classes} aria-label={`Trigger ${trigger.name}`}>
      <header className={styles.head}>
        <span className={styles.name}>{trigger.name}</span>
        <span className={`${styles.timing} ${TIMING_CLASS[trigger.timing]}`}>
          {TIMING_LABEL[trigger.timing]}
        </span>
        <button
          type="button"
          className={styles.toggle}
          role="switch"
          aria-checked={enabled}
          aria-label={enabled ? "Disable trigger" : "Enable trigger"}
          onClick={handleToggle}
        >
          {enabled ? "Enabled" : "Disabled"}
          <span className={styles.toggleKnob} aria-hidden="true" />
        </button>
      </header>
      <div className={styles.eventList} aria-label="Trigger events">
        {trigger.events.map((event) => (
          <span key={event} className={`${styles.eventChip} ${EVENT_CLASS[event]}`}>
            {event.toUpperCase()}
          </span>
        ))}
      </div>
      <div className={styles.function}>
        <span className={styles.functionLabel}>Calls</span>
        <span>{trigger.functionRef}()</span>
      </div>
    </article>
  )
}

export default TriggerCard
