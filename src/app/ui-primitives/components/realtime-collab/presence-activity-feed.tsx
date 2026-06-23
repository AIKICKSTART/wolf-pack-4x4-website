import { ActivityFeed } from "../data-display/activity-feed"
import type {
  ActivityFeedItem,
  ActivityTone,
} from "../data-display/activity-feed"
import type {
  CollabActivityEntry,
  CollabActivityKind,
} from "./realtime-collab-types"
import styles from "./presence-activity-feed.module.css"

interface PresenceActivityFeedProps {
  /** Live collab events. Most recent first. */
  events: ReadonlyArray<CollabActivityEntry>
  /** Optional title rendered above the feed. */
  title?: string
  className?: string
}

const KIND_TONE: Record<CollabActivityKind, ActivityTone> = {
  joined: "success",
  left: "info",
  commented: "info",
  resolved: "success",
  edited: "info",
  added: "success",
  reacted: "info",
  renamed: "warn",
  shared: "info",
}

const KIND_LABEL: Record<CollabActivityKind, string> = {
  joined: "Joined",
  left: "Left",
  commented: "Commented",
  resolved: "Resolved",
  edited: "Edited",
  added: "Added",
  reacted: "Reacted",
  renamed: "Renamed",
  shared: "Shared",
}

function toFeedItem(event: CollabActivityEntry): ActivityFeedItem {
  const action = KIND_LABEL[event.kind]
  const title = event.target
    ? `${action} ${event.target}`
    : action
  return {
    id: event.id,
    title,
    description: event.description,
    timestamp: event.timestamp,
    tone: KIND_TONE[event.kind],
    actor: {
      name: event.actor.name,
      avatarSrc: event.actor.avatar,
    },
  }
}

export function PresenceActivityFeed({
  events,
  title,
  className,
}: PresenceActivityFeedProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const items = events.map(toFeedItem)

  return (
    <section className={classes} aria-label={title ?? "Live collaboration activity"}>
      {title && (
        <header className={styles.head}>
          <span className={styles.dot} aria-hidden="true" />
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.live} aria-hidden="true">
            LIVE
          </span>
        </header>
      )}
      <ActivityFeed items={items} ariaLabel="Live collaboration activity stream" />
    </section>
  )
}

export default PresenceActivityFeed
