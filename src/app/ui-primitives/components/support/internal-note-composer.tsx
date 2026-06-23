"use client"

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./internal-note-composer.module.css"

export interface InternalMentionCandidate {
  id: string
  name: string
  /** Optional role caption, e.g. "Workshop manager". */
  role?: string
}

export interface InternalNoteComposerProps {
  /** Initial note body. */
  defaultValue?: string
  /** Mention picker candidates (shown when "@" is typed). */
  mentionCandidates?: ReadonlyArray<InternalMentionCandidate>
  /** Submit handler. Receives the trimmed note body. */
  onSave?: (value: string) => void
  className?: string
}

const MAX_HEIGHT = 200

export function InternalNoteComposer({
  defaultValue = "",
  mentionCandidates,
  onSave,
  className,
}: InternalNoteComposerProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [mentionOpen, setMentionOpen] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const composerId = useId()

  const autoSize = (node: HTMLTextAreaElement) => {
    node.style.height = "auto"
    const capped = Math.min(node.scrollHeight, MAX_HEIGHT)
    node.style.height = `${capped}px`
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value
    setValue(next)
    autoSize(event.target)
    setMentionOpen(next.includes("@"))
  }

  const submit = () => {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      return
    }
    onSave?.(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    setMentionOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      submit()
    }
  }

  const insertMention = (candidate: InternalMentionCandidate) => {
    setValue((prev) => {
      const cleaned = prev.endsWith("@") ? prev.slice(0, -1) : prev
      const prefix =
        cleaned.length > 0 && !cleaned.endsWith(" ") ? `${cleaned} ` : cleaned
      const next = `${prefix}@${candidate.name} `
      requestAnimationFrame(() => {
        const node = textareaRef.current
        if (node) {
          node.focus()
          node.setSelectionRange(next.length, next.length)
          autoSize(node)
        }
      })
      return next
    })
    setMentionOpen(false)
  }

  const showMentionPicker =
    mentionOpen &&
    Array.isArray(mentionCandidates) &&
    mentionCandidates.length > 0

  const classes = [styles.composer, className].filter(Boolean).join(" ")

  return (
    <form
      className={classes}
      aria-label="Internal note composer"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <header className={styles.head}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Internal note · Not visible to customer
        </span>
      </header>

      <label htmlFor={composerId} className={styles.srOnly}>
        Internal note body
      </label>
      <textarea
        id={composerId}
        ref={textareaRef}
        className={styles.textarea}
        placeholder="Add a private note for the team. Use @ to mention a teammate…"
        rows={3}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {showMentionPicker ? (
        <ul className={styles.mentionMenu} aria-label="Mention teammates">
          {mentionCandidates.map((candidate) => (
            <li key={candidate.id}>
              <button
                type="button"
                className={styles.mentionItem}
                onClick={() => insertMention(candidate)}
              >
                <span className={styles.mentionGlyph} aria-hidden="true">
                  @
                </span>
                <span className={styles.mentionName}>{candidate.name}</span>
                {candidate.role ? (
                  <span className={styles.mentionRole}>{candidate.role}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.actions}>
        <span className={styles.hint}>⌘+↵ to save</span>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={value.trim().length === 0}
        >
          Save note
        </button>
      </div>
    </form>
  )
}

export default InternalNoteComposer
