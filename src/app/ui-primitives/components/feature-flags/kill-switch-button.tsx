"use client"

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./kill-switch-button.module.css"

export interface KillSwitchButtonProps {
  flagName: string
  /** Phrase the user must type to confirm. Defaults to flagName uppercased. */
  confirmPhrase?: string
  /** Label shown on the main button. */
  label?: string
  /** Optional description shown when armed. */
  hint?: string
  onConfirm?: () => void
  className?: string
}

export function KillSwitchButton({
  flagName,
  confirmPhrase,
  label = "Kill switch",
  hint = "Disables this flag globally — production traffic stops immediately.",
  onConfirm,
  className,
}: KillSwitchButtonProps) {
  const requiredPhrase = (confirmPhrase ?? flagName).toUpperCase()
  const [armed, setArmed] = useState<boolean>(false)
  const [typed, setTyped] = useState<string>("")
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (armed) inputRef.current?.focus()
  }, [armed])

  const phraseMatches = typed.trim().toUpperCase() === requiredPhrase

  const reset = () => {
    setArmed(false)
    setTyped("")
  }

  const confirm = () => {
    if (!phraseMatches) return
    onConfirm?.()
    reset()
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && phraseMatches) {
      event.preventDefault()
      confirm()
    } else if (event.key === "Escape") {
      reset()
    }
  }

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {!armed ? (
        <button
          type="button"
          className={styles.armButton}
          onClick={() => setArmed(true)}
          aria-label={`Arm kill switch for ${flagName}`}
        >
          <span className={styles.armGlyph} aria-hidden="true">
            ◉
          </span>
          <span>
            <strong>{label}</strong>
            <span className={styles.armSub}>Tap to arm — type to confirm</span>
          </span>
        </button>
      ) : (
        <div
          className={styles.armed}
          role="alert"
          aria-label={`Kill switch armed for ${flagName}`}
        >
          <p className={styles.armedHeading}>Kill switch armed</p>
          <p className={styles.armedHint}>{hint}</p>

          <label htmlFor={inputId} className={styles.confirmLabel}>
            Type <code className={styles.requiredPhrase}>{requiredPhrase}</code> to confirm
          </label>
          <input
            id={inputId}
            ref={inputRef}
            type="text"
            className={[
              styles.confirmInput,
              phraseMatches ? styles.confirmInputMatch : "",
            ]
              .filter(Boolean)
              .join(" ")}
            value={typed}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTyped(event.target.value)}
            onKeyDown={handleKey}
            placeholder={requiredPhrase}
            autoComplete="off"
            spellCheck={false}
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionCancel}
              onClick={reset}
              aria-label="Cancel kill switch"
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.actionConfirm}
              onClick={confirm}
              disabled={!phraseMatches}
              aria-label="Confirm kill"
            >
              Kill flag
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default KillSwitchButton
