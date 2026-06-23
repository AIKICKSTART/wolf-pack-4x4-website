"use client"

import { AtSign, Paperclip, Send, Smile } from "lucide-react"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import styles from "./comment-composer.module.css"
import type { MentionTarget, MentionToken } from "./comment-types"
import { MentionPicker } from "./mention-picker"

type DraftState = "idle" | "saving" | "saved"

interface CommentComposerProps {
  /** Optional placeholder for the textarea. */
  placeholder?: string
  /** Optional initial value (e.g. restored draft). */
  defaultValue?: string
  /** Mention candidates passed to the picker. */
  mentionCandidates?: ReadonlyArray<MentionTarget>
  /** Called when the user submits the comment. */
  onSend?: (value: string) => void
  /** Called as the user types (post-debounce). */
  onDraftSave?: (value: string) => void
  className?: string
}

const DRAFT_DEBOUNCE_MS = 800

export function CommentComposer({
  placeholder = "Leave a comment, mention with @, attach a sketch…",
  defaultValue = "",
  mentionCandidates,
  onSend,
  onDraftSave,
  className,
}: CommentComposerProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [mentionOpen, setMentionOpen] = useState<boolean>(false)
  const [draftState, setDraftState] = useState<DraftState>("idle")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const draftTimerRef = useRef<number | null>(null)
  const composerId = useId()

  useEffect(() => {
    return () => {
      if (draftTimerRef.current !== null) {
        window.clearTimeout(draftTimerRef.current)
      }
    }
  }, [])

  const scheduleDraftSave = (next: string) => {
    if (draftTimerRef.current !== null) {
      window.clearTimeout(draftTimerRef.current)
    }
    draftTimerRef.current = window.setTimeout(() => {
      setDraftState("saved")
      onDraftSave?.(next)
    }, DRAFT_DEBOUNCE_MS)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value
    setValue(next)
    setMentionOpen(next.endsWith("@"))
    if (next.trim().length === 0) {
      if (draftTimerRef.current !== null) {
        window.clearTimeout(draftTimerRef.current)
        draftTimerRef.current = null
      }
      setDraftState("idle")
      return
    }
    setDraftState("saving")
    scheduleDraftSave(next)
  }

  const submit = () => {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      return
    }
    if (draftTimerRef.current !== null) {
      window.clearTimeout(draftTimerRef.current)
      draftTimerRef.current = null
    }
    onSend?.(trimmed)
    setValue("")
    setDraftState("idle")
    setMentionOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      submit()
    }
  }

  const insertMention = (token: MentionToken) => {
    setValue((prev) => {
      const cleaned = prev.endsWith("@") ? prev.slice(0, -1) : prev
      const prefix = cleaned.length > 0 && !cleaned.endsWith(" ") ? `${cleaned} ` : cleaned
      const next = `${prefix}${token.display} `
      requestAnimationFrame(() => {
        const node = textareaRef.current
        if (node) {
          node.focus()
          node.setSelectionRange(next.length, next.length)
        }
      })
      return next
    })
    setMentionOpen(false)
  }

  const classes = [styles.composer, className].filter(Boolean).join(" ")
  const showPicker =
    mentionOpen &&
    Array.isArray(mentionCandidates) &&
    mentionCandidates.length > 0

  return (
    <form
      className={classes}
      aria-label="Comment composer"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className={styles.editor}>
        <label htmlFor={composerId} className={styles.srOnly}>
          New comment
        </label>
        <textarea
          id={composerId}
          ref={textareaRef}
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        {showPicker ? (
          <div className={styles.pickerWrap}>
            <div className={styles.pickerFloat}>
              <MentionPicker
                candidates={mentionCandidates}
                onSelect={insertMention}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.actions}>
        <div className={styles.actionsLeft}>
          <button
            type="button"
            className={[
              styles.iconBtn,
              mentionOpen ? styles.iconBtnActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="Insert mention"
            aria-expanded={mentionOpen}
            onClick={() => setMentionOpen((prev) => !prev)}
          >
            <AtSign size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Attach a file"
          >
            <Paperclip size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Insert emoji"
          >
            <Smile size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.actionsRight}>
          <span className={styles.draft} aria-live="polite">
            <span
              className={[
                styles.draftDot,
                draftState === "saving" ? styles.draftSaving : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />
            {draftState === "idle"
              ? "Ready"
              : draftState === "saving"
                ? "Drafting…"
                : "Draft saved"}
          </span>
          <button
            type="submit"
            className={styles.send}
            disabled={value.trim().length === 0}
            aria-label="Post comment"
          >
            <Send size={12} strokeWidth={2.4} aria-hidden="true" />
            <span>Post</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentComposer
