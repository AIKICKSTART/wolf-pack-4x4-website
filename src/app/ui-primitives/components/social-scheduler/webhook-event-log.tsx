import styles from "./social-scheduler.module.css"
import type { PlatformDescriptor, WebhookEvent } from "./social-scheduler-types"

interface WebhookEventLogProps {
  title?: string
  events: ReadonlyArray<WebhookEvent>
  platforms: ReadonlyArray<PlatformDescriptor>
}

const KIND_LABEL: Record<WebhookEvent["kind"], string> = {
  likes_spike: "likes spike",
  mention: "mention",
  dm: "dm",
  comment: "comment",
  token_refresh: "token refresh",
  share_burst: "share burst",
  post_published: "post published",
  post_failed: "post failed",
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function WebhookEventLog({
  title = "Webhook stream",
  events,
  platforms,
}: WebhookEventLogProps) {
  return (
    <section
      className={`${styles.frame} ${styles.webhookLog}`}
      aria-label={title}
    >
      <header className={styles.webhookHead}>
        <h2 className={styles.webhookTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>
          {events.length} event{events.length === 1 ? "" : "s"} · live tail
        </span>
      </header>

      <ol className={styles.webhookList} aria-live="polite">
        {events.map((event) => {
          const platform = platforms.find((p) => p.key === event.platform)
          return (
            <li
              key={event.id}
              className={styles.webhookRow}
              data-severity={event.severity}
              aria-label={`${KIND_LABEL[event.kind]} on ${platform?.label ?? event.platform}: ${event.summary}`}
            >
              <span className={styles.webhookSeverity} aria-hidden="true" />
              <span className={styles.webhookPlatform}>
                {platform?.mark ?? "·"} {platform?.label ?? event.platform}
              </span>
              <span className={styles.webhookSummary}>
                <span className={styles.webhookSummaryKind}>
                  {KIND_LABEL[event.kind]}
                </span>
                {event.summary}
              </span>
              <span className={styles.webhookTime}>
                {formatTime(event.receivedAt)}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default WebhookEventLog
