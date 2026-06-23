"use client"

import { Bell, Check, Eye, Mail, MailOpen, X } from "lucide-react"
import type { ReactNode } from "react"

import type { AcceptanceEvent, AcceptanceState } from "./quote-types"
import styles from "./quote-acceptance-tracker.module.css"

interface QuoteAcceptanceTrackerProps {
  events: ReadonlyArray<AcceptanceEvent>
  current: AcceptanceState
  reminderHint?: string
  onSendReminder?: () => void
}

const STATE_LABEL: Record<AcceptanceState, string> = {
  sent: "Sent",
  opened: "Opened",
  viewed: "Viewed",
  accepted: "Accepted",
  declined: "Declined",
  countered: "Countered",
}

const STATE_ICON: Record<AcceptanceState, ReactNode> = {
  sent: <Mail size={14} aria-hidden="true" />,
  opened: <MailOpen size={14} aria-hidden="true" />,
  viewed: <Eye size={14} aria-hidden="true" />,
  accepted: <Check size={14} aria-hidden="true" />,
  declined: <X size={14} aria-hidden="true" />,
  countered: <Mail size={14} aria-hidden="true" />,
}

export function QuoteAcceptanceTracker({
  events,
  current,
  reminderHint = "Send a gentle reminder 24h before expiry.",
  onSendReminder,
}: QuoteAcceptanceTrackerProps) {
  const reached = (state: AcceptanceState): boolean =>
    events.some((event) => event.state === state)

  return (
    <section
      className={styles.region}
      role="region"
      aria-labelledby="acceptance-tracker-title"
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Acceptance</span>
          <h3 id="acceptance-tracker-title" className={styles.title}>
            Quote tracker — currently {STATE_LABEL[current].toLowerCase()}
          </h3>
        </div>
        {onSendReminder && current !== "accepted" && current !== "declined" && (
          <button type="button" className={styles.reminder} onClick={onSendReminder}>
            <Bell size={14} aria-hidden="true" /> Send reminder
          </button>
        )}
      </header>
      <ol className={styles.timeline}>
        {(["sent", "opened", "viewed", "accepted"] as const).map((state, index) => {
          const event = events.find((entry) => entry.state === state)
          const isReached = reached(state) || (state === "accepted" && current === "declined")
          const declined = state === "accepted" && current === "declined"
          return (
            <li
              key={state}
              className={[
                styles.step,
                isReached && styles.stepReached,
                declined && styles.stepDeclined,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.dot}>{STATE_ICON[state]}</span>
              <span className={styles.label}>
                {index + 1}. {declined ? "Declined" : STATE_LABEL[state]}
              </span>
              <span className={styles.stamp}>
                {declined && current === "declined"
                  ? events.find((entry) => entry.state === "declined")?.occurredAt ?? "—"
                  : event?.occurredAt ?? "Pending"}
              </span>
              {event?.detail && <span className={styles.detail}>{event.detail}</span>}
            </li>
          )
        })}
      </ol>
      {reminderHint && <p className={styles.hint}>{reminderHint}</p>}
    </section>
  )
}

export default QuoteAcceptanceTracker
