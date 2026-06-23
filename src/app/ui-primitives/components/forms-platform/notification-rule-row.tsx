import type {
  NotificationChannel,
  NotificationRule,
  NotificationTrigger,
} from "./forms-platform-types"
import styles from "./notification-rule-row.module.css"

interface NotificationRuleRowProps {
  rule: NotificationRule
  className?: string
}

const TRIGGER_LABEL: Record<NotificationTrigger, string> = {
  "on-submit": "On submit",
  "on-payment": "Payment received",
  "on-approval": "On approval",
  "on-rejection": "On rejection",
  "on-file-uploaded": "On file upload",
}

const CHANNEL_LABEL: Record<NotificationChannel, string> = {
  email: "Email",
  sms: "SMS",
  slack: "Slack",
  webhook: "Webhook",
}

const CHANNEL_ICON_CLASS: Record<NotificationChannel, string> = {
  email: styles.channelEmail,
  sms: styles.channelSms,
  slack: styles.channelSlack,
  webhook: styles.channelWebhook,
}

function ChannelGlyph({ channel }: { channel: NotificationChannel }) {
  if (channel === "email") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (channel === "sms") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 4a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 13 4v6a1.5 1.5 0 0 1-1.5 1.5H7l-3 2v-2H4.5A1.5 1.5 0 0 1 3 10V4z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (channel === "slack") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="3.5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10" y="2.5" width="3.5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 6h11M2.5 10h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h3l2-4 2 8 2-4h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NotificationRuleRow({ rule, className }: NotificationRuleRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const iconClass = [
    styles.channelIcon,
    CHANNEL_ICON_CLASS[rule.channel],
  ]
    .filter(Boolean)
    .join(" ")
  const toggleClass = [
    styles.toggle,
    rule.enabled ? styles.toggleOn : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${CHANNEL_LABEL[rule.channel]} rule`}>
      <span className={iconClass} aria-hidden="true">
        <ChannelGlyph channel={rule.channel} />
      </span>
      <div className={styles.body}>
        <span className={styles.triggerLabel}>{TRIGGER_LABEL[rule.trigger]}</span>
        <span className={styles.recipient}>{rule.recipient}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.templateLabel}>Template</span>
        <span className={styles.template}>{rule.templateLabel}</span>
      </div>
      <span
        className={`${styles.channelBadge} ${CHANNEL_ICON_CLASS[rule.channel]}`}
      >
        {CHANNEL_LABEL[rule.channel]}
      </span>
      <span>{/* spacer */}</span>
      <button
        type="button"
        className={toggleClass}
        role="switch"
        aria-checked={rule.enabled}
        aria-label={`${rule.enabled ? "Disable" : "Enable"} ${CHANNEL_LABEL[rule.channel]} rule`}
      >
        <span className={styles.toggleThumb} />
      </button>
    </article>
  )
}
