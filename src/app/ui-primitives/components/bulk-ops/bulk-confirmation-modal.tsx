"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

import styles from "./bulk-confirmation-modal.module.css"

interface ImpactLine {
  /** Description of the impact line. */
  label: string
  /** Value rendered in accent colour, e.g. "237" or "8 customers". */
  value: string
}

interface BulkConfirmationModalProps {
  /** Heading text. */
  title: string
  /** Explanatory copy underneath the heading. */
  body: string
  /** Required phrase the user must type to enable the destructive CTA. */
  confirmationPhrase: string
  /** Impact summary rows. */
  impact: ReadonlyArray<ImpactLine>
  /** Destructive button label. */
  confirmLabel?: string
  /** Cancel button label. */
  cancelLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  className?: string
}

export function BulkConfirmationModal({
  title,
  body,
  confirmationPhrase,
  impact,
  confirmLabel = "Confirm bulk action",
  cancelLabel = "Cancel",
  onCancel,
  onConfirm,
  className,
}: BulkConfirmationModalProps) {
  const [typed, setTyped] = useState("")
  const isMatch = typed.trim() === confirmationPhrase
  const classes = [styles.backdrop, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="bulk-confirm-title"
        aria-describedby="bulk-confirm-body"
        className={styles.modal}
      >
        <header className={styles.head}>
          <span className={styles.kicker}>
            <span className={styles.kickerGlyph} aria-hidden="true">
              <AlertTriangle size={12} strokeWidth={2.4} />
            </span>
            Destructive bulk action
          </span>
          <h2 id="bulk-confirm-title" className={styles.title}>
            {title}
          </h2>
          <p id="bulk-confirm-body" className={styles.body}>
            {body}
          </p>
        </header>

        <section className={styles.summary} aria-label="Impact summary">
          <div className={styles.summaryHeader}>
            <span className={styles.summaryLabel}>Impact</span>
            <span className={styles.irreversibleChip}>Irreversible</span>
          </div>
          <ul className={styles.summaryList}>
            {impact.map((line) => (
              <li key={line.label} className={styles.summaryRow}>
                <span>{line.label}</span>
                <strong>{line.value}</strong>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.typedField}>
          <label className={styles.fieldLabel} htmlFor="bulk-confirm-phrase">
            Type <code>{confirmationPhrase}</code> to confirm
          </label>
          <input
            id="bulk-confirm-phrase"
            type="text"
            autoComplete="off"
            spellCheck={false}
            className={styles.input}
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={confirmationPhrase}
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={styles.destructiveBtn}
            disabled={!isMatch}
            onClick={() => {
              if (isMatch) {
                onConfirm?.()
              }
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BulkConfirmationModal
