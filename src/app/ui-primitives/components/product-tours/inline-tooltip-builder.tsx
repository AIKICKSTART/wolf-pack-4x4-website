"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"
import {
  TOUR_TONE_TO_CHIP,
  type TooltipAlign,
  type TooltipDirection,
  type TourTone,
} from "./tour-types"
import styles from "./inline-tooltip-builder.module.css"

export interface TooltipBuildState {
  title: string
  body: string
  direction: TooltipDirection
  align: TooltipAlign
  closeCta: boolean
  /** Optional CTA copy. */
  ctaLabel: string
}

interface InlineTooltipBuilderProps {
  state: TooltipBuildState
  onChange: (patch: Partial<TooltipBuildState>) => void
  tone?: TourTone
  className?: string
}

const DIRECTIONS: ReadonlyArray<TooltipDirection> = ["top", "right", "bottom", "left"]
const ALIGNS: ReadonlyArray<TooltipAlign> = ["start", "center", "end"]
const ARROW_GLYPH: Record<TooltipDirection, string> = {
  top: "▲",
  right: "▶",
  bottom: "▼",
  left: "◀",
}

export function InlineTooltipBuilder({
  state,
  onChange,
  tone = "teal",
  className,
}: InlineTooltipBuilderProps) {
  const titleId = useId()
  const bodyId = useId()
  const ctaId = useId()
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Inline tooltip builder">
      <header className={styles.head}>
        <span className={styles.kicker}>Inline tooltip</span>
        <h3 className={styles.title}>Tooltip composer</h3>
      </header>

      <div className={styles.fields}>
        <label htmlFor={titleId} className={styles.field}>
          <span className={styles.fieldLabel}>Tooltip title</span>
          <input
            id={titleId}
            className={styles.input}
            type="text"
            value={state.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </label>
        <label htmlFor={bodyId} className={styles.field}>
          <span className={styles.fieldLabel}>Tooltip body</span>
          <textarea
            id={bodyId}
            className={styles.textarea}
            rows={3}
            value={state.body}
            onChange={(event) => onChange({ body: event.target.value })}
          />
        </label>
        <label htmlFor={ctaId} className={styles.field}>
          <span className={styles.fieldLabel}>CTA label</span>
          <input
            id={ctaId}
            className={styles.input}
            type="text"
            value={state.ctaLabel}
            onChange={(event) => onChange({ ctaLabel: event.target.value })}
          />
        </label>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <span className={styles.fieldLabel}>Position</span>
          <div className={styles.positionPicker} role="radiogroup" aria-label="Tooltip position">
            {DIRECTIONS.map((direction) => (
              <button
                type="button"
                key={direction}
                className={[
                  styles.positionBtn,
                  state.direction === direction ? styles.positionBtnOn : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-checked={state.direction === direction}
                role="radio"
                onClick={() => onChange({ direction })}
              >
                <span aria-hidden="true">{ARROW_GLYPH[direction]}</span>
                <span>{direction}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <span className={styles.fieldLabel}>Align</span>
          <div className={styles.chipRow} role="radiogroup" aria-label="Tooltip align">
            {ALIGNS.map((align) => (
              <Chip
                key={align}
                label={align}
                tone={TOUR_TONE_TO_CHIP[tone]}
                selected={state.align === align}
                onSelect={() => onChange({ align })}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.toggle}
        role="switch"
        aria-checked={state.closeCta}
        onClick={() => onChange({ closeCta: !state.closeCta })}
      >
        <span className={styles.toggleTrack}>
          <span className={styles.toggleThumb} aria-hidden="true" />
        </span>
        <span>Show close-CTA (×) on tooltip</span>
      </button>
    </section>
  )
}

export default InlineTooltipBuilder
