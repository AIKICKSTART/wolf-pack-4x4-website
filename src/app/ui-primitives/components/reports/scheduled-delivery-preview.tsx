import type { ReactNode } from "react"

import type { DeliveryChannel } from "./reports-types"
import styles from "./scheduled-delivery-preview.module.css"

const CHANNEL_LABEL: Record<DeliveryChannel, string> = {
  email: "Email",
  slack: "Slack",
  teams: "Teams",
  webhook: "Webhook",
}

interface ScheduledDeliveryPreviewProps {
  from: string
  to: string
  subject: string
  preheader: string
  channel: DeliveryChannel
  scheduledFor: string
  thumbnail: ReactNode
  className?: string
}

export function ScheduledDeliveryPreview({
  from,
  to,
  subject,
  preheader,
  channel,
  scheduledFor,
  thumbnail,
  className,
}: ScheduledDeliveryPreviewProps) {
  const classes = [styles.surface, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Delivery preview: ${subject}`}>
      <span className={styles.kicker}>Delivery preview</span>
      <div className={styles.headers}>
        <div className={styles.headerRow}>
          <span className={styles.headerLabel}>From</span>
          <span className={styles.headerValue}>{from}</span>
        </div>
        <div className={styles.headerRow}>
          <span className={styles.headerLabel}>To</span>
          <span className={styles.headerValue}>{to}</span>
        </div>
      </div>
      <h3 className={styles.subject}>{subject}</h3>
      <p className={styles.preheader}>{preheader}</p>
      <div className={styles.thumb} aria-hidden="true">
        {thumbnail}
      </div>
      <div className={styles.footer}>
        <span className={styles.channel}>via {CHANNEL_LABEL[channel]}</span>
        <span>{scheduledFor}</span>
      </div>
    </article>
  )
}

export default ScheduledDeliveryPreview
