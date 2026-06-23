"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react"

import styles from "./wizard-modal.module.css"

export interface WizardStep<T extends string> {
  id: T
  label: string
  description?: string
  content: ReactNode
  skippable?: boolean
}

interface WizardModalProps<T extends string> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  steps: ReadonlyArray<WizardStep<T>>
  initialStep?: T
  onFinish: (lastStepId: T) => void
  onStepChange?: (stepId: T) => void
  finishLabel?: string
  cancelLabel?: string
}

export function WizardModal<T extends string>({
  open,
  onOpenChange,
  title,
  steps,
  initialStep,
  onFinish,
  onStepChange,
  finishLabel = "Finish",
  cancelLabel = "Cancel",
}: WizardModalProps<T>) {
  const firstId = steps[0]?.id
  const startId = initialStep ?? firstId
  const [activeId, setActiveId] = useState<T | undefined>(startId)

  const activeIndex = useMemo(
    () => steps.findIndex((step) => step.id === activeId),
    [steps, activeId],
  )
  const safeIndex = activeIndex >= 0 ? activeIndex : 0
  const activeStep = steps[safeIndex]
  const isLast = safeIndex === steps.length - 1
  const isFirst = safeIndex === 0
  const stepCount = steps.length
  const progress = stepCount > 1 ? (safeIndex / (stepCount - 1)) * 100 : 100
  const stepperStyle = { "--wizard-step-count": stepCount } as CSSProperties
  const progressStyle = { "--wizard-progress": `${progress}%` } as CSSProperties

  const setStep = useCallback(
    (id: T) => {
      setActiveId(id)
      onStepChange?.(id)
    },
    [onStepChange],
  )

  const handleNext = useCallback(() => {
    if (!activeStep) {
      return
    }
    if (isLast) {
      onFinish(activeStep.id)
      return
    }
    const next = steps[safeIndex + 1]
    if (next) {
      setStep(next.id)
    }
  }, [activeStep, isLast, onFinish, safeIndex, setStep, steps])

  const handleBack = useCallback(() => {
    const prev = steps[safeIndex - 1]
    if (prev) {
      setStep(prev.id)
    }
  }, [safeIndex, setStep, steps])

  const handleSkip = useCallback(() => {
    if (!activeStep?.skippable) {
      return
    }
    handleNext()
  }, [activeStep, handleNext])

  if (!activeStep) {
    return null
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <header className={styles.head}>
            <div>
              <span className={styles.eyebrow}>
                Step <span className={styles.eyebrowFigure}>{safeIndex + 1}</span> of{" "}
                <span className={styles.eyebrowFigure}>{steps.length}</span>
              </span>
              <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            </div>
            <BaseDialog.Close className={styles.closeBtn} aria-label="Close wizard">
              <X size={16} strokeWidth={2.2} aria-hidden="true" />
            </BaseDialog.Close>
          </header>
          <div
            className={styles.progressTrack}
            style={progressStyle}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={safeIndex + 1}
            aria-label="Wizard progress"
          >
            <span className={styles.progressFill} aria-hidden="true" />
          </div>
          <ol className={styles.stepper} style={stepperStyle} aria-label="Wizard steps">
            {steps.map((step, idx) => {
              const isComplete = idx < safeIndex
              const isCurrent = idx === safeIndex
              const stateClass = isComplete
                ? styles.stepComplete
                : isCurrent
                  ? styles.stepCurrent
                  : styles.stepUpcoming
              return (
                <li
                  key={step.id}
                  className={[styles.step, stateClass].join(" ")}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span className={styles.stepIndex} aria-hidden="true">
                    {isComplete ? <Check size={12} strokeWidth={2.6} /> : idx + 1}
                  </span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </li>
              )
            })}
          </ol>
          {activeStep.description && (
            <BaseDialog.Description className={styles.stepDescription}>
              {activeStep.description}
            </BaseDialog.Description>
          )}
          <div className={styles.body}>{activeStep.content}</div>
          <footer className={styles.actions}>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </button>
            <div className={styles.actionsRight}>
              {activeStep.skippable && !isLast && (
                <button type="button" className={styles.ghostBtn} onClick={handleSkip}>
                  Skip
                </button>
              )}
              {!isFirst && (
                <button type="button" className={styles.secondaryBtn} onClick={handleBack}>
                  <ChevronLeft size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>Back</span>
                </button>
              )}
              <button type="button" className={styles.primaryBtn} onClick={handleNext}>
                <span>{isLast ? finishLabel : "Next"}</span>
                {!isLast && <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />}
              </button>
            </div>
          </footer>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default WizardModal
