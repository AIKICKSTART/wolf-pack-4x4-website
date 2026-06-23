import styles from "./notification-history-timeline.module.css"

export type NotificationHistoryTone = "info" | "success" | "warn" | "error" | "system"

export interface NotificationHistoryItem {
  id: string
  title: string
  sub?: string
  time: string
  source?: string
  tone?: NotificationHistoryTone
  unread?: boolean
}

export interface NotificationHistoryGroup {
  date: string
  items: ReadonlyArray<NotificationHistoryItem>
}

interface NotificationHistoryTimelineProps {
  groups: ReadonlyArray<NotificationHistoryGroup>
  ariaLabel?: string
  className?: string
}

export function NotificationHistoryTimeline({
  groups,
  ariaLabel = "Notification history",
  className,
}: NotificationHistoryTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")

  if (groups.length === 0) {
    return (
      <section role="region" aria-label={ariaLabel} className={classes}>
        <p className={styles.empty}>No notifications in history</p>
      </section>
    )
  }

  return (
    <section role="region" aria-label={ariaLabel} className={classes}>
      {groups.map((group) => {
        const unreadCount = group.items.filter((item) => item.unread).length
        const total = group.items.length
        return (
          <div key={group.date} className={styles.group}>
            <header className={styles.groupHead}>
              <h3 className={styles.groupDate}>{group.date}</h3>
              <span className={styles.groupCount}>{total} total</span>
              {unreadCount > 0 && (
                <span className={`${styles.groupCount} ${styles.groupCountUnread}`}>
                  {unreadCount} unread
                </span>
              )}
            </header>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className={styles.row}
                  data-unread={item.unread ? "true" : "false"}
                >
                  <span className={styles.dotCell} aria-hidden="true">
                    <span className={styles.dot} data-tone={item.tone ?? "info"} />
                  </span>
                  <div className={styles.body}>
                    <p className={styles.title}>{item.title}</p>
                    {item.sub && <p className={styles.sub}>{item.sub}</p>}
                    {item.source && (
                      <span className={styles.meta}>
                        <span>{item.source}</span>
                      </span>
                    )}
                  </div>
                  <time className={styles.time} dateTime={item.time}>
                    {item.time}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

export default NotificationHistoryTimeline
