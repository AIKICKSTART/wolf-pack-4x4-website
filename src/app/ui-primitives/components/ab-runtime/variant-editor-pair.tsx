"use client"

import { useCallback, useId, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./variant-editor-pair.module.css"

export interface VariantEditorPairValue {
  headline: string
  body: string
}

export interface VariantEditorPairProps {
  /** Title shown above the side-by-side editor. */
  title: string
  /** Optional kicker above the title. */
  kicker?: string
  /** Display name for the control column (e.g. "Control"). */
  controlName?: string
  /** Display name for the treatment column (e.g. "Treatment A"). */
  treatmentName?: string
  controlValue?: VariantEditorPairValue
  treatmentValue?: VariantEditorPairValue
  defaultControl?: VariantEditorPairValue
  defaultTreatment?: VariantEditorPairValue
  onChange?: (next: {
    control: VariantEditorPairValue
    treatment: VariantEditorPairValue
  }) => void
  className?: string
}

const FALLBACK: VariantEditorPairValue = { headline: "", body: "" }

function charDiff(a: string, b: string): number {
  return b.length - a.length
}

export function VariantEditorPair({
  title,
  kicker = "Variant editor · Control vs Treatment",
  controlName = "Control",
  treatmentName = "Treatment",
  controlValue,
  treatmentValue,
  defaultControl,
  defaultTreatment,
  onChange,
  className,
}: VariantEditorPairProps) {
  const headlineId = useId()
  const bodyId = useId()

  const isControlControlled = controlValue !== undefined
  const isTreatmentControlled = treatmentValue !== undefined

  const [internalControl, setInternalControl] = useState<VariantEditorPairValue>(
    defaultControl ?? FALLBACK,
  )
  const [internalTreatment, setInternalTreatment] =
    useState<VariantEditorPairValue>(defaultTreatment ?? FALLBACK)

  const control = isControlControlled ? controlValue : internalControl
  const treatment = isTreatmentControlled ? treatmentValue : internalTreatment

  const commit = useCallback(
    (
      nextControl: VariantEditorPairValue,
      nextTreatment: VariantEditorPairValue,
    ) => {
      onChange?.({ control: nextControl, treatment: nextTreatment })
    },
    [onChange],
  )

  const updateControl = useCallback(
    (patch: Partial<VariantEditorPairValue>) => {
      const next: VariantEditorPairValue = { ...control, ...patch }
      if (!isControlControlled) {
        setInternalControl(next)
      }
      commit(next, treatment)
    },
    [commit, control, isControlControlled, treatment],
  )

  const updateTreatment = useCallback(
    (patch: Partial<VariantEditorPairValue>) => {
      const next: VariantEditorPairValue = { ...treatment, ...patch }
      if (!isTreatmentControlled) {
        setInternalTreatment(next)
      }
      commit(control, next)
    },
    [commit, control, isTreatmentControlled, treatment],
  )

  const handleControlHeadline = (event: ChangeEvent<HTMLInputElement>) => {
    updateControl({ headline: event.target.value })
  }
  const handleControlBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateControl({ body: event.target.value })
  }
  const handleTreatmentHeadline = (event: ChangeEvent<HTMLInputElement>) => {
    updateTreatment({ headline: event.target.value })
  }
  const handleTreatmentBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateTreatment({ body: event.target.value })
  }

  const headlineDelta = charDiff(control.headline, treatment.headline)
  const bodyDelta = charDiff(control.body, treatment.body)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Variant editor: ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.pair}>
        <div className={styles.column}>
          <div className={styles.colHead}>
            <span className={styles.colLabel}>Control</span>
            <span className={styles.colName}>{controlName}</span>
          </div>
          <label className={styles.field} htmlFor={`${headlineId}-c`}>
            <span className={styles.fieldLabel}>Headline</span>
            <input
              id={`${headlineId}-c`}
              className={styles.input}
              type="text"
              value={control.headline}
              onChange={handleControlHeadline}
              spellCheck={false}
            />
          </label>
          <label className={styles.field} htmlFor={`${bodyId}-c`}>
            <span className={styles.fieldLabel}>Body</span>
            <textarea
              id={`${bodyId}-c`}
              className={styles.textarea}
              value={control.body}
              onChange={handleControlBody}
              spellCheck={false}
            />
          </label>
        </div>

        <div className={`${styles.column} ${styles.columnTreatment}`}>
          <div className={styles.colHead}>
            <span className={styles.colLabel}>Treatment</span>
            <span className={styles.colName}>{treatmentName}</span>
          </div>
          <label className={styles.field} htmlFor={`${headlineId}-t`}>
            <span className={styles.fieldLabel}>Headline</span>
            <input
              id={`${headlineId}-t`}
              className={styles.input}
              type="text"
              value={treatment.headline}
              onChange={handleTreatmentHeadline}
              spellCheck={false}
            />
          </label>
          <label className={styles.field} htmlFor={`${bodyId}-t`}>
            <span className={styles.fieldLabel}>Body</span>
            <textarea
              id={`${bodyId}-t`}
              className={styles.textarea}
              value={treatment.body}
              onChange={handleTreatmentBody}
              spellCheck={false}
            />
          </label>
        </div>
      </div>

      <div className={styles.diffStrip} aria-live="polite">
        <span className={styles.diffLabel}>Diff</span>
        <span className={styles.diffValue}>
          <Chip
            label={`Headline ${headlineDelta >= 0 ? "+" : ""}${headlineDelta} chars`}
            tone={headlineDelta === 0 ? "neutral" : "teal"}
          />{" "}
          <Chip
            label={`Body ${bodyDelta >= 0 ? "+" : ""}${bodyDelta} chars`}
            tone={bodyDelta === 0 ? "neutral" : "teal"}
          />
        </span>
      </div>
    </section>
  )
}

export default VariantEditorPair
