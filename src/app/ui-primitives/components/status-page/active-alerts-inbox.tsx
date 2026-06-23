"use client"

import { useState } from "react"

import {
  ALERT_ACK_LABEL,
  ALERT_ACK_TONE,
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_SEVERITY_TONE,
  type AlertAckState,
  type IncidentSeverity,
  type StatusTone,
} from "./status-types"
import styles from "./active-alerts-inbox.module.css"

export interface ActiveAlertEntry {
  id: string
  title: string
  service: string
  severity: IncidentSeverity
  /** Human age, e.g. "12m". */
  age: string
  initialState: AlertAckState
  /** Avatar initials, e.g. "JR". */
  assignedInitials?: string
  assignedName?: string
}

export interface ActiveAlertsInboxProps {
  alerts: ReadonlyArray<ActiveAlertEntry>
  caption?: string
  onChange?: (alertId: string, next: AlertAckState) => void
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function nextState(state: AlertAckState): AlertAckState {
  if (state === "firing") return "acknowledged"
  if (state === "acknowledged") return "resolved"
  return "firing"
}

export function ActiveAlertsInbox({
  alerts,
  caption = "Firing alerts",
  onChange,
  className,
}: ActiveAlertsInboxProps) {
  const [states, setStates] = useState<Record<string, AlertAckState>>(() => {
    const initial: Record<string, AlertAckState> = {}
    alerts.forEach((a) => {
      initial[a.id] = a.initialState
    })
    return initial
  })

  const cycle = (id: string) => {
    const current = states[id] ?? "firing"
    const next = nextState(current)
    setStates({ ...states, [id]: next })
    onChange?.(id, next)
  }

  const classes = [styles.inbox, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption}
    >
      <header className={styles.head}>
        <h3 className={styles.title}>{caption}</h3>
        <span className={styles.count}>{alerts.length}</span>
      </header>
      <ul className={styles.list}>
        {alerts.map((alert) => {
          const state = states[alert.id] ?? alert.initialState
          const ackTone = ALERT_ACK_TONE[state]
          const sevTone = INCIDENT_SEVERITY_TONE[alert.severity]
          return (
            <li
              key={alert.id}
              className={[styles.item, TONE_CLASS[sevTone]].join(" ")}
            >
              <div className={styles.itemBody}>
                <header className={styles.itemHead}>
                  <span className={[styles.sev, TONE_CLASS[sevTone]].join(" ")}>
                    {INCIDENT_SEVERITY_LABEL[alert.severity]}
                  </span>
                  <h4 className={styles.itemTitle}>{alert.title}</h4>
                </header>
                <div className={styles.itemMeta}>
                  <span className={styles.service}>{alert.service}</span>
                  <span className={styles.metaDot} aria-hidden="true">·</span>
                  <span className={styles.age}>{alert.age} ago</span>
                </div>
              </div>
              <div className={styles.itemActions}>
                {alert.assignedInitials ? (
                  <span
                    className={styles.avatar}
                    title={alert.assignedName ?? alert.assignedInitials}
                    aria-label={`Assigned to ${alert.assignedName ?? alert.assignedInitials}`}
                  >
                    {alert.assignedInitials}
                  </span>
                ) : null}
                <button
                  type="button"
                  className={[styles.ackBtn, TONE_CLASS[ackTone]].join(" ")}
                  onClick={() => cycle(alert.id)}
                  aria-label={`Cycle ${alert.title} alert state, currently ${ALERT_ACK_LABEL[state]}`}
                >
                  {ALERT_ACK_LABEL[state]}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ActiveAlertsInbox
