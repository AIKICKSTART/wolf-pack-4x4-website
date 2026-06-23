"use client"

import { useState } from "react"
import { Database, RotateCcw } from "lucide-react"

import type { BackupRecord } from "./db-admin-types"
import styles from "./backup-restore-panel.module.css"

interface BackupRestorePanelProps {
  backups: ReadonlyArray<BackupRecord>
  /** Triggered when the manual backup button is clicked. */
  onCreateBackup?: () => void
  /** Triggered when restore is confirmed with the chosen backup id. */
  onRestore?: (backupId: string) => void
  className?: string
}

const WIZARD_STEPS = [
  { id: "select", label: "Select" },
  { id: "review", label: "Review" },
  { id: "confirm", label: "Confirm" },
] as const

type WizardStepId = (typeof WIZARD_STEPS)[number]["id"]

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  const units = ["KB", "MB", "GB", "TB"]
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

export function BackupRestorePanel({
  backups,
  onCreateBackup,
  onRestore,
  className,
}: BackupRestorePanelProps) {
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(
    backups[0]?.id ?? null,
  )
  const [step, setStep] = useState<WizardStepId>("select")
  const selected = backups.find((backup) => backup.id === selectedBackupId)

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  const advance = () => {
    if (step === "select") {
      setStep("review")
    } else if (step === "review") {
      setStep("confirm")
    } else if (step === "confirm" && selectedBackupId) {
      onRestore?.(selectedBackupId)
      setStep("select")
    }
  }

  const back = () => {
    if (step === "review") {
      setStep("select")
    } else if (step === "confirm") {
      setStep("review")
    }
  }

  return (
    <section className={classes} aria-label="Backup and restore">
      <header className={styles.head}>
        <span className={styles.kicker}>Backup / Restore</span>
        <span className={styles.title}>{backups.length} backups available</span>
        <button
          type="button"
          className={styles.manualCta}
          onClick={onCreateBackup}
          aria-label="Create manual backup now"
        >
          <Database size={12} strokeWidth={2.4} aria-hidden="true" />
          Backup now
        </button>
      </header>

      <ul className={styles.list} aria-label="Backups">
        {backups.map((backup) => (
          <li key={backup.id} className={styles.backupRow}>
            <span
              className={`${styles.kindChip} ${
                backup.kind === "scheduled" ? styles.kindScheduled : styles.kindManual
              }`}
            >
              {backup.kind}
            </span>
            <span className={styles.timestamp}>{backup.createdAt}</span>
            <span className={styles.size}>{formatBytes(backup.sizeBytes)}</span>
            <span className={styles.retention}>{backup.retention}</span>
            <button
              type="button"
              className={styles.restoreBtn}
              onClick={() => {
                setSelectedBackupId(backup.id)
                setStep("review")
              }}
              aria-label={`Select backup ${backup.id} for restore`}
            >
              <RotateCcw size={11} strokeWidth={2.4} aria-hidden="true" />
              Restore
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.wizard}>
        <div className={styles.wizardHeader}>
          <span className={styles.kicker}>Restore wizard</span>
          <div className={styles.wizardSteps} role="tablist" aria-label="Restore wizard steps">
            {WIZARD_STEPS.map((wizardStep, index) => {
              const isCurrent = step === wizardStep.id
              const isDisabled =
                wizardStep.id === "review" && !selectedBackupId
              return (
                <button
                  key={wizardStep.id}
                  type="button"
                  className={styles.step}
                  role="tab"
                  aria-current={isCurrent ? "step" : undefined}
                  aria-disabled={isDisabled}
                  aria-selected={isCurrent}
                  onClick={() => {
                    if (!isDisabled) {
                      setStep(wizardStep.id)
                    }
                  }}
                >
                  <span className={styles.stepIndex}>{index + 1}</span>
                  {wizardStep.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className={styles.wizardBody}>
          {step === "select" ? (
            <span>Pick a backup from the list above to begin a restore.</span>
          ) : null}
          {step === "review" && selected ? (
            <span>
              Restoring <strong>{selected.id}</strong> taken at <strong>{selected.createdAt}</strong>
              {" — "}
              {formatBytes(selected.sizeBytes)} ({selected.kind}). Targets the current connection.
            </span>
          ) : null}
          {step === "confirm" && selected ? (
            <span>
              This will overwrite the active database with backup{" "}
              <strong>{selected.id}</strong>. The operation cannot be undone.
            </span>
          ) : null}
        </div>
        <div className={styles.wizardActions}>
          <button
            type="button"
            className={styles.wizardBtn}
            onClick={back}
            disabled={step === "select"}
          >
            Back
          </button>
          <button
            type="button"
            className={`${styles.wizardBtn} ${styles.wizardBtnPrimary}`}
            onClick={advance}
            disabled={!selectedBackupId}
          >
            {step === "confirm" ? "Restore" : "Next"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BackupRestorePanel
