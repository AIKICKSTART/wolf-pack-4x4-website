"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import { JOB_KIND_LABEL, type JobKind } from "./job-queue-types"
import styles from "./job-kind-filter.module.css"

export interface JobKindCount {
  kind: JobKind
  /** Total active jobs of this kind. */
  total: number
}

interface JobKindFilterProps {
  options: ReadonlyArray<JobKindCount>
  /** Initially selected kinds. */
  initial?: ReadonlyArray<JobKind>
  onChange?: (selected: ReadonlyArray<JobKind>) => void
  className?: string
}

export function JobKindFilter({
  options,
  initial = [],
  onChange,
  className,
}: JobKindFilterProps) {
  const [selected, setSelected] = useState<ReadonlySet<JobKind>>(() => new Set(initial))

  const toggle = (kind: JobKind) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(kind)) {
        next.delete(kind)
      } else {
        next.add(kind)
      }
      onChange?.(Array.from(next))
      return next
    })
  }

  const totalSelected = options
    .filter((option) => selected.has(option.kind))
    .reduce((sum, option) => sum + option.total, 0)

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Filter by job kind"
      role="group"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Job kinds</span>
        <Chip
          label={`${selected.size} selected · ${totalSelected.toLocaleString()} jobs`}
          tone="teal"
        />
      </header>
      <div className={styles.chipRow}>
        {options.map((option) => (
          <Chip
            key={option.kind}
            label={`${JOB_KIND_LABEL[option.kind]} · ${option.total}`}
            tone={selected.has(option.kind) ? "teal" : "neutral"}
            selected={selected.has(option.kind)}
            onSelect={() => toggle(option.kind)}
          />
        ))}
      </div>
    </section>
  )
}

export default JobKindFilter
