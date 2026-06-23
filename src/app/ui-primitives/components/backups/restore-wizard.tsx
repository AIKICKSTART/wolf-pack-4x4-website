"use client"

import { useState } from "react"

import type { SnapshotRecord } from "./backup-types"

import styles from "./restore-wizard.module.css"

const STEPS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "target", label: "Target" },
  { id: "impact", label: "Impact" },
  { id: "confirm", label: "Confirm" },
] as const

type StepId = (typeof STEPS)[number]["id"]

export interface RestoreTarget {
  id: string
  label: string
  /** Optional location/host detail. */
  detail?: string
}

interface RestoreWizardProps {
  snapshots: ReadonlyArray<SnapshotRecord>
  targets: ReadonlyArray<RestoreTarget>
  /** Lines summarising the restore impact (data loss, downtime, etc.). */
  impactSummary: ReadonlyArray<string>
  onConfirm?: (snapshotId: string, targetId: string) => void
  className?: string
}

export function RestoreWizard({
  snapshots,
  targets,
  impactSummary,
  onConfirm,
  className,
}: RestoreWizardProps) {
  const [step, setStep] = useState<StepId>("snapshot")
  const [snapshotId, setSnapshotId] = useState<string | null>(snapshots[0]?.id ?? null)
  const [targetId, setTargetId] = useState<string | null>(targets[0]?.id ?? null)

  const stepIndex = STEPS.findIndex((s) => s.id === step)
  const progressPct = ((stepIndex + 1) / STEPS.length) * 100

  const canAdvance =
    (step === "snapshot" && snapshotId !== null) ||
    (step === "target" && targetId !== null) ||
    step === "impact" ||
    step === "confirm"

  const advance = () => {
    if (step === "snapshot") {
      setStep("target")
    } else if (step === "target") {
      setStep("impact")
    } else if (step === "impact") {
      setStep("confirm")
    } else if (step === "confirm" && snapshotId && targetId) {
      onConfirm?.(snapshotId, targetId)
    }
  }

  const back = () => {
    if (step === "target") setStep("snapshot")
    else if (step === "impact") setStep("target")
    else if (step === "confirm") setStep("impact")
  }

  const classes = [styles.wizard, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Restore wizard">
      <header className={styles.head}>
        <span className={styles.kicker}>Restore wizard</span>
        <ol className={styles.stepper} aria-label="Wizard steps">
          {STEPS.map((s, index) => {
            const isCurrent = s.id === step
            const isComplete = index < stepIndex
            return (
              <li
                key={s.id}
                className={[
                  styles.step,
                  isCurrent ? styles.stepCurrent : null,
                  isComplete ? styles.stepDone : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className={styles.stepIndex}>{index + 1}</span>
                <span className={styles.stepLabel}>{s.label}</span>
              </li>
            )
          })}
        </ol>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Restore wizard progress"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className={styles.progressFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <div className={styles.body}>
        {step === "snapshot" ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Choose a snapshot</legend>
            <ul className={styles.optionList}>
              {snapshots.map((snap) => (
                <li key={snap.id}>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      name="snapshot"
                      value={snap.id}
                      checked={snapshotId === snap.id}
                      onChange={() => setSnapshotId(snap.id)}
                    />
                    <span className={styles.optionMain}>
                      <span className={styles.optionTitle}>{snap.id}</span>
                      <span className={styles.optionDetail}>
                        {snap.resourceName} · {snap.createdAt}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : null}

        {step === "target" ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Choose restore target</legend>
            <ul className={styles.optionList}>
              {targets.map((target) => (
                <li key={target.id}>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      name="target"
                      value={target.id}
                      checked={targetId === target.id}
                      onChange={() => setTargetId(target.id)}
                    />
                    <span className={styles.optionMain}>
                      <span className={styles.optionTitle}>{target.label}</span>
                      {target.detail ? (
                        <span className={styles.optionDetail}>{target.detail}</span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : null}

        {step === "impact" ? (
          <div className={styles.impact}>
            <span className={styles.legend}>Review impact</span>
            <ul className={styles.impactList}>
              {impactSummary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {step === "confirm" ? (
          <div className={styles.confirm}>
            <span className={styles.legend}>Confirm restore</span>
            <p className={styles.confirmText}>
              Restore <strong>{snapshotId}</strong> into{" "}
              <strong>{targets.find((t) => t.id === targetId)?.label ?? "—"}</strong>?
              This operation cannot be undone once started.
            </p>
          </div>
        ) : null}
      </div>

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.btn}
          onClick={back}
          disabled={step === "snapshot"}
        >
          Back
        </button>
        <button
          type="button"
          className={[styles.btn, styles.btnPrimary].join(" ")}
          onClick={advance}
          disabled={!canAdvance}
        >
          {step === "confirm" ? "Start restore" : "Next"}
        </button>
      </footer>
    </section>
  )
}

export default RestoreWizard
