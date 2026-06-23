"use client"

import { CircleX, Clock, Repeat } from "lucide-react"

import { Chip } from "../primitives/chip"

import styles from "./webhook-retry-queue.module.css"

export interface RetryQueueItem {
  id: string
  eventType: string
  endpointUrl: string
  attempt: number
  maxAttempts: number
  /** Absolute time the next retry will fire. */
  nextRetryAt: string
  /** Human-readable backoff label (e.g. "exp x4 → 4m"). */
  backoffLabel: string
  /** Last failure reason — typically the HTTP status or transport error. */
  lastError: string
}

interface WebhookRetryQueueProps {
  items: ReadonlyArray<RetryQueueItem>
  onManualRetry?: (id: string) => void
  onAbandon?: (id: string) => void
  className?: string
}

export function WebhookRetryQueue({
  items,
  onManualRetry,
  onAbandon,
  className,
}: WebhookRetryQueueProps) {
  const classes = [styles.queue, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Webhook retry queue">
      <header className={styles.head}>
        <span className={styles.kicker}>Retry queue</span>
        <h3 className={styles.title}>
          {items.length} pending {items.length === 1 ? "retry" : "retries"}
        </h3>
      </header>

      {items.length === 0 ? (
        <div className={styles.empty} role="status">
          <span>Queue clear — every webhook acknowledged on the first try.</span>
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const ratio = Math.min(1, Math.max(0, item.attempt / item.maxAttempts))
            const ratioPct = Math.round(ratio * 100)
            return (
              <li key={item.id} className={styles.item}>
                <div className={styles.identity}>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Repeat size={14} strokeWidth={2.2} />
                  </span>
                  <div className={styles.identityText}>
                    <span className={styles.eventType}>{item.eventType}</span>
                    <code className={styles.endpoint}>{item.endpointUrl}</code>
                  </div>
                </div>

                <div className={styles.attemptBlock}>
                  <span className={styles.attemptLabel}>
                    Attempt {item.attempt} / {item.maxAttempts}
                  </span>
                  <div
                    className={styles.attemptBar}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={item.maxAttempts}
                    aria-valuenow={item.attempt}
                  >
                    <span style={{ width: `${ratioPct}%` }} />
                  </div>
                  <Chip label={item.backoffLabel} tone="amber" />
                </div>

                <dl className={styles.meta}>
                  <div>
                    <dt>
                      <Clock size={11} strokeWidth={2.4} aria-hidden="true" /> Next retry
                    </dt>
                    <dd>{item.nextRetryAt}</dd>
                  </div>
                  <div>
                    <dt>Last error</dt>
                    <dd className={styles.errorText}>{item.lastError}</dd>
                  </div>
                </dl>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.retryBtn}
                    onClick={() => onManualRetry?.(item.id)}
                  >
                    <Repeat size={12} strokeWidth={2.4} aria-hidden="true" />
                    <span>Retry now</span>
                  </button>
                  <button
                    type="button"
                    className={styles.abandonBtn}
                    onClick={() => onAbandon?.(item.id)}
                  >
                    <CircleX size={12} strokeWidth={2.4} aria-hidden="true" />
                    <span>Abandon</span>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default WebhookRetryQueue
