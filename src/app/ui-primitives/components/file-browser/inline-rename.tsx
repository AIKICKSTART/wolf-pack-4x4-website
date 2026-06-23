"use client"

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./inline-rename.module.css"

interface InlineRenameProps {
  value: string
  onCommit?: (next: string) => void
  onCancel?: () => void
  /** Characters that are not allowed in the new name. */
  forbidden?: ReadonlyArray<string>
  /** Maximum allowed length. */
  maxLength?: number
  /** Optional label for assistive tech. */
  ariaLabel?: string
  className?: string
}

const DEFAULT_FORBIDDEN: ReadonlyArray<string> = [
  "/",
  "\\",
  ":",
  "*",
  "?",
  "\"",
  "<",
  ">",
  "|",
]

function validate(
  value: string,
  forbidden: ReadonlyArray<string>,
  maxLength: number,
): string | null {
  const trimmed = value.trim()
  if (trimmed.length === 0) return "Name cannot be empty"
  if (trimmed.length > maxLength) return `Name exceeds ${maxLength} characters`
  for (const ch of forbidden) {
    if (trimmed.includes(ch)) return `Cannot contain ${ch}`
  }
  return null
}

export function InlineRename({
  value,
  onCommit,
  onCancel,
  forbidden = DEFAULT_FORBIDDEN,
  maxLength = 120,
  ariaLabel = "Rename file",
  className,
}: InlineRenameProps) {
  const [editing, setEditing] = useState<boolean>(false)
  const [draft, setDraft] = useState<string>(value)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      const dot = value.lastIndexOf(".")
      const end = dot > 0 ? dot : value.length
      inputRef.current.setSelectionRange(0, end)
    }
  }, [editing, value])

  const beginEdit = () => {
    setDraft(value)
    setError(null)
    setEditing(true)
  }

  const commit = () => {
    const err = validate(draft, forbidden, maxLength)
    if (err) {
      setError(err)
      return
    }
    setEditing(false)
    setError(null)
    if (draft.trim() !== value) {
      onCommit?.(draft.trim())
    }
  }

  const cancel = () => {
    setDraft(value)
    setError(null)
    setEditing(false)
    onCancel?.()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value)
    const err = validate(event.target.value, forbidden, maxLength)
    setError(err)
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      commit()
    } else if (event.key === "Escape") {
      event.preventDefault()
      cancel()
    }
  }

  if (!editing) {
    return (
      <button
        type="button"
        className={[styles.display, className].filter(Boolean).join(" ")}
        onClick={beginEdit}
        aria-label={`${ariaLabel}: ${value}`}
      >
        <span className={styles.displayLabel} title={value}>
          {value}
        </span>
        <span className={styles.hint} aria-hidden="true">
          edit
        </span>
      </button>
    )
  }

  return (
    <span className={[styles.editor, className].filter(Boolean).join(" ")}>
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={handleChange}
        onKeyDown={handleKey}
        onBlur={commit}
        aria-label={ariaLabel}
        aria-invalid={error !== null}
        maxLength={maxLength}
        className={[
          styles.input,
          error ? styles.inputError : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : (
        <span className={styles.help} aria-hidden="true">
          Enter to save · Esc to cancel
        </span>
      )}
    </span>
  )
}

export default InlineRename
