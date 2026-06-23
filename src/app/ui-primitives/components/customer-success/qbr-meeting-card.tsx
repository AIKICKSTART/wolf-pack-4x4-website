import { Chip } from "../primitives/chip"
import styles from "./qbr-meeting-card.module.css"

export type QbrOutcomeKind = "win" | "risk" | "ask"

export interface QbrAgendaItem {
  id: string
  label: string
  owner?: string
}

export interface QbrOutcome {
  id: string
  kind: QbrOutcomeKind
  text: string
}

interface QbrMeetingCardProps {
  customerName: string
  /** ISO datetime when QBR is scheduled. */
  scheduledIso: string
  /** Optional location or video link description. */
  location?: string
  agenda: ReadonlyArray<QbrAgendaItem>
  lastOutcomes?: ReadonlyArray<QbrOutcome>
  className?: string
}

const OUTCOME_TONE: Record<QbrOutcomeKind, "neutral" | "red" | "amber" | "teal" | "green"> = {
  win: "green",
  risk: "red",
  ask: "amber",
}

const OUTCOME_LABEL: Record<QbrOutcomeKind, string> = {
  win: "Win",
  risk: "Risk",
  ask: "Ask",
}

function formatDateTime(iso: string): { date: string; time: string } | null {
  try {
    const date = new Date(iso)
    return {
      date: new Intl.DateTimeFormat("en-AU", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date),
      time: new Intl.DateTimeFormat("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date),
    }
  } catch {
    return null
  }
}

export function QbrMeetingCard({
  customerName,
  scheduledIso,
  location,
  agenda,
  lastOutcomes,
  className,
}: QbrMeetingCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const stamp = formatDateTime(scheduledIso)

  return (
    <section
      className={classes}
      aria-label={`Quarterly Business Review with ${customerName}, scheduled ${stamp?.date ?? scheduledIso}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>QBR · {customerName}</span>
        {stamp ? (
          <div className={styles.stamp}>
            <span className={styles.stampDate}>{stamp.date}</span>
            <span className={styles.stampTime}>{stamp.time}</span>
          </div>
        ) : null}
        {location ? <span className={styles.location}>{location}</span> : null}
      </header>

      <div className={styles.section}>
        <span className={styles.label}>Agenda</span>
        <ol className={styles.agenda} aria-label="QBR agenda">
          {agenda.map((item, index) => (
            <li key={item.id} className={styles.agendaItem}>
              <span className={styles.agendaIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.agendaLabel}>{item.label}</span>
              {item.owner ? (
                <span className={styles.agendaOwner}>· {item.owner}</span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {lastOutcomes && lastOutcomes.length > 0 ? (
        <div className={styles.section}>
          <span className={styles.label}>Last QBR outcomes</span>
          <ul className={styles.outcomes} aria-label="Last QBR outcomes">
            {lastOutcomes.map((outcome) => (
              <li key={outcome.id} className={styles.outcomeItem}>
                <Chip
                  label={OUTCOME_LABEL[outcome.kind]}
                  tone={OUTCOME_TONE[outcome.kind]}
                />
                <span className={styles.outcomeText}>{outcome.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

export default QbrMeetingCard
