"use client"

import { BellRing, CalendarPlus, Check, Share2 } from "lucide-react"
import { useCallback, useId, useState } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./rsvp-card.module.css"
import type { ScheduledBroadcast } from "./live-broadcast-types"

interface RsvpCardProps {
  broadcast: ScheduledBroadcast
  /** Controls whether countdown is shown. */
  countdownLabel?: string
  /** Initial value for the reminder toggle. */
  reminderInitial?: boolean
  /** Callback when reminder toggled. */
  onToggleReminder?: (next: boolean) => void
  /** Callback when share invoked. */
  onShare?: () => void
  /** Callback when RSVP invoked. */
  onToggleRsvp?: (next: boolean) => void
  className?: string
}

function formatRsvpCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString("en-AU")
}

export function RsvpCard({
  broadcast,
  countdownLabel,
  reminderInitial = false,
  onToggleReminder,
  onShare,
  onToggleRsvp,
  className,
}: RsvpCardProps) {
  const headingId = useId()
  const [reminderOn, setReminderOn] = useState<boolean>(reminderInitial)
  const [rsvped, setRsvped] = useState<boolean>(broadcast.rsvped ?? false)

  const handleToggleReminder = useCallback(() => {
    setReminderOn((prev) => {
      const next = !prev
      onToggleReminder?.(next)
      return next
    })
  }, [onToggleReminder])

  const handleToggleRsvp = useCallback(() => {
    setRsvped((prev) => {
      const next = !prev
      onToggleRsvp?.(next)
      return next
    })
  }, [onToggleRsvp])

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-labelledby={headingId}>
      <header className={styles.head}>
        <span className={styles.kicker}>RSVP · Live workshop stream</span>
        <h3 id={headingId} className={styles.title}>{broadcast.title}</h3>
        <p className={styles.blurb}>{broadcast.blurb}</p>
      </header>

      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt>When</dt>
          <dd className={styles.metaValue}>
            <span className={styles.localTime}>{broadcast.localTimeLabel}</span>
            <span className={styles.duration}>{broadcast.durationLabel}</span>
          </dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Host</dt>
          <dd className={styles.hostDd}>
            <Avatar
              name={broadcast.host.name}
              src={broadcast.host.avatar}
              size="sm"
              tone="red"
            />
            <span className={styles.hostText}>
              <span>{broadcast.host.name}</span>
              <span className={styles.hostRole}>{broadcast.host.role}</span>
            </span>
          </dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Going</dt>
          <dd className={styles.rsvpCount}>
            <span className={styles.rsvpNumber}>{formatRsvpCount(broadcast.rsvpCount)}</span>
            <span className={styles.rsvpLabel}>RSVPs</span>
          </dd>
        </div>
        {countdownLabel ? (
          <div className={[styles.metaRow, styles.countdown].join(" ")}>
            <dt>Starts in</dt>
            <dd className={styles.countdownValue}>{countdownLabel}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={[styles.rsvpButton, rsvped ? styles.rsvpDone : ""].filter(Boolean).join(" ")}
          aria-pressed={rsvped}
          onClick={handleToggleRsvp}
        >
          {rsvped ? (
            <>
              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
              You&apos;re in
            </>
          ) : (
            <>RSVP</>
          )}
        </button>

        <button
          type="button"
          className={[styles.secondary, reminderOn ? styles.secondaryOn : ""].filter(Boolean).join(" ")}
          aria-pressed={reminderOn}
          aria-label={reminderOn ? "Disable reminder" : "Set 30 minute reminder"}
          onClick={handleToggleReminder}
        >
          <BellRing size={13} strokeWidth={2.2} aria-hidden="true" />
          <span>{reminderOn ? "Reminder set" : "Remind me"}</span>
        </button>

        <button
          type="button"
          className={styles.secondary}
          aria-label="Add broadcast to calendar"
        >
          <CalendarPlus size={13} strokeWidth={2.2} aria-hidden="true" />
          <span>Add to calendar</span>
        </button>

        <button
          type="button"
          className={styles.icon}
          aria-label="Share broadcast"
          onClick={onShare}
        >
          <Share2 size={14} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default RsvpCard
