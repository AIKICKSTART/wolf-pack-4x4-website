"use client"

import {
  AlertOctagon,
  Check,
  CheckCheck,
  Clock,
  Eye,
  MailQuestion,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react"

import type {
  DeliveryReportRow as DeliveryReportRowSpec,
  DeliveryStatus,
  NotificationChannelId,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface DeliveryReportRowProps {
  row: DeliveryReportRowSpec
  channelLabel?: string
  onRetry?: (id: string) => void
  className?: string
}

const STATUS_CLASS: Record<DeliveryStatus, string> = {
  queued: styles.delQueued,
  sent: styles.delSent,
  delivered: styles.delDelivered,
  opened: styles.delOpened,
  clicked: styles.delClicked,
  failed: styles.delFailed,
  bounced: styles.delBounced,
}

const STATUS_ICON: Record<DeliveryStatus, LucideIcon> = {
  queued: Clock,
  sent: Check,
  delivered: CheckCheck,
  opened: Eye,
  clicked: MousePointerClick,
  failed: AlertOctagon,
  bounced: MailQuestion,
}

const STATUS_LABEL: Record<DeliveryStatus, string> = {
  queued: "Queued",
  sent: "Sent",
  delivered: "Delivered",
  opened: "Opened",
  clicked: "Clicked",
  failed: "Failed",
  bounced: "Bounced",
}

function fmtLatency(ms: number | undefined): string {
  if (typeof ms !== "number") return "—"
  if (ms < 1000) return `${ms} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

function fmtChannel(channel: NotificationChannelId): string {
  switch (channel) {
    case "in-app":
      return "In-app"
    case "email":
      return "Email"
    case "sms":
      return "SMS"
    case "push-web":
      return "Push · web"
    case "push-mobile":
      return "Push · mobile"
  }
}

export function DeliveryReportRow({
  row,
  channelLabel,
  onRetry,
  className,
}: DeliveryReportRowProps) {
  const Icon = STATUS_ICON[row.status]
  const isFailure = row.status === "failed" || row.status === "bounced"

  const classes = [styles.delRow, STATUS_CLASS[row.status], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`Delivery for ${row.recipient}`}>
      <span className={styles.delIcon} aria-hidden="true">
        <Icon size={14} strokeWidth={2.4} />
      </span>
      <div className={styles.delMain}>
        <p className={styles.delSubject}>{row.subject}</p>
        <p className={styles.delRecipient}>
          <span>{channelLabel ?? fmtChannel(row.channel)}</span>
          <span aria-hidden="true">·</span>
          <span>{row.recipient}</span>
        </p>
      </div>
      <div className={styles.delMeta}>
        <span className={styles.delStatus}>{STATUS_LABEL[row.status]}</span>
        <time className={styles.delTime} dateTime={row.sentAtISO}>
          {row.sentAtISO.slice(11, 16)}
        </time>
        <span className={styles.delLatency} aria-label="Latency">
          {fmtLatency(row.latencyMs)}
        </span>
        <span className={styles.delAttempts} aria-label="Delivery attempts">
          {row.attempts}× try
        </span>
      </div>
      {isFailure && onRetry && (
        <button
          type="button"
          className={styles.delRetry}
          onClick={() => onRetry(row.id)}
        >
          Retry
        </button>
      )}
    </article>
  )
}

export default DeliveryReportRow
