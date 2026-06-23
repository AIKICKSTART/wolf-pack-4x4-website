"use client"

import { Check, RotateCcw } from "lucide-react"
import { useId, useState, type ChangeEvent } from "react"

import styles from "./resolve-toggle.module.css"
import type { CommentStatus } from "./comment-types"

interface ResolveToggleProps {
  initialStatus: CommentStatus
  threadId: string
  /** Display "Resolve with note" expander. Defaults to true. */
  withNoteOption?: boolean
  onStatusChange?: (next: CommentStatus, note?: string) => void
  className?: string
}

export function ResolveToggle({
  initialStatus,
  threadId,
  withNoteOption = true,
  onStatusChange,
  className,
}: ResolveToggleProps) {
  const [status, setStatus] = useState<CommentStatus>(initialStatus)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [note, setNote] = useState<string>("")
  const noteId = useId()
  const resolved = status === "resolved"

  const toggle = () => {
    if (resolved) {
      setStatus("reopened")
      setExpanded(false)
      onStatusChange?.("reopened")
      return
    }
    setStatus("resolved")
    onStatusChange?.("resolved")
  }

  const handleNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value)
  }

  const submitNote = () => {
    setStatus("resolved")
    setExpanded(false)
    onStatusChange?.("resolved", note.trim())
  }

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <button
        type="button"
        className={[
          styles.toggle,
          resolved ? styles.toggleResolved : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={toggle}
        aria-pressed={resolved}
        aria-controls={`${threadId}-resolve-note`}
      >
        <span className={styles.check} aria-hidden="true">
          {resolved ? (
            <Check size={11} strokeWidth={3} aria-hidden="true" />
          ) : null}
        </span>
        <span>{resolved ? "Resolved" : "Mark resolved"}</span>
        {resolved ? (
          <RotateCcw size={11} strokeWidth={2.4} aria-hidden="true" />
        ) : null}
      </button>
      {withNoteOption && !resolved ? (
        <button
          type="button"
          className={styles.expand}
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={`${threadId}-resolve-note`}
        >
          {expanded ? "Cancel note" : "Resolve with note"}
        </button>
      ) : null}
      {expanded && !resolved ? (
        <div
          id={`${threadId}-resolve-note`}
          className={styles.notePanel}
        >
          <label htmlFor={noteId} className={styles.expand}>
            Resolution note
          </label>
          <textarea
            id={noteId}
            className={styles.noteInput}
            value={note}
            onChange={handleNote}
            placeholder="Logged the ADR alignment in the workshop notes…"
          />
          <button
            type="button"
            className={styles.noteSubmit}
            onClick={submitNote}
          >
            Resolve thread
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ResolveToggle
