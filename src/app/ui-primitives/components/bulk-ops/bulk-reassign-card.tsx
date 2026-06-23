"use client"

import { useState } from "react"

import type { BulkAssignee, BulkAssignmentMode } from "./bulk-ops-types"
import styles from "./bulk-reassign-card.module.css"

interface BulkReassignCardProps {
  /** Display label for the scope, e.g. "8 bookings". */
  scopeLabel: string
  /** Previous owner being transferred from. */
  fromAssignee: BulkAssignee
  /** Candidate assignees. */
  candidates: ReadonlyArray<BulkAssignee>
  defaultToAssigneeId?: string
  defaultTransferComments?: boolean
  defaultNotify?: boolean
  /** Default assignment mode. */
  defaultMode?: BulkAssignmentMode
  onReassign?: (params: {
    toAssigneeId: string
    mode: BulkAssignmentMode
    transferComments: boolean
    notify: boolean
  }) => void
  className?: string
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function BulkReassignCard({
  scopeLabel,
  fromAssignee,
  candidates,
  defaultToAssigneeId,
  defaultTransferComments = true,
  defaultNotify = true,
  defaultMode = "replace",
  onReassign,
  className,
}: BulkReassignCardProps) {
  const [toId, setToId] = useState<string>(
    defaultToAssigneeId ?? candidates[0]?.id ?? "",
  )
  const [transferComments, setTransferComments] = useState<boolean>(
    defaultTransferComments,
  )
  const [notify, setNotify] = useState<boolean>(defaultNotify)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const to = candidates.find((entry) => entry.id === toId)

  return (
    <section className={classes} aria-label="Bulk reassign">
      <header className={styles.head}>
        <span className={styles.kicker}>Reassign selection</span>
        <h2 className={styles.title}>Transfer ownership</h2>
      </header>

      <div className={styles.transferRow}>
        <div className={styles.assigneeChip}>
          <span className={styles.avatar} aria-hidden="true">
            {initialsOf(fromAssignee.name)}
          </span>
          <span className={styles.who}>
            <span className={styles.whoName}>{fromAssignee.name}</span>
            <span className={styles.whoRole}>From · {fromAssignee.role}</span>
          </span>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        <label aria-label="Reassign to" style={{ display: "grid" }}>
          <select
            className={styles.picker}
            value={toId}
            onChange={(event) => setToId(event.target.value)}
          >
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} · {candidate.role}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.toggles}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Transfer comments & notes</span>
            <span className={styles.toggleHint}>
              Keep activity history attached to the new owner
            </span>
          </div>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={transferComments}
            aria-label="Toggle transfer comments"
            onClick={() => setTransferComments((current) => !current)}
          />
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>Notify previous owner</span>
            <span className={styles.toggleHint}>
              Send {fromAssignee.name} a digest of what moved
            </span>
          </div>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={notify}
            aria-label="Toggle notify previous owner"
            onClick={() => setNotify((current) => !current)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <span className={styles.scopeHint}>
          Scope · {scopeLabel} · {defaultMode === "shadow" ? "Shadow assign" : "Replace owner"}
        </span>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => {
            if (!to) {
              return
            }
            onReassign?.({
              toAssigneeId: to.id,
              mode: defaultMode,
              transferComments,
              notify,
            })
          }}
        >
          Reassign to {to ? to.name.split(" ")[0] : "..."}
        </button>
      </div>
    </section>
  )
}

export default BulkReassignCard
