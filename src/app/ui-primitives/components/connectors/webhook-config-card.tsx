"use client"

import { useState } from "react"

import {
  CONNECTOR_STATUS_LABEL,
  CONNECTOR_STATUS_TONE,
  maskSecret,
  type ConnectorStatus,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./webhook-config-card.module.css"

export interface WebhookEventOption {
  id: string
  label: string
  /** e.g. "stripe.payment_intent.succeeded". */
  code: string
  /** True to mark as filtered-in by default. */
  defaultEnabled?: boolean
}

export interface WebhookConfigCardProps {
  /** Display name, e.g. "Stripe payments". */
  source: string
  /** Endpoint URL that receives this webhook. */
  endpoint: string
  /** Signing secret — masked by default. */
  signingSecret: string
  /** Connection status. */
  status: ConnectorStatus
  /** Subscribed-event options. */
  events: ReadonlyArray<WebhookEventOption>
  /** Optional callback when the selected event set changes. */
  onEventsChange?: (enabledIds: ReadonlyArray<string>) => void
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

export function WebhookConfigCard({
  source,
  endpoint,
  signingSecret,
  status,
  events,
  onEventsChange,
  className,
}: WebhookConfigCardProps) {
  const tone = CONNECTOR_STATUS_TONE[status]
  const [revealedSecret, setRevealedSecret] = useState(false)
  const [enabled, setEnabled] = useState<ReadonlySet<string>>(
    () => new Set(events.filter((event) => event.defaultEnabled).map((event) => event.id)),
  )

  const toggleEvent = (id: string) => {
    const next = new Set(enabled)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setEnabled(next)
    onEventsChange?.(Array.from(next))
  }

  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const maskedSecret = maskSecret(signingSecret, 6)

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${source} webhook configuration — ${CONNECTOR_STATUS_LABEL[status]}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Webhook</span>
          <h3 className={styles.source}>{source}</h3>
        </div>
        <span className={[styles.chip, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.chipDot} aria-hidden="true" />
          {CONNECTOR_STATUS_LABEL[status]}
        </span>
      </header>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={`${source}-endpoint`}>
          Endpoint URL
        </label>
        <code id={`${source}-endpoint`} className={styles.endpoint}>
          {endpoint}
        </code>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={`${source}-secret`}>
          Signing secret
        </label>
        <div className={styles.secretField}>
          <code id={`${source}-secret`} className={styles.secret}>
            {revealedSecret ? signingSecret : maskedSecret}
          </code>
          <button
            type="button"
            className={styles.secretToggle}
            onClick={() => setRevealedSecret((prev) => !prev)}
            aria-pressed={revealedSecret}
            aria-label={
              revealedSecret
                ? `Hide ${source} signing secret`
                : `Reveal ${source} signing secret`
            }
          >
            {revealedSecret ? "Hide" : "Reveal"}
          </button>
        </div>
      </div>

      <fieldset className={styles.eventsBlock}>
        <legend className={styles.legend}>Event filters</legend>
        <div className={styles.eventList}>
          {events.map((event) => {
            const isOn = enabled.has(event.id)
            return (
              <label
                key={event.id}
                className={[styles.eventRow, isOn ? styles.eventRowOn : ""].join(" ")}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isOn}
                  onChange={() => toggleEvent(event.id)}
                  aria-label={`${event.label} — ${event.code}`}
                />
                <span className={styles.eventBody}>
                  <span className={styles.eventLabel}>{event.label}</span>
                  <code className={styles.eventCode}>{event.code}</code>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>
    </article>
  )
}

export default WebhookConfigCard
