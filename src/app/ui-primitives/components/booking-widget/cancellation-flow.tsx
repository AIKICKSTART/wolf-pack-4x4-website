"use client"

import { AlertTriangle, ArrowLeft, Check } from "lucide-react"
import { useId } from "react"

import styles from "./cancellation-flow.module.css"
import type { CancellationReason } from "./booking-widget-types"

type Step = 1 | 2 | 3

interface CancellationFlowProps {
  step: Step
  reason: CancellationReason | null
  /** Days remaining inside the free-cancel window. */
  refundWindowDays: number
  /** Plain-language policy bullets. */
  policyPoints: ReadonlyArray<string>
  /** Booking reference for the final confirm step. */
  bookingId: string
  onReasonChange?: (reason: CancellationReason) => void
  onNextStep?: () => void
  onPrevStep?: () => void
  onConfirm?: (reason: CancellationReason) => void
}

const REASONS: ReadonlyArray<{ id: CancellationReason; label: string }> = [
  { id: "schedule-conflict", label: "Schedule conflict" },
  { id: "vehicle-sold", label: "Vehicle sold" },
  { id: "found-elsewhere", label: "Booked elsewhere" },
  { id: "weather", label: "Weather" },
  { id: "price-changed", label: "Price changed" },
  { id: "other", label: "Other" },
]

function StepIndicator({ step }: { step: Step }) {
  return (
    <ol className={styles.steps} aria-label="Progress">
      {[1, 2, 3].map((index) => {
        const isActive = step === index
        const isDone = step > index
        const labels = ["Reason", "Policy", "Confirm"]
        return (
          <li
            key={index}
            className={[
              styles.stepItem,
              isActive && styles.stepActive,
              isDone && styles.stepDone,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={isActive ? "step" : undefined}
          >
            <span className={styles.stepNumber}>
              {isDone ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : index}
            </span>
            <span>{labels[index - 1]}</span>
          </li>
        )
      })}
    </ol>
  )
}

export function CancellationFlow({
  step,
  reason,
  refundWindowDays,
  policyPoints,
  bookingId,
  onReasonChange,
  onNextStep,
  onPrevStep,
  onConfirm,
}: CancellationFlowProps) {
  const titleId = useId()
  const isFreeWindow = refundWindowDays > 0

  return (
    <section
      className={styles.wrap}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Cancel booking</span>
        <h2 id={titleId} className={styles.title}>
          We&apos;re sorry to hear it
        </h2>
        <StepIndicator step={step} />
      </header>

      {step === 1 ? (
        <div className={styles.body}>
          <p className={styles.copy}>Pick a reason. Helps us improve.</p>
          <div
            className={styles.reasonGrid}
            role="radiogroup"
            aria-label="Cancellation reason"
          >
            {REASONS.map((item) => {
              const isSelected = reason === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={[styles.reason, isSelected && styles.reasonSelected]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onReasonChange?.(item.id)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.body}>
          <div className={styles.policyHead}>
            <span
              className={[
                styles.refundChip,
                isFreeWindow ? styles.refundFree : styles.refundFee,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isFreeWindow
                ? `Free cancel · ${refundWindowDays} day${refundWindowDays === 1 ? "" : "s"} left`
                : "Outside refund window"}
            </span>
          </div>
          <ul className={styles.policyList}>
            {policyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {step === 3 ? (
        <div className={styles.body}>
          <p className={styles.confirmCopy}>
            You&apos;re about to cancel <strong>{bookingId}</strong>. This can&apos;t be
            undone. We&apos;ll release the bay back to the schedule immediately.
          </p>
          {!isFreeWindow ? (
            <p className={styles.warning} role="note">
              <AlertTriangle size={14} strokeWidth={2.2} aria-hidden="true" />
              Outside the free window. A late-cancel fee may apply.
            </p>
          ) : null}
        </div>
      ) : null}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.ghost}
          onClick={onPrevStep}
          disabled={step === 1}
        >
          <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
          Back
        </button>
        {step === 3 ? (
          <button
            type="button"
            className={styles.primary}
            onClick={() => reason && onConfirm?.(reason)}
            disabled={!reason}
          >
            Confirm cancellation
          </button>
        ) : (
          <button
            type="button"
            className={styles.primary}
            onClick={onNextStep}
            disabled={step === 1 && reason === null}
          >
            Continue
          </button>
        )}
      </footer>
    </section>
  )
}

export default CancellationFlow
