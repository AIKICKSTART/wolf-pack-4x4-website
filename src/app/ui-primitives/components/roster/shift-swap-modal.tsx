"use client"

import { useId, useState } from "react"

import { BasicDialog } from "../overlays/basic-dialog"
import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { TechnicianRef } from "./roster-types"
import styles from "./shift-swap-modal.module.css"

export interface MyShiftSummary {
  /** e.g. "Tue 4 Jun · 07:00–15:30 · Bay 2". */
  label: string
  duration: string
}

export type SwapReason = "personal" | "appointment" | "training" | "family"

interface ShiftSwapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  myShift: MyShiftSummary
  candidates: ReadonlyArray<TechnicianRef>
  onSubmit: (payload: {
    targetId: string
    reason: SwapReason
  }) => void
  className?: string
}

const REASONS: ReadonlyArray<{ value: SwapReason; label: string }> = [
  { value: "personal", label: "Personal" },
  { value: "appointment", label: "Appointment" },
  { value: "training", label: "Training" },
  { value: "family", label: "Family" },
]

export function ShiftSwapModal({
  open,
  onOpenChange,
  myShift,
  candidates,
  onSubmit,
  className,
}: ShiftSwapModalProps) {
  const reasonGroupId = useId()
  const [targetId, setTargetId] = useState<string>(candidates[0]?.id ?? "")
  const [reason, setReason] = useState<SwapReason>("personal")

  const canSubmit = Boolean(targetId)

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }
    onSubmit({ targetId, reason })
  }

  return (
    <BasicDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Request shift swap"
      description="Pick a teammate to take this block. They'll get a notification and can accept or decline."
      size="md"
      className={className}
      actions={
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Send request
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <section className={styles.myShift} aria-label="My shift">
          <span className={styles.kicker}>My shift</span>
          <strong>{myShift.label}</strong>
          <span className={styles.duration}>{myShift.duration}</span>
        </section>

        <section className={styles.picker} aria-label="Pick teammate">
          <span className={styles.kicker}>Pick teammate</span>
          <ul className={styles.candidateList}>
            {candidates.map((candidate) => {
              const checked = candidate.id === targetId
              return (
                <li key={candidate.id}>
                  <label className={styles.candidate} data-selected={checked}>
                    <input
                      type="radio"
                      name="swap-target"
                      value={candidate.id}
                      checked={checked}
                      onChange={() => setTargetId(candidate.id)}
                      className={styles.radio}
                    />
                    <Avatar
                      name={candidate.name}
                      src={candidate.avatarSrc}
                      size="sm"
                      tone="amber"
                    />
                    <span className={styles.candidateText}>
                      <strong>{candidate.name}</strong>
                      <span>{candidate.role}</span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        <section
          className={styles.picker}
          aria-labelledby={reasonGroupId}
        >
          <span className={styles.kicker} id={reasonGroupId}>
            Reason
          </span>
          <div
            className={styles.reasonRow}
            role="radiogroup"
            aria-labelledby={reasonGroupId}
          >
            {REASONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                tone={reason === option.value ? "amber" : "neutral"}
                selected={reason === option.value}
                onSelect={() => setReason(option.value)}
              />
            ))}
          </div>
        </section>
      </div>
    </BasicDialog>
  )
}

export default ShiftSwapModal
