import { Clock, MapPin, Users } from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import { formatRange, formatTime } from "./date-utils"
import styles from "./event-card.module.css"

export type EventCardTone = "red" | "amber" | "teal" | "green" | "neutral"
export type EventCardVariant = "compact" | "expanded"

export interface EventCardAttendee {
  name: string
  avatarSrc?: string
}

interface EventCardProps {
  title: string
  start: Date
  end?: Date
  tone?: EventCardTone
  variant?: EventCardVariant
  icon?: ReactNode
  attendees?: ReadonlyArray<EventCardAttendee>
  location?: string
  description?: string
  className?: string
}

export function EventCard({
  title,
  start,
  end,
  tone = "neutral",
  variant = "expanded",
  icon,
  attendees,
  location,
  description,
  className,
}: EventCardProps) {
  const timeLabel = end ? formatRange(start, end) : formatTime(start)
  const classes = [
    styles.card,
    styles[`tone-${tone}`],
    variant === "compact" ? styles.compact : styles.expanded,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes}>
      <div className={styles.head}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.titleBlock}>
          <strong className={styles.title}>{title}</strong>
          <span className={styles.time}>
            <Clock size={12} strokeWidth={2.4} aria-hidden="true" />
            {timeLabel}
          </span>
        </div>
      </div>
      {variant === "expanded" && (
        <div className={styles.meta}>
          {description && <p className={styles.description}>{description}</p>}
          <ul className={styles.facts}>
            {location && (
              <li>
                <MapPin size={12} strokeWidth={2.4} aria-hidden="true" />
                {location}
              </li>
            )}
            {attendees && attendees.length > 0 && (
              <li>
                <Users size={12} strokeWidth={2.4} aria-hidden="true" />
                {attendees.length} {attendees.length === 1 ? "attendee" : "attendees"}
              </li>
            )}
          </ul>
          {attendees && attendees.length > 0 && (
            <div className={styles.avatars}>
              {attendees.slice(0, 4).map((attendee) => (
                <Avatar
                  key={attendee.name}
                  name={attendee.name}
                  src={attendee.avatarSrc}
                  size="sm"
                  tone="obsidian"
                />
              ))}
              {attendees.length > 4 && (
                <span className={styles.avatarMore}>+{attendees.length - 4}</span>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default EventCard
