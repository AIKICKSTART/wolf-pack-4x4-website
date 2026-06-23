"use client"

import {
  useCallback,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react"

import { Chip } from "../primitives/chip"

import { formatPercent, type AbRuntimeTone } from "./ab-runtime-types"

import styles from "./allocation-slider.module.css"

export interface AllocationArmSpec {
  id: string
  name: string
  tone?: AbRuntimeTone
}

export interface AllocationSliderProps {
  arms: ReadonlyArray<AllocationArmSpec>
  /** Initial allocation values keyed by arm id; must sum to 100. */
  defaultAllocations?: Record<string, number>
  /** Controlled allocations keyed by arm id. */
  allocations?: Record<string, number>
  onChange?: (next: Record<string, number>) => void
  /** Hide the live percentage chip strip. */
  hideChips?: boolean
  className?: string
}

const TONE_COLOR: Record<AbRuntimeTone, string> = {
  neutral: "color-mix(in oklab, var(--primitive-text-strong) 46%, transparent)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

function distributeEven(armCount: number): Record<string, number> {
  if (armCount === 0) return {}
  const base = Math.floor(100 / armCount)
  const remainder = 100 - base * armCount
  return Object.fromEntries(
    Array.from({ length: armCount }, (_unused, idx) => [
      String(idx),
      base + (idx < remainder ? 1 : 0),
    ]),
  )
}

function defaultsFromArms(
  arms: ReadonlyArray<AllocationArmSpec>,
  fallback: Record<string, number> | undefined,
): Record<string, number> {
  if (fallback) {
    const sum = arms.reduce((acc, arm) => acc + (fallback[arm.id] ?? 0), 0)
    if (sum > 0) {
      return Object.fromEntries(arms.map((arm) => [arm.id, fallback[arm.id] ?? 0]))
    }
  }
  const even = distributeEven(arms.length)
  return Object.fromEntries(
    arms.map((arm, idx) => [arm.id, even[String(idx)] ?? 0]),
  )
}

export function AllocationSlider({
  arms,
  defaultAllocations,
  allocations,
  onChange,
  hideChips = false,
  className,
}: AllocationSliderProps) {
  const baseId = useId()
  const isControlled = allocations !== undefined

  const [internal, setInternal] = useState<Record<string, number>>(() =>
    defaultsFromArms(arms, defaultAllocations),
  )

  const current = isControlled ? allocations : internal

  const commit = useCallback(
    (next: Record<string, number>) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const handleChange = useCallback(
    (armId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value)
      if (Number.isNaN(raw)) return
      const clamped = Math.max(0, Math.min(100, Math.round(raw)))
      const next = { ...current, [armId]: clamped }
      commit(next)
    },
    [commit, current],
  )

  const total = useMemo(
    () => arms.reduce((sum, arm) => sum + (current[arm.id] ?? 0), 0),
    [arms, current],
  )

  const totalOk = total === 100
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Variant traffic allocation"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Allocation · Live</span>
        <h2 className={styles.title}>Variant traffic</h2>
      </header>

      <div className={styles.bar} aria-hidden="true">
        {arms.map((arm) => {
          const pct = current[arm.id] ?? 0
          const tone = arm.tone ?? "teal"
          const segStyle: CSSProperties = {
            width: `${pct}%`,
            background: TONE_COLOR[tone],
          }
          return (
            <span
              key={arm.id}
              className={styles.barSegment}
              style={segStyle}
            />
          )
        })}
      </div>

      {arms.map((arm) => {
        const pct = current[arm.id] ?? 0
        const tone = arm.tone ?? "teal"
        const sliderId = `${baseId}-${arm.id}`
        return (
          <div className={styles.row} key={arm.id}>
            <label htmlFor={sliderId} className={styles.rowLabel}>
              <span
                className={styles.rowSwatch}
                style={{ background: TONE_COLOR[tone] }}
                aria-hidden="true"
              />
              {arm.name}
            </label>
            <input
              id={sliderId}
              type="range"
              className={styles.slider}
              min={0}
              max={100}
              step={1}
              value={pct}
              onChange={handleChange(arm.id)}
              aria-label={`Allocation for ${arm.name}`}
              aria-valuetext={`${pct}%`}
            />
            <output className={styles.rowValue} htmlFor={sliderId}>
              {formatPercent(pct, 0)}
            </output>
          </div>
        )
      })}

      <div className={styles.summary} aria-live="polite">
        <span>Total allocation</span>
        <span className={totalOk ? styles.summaryOk : styles.summaryWarn}>
          {total}% · {totalOk ? "OK" : "Must sum to 100"}
        </span>
      </div>

      {hideChips ? null : (
        <div className={styles.summary}>
          {arms.map((arm) => (
            <Chip
              key={arm.id}
              label={`${arm.name} ${formatPercent(current[arm.id] ?? 0, 0)}`}
              tone={arm.tone ?? "teal"}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default AllocationSlider
