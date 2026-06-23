"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import styles from "./success-plan-checklist.module.css"

export type MilestoneState = "todo" | "in-progress" | "done" | "blocked"

export interface SuccessMilestone {
  id: string
  /** Milestone label e.g. "First service completed". */
  label: string
  /** Optional helper text. */
  detail?: string
  /** ISO date due. */
  dueIso?: string
  state: MilestoneState
}

interface SuccessPlanChecklistProps {
  customerName: string
  milestones: ReadonlyArray<SuccessMilestone>
  /** Optional initial collapsed state of detail rows. */
  defaultExpanded?: boolean
  className?: string
}

const STATE_LABEL: Record<MilestoneState, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
  blocked: "Blocked",
}

const STATE_TONE: Record<
  MilestoneState,
  "neutral" | "red" | "amber" | "teal" | "green"
> = {
  todo: "neutral",
  "in-progress": "amber",
  done: "green",
  blocked: "red",
}

const STATE_GLYPH: Record<MilestoneState, string> = {
  todo: "○",
  "in-progress": "◐",
  done: "●",
  blocked: "⨯",
}

function formatDate(iso?: string): string | null {
  if (!iso) return null
  try {
    const date = new Date(iso)
    return new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "short",
    }).format(date)
  } catch {
    return null
  }
}

export function SuccessPlanChecklist({
  customerName,
  milestones,
  defaultExpanded = true,
  className,
}: SuccessPlanChecklistProps) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const totalDone = milestones.filter((m) => m.state === "done").length
  const total = milestones.length

  return (
    <section className={classes} aria-label={`Success plan for ${customerName}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Success plan</span>
          <h3 className={styles.title}>{customerName}</h3>
        </div>
        <div className={styles.controls}>
          <span className={styles.progressText}>
            {totalDone} / {total} complete
          </span>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </header>

      <ul className={styles.list} aria-label="Milestones">
        {milestones.map((m) => {
          const due = formatDate(m.dueIso)
          return (
            <li key={m.id} className={styles.item} data-state={m.state}>
              <span className={styles.glyph} aria-hidden="true">
                {STATE_GLYPH[m.state]}
              </span>
              <div className={styles.body}>
                <span className={styles.itemLabel}>{m.label}</span>
                {expanded && m.detail ? (
                  <span className={styles.itemDetail}>{m.detail}</span>
                ) : null}
              </div>
              <div className={styles.meta}>
                <Chip label={STATE_LABEL[m.state]} tone={STATE_TONE[m.state]} />
                {due ? <span className={styles.due}>Due {due}</span> : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SuccessPlanChecklist
