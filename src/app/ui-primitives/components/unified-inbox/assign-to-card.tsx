"use client"

import { useState } from "react"

import { Avatar } from "../primitives/avatar"

import {
  PRESENCE_LABEL,
  PRESENCE_TONE,
  type UnifiedTeammate,
} from "./unified-inbox-types"
import styles from "./assign-to-card.module.css"

interface AssignToCardProps {
  teammates: ReadonlyArray<UnifiedTeammate>
  /** Currently assigned teammate id. */
  assigneeId?: string | null
  /** Triggered when the assignment changes. */
  onAssign?: (id: string | null) => void
  /** Heading label, defaults to "Assignee". */
  heading?: string
  className?: string
}

function presenceToAvatarStatus(
  presence: UnifiedTeammate["presence"],
): "online" | "away" | "busy" | "offline" {
  return presence
}

export function AssignToCard({
  teammates,
  assigneeId = null,
  onAssign,
  heading = "Assignee",
  className,
}: AssignToCardProps) {
  const [selected, setSelected] = useState<string | null>(assigneeId)

  const handleSelect = (id: string) => {
    const next = selected === id ? null : id
    setSelected(next)
    onAssign?.(next)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.head}>
        <span className={styles.kicker}>Assign</span>
        <h3 className={styles.title}>{heading}</h3>
      </header>

      <ul className={styles.list}>
        {teammates.map((teammate) => {
          const isActive = selected === teammate.id
          const tone = PRESENCE_TONE[teammate.presence]
          const loadPct = Math.min(
            100,
            Math.round((teammate.workload / Math.max(1, teammate.capacity)) * 100),
          )
          return (
            <li key={teammate.id}>
              <button
                type="button"
                className={[styles.row, isActive ? styles.rowActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={isActive}
                onClick={() => handleSelect(teammate.id)}
              >
                <Avatar
                  name={teammate.name}
                  src={teammate.avatarSrc}
                  size="md"
                  tone={isActive ? "red" : "teal"}
                  status={presenceToAvatarStatus(teammate.presence)}
                />
                <span className={styles.body}>
                  <span className={styles.name}>{teammate.name}</span>
                  <span className={styles.role}>
                    {teammate.role} · {PRESENCE_LABEL[teammate.presence]}
                  </span>
                </span>
                <span
                  className={[styles.loadChip, styles[`tone_${tone}`]]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`Workload ${teammate.workload} of ${teammate.capacity}`}
                >
                  <span className={styles.loadValue}>
                    {teammate.workload}/{teammate.capacity}
                  </span>
                  <span className={styles.loadBar} aria-hidden="true">
                    <span
                      className={styles.loadFill}
                      style={{ width: `${loadPct}%` }}
                    />
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {selected ? (
        <button
          type="button"
          className={styles.unassignBtn}
          onClick={() => {
            setSelected(null)
            onAssign?.(null)
          }}
        >
          Unassign
        </button>
      ) : null}
    </section>
  )
}

export default AssignToCard
