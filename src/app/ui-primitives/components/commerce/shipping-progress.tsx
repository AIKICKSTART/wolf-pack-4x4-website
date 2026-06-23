"use client"

import { Check } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import styles from "./shipping-progress.module.css"

export type ShippingStepStatus = "complete" | "current" | "upcoming"

export interface ShippingStep {
  key: string
  label: string
  description?: string
  timestamp?: string
  status: ShippingStepStatus
}

interface ShippingProgressProps {
  steps: ReadonlyArray<ShippingStep>
  orientation?: "horizontal" | "vertical"
  ariaLabel?: string
}

const STATUS_CLASS: Record<ShippingStepStatus, string> = {
  complete: styles.statusComplete,
  current: styles.statusCurrent,
  upcoming: styles.statusUpcoming,
}

export function ShippingProgress({
  steps,
  orientation = "horizontal",
  ariaLabel = "Shipping progress",
}: ShippingProgressProps) {
  const reducedMotion = useReducedMotion()
  const orientationClass = orientation === "vertical" ? styles.vertical : styles.horizontal
  const completeCount = steps.filter((step) => step.status === "complete").length
  const currentIndex = steps.findIndex((step) => step.status === "current")

  return (
    <section
      className={`${styles.wrapper} ${orientationClass}`}
      aria-label={ariaLabel}
      role="group"
    >
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          const isComplete = step.status === "complete"
          const isCurrent = step.status === "current"

          return (
            <li
              key={step.key}
              className={`${styles.step} ${STATUS_CLASS[step.status]}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.dot} aria-hidden="true">
                {isComplete ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <span className={styles.dotInner} />
                )}
                {isCurrent && !reducedMotion && (
                  <motion.span
                    className={styles.pulse}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{
                      duration: 1.8,
                      ease: "easeOut",
                      repeat: Infinity,
                    }}
                  />
                )}
              </span>
              {!isLast && (
                <span className={styles.connector} aria-hidden="true">
                  <span className={styles.connectorFill} />
                </span>
              )}
              <div className={styles.text}>
                <span className={styles.label}>{step.label}</span>
                {step.description && (
                  <span className={styles.description}>{step.description}</span>
                )}
                {step.timestamp && (
                  <time className={styles.timestamp}>{step.timestamp}</time>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      <p className={styles.meta} role="status" aria-live="polite">
        {completeCount} of {steps.length} stages complete
        {currentIndex >= 0 ? ` · ${steps[currentIndex].label} in progress` : ""}
      </p>
    </section>
  )
}

export default ShippingProgress
