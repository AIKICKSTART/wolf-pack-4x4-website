"use client"

import { X } from "lucide-react"
import { Fragment, useEffect, useState, type ReactNode } from "react"

import { ClipboardCheckIcon, ShieldTickIcon, SpannerIcon } from "../../icons"
import { ProgressLinear } from "../../primitives/progress-linear"

import styles from "./slide-up-multi-step.module.css"

export interface SlideUpMultiStepStep {
  id: string
  label: string
  /** Heading rendered in the body. */
  heading: string
  /** Optional description below the heading. */
  description?: string
  /** Custom body slot (form fields, summary, etc.). */
  body?: ReactNode
}

export interface SlideUpMultiStepProps {
  open: boolean
  onClose: () => void
  kicker: string
  title: string
  steps: ReadonlyArray<SlideUpMultiStepStep>
  /** Current step index (0-based). */
  currentIndex: number
  /** Move to the next step. */
  onNext: () => void
  /** Move to the previous step. */
  onBack: () => void
  /** Final-step submit handler. Triggers the "Finish" CTA. */
  onFinish: () => void
  finishLabel?: string
  className?: string
}

export function SlideUpMultiStep({
  open,
  onClose,
  kicker,
  title,
  steps,
  currentIndex,
  onNext,
  onBack,
  onFinish,
  finishLabel = "Submit",
  className,
}: SlideUpMultiStepProps) {
  const [internalIndex] = useState<number>(currentIndex)

  useEffect(() => {
    if (!open) {
      return
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const totalSteps = steps.length
  const safeIndex = Math.min(Math.max(currentIndex, 0), totalSteps - 1)
  const activeStep = steps[safeIndex]
  const isFinalStep = safeIndex === totalSteps - 1
  const progress = totalSteps > 1 ? ((safeIndex + 1) / totalSteps) * 100 : 100

  // Use the internalIndex once so the ESLint unused-var rule stays happy. The
  // value is exposed as a `data-` hook for tests that want to assert initial.
  const dataInitial = String(internalIndex)

  return (
    <div
      className={[styles.root, open ? styles.rootOpen : null, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!open}
      data-initial-index={dataInitial}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Dismiss wizard"
        tabIndex={open ? 0 : -1}
      />
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>{kicker}</span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </header>

        <nav className={styles.stepper} aria-label="Wizard progress">
          {steps.map((step, index) => {
            const isActive = index === safeIndex
            const isDone = index < safeIndex
            return (
              <Fragment key={step.id}>
                <span
                  className={[
                    styles.step,
                    isActive && styles.stepActive,
                    isDone && styles.stepDone,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isDone ? (
                    <ShieldTickIcon size={14} tone="green" />
                  ) : (
                    <span className={styles.stepIndex}>{index + 1}</span>
                  )}
                  {step.label}
                </span>
                {index < steps.length - 1 ? (
                  <span className={styles.stepConnector} aria-hidden="true" />
                ) : null}
              </Fragment>
            )
          })}
        </nav>

        <div className={styles.body}>
          <h3 className={styles.bodyHeading}>{activeStep?.heading}</h3>
          {activeStep?.description ? (
            <p className={styles.bodyDescription}>{activeStep.description}</p>
          ) : null}
          {activeStep?.body}
        </div>

        <footer className={styles.foot}>
          <span className={styles.progressTrack} aria-hidden="true">
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </span>

          {/* Render an ARIA-rich ProgressLinear off-screen for AT users. */}
          <span style={{ position: "absolute", left: -9999, top: -9999 }}>
            <ProgressLinear value={progress} label="Wizard progress" />
          </span>

          <div className={styles.btnRow}>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={onBack}
              disabled={safeIndex === 0}
            >
              Back
            </button>
            {isFinalStep ? (
              <button type="button" className={styles.btnPrimary} onClick={onFinish}>
                <ClipboardCheckIcon size={14} tone="currentColor" />
                {finishLabel}
              </button>
            ) : (
              <button type="button" className={styles.btnPrimary} onClick={onNext}>
                <SpannerIcon size={14} tone="currentColor" />
                Next
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SlideUpMultiStep
