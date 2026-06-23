"use client"

import { useState } from "react"
import { Check, Minus, X } from "lucide-react"

import { Chip } from "../primitives/chip"
import { Reveal } from "../motion/reveal"
import {
  QUALIFICATION_BANT,
  QUALIFICATION_MEDDIC,
  type QualificationFramework,
  type QualificationStatus,
} from "./sales-leads-types"

import styles from "./qualification-checklist.module.css"

export interface QualificationCriterion {
  key: string
  label: string
  status: QualificationStatus
  note?: string
}

interface QualificationChecklistProps {
  framework: QualificationFramework
  criteria: ReadonlyArray<QualificationCriterion>
  /** When provided, allows the user to cycle the status of each criterion. */
  onStatusChange?: (key: string, next: QualificationStatus) => void
  className?: string
}

const STATUS_ORDER: ReadonlyArray<QualificationStatus> = [
  "unknown",
  "partial",
  "met",
  "missing",
]

const STATUS_LABEL: Record<QualificationStatus, string> = {
  met: "Met",
  partial: "Partial",
  missing: "Missing",
  unknown: "Unknown",
}

const STATUS_TONE: Record<
  QualificationStatus,
  "green" | "amber" | "red" | "neutral"
> = {
  met: "green",
  partial: "amber",
  missing: "red",
  unknown: "neutral",
}

function StatusGlyph({ status }: { status: QualificationStatus }) {
  if (status === "met") return <Check size={12} strokeWidth={2.6} aria-hidden="true" />
  if (status === "missing") return <X size={12} strokeWidth={2.6} aria-hidden="true" />
  return <Minus size={12} strokeWidth={2.6} aria-hidden="true" />
}

function frameworkDefaults(framework: QualificationFramework) {
  return framework === "bant" ? QUALIFICATION_BANT : QUALIFICATION_MEDDIC
}

export function QualificationChecklist({
  framework,
  criteria,
  onStatusChange,
  className,
}: QualificationChecklistProps) {
  const fallback = frameworkDefaults(framework)
  // Hydrate any missing criteria with an "unknown" placeholder so the
  // primitive renders a complete BANT/MEDDIC card regardless of input.
  const resolved: QualificationCriterion[] = fallback.map((slot) => {
    const supplied = criteria.find((c) => c.key === slot.key)
    return (
      supplied ?? {
        key: slot.key,
        label: slot.label,
        status: "unknown",
      }
    )
  })

  const [localStatus, setLocalStatus] = useState<Record<string, QualificationStatus>>(
    () =>
      resolved.reduce<Record<string, QualificationStatus>>((acc, item) => {
        acc[item.key] = item.status
        return acc
      }, {}),
  )

  const totalSlots = resolved.length
  const metCount = resolved.filter(
    (c) => (localStatus[c.key] ?? c.status) === "met",
  ).length
  const completion = totalSlots > 0 ? Math.round((metCount / totalSlots) * 100) : 0

  const cycle = (key: string) => {
    const current = localStatus[key] ?? "unknown"
    const nextIdx = (STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length
    const next = STATUS_ORDER[nextIdx]
    setLocalStatus((prev) => ({ ...prev, [key]: next }))
    onStatusChange?.(key, next)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <Reveal as="article" className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>
          {framework === "bant" ? "BANT" : "MEDDIC"} qualification
        </span>
        <span className={styles.completion} aria-live="polite">
          <strong>{completion}%</strong>
          <span>complete</span>
        </span>
      </header>

      <ul className={styles.list}>
        {resolved.map((item) => {
          const status = localStatus[item.key] ?? item.status
          return (
            <li key={item.key} className={styles.row} data-status={status}>
              <button
                type="button"
                className={styles.toggle}
                onClick={() => cycle(item.key)}
                aria-label={`${item.label}: ${STATUS_LABEL[status]}. Click to advance.`}
                data-status={status}
              >
                <StatusGlyph status={status} />
              </button>
              <div className={styles.body}>
                <span className={styles.label}>{item.label}</span>
                {item.note ? <span className={styles.note}>{item.note}</span> : null}
              </div>
              <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}

export default QualificationChecklist
