"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import type { BackoffStrategy } from "./job-queue-types"
import styles from "./retry-policy-editor.module.css"

export type OnErrorAction = "retry" | "dead-letter" | "drop"

export interface RetryPolicy {
  maxAttempts: number
  backoff: BackoffStrategy
  baseDelayMs: number
  maxDelayMs: number
  onError: OnErrorAction
}

interface RetryPolicyEditorProps {
  /** Initial policy state. */
  initial: RetryPolicy
  /** Called when any field changes. */
  onChange?: (next: RetryPolicy) => void
  className?: string
}

const STRATEGY_OPTIONS: ReadonlyArray<BackoffStrategy> = ["exponential", "linear", "fixed"]
const STRATEGY_LABEL: Record<BackoffStrategy, string> = {
  exponential: "Exponential",
  linear: "Linear",
  fixed: "Fixed",
}

const ACTION_OPTIONS: ReadonlyArray<OnErrorAction> = ["retry", "dead-letter", "drop"]
const ACTION_LABEL: Record<OnErrorAction, string> = {
  retry: "Retry",
  "dead-letter": "Dead letter",
  drop: "Drop",
}
const ACTION_TONE: Record<OnErrorAction, "amber" | "red" | "neutral"> = {
  retry: "amber",
  "dead-letter": "red",
  drop: "neutral",
}

export function RetryPolicyEditor({ initial, onChange, className }: RetryPolicyEditorProps) {
  const [policy, setPolicy] = useState<RetryPolicy>(initial)

  const update = <K extends keyof RetryPolicy>(key: K, value: RetryPolicy[K]) => {
    const next = { ...policy, [key]: value }
    setPolicy(next)
    onChange?.(next)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Retry policy editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Retry policy</span>
        <h3 className={styles.title}>Failure handling rules</h3>
      </header>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rpe-max-attempts">
          Max attempts
        </label>
        <input
          id="rpe-max-attempts"
          type="number"
          min={1}
          max={20}
          className={styles.input}
          value={policy.maxAttempts}
          onChange={(event) =>
            update("maxAttempts", Math.max(1, Math.min(20, Number(event.target.value) || 1)))
          }
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Backoff strategy</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="Backoff strategy">
          {STRATEGY_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={STRATEGY_LABEL[option]}
              tone={policy.backoff === option ? "teal" : "neutral"}
              selected={policy.backoff === option}
              onSelect={() => update("backoff", option)}
            />
          ))}
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="rpe-base-delay">
            Base delay (ms)
          </label>
          <input
            id="rpe-base-delay"
            type="number"
            min={0}
            step={100}
            className={styles.input}
            value={policy.baseDelayMs}
            onChange={(event) =>
              update("baseDelayMs", Math.max(0, Number(event.target.value) || 0))
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="rpe-max-delay">
            Max delay (ms)
          </label>
          <input
            id="rpe-max-delay"
            type="number"
            min={0}
            step={1000}
            className={styles.input}
            value={policy.maxDelayMs}
            onChange={(event) =>
              update("maxDelayMs", Math.max(0, Number(event.target.value) || 0))
            }
          />
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>On final error</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="On final error">
          {ACTION_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={ACTION_LABEL[option]}
              tone={policy.onError === option ? ACTION_TONE[option] : "neutral"}
              selected={policy.onError === option}
              onSelect={() => update("onError", option)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RetryPolicyEditor
