import { EventCard } from "../calendar/event-card"
import type { EventCardTone } from "../calendar/event-card"
import styles from "./daily-schedule-strip.module.css"

export type ScheduleBlockKind = "job" | "break" | "training" | "travel"

export interface ScheduleBlock {
  id: string
  kind: ScheduleBlockKind
  title: string
  start: Date
  end: Date
  /** Optional sub-line, e.g. "Hilux N80 · ECC-001 · Bay 2". */
  location?: string
}

interface DailyScheduleStripProps {
  /** Technician this strip belongs to — used for region label. */
  technician: string
  /** Ordered blocks across the technician's day. */
  blocks: ReadonlyArray<ScheduleBlock>
  className?: string
}

const KIND_TONE: Record<ScheduleBlockKind, EventCardTone> = {
  job: "red",
  break: "amber",
  training: "teal",
  travel: "neutral",
}

const KIND_LABEL: Record<ScheduleBlockKind, string> = {
  job: "Job",
  break: "Break",
  training: "Training",
  travel: "Travel",
}

export function DailyScheduleStrip({
  technician,
  blocks,
  className,
}: DailyScheduleStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Daily schedule for ${technician}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Today</span>
        <strong className={styles.title}>{technician}</strong>
      </header>
      <ol className={styles.timeline}>
        {blocks.map((block) => (
          <li key={block.id} className={styles.slot}>
            <span className={styles.kindTag} data-kind={block.kind}>
              {KIND_LABEL[block.kind]}
            </span>
            <EventCard
              title={block.title}
              start={block.start}
              end={block.end}
              tone={KIND_TONE[block.kind]}
              variant="compact"
              location={block.location}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default DailyScheduleStrip
