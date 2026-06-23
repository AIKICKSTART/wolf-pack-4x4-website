import type {
  NotificationTrigger,
  WebhookStatus,
  WebhookTrigger,
} from "./forms-platform-types"
import styles from "./webhook-trigger-row.module.css"

interface WebhookTriggerRowProps {
  trigger: WebhookTrigger
  className?: string
}

const STATUS_LABEL: Record<WebhookStatus, string> = {
  delivered: "Delivered",
  retrying: "Retrying",
  failed: "Failed",
  paused: "Paused",
}

const STATUS_CLASS: Record<WebhookStatus, string> = {
  delivered: styles.statusDelivered,
  retrying: styles.statusRetrying,
  failed: styles.statusFailed,
  paused: styles.statusPaused,
}

const EVENT_LABEL: Record<NotificationTrigger, string> = {
  "on-submit": "form.submitted",
  "on-payment": "payment.received",
  "on-approval": "submission.approved",
  "on-rejection": "submission.rejected",
  "on-file-uploaded": "file.uploaded",
}

export function WebhookTriggerRow({ trigger, className }: WebhookTriggerRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const showRetry = trigger.status === "retrying" || trigger.status === "failed"

  return (
    <article className={classes} aria-label={`Webhook to ${trigger.endpoint}`}>
      <div className={styles.head}>
        <div className={styles.endpoint}>
          <span className={styles.eventLabel}>{EVENT_LABEL[trigger.event]}</span>
          <span className={styles.endpointUrl}>{trigger.endpoint}</span>
        </div>
        <span
          className={`${styles.statusChip} ${STATUS_CLASS[trigger.status]}`}
          aria-label={`Status ${STATUS_LABEL[trigger.status]}`}
        >
          <span className={styles.dot} aria-hidden="true" />
          {STATUS_LABEL[trigger.status]}
        </span>
        <span className={styles.lastDelivery}>
          Last {trigger.lastDelivery}
        </span>
        <button type="button" className={styles.retryBtn}>
          Retry
        </button>
      </div>

      <div className={styles.payload}>
        <div className={styles.payloadHead}>
          <span>
            Sample payload <span className={styles.payloadHint}>· JSON</span>
          </span>
          {showRetry && trigger.retries !== undefined ? (
            <span className={styles.retryMeta}>
              Retries · {trigger.retries}
            </span>
          ) : (
            <span>200 OK · 312ms</span>
          )}
        </div>
        <pre className={styles.payloadPre}>{trigger.samplePayload}</pre>
      </div>
    </article>
  )
}
