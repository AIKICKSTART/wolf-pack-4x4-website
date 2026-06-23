"use client"

import { useCallback, useState } from "react"

import { Chip } from "../primitives/chip"

import {
  CORRECTION_LABEL,
  type MultipleComparisonsCorrection,
  type SignificanceAlpha,
} from "./experiments-types"

import styles from "./significance-threshold-setter.module.css"

export type TailMode = "one-sided" | "two-sided"

export interface SignificanceThresholdValue {
  alpha: SignificanceAlpha
  tail: TailMode
  correction: MultipleComparisonsCorrection
}

export interface SignificanceThresholdSetterProps {
  defaultValue?: SignificanceThresholdValue
  onChange?: (next: SignificanceThresholdValue) => void
  className?: string
}

const ALPHA_OPTIONS: ReadonlyArray<SignificanceAlpha> = [0.01, 0.05, 0.1]
const CORRECTION_OPTIONS: ReadonlyArray<MultipleComparisonsCorrection> = [
  "bonferroni",
  "fdr",
  "none",
]

const TAIL_LABEL: Record<TailMode, string> = {
  "one-sided": "One-sided",
  "two-sided": "Two-sided",
}

export function SignificanceThresholdSetter({
  defaultValue = { alpha: 0.05, tail: "two-sided", correction: "fdr" },
  onChange,
  className,
}: SignificanceThresholdSetterProps) {
  const [value, setValue] = useState<SignificanceThresholdValue>(defaultValue)

  const update = useCallback(
    (next: SignificanceThresholdValue) => {
      setValue(next)
      onChange?.(next)
    },
    [onChange],
  )

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Significance threshold settings"
    >
      <div role="radiogroup" aria-label="Alpha threshold" className={styles.row}>
        <span className={styles.rowLabel}>α threshold</span>
        <div className={styles.chipGroup}>
          {ALPHA_OPTIONS.map((alpha) => (
            <Chip
              key={alpha}
              label={`α = ${alpha}`}
              tone={alpha === value.alpha ? "green" : "neutral"}
              selected={alpha === value.alpha}
              onSelect={() => update({ ...value, alpha })}
            />
          ))}
        </div>
      </div>

      <div role="radiogroup" aria-label="Test tail" className={styles.row}>
        <span className={styles.rowLabel}>Test type</span>
        <div className={styles.chipGroup}>
          {(["two-sided", "one-sided"] as const).map((tail) => (
            <Chip
              key={tail}
              label={TAIL_LABEL[tail]}
              tone={tail === value.tail ? "teal" : "neutral"}
              selected={tail === value.tail}
              onSelect={() => update({ ...value, tail })}
            />
          ))}
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Multiple comparisons correction"
        className={styles.row}
      >
        <span className={styles.rowLabel}>Multiple comparisons</span>
        <div className={styles.chipGroup}>
          {CORRECTION_OPTIONS.map((correction) => (
            <Chip
              key={correction}
              label={CORRECTION_LABEL[correction]}
              tone={correction === value.correction ? "amber" : "neutral"}
              selected={correction === value.correction}
              onSelect={() => update({ ...value, correction })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SignificanceThresholdSetter
