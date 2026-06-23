import { CalendarClock, Globe2, Hourglass } from "lucide-react"

import {
  formatDuration,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./delay-step-card.module.css"

/**
 * Delay step card — pauses the workflow for a configured duration. Used
 * for the "wait 3 days, then nudge" pattern on quote follow-up. Surfaces
 * the duration, an optional resume-at timestamp (cron-style), and the
 * timezone the pause is anchored to.
 */
interface DelayStepCardProps {
  /** Optional kicker, e.g. "Quote follow-up · day 3 nudge". */
  kicker?: string
  /** Title, e.g. "Wait 3 business days". */
  title: string
  /** Delay duration in milliseconds. */
  durationMs: number
  /** Optional resume-at label — e.g. "Mon 09:00 AEST". */
  resumeAtLabel?: string
  /** IANA timezone label — drives the trailing chip. */
  timezone: string
  /** Whether to skip the delay on weekends. */
  skipWeekends?: boolean
  /** Whether to skip the delay on Australian public holidays. */
  skipHolidays?: boolean
  /** Custom tone — defaults to amber. */
  tone?: EngineTone
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

export function DelayStepCard({
  kicker = "Delay · pause",
  title,
  durationMs,
  resumeAtLabel,
  timezone,
  skipWeekends = false,
  skipHolidays = false,
  tone = "amber",
  className,
}: DelayStepCardProps) {
  const cardTone = TONE_VAR[tone]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      style={{ "--card-tone": cardTone } as Record<string, string>}
      aria-label={`Delay step · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Hourglass size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.tzChip}>
          <Globe2 size={11} strokeWidth={2.4} aria-hidden="true" />
          {timezone}
        </span>
      </header>

      <div className={styles.durationDisplay}>
        <span className={styles.durationValue}>{formatDuration(durationMs)}</span>
        <span className={styles.durationLabel}>pause window</span>
      </div>

      <div className={styles.metaRow}>
        {resumeAtLabel ? (
          <span className={styles.resumeChip}>
            <CalendarClock size={11} strokeWidth={2.4} aria-hidden="true" />
            Resume · {resumeAtLabel}
          </span>
        ) : null}
        <span
          className={styles.skipChip}
          data-on={skipWeekends ? "true" : "false"}
        >
          Skip weekends · {skipWeekends ? "on" : "off"}
        </span>
        <span
          className={styles.skipChip}
          data-on={skipHolidays ? "true" : "false"}
        >
          Skip public holidays · {skipHolidays ? "on" : "off"}
        </span>
      </div>
    </section>
  )
}

export default DelayStepCard
