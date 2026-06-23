"use client"

import { Code as CodeIcon } from "lucide-react"
import { useId } from "react"

import { Chip } from "../primitives/chip"
import { MaterialSurface } from "../surfaces/material-surface"
import {
  STEP_SHAPE_LABEL,
  TOUR_TONE_TO_CHIP,
  type TooltipAlign,
  type TooltipDirection,
  type TourStepShape,
  type TourTone,
} from "./tour-types"
import styles from "./step-config-pane.module.css"

export interface StepConfig {
  id: string
  index: number
  total: number
  shape: TourStepShape
  /** CSS selector or DOM data-tour attribute the step anchors to. */
  targetSelector: string
  title: string
  body: string
  /** Optional CTA primary label. */
  primaryLabel: string
  /** Tooltip placement when shape === "tooltip". */
  direction?: TooltipDirection
  /** Tooltip alignment along the chosen edge. */
  align?: TooltipAlign
  /** Whether the user can skip the step. */
  skippable: boolean
  /** Auto-advance delay in ms; 0 = manual. */
  delayMs: number
  /** Tone used for chip + accent. */
  tone?: TourTone
}

interface StepConfigPaneProps {
  step: StepConfig
  /** Patch-style update callback. */
  onChange: (patch: Partial<StepConfig>) => void
  className?: string
}

const DIRECTIONS: ReadonlyArray<TooltipDirection> = ["top", "right", "bottom", "left"]
const ALIGNS: ReadonlyArray<TooltipAlign> = ["start", "center", "end"]
const DELAY_PRESETS: ReadonlyArray<{ label: string; ms: number }> = [
  { label: "Manual", ms: 0 },
  { label: "1.5s", ms: 1500 },
  { label: "3s", ms: 3000 },
  { label: "6s", ms: 6000 },
]

export function StepConfigPane({ step, onChange, className }: StepConfigPaneProps) {
  const titleId = useId()
  const bodyId = useId()
  const targetId = useId()
  const primaryId = useId()
  const tone: TourTone = step.tone ?? "teal"

  return (
    <aside
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      aria-label={`Step inspector — step ${step.index} of ${step.total}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          Step {step.index} / {step.total}
        </span>
        <h3 className={styles.title}>Step configuration</h3>
        <Chip
          label={STEP_SHAPE_LABEL[step.shape]}
          tone={TOUR_TONE_TO_CHIP[tone]}
        />
      </header>

      <MaterialSurface tone="surface" elevation={1} className={styles.section}>
        <label className={styles.field} htmlFor={targetId}>
          <span className={styles.fieldLabel}>
            <CodeIcon size={12} aria-hidden="true" strokeWidth={2.4} />
            Target selector
          </span>
          <input
            id={targetId}
            className={styles.input}
            type="text"
            value={step.targetSelector}
            placeholder={`[data-tour="quote-cta"]`}
            spellCheck={false}
            onChange={(event) => onChange({ targetSelector: event.target.value })}
          />
          <span className={styles.fieldHelp}>
            Use a stable data attribute (e.g. <code>[data-tour=&quot;quote-cta&quot;]</code>).
          </span>
        </label>
      </MaterialSurface>

      <MaterialSurface tone="surface" elevation={1} className={styles.section}>
        <label className={styles.field} htmlFor={titleId}>
          <span className={styles.fieldLabel}>Title</span>
          <input
            id={titleId}
            className={styles.input}
            type="text"
            value={step.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </label>
        <label className={styles.field} htmlFor={bodyId}>
          <span className={styles.fieldLabel}>Body copy</span>
          <textarea
            id={bodyId}
            className={styles.textarea}
            rows={3}
            value={step.body}
            onChange={(event) => onChange({ body: event.target.value })}
          />
        </label>
        <label className={styles.field} htmlFor={primaryId}>
          <span className={styles.fieldLabel}>Primary CTA label</span>
          <input
            id={primaryId}
            className={styles.input}
            type="text"
            value={step.primaryLabel}
            onChange={(event) => onChange({ primaryLabel: event.target.value })}
          />
        </label>
      </MaterialSurface>

      {step.shape === "tooltip" ? (
        <MaterialSurface tone="surface" elevation={1} className={styles.section}>
          <div className={styles.row}>
            <div className={styles.col}>
              <span className={styles.fieldLabel}>Direction</span>
              <div className={styles.chipRow} role="radiogroup" aria-label="Tooltip direction">
                {DIRECTIONS.map((direction) => (
                  <Chip
                    key={direction}
                    label={direction}
                    selected={(step.direction ?? "bottom") === direction}
                    tone={TOUR_TONE_TO_CHIP[tone]}
                    onSelect={() => onChange({ direction })}
                  />
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
                    selected={(step.align ?? "center") === align}
                    tone={TOUR_TONE_TO_CHIP[tone]}
                    onSelect={() => onChange({ align })}
                  />
                ))}
              </div>
            </div>
          </div>
        </MaterialSurface>
      ) : null}

      <MaterialSurface tone="surface" elevation={1} className={styles.section}>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.fieldLabel}>Auto-advance delay</span>
            <div className={styles.chipRow} role="radiogroup" aria-label="Step delay">
              {DELAY_PRESETS.map((preset) => (
                <Chip
                  key={preset.ms}
                  label={preset.label}
                  selected={step.delayMs === preset.ms}
                  tone={TOUR_TONE_TO_CHIP[tone]}
                  onSelect={() => onChange({ delayMs: preset.ms })}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.toggle}
          role="switch"
          aria-checked={step.skippable}
          onClick={() => onChange({ skippable: !step.skippable })}
        >
          <span className={styles.toggleTrack}>
            <span className={styles.toggleThumb} aria-hidden="true" />
          </span>
          <span className={styles.toggleLabel}>Allow user to skip this step</span>
        </button>
      </MaterialSurface>
    </aside>
  )
}

export default StepConfigPane
