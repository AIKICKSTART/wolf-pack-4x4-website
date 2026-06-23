"use client"

import { useId, useState } from "react"

import styles from "./rollback-confirmation.module.css"

interface RollbackCandidate {
  id: string
  label: string
  rowsAffected: number
  undoWindowLabel: string
  undoExpiresInLabel: string
}

interface RollbackConfirmationProps {
  candidates: ReadonlyArray<RollbackCandidate>
  confirmationPhrase: string
  onConfirm?: (id: string) => void
  className?: string
}

export function RollbackConfirmation({
  candidates,
  confirmationPhrase,
  onConfirm,
  className,
}: RollbackConfirmationProps) {
  const groupId = useId()
  const [selectedId, setSelectedId] = useState<string>(candidates[0]?.id ?? "")
  const [phrase, setPhrase] = useState("")
  const matches = phrase.trim() === confirmationPhrase

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-labelledby={`${groupId}-heading`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Rollback</span>
        <h3 id={`${groupId}-heading`} className={styles.heading}>
          Undo a recent import
        </h3>
        <p className={styles.subline}>
          Rolling back will revert every row written by the selected import.
          Customers and quotes touched after the import will be flagged for
          review.
        </p>
      </header>

      <fieldset className={styles.list}>
        <legend className={styles.legend}>Imports inside their undo window</legend>
        {candidates.map((candidate) => {
          const inputId = `${groupId}-${candidate.id}`
          const isSelected = candidate.id === selectedId
          return (
            <label
              key={candidate.id}
              htmlFor={inputId}
              className={[styles.row, isSelected ? styles.rowActive : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                id={inputId}
                type="radio"
                name={`${groupId}-rollback`}
                value={candidate.id}
                checked={isSelected}
                onChange={() => setSelectedId(candidate.id)}
                className={styles.radio}
              />
              <span className={styles.rowText}>
                <span className={styles.rowLabel}>{candidate.label}</span>
                <span className={styles.rowMeta}>
                  {candidate.rowsAffected.toLocaleString()} rows ·{" "}
                  {candidate.undoWindowLabel}
                </span>
              </span>
              <span className={styles.expiryChip}>
                expires in {candidate.undoExpiresInLabel}
              </span>
            </label>
          )
        })}
      </fieldset>

      <div className={styles.confirmBlock}>
        <label htmlFor={`${groupId}-phrase`} className={styles.confirmLabel}>
          Type <code className={styles.phraseToken}>{confirmationPhrase}</code> to
          confirm
        </label>
        <input
          id={`${groupId}-phrase`}
          type="text"
          className={styles.confirmInput}
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          aria-describedby={`${groupId}-confirm-hint`}
        />
        <span id={`${groupId}-confirm-hint`} className={styles.confirmHint}>
          {matches
            ? "Phrase matches — rollback armed."
            : "Phrase must match exactly, case-sensitive."}
        </span>
        <button
          type="button"
          className={styles.dangerButton}
          disabled={!matches || !selectedId}
          onClick={() => onConfirm?.(selectedId)}
        >
          Rollback this import
        </button>
      </div>
    </section>
  )
}

export type { RollbackCandidate }
export default RollbackConfirmation
