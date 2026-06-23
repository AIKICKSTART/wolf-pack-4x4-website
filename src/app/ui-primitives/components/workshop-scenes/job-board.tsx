import type { CSSProperties } from "react"

import { KanbanBoard } from "../data-display/kanban-board"
import type { KanbanColumn } from "../data-display/kanban-board"
import styles from "./job-board.module.css"

export interface JobBoardProps {
  columns: ReadonlyArray<KanbanColumn>
  /** Display title, default "Job board — Oak Flats workshop". */
  title?: string
  /** Optional subhead copy under the title. */
  subhead?: string
}

const LEGEND_ITEMS: ReadonlyArray<{ label: string; tone: string }> = [
  { label: "High priority", tone: "var(--primitive-red)" },
  { label: "Medium", tone: "var(--primitive-amber)" },
  { label: "Low", tone: "var(--primitive-teal)" },
]

export function JobBoard({
  columns,
  title = "Job board — Oak Flats workshop",
  subhead = "Each card moves across stages as jobs progress from quote-accepted through to handover.",
}: JobBoardProps) {
  return (
    <section className={styles.shell} aria-label="Workshop job board">
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Live board</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subhead}>{subhead}</p>
        </div>
        <ul className={styles.legend} aria-label="Priority legend">
          {LEGEND_ITEMS.map((item) => (
            <li key={item.label}>
              <i style={{ background: item.tone } as CSSProperties} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </header>

      <KanbanBoard columns={columns} />
    </section>
  )
}

export default JobBoard
