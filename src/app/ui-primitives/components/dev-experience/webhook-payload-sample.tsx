import { Fingerprint, Webhook } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import styles from "./webhook-payload-sample.module.css"

export interface WebhookPayloadSampleProps {
  /** Event type, e.g. "quote.created". */
  eventType: string
  /** Webhook payload version, e.g. "2026-05-01". */
  version: string
  /** ISO timestamp of the event. */
  timestamp: string
  /** JSON payload body. */
  payload: string
  /** Mufflermen-Signature header value rendered in the meta strip. */
  signatureHeader: string
  /** Optional className passthrough. */
  className?: string
}

export function WebhookPayloadSample({
  eventType,
  version,
  timestamp,
  payload,
  signatureHeader,
  className,
}: WebhookPayloadSampleProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Webhook payload sample for event ${eventType}`}
    >
      <header className={styles.head}>
        <span className={styles.eventChip}>
          <Webhook size={13} strokeWidth={2.2} aria-hidden="true" />
          {eventType}
        </span>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Version</span>
            <code>{version}</code>
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Sent</span>
            <code>{timestamp}</code>
          </span>
        </div>
      </header>
      <div className={styles.signature}>
        <Fingerprint size={13} strokeWidth={2.2} aria-hidden="true" />
        <span className={styles.signatureLabel}>Mufflermen-Signature</span>
        <code className={styles.signatureValue}>{signatureHeader}</code>
      </div>
      <CodeBlock code={payload} language="json" showLineNumbers />
    </section>
  )
}

export default WebhookPayloadSample
