import { MaterialSurface } from "../surfaces/material-surface"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"

import {
  INCIDENT_IMPACT_LABEL,
  INCIDENT_IMPACT_TONE,
  SEVERITY_LABEL,
  SEVERITY_TONE,
  type IncidentImpact,
  type Severity,
} from "./observability-types"
import styles from "./incident-timeline.module.css"

export type TimelineEventKind =
  | "detect"
  | "page"
  | "ack"
  | "mitigate"
  | "comm"
  | "resolve"
  | "note"

export interface TimelineEvent {
  id: string
  /** Pre-formatted timestamp, e.g. "19:42 AEST". */
  time: string
  kind: TimelineEventKind
  /** Headline of the event. */
  title: string
  /** Optional longer description. */
  body?: string
  /** Optional actor or system that produced the event. */
  actor?: string
  /** Severity for this event row. */
  severity?: Severity
  /** Impact tag chip. */
  impact?: IncidentImpact
}

export interface IncidentTimelineProps {
  incidentTitle: string
  events: ReadonlyArray<TimelineEvent>
  className?: string
}

const KIND_GLYPH: Record<TimelineEventKind, string> = {
  detect: "◎",
  page: "📟",
  ack: "✓",
  mitigate: "⚒",
  comm: "✉",
  resolve: "●",
  note: "›",
}

const KIND_LABEL: Record<TimelineEventKind, string> = {
  detect: "Detect",
  page: "Page",
  ack: "Acknowledge",
  mitigate: "Mitigate",
  comm: "Comms",
  resolve: "Resolve",
  note: "Note",
}

const TONE_CHIP: Record<StatusTone, ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
  violet: "teal",
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function eventTone(event: TimelineEvent): StatusTone {
  if (event.kind === "resolve") return "green"
  if (event.kind === "mitigate") return "teal"
  if (event.severity) return SEVERITY_TONE[event.severity]
  return "neutral"
}

export function IncidentTimeline({
  incidentTitle,
  events,
  className,
}: IncidentTimelineProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <MaterialSurface elevation={2} className={classes}>
      <section
        role="region"
        aria-label={`Incident timeline for ${incidentTitle}`}
        className={styles.inner}
      >
        <header className={styles.head}>
          <h3 className={styles.title}>{incidentTitle}</h3>
          <span className={styles.count}>{events.length} events</span>
        </header>
        <ol className={styles.timeline}>
          {events.map((event) => {
            const tone: StatusTone = eventTone(event)
            return (
              <li key={event.id} className={[styles.event, TONE_CLASS[tone]].join(" ")}>
                <div className={styles.eventTime}>
                  <span className={styles.timeLabel}>{event.time}</span>
                  <span className={styles.kindLabel}>{KIND_LABEL[event.kind]}</span>
                </div>
                <div className={styles.eventDot} aria-hidden="true">
                  <span className={styles.glyph}>{KIND_GLYPH[event.kind]}</span>
                </div>
                <div className={styles.eventBody}>
                  <header className={styles.eventHead}>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <div className={styles.eventChips}>
                      {event.severity ? (
                        <Chip
                          label={SEVERITY_LABEL[event.severity]}
                          tone={TONE_CHIP[SEVERITY_TONE[event.severity]]}
                        />
                      ) : null}
                      {event.impact ? (
                        <Chip
                          label={INCIDENT_IMPACT_LABEL[event.impact]}
                          tone={TONE_CHIP[INCIDENT_IMPACT_TONE[event.impact]]}
                        />
                      ) : null}
                    </div>
                  </header>
                  {event.body ? <p className={styles.eventDescription}>{event.body}</p> : null}
                  {event.actor ? <span className={styles.actor}>by {event.actor}</span> : null}
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </MaterialSurface>
  )
}

export default IncidentTimeline
