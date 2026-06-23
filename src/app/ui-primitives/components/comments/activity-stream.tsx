import {
  AtSign,
  CheckCircle2,
  Heart,
  MapPin,
  MessageSquare,
  PenLine,
  RotateCcw,
  type LucideIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./activity-stream.module.css"
import type { ActivityEvent, CommentActivityKind } from "./comment-types"

interface ActivityStreamProps {
  events: ReadonlyArray<ActivityEvent>
  title?: string
  className?: string
}

const VERB_ICON: Record<CommentActivityKind, LucideIcon> = {
  commented: MessageSquare,
  replied: PenLine,
  resolved: CheckCircle2,
  reopened: RotateCcw,
  mentioned: AtSign,
  liked: Heart,
  annotated: MapPin,
}

const VERB_LABEL: Record<CommentActivityKind, string> = {
  commented: "Comment",
  replied: "Reply",
  resolved: "Resolve",
  reopened: "Reopen",
  mentioned: "Mention",
  liked: "Like",
  annotated: "Annotate",
}

const VERB_CLASS: Record<CommentActivityKind, string> = {
  commented: styles.verbCommented,
  replied: styles.verbReplied,
  resolved: styles.verbResolved,
  reopened: styles.verbReopened,
  mentioned: styles.verbMentioned,
  liked: styles.verbLiked,
  annotated: styles.verbAnnotated,
}

function renderVerb(kind: CommentActivityKind): ReactNode {
  const Icon = VERB_ICON[kind]
  return (
    <span className={[styles.verb, VERB_CLASS[kind]].join(" ")}>
      <Icon size={10} strokeWidth={2.6} aria-hidden="true" />
      {VERB_LABEL[kind]}
    </span>
  )
}

export function ActivityStream({
  events,
  title = "Activity",
  className,
}: ActivityStreamProps) {
  const classes = [styles.stream, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Comment activity stream"
    >
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count}>
          {events.length} {events.length === 1 ? "event" : "events"}
        </span>
      </header>
      <ul className={styles.list}>
        {events.map((event) => {
          const Icon = VERB_ICON[event.kind]
          return (
            <li key={event.id} className={styles.event}>
              <span className={styles.glyph} aria-hidden="true">
                <Icon size={12} strokeWidth={2.4} />
              </span>
              <div className={styles.body}>
                <p className={styles.line}>
                  <span className={styles.actor}>{event.actor.name}</span>{" "}
                  {renderVerb(event.kind)} {event.description}
                  {event.threadTitle ? (
                    <>
                      {" on "}
                      <span className={styles.thread}>{event.threadTitle}</span>
                    </>
                  ) : null}
                </p>
                <div aria-hidden="true">
                  <Avatar
                    name={event.actor.name}
                    src={event.actor.avatar}
                    size="sm"
                    tone="obsidian"
                  />
                </div>
              </div>
              <time className={styles.time}>{event.timestamp}</time>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ActivityStream
