"use client"

import { Check } from "lucide-react"

import type { CheckoutStage, CheckoutStageMeta } from "./storefront-types"
import styles from "./checkout-stepper.module.css"

interface StorefrontCheckoutStepperProps {
  stages: ReadonlyArray<CheckoutStageMeta>
  ariaLabel?: string
  onJump?: (stage: CheckoutStage) => void
}

const ORDER: CheckoutStage[] = ["cart", "shipping", "payment", "review"]

export function StorefrontCheckoutStepper({
  stages,
  ariaLabel = "Checkout progress",
  onJump,
}: StorefrontCheckoutStepperProps) {
  const ordered = ORDER.map((key) => stages.find((stage) => stage.key === key)).filter(
    (stage): stage is CheckoutStageMeta => Boolean(stage),
  )
  const currentIndex = ordered.findIndex((stage) => stage.status === "current")
  const completedIndex = ordered.filter((stage) => stage.status === "complete").length
  const totalProgress = ordered.length === 0 ? 0 : Math.round(
    ((currentIndex >= 0 ? currentIndex : completedIndex) / ordered.length) * 100,
  )

  return (
    <nav className={styles.nav} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {ordered.map((stage, index) => {
          const isComplete = stage.status === "complete"
          const isCurrent = stage.status === "current"
          const isClickable = Boolean(onJump) && (isComplete || isCurrent)
          return (
            <li
              key={stage.key}
              className={`${styles.item} ${styles[stage.status]}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <button
                type="button"
                className={styles.itemBtn}
                disabled={!isClickable}
                onClick={() => onJump?.(stage.key)}
                aria-label={`Go to ${stage.label}`}
              >
                <span className={styles.badge} aria-hidden="true">
                  {isComplete ? (
                    <Check size={14} strokeWidth={2.8} />
                  ) : (
                    <span className={styles.indexNum}>{String(index + 1).padStart(2, "0")}</span>
                  )}
                </span>
                <span className={styles.body}>
                  <span className={styles.label}>{stage.label}</span>
                  <span className={styles.caption}>{stage.caption}</span>
                </span>
              </button>
              {index < ordered.length - 1 && <span className={styles.rule} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
      <div className={styles.track} role="progressbar" aria-valuenow={totalProgress} aria-valuemin={0} aria-valuemax={100}>
        <span className={styles.trackFill} style={{ width: `${totalProgress}%` }} />
      </div>
    </nav>
  )
}

export default StorefrontCheckoutStepper
