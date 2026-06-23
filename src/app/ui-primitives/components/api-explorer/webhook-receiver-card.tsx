"use client"

import { Copy, RotateCw, Webhook } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import type { WebhookEventName } from "./api-explorer-types"

import styles from "./webhook-receiver-card.module.css"

interface WebhookReceiverCardProps {
  /** Public receiver URL the API will POST to. */
  url: string
  /** Masked signing secret. Never raw. */
  secretMasked: string
  /** Webhook events the receiver listens for. */
  events: ReadonlyArray<WebhookEventName>
  /** ISO display string for the last delivery. */
  lastDeliveryAt?: string
  /** Called when the user clicks the replay button. */
  onReplay?: () => void
  /** Set to true while a replay is in flight. Disables the button. */
  replaying?: boolean
  className?: string
}

export function WebhookReceiverCard({
  url,
  secretMasked,
  events,
  lastDeliveryAt,
  onReplay,
  replaying = false,
  className,
}: WebhookReceiverCardProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleCopyUrl = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={classes} aria-label="Webhook receiver">
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Webhook size={14} strokeWidth={2.4} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>Webhook receiver</span>
          <h3 className={styles.title}>Inbound endpoint</h3>
        </div>
      </header>

      <dl className={styles.field}>
        <dt>URL</dt>
        <dd>
          <div className={styles.urlRow}>
            <code className={styles.urlValue}>{url}</code>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyUrl}
              aria-label={copied ? "Copied receiver URL" : "Copy receiver URL"}
            >
              <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </dd>

        <dt>Signing secret</dt>
        <dd>
          <code className={styles.secret}>{secretMasked}</code>
        </dd>

        <dt>Events</dt>
        <dd>
          <div className={styles.events}>
            {events.length === 0 ? (
              <span className={styles.emptyEvents}>No subscribed events.</span>
            ) : (
              events.map((event) => <Chip key={event} label={event} tone="teal" />)
            )}
          </div>
        </dd>

        {lastDeliveryAt && (
          <>
            <dt>Last delivery</dt>
            <dd className={styles.timestamp}>{lastDeliveryAt}</dd>
          </>
        )}
      </dl>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.replayBtn}
          onClick={() => onReplay?.()}
          disabled={replaying}
        >
          <RotateCw
            size={12}
            strokeWidth={2.4}
            aria-hidden="true"
            className={replaying ? styles.spin : undefined}
          />
          <span>{replaying ? "Replaying…" : "Replay last delivery"}</span>
        </button>
      </footer>
    </article>
  )
}

export default WebhookReceiverCard
