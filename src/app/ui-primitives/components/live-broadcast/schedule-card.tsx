import { CalendarPlus, Clock3, Users } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import styles from "./schedule-card.module.css"
import type { ScheduledBroadcast } from "./live-broadcast-types"

interface ScheduleCardProps {
  broadcast: ScheduledBroadcast
  /** Countdown label e.g. "3d 14h". */
  countdownLabel: string
  /** Highlight as the "next up" broadcast. */
  isNextUp?: boolean
  className?: string
}

export function ScheduleCard({
  broadcast,
  countdownLabel,
  isNextUp = false,
  className,
}: ScheduleCardProps) {
  const classes = [
    styles.card,
    isNextUp ? styles.nextUp : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${broadcast.title}, ${broadcast.localTimeLabel}`}>
      <header className={styles.head}>
        <span className={[styles.statusChip, isNextUp ? styles.statusChipNext : ""].filter(Boolean).join(" ")}>
          {isNextUp ? "Up next" : "Scheduled"}
        </span>
        <span className={styles.countdown} aria-label={`Starts in ${countdownLabel}`}>
          <Clock3 size={11} strokeWidth={2.4} aria-hidden="true" />
          <span className={styles.countdownValue}>{countdownLabel}</span>
        </span>
      </header>

      <h3 className={styles.title}>{broadcast.title}</h3>
      <p className={styles.blurb}>{broadcast.blurb}</p>

      <div className={styles.bodyRow}>
        <div className={styles.host}>
          <Avatar
            name={broadcast.host.name}
            src={broadcast.host.avatar}
            size="sm"
            tone="red"
          />
          <div className={styles.hostText}>
            <span className={styles.hostName}>{broadcast.host.name}</span>
            <span className={styles.hostRole}>{broadcast.host.role}</span>
          </div>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <Users size={11} strokeWidth={2.4} aria-hidden="true" />
            <span className={styles.statValue}>{broadcast.rsvpCount.toLocaleString("en-AU")}</span>
            <span className={styles.statLabel}>RSVPs</span>
          </span>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.timeRow}>
          <span className={styles.timeLabel}>{broadcast.localTimeLabel}</span>
          <span className={styles.timeDuration}>{broadcast.durationLabel}</span>
        </div>
        <button type="button" className={styles.addCal} aria-label="Add to calendar">
          <CalendarPlus size={13} strokeWidth={2.2} aria-hidden="true" />
          Add to calendar
        </button>
      </footer>
    </article>
  )
}

export default ScheduleCard
