"use client"

import { useState } from "react"
import { Repeat } from "lucide-react"

import { ConfirmDialog } from "../overlays/confirm-dialog"
import { Chip } from "../primitives/chip"

import styles from "./job-retry-button.module.css"

export interface PipelineStep {
  /** Stable step id used for retry routing. */
  id: string
  /** Display label (e.g. "1. Build PDF"). */
  label: string
}

interface JobRetryButtonProps {
  jobId: string
  /** Optional list of pipeline steps. When provided, user can pick step to retry from. */
  steps?: ReadonlyArray<PipelineStep>
  /** Fires on confirmation. `stepId` is undefined for a full restart. */
  onConfirm: (jobId: string, stepId: string | undefined) => void
  /** Disable the button entirely. */
  disabled?: boolean
  className?: string
}

export function JobRetryButton({
  jobId,
  steps,
  onConfirm,
  disabled = false,
  className,
}: JobRetryButtonProps) {
  const [open, setOpen] = useState(false)
  const [selectedStep, setSelectedStep] = useState<string | undefined>(undefined)

  const handleConfirm = () => {
    onConfirm(jobId, selectedStep)
    setOpen(false)
  }

  const classes = [styles.button, className].filter(Boolean).join(" ")
  const fromLabel = selectedStep
    ? steps?.find((s) => s.id === selectedStep)?.label ?? "selected step"
    : "the start"

  return (
    <>
      <button
        type="button"
        className={classes}
        onClick={() => setOpen(true)}
        disabled={disabled}
        aria-label={`Retry job ${jobId}`}
      >
        <Repeat size={12} strokeWidth={2.4} aria-hidden="true" />
        <span>Retry</span>
      </button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Retry ${jobId}?`}
        description={`The job will be re-enqueued from ${fromLabel}. Any partial side effects from the prior run will not be rolled back.`}
        confirmLabel="Re-enqueue"
        onConfirm={handleConfirm}
      />

      {steps && steps.length > 0 && open ? (
        <div className={styles.stepPicker} role="radiogroup" aria-label="Retry from step">
          <span className={styles.pickerLabel}>Retry from</span>
          <div className={styles.chipRow}>
            <Chip
              label="Start"
              tone={selectedStep === undefined ? "teal" : "neutral"}
              selected={selectedStep === undefined}
              onSelect={() => setSelectedStep(undefined)}
            />
            {steps.map((step) => (
              <Chip
                key={step.id}
                label={step.label}
                tone={selectedStep === step.id ? "teal" : "neutral"}
                selected={selectedStep === step.id}
                onSelect={() => setSelectedStep(step.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default JobRetryButton
