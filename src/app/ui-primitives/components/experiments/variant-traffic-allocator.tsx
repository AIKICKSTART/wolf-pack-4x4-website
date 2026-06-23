"use client"

import { useCallback, useMemo, useState, type ChangeEvent } from "react"

import { VariantPicker, type VariantSpec } from "../feature-flags/variant-picker"
import { Chip } from "../primitives/chip"

import styles from "./variant-traffic-allocator.module.css"

export interface VariantTrafficAllocatorProps {
  variants: ReadonlyArray<VariantSpec>
  onChange?: (next: ReadonlyArray<VariantSpec>) => void
  className?: string
}

function sumWeights(list: ReadonlyArray<VariantSpec>): number {
  return list.reduce(
    (acc, v) => acc + (Number.isFinite(v.weight) ? v.weight : 0),
    0,
  )
}

function fillFor(tone: VariantSpec["tone"]): string {
  switch (tone) {
    case "red":
      return "var(--primitive-red)"
    case "amber":
      return "var(--primitive-amber)"
    case "teal":
      return "var(--primitive-teal)"
    case "green":
      return "var(--primitive-green)"
    default:
      return "color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)"
  }
}

export function VariantTrafficAllocator({
  variants,
  onChange,
  className,
}: VariantTrafficAllocatorProps) {
  const [state, setState] = useState<ReadonlyArray<VariantSpec>>(variants)

  const total = useMemo(() => sumWeights(state), [state])
  const valid = total === 100

  const handleSlide = useCallback(
    (id: string, event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value)
      const next = state.map((v) =>
        v.id === id
          ? { ...v, weight: Math.max(0, Math.min(100, Math.round(raw))) }
          : v,
      )
      setState(next)
      onChange?.(next)
    },
    [state, onChange],
  )

  const handlePickerChange = useCallback(
    (next: ReadonlyArray<VariantSpec>) => {
      setState(next)
      onChange?.(next)
    },
    [onChange],
  )

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Variant traffic allocator"
    >
      <div
        className={styles.stack}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(100, total)}
        aria-label={`Total traffic allocation ${total} percent`}
      >
        {state.map((variant) => {
          const width = Math.max(0, Math.min(100, variant.weight))
          return width > 0 ? (
            <span
              key={variant.id}
              className={styles.segment}
              style={{
                width: `${width}%`,
                background: fillFor(variant.tone),
              }}
              aria-label={`${variant.name}: ${width} percent`}
            >
              <span className={styles.segmentLabel}>
                {variant.name} · {width}%
              </span>
            </span>
          ) : null
        })}
      </div>

      <div
        className={styles.totalRow}
        role="status"
        aria-live="polite"
      >
        <Chip
          label={valid ? "Sum 100% — OK" : `Sum ${total}% — must be 100%`}
          tone={valid ? "green" : "red"}
        />
        {state.map((variant) => (
          <Chip
            key={`chip-${variant.id}`}
            label={`${variant.name} ${variant.weight}%`}
            tone={variant.tone ?? "neutral"}
          />
        ))}
      </div>

      <ul className={styles.sliderList} aria-label="Per-variant sliders">
        {state.map((variant) => (
          <li key={variant.id} className={styles.sliderRow}>
            <label className={styles.sliderLabel}>
              <span>{variant.name}</span>
              <span className={styles.sliderValue}>{variant.weight}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={variant.weight}
              onChange={(event) => handleSlide(variant.id, event)}
              className={styles.slider}
              aria-label={`${variant.name} weight`}
            />
          </li>
        ))}
      </ul>

      <details className={styles.picker}>
        <summary>Numeric editor</summary>
        <VariantPicker variants={state} onChange={handlePickerChange} />
      </details>
    </section>
  )
}

export default VariantTrafficAllocator
