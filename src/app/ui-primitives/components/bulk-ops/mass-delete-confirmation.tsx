"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import styles from "./mass-delete-confirmation.module.css"

interface MassDeleteConfirmationProps {
  /** Heading text. */
  title: string
  /** Explanatory body copy. */
  body: string
  /** Number of records being deleted. */
  recordCount: number
  /** Resource label, e.g. "customers", "parts". */
  resourceLabel: string
  /** Required phrase the user must type. */
  confirmationPhrase: string
  /** Display label for the recovery window, e.g. "30-day soft delete". */
  recoveryWindowLabel: string
  onCancel?: () => void
  onConfirm?: () => void
  className?: string
}

export function MassDeleteConfirmation({
  title,
  body,
  recordCount,
  resourceLabel,
  confirmationPhrase,
  recoveryWindowLabel,
  onCancel,
  onConfirm,
  className,
}: MassDeleteConfirmationProps) {
  const [typed, setTyped] = useState("")
  const isMatch = typed.trim() === confirmationPhrase
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="mass-delete-title"
      aria-describedby="mass-delete-body"
      className={classes}
    >
      <div className={styles.illustration} aria-hidden="true">
        <span className={styles.illustrationRing}>
          <Trash2 size={26} strokeWidth={1.8} />
        </span>
      </div>

      <header className={styles.head}>
        <span className={styles.kicker}>Mass delete</span>
        <h2 id="mass-delete-title" className={styles.title}>
          {title}
        </h2>
        <p id="mass-delete-body" className={styles.body}>
          {body} You are about to delete{" "}
          <strong>{recordCount.toLocaleString("en-US")} {resourceLabel}</strong>.
        </p>
      </header>

      <span className={styles.windowChip}>
        Recovery window · {recoveryWindowLabel}
      </span>

      <label className={styles.field}>
        <span className={styles.label}>
          Type <code>{confirmationPhrase}</code> to enable delete
        </span>
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          className={styles.input}
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          placeholder={confirmationPhrase}
        />
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className={styles.delete}
          disabled={!isMatch}
          onClick={() => {
            if (isMatch) {
              onConfirm?.()
            }
          }}
        >
          Delete {recordCount.toLocaleString("en-US")} records
        </button>
      </div>
    </div>
  )
}

export default MassDeleteConfirmation
