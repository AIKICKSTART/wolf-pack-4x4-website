"use client"

import { AtSign, Paperclip, Send, Smile } from "lucide-react"
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import { Kbd } from "../primitives/kbd"

import styles from "./reply-composer.module.css"
import type { InboxPerson } from "./inbox-types"

interface ReplyComposerProps {
  /** Used to label the composer for screen readers. */
  participantName?: string
  /** Optional initial value for the textarea. */
  defaultValue?: string
  /** Optional mention candidates surfaced when @ is typed. */
  mentionCandidates?: ReadonlyArray<InboxPerson>
  /** Send callback. */
  onSend?: (value: string) => void
  className?: string
}

const MAX_ROWS = 6

export function ReplyComposer({
  participantName,
  defaultValue = "",
  mentionCandidates,
  onSend,
  className,
}: ReplyComposerProps) {
  const [value, setValue] = useState<string>(defaultValue)
  const [mentionOpen, setMentionOpen] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const composerId = useId()
  const placeholder = participantName
    ? `Reply to ${participantName}…`
    : "Type a reply…"

  const autoSize = (node: HTMLTextAreaElement) => {
    node.style.height = "auto"
    const lineHeight = 22
    const cappedHeight = Math.min(node.scrollHeight, lineHeight * MAX_ROWS + 24)
    node.style.height = `${cappedHeight}px`
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
    onSend?.(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    setMentionOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const isSubmit =
      event.key === "Enter" && (event.metaKey || event.ctrlKey)
    if (isSubmit) {
      event.preventDefault()
      submit()
    }
  }

  const insertMention = (person: InboxPerson) => {
    setValue((prev) => {
      const cleaned = prev.endsWith("@") ? prev.slice(0, -1) : prev
      const prefix = cleaned.length > 0 && !cleaned.endsWith(" ") ? `${cleaned} ` : cleaned
      const next = `${prefix}@${person.name} `
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
      role="form"
      aria-label="Reply composer"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className={styles.editorRow}>
        <label htmlFor={composerId} className={styles.srOnly}>
          Reply
        </label>
        <textarea
          id={composerId}
          ref={textareaRef}
          className={styles.textarea}
          placeholder={placeholder}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <output className={styles.statusOut} aria-live="polite">
          {value.length > 0 ? `${value.length} chars` : ""}
        </output>
      </div>

      {showMentionPicker ? (
        <ul className={styles.mentionMenu} aria-label="Mention people">
          {mentionCandidates.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                className={styles.mentionItem}
                onClick={() => insertMention(person)}
              >
                <span className={styles.mentionGlyph} aria-hidden="true">
                  @
                </span>
                <span className={styles.mentionName}>{person.name}</span>
                {person.role ? (
                  <span className={styles.mentionRole}>{person.role}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.actionsRow}>
        <div className={styles.actionsLeft}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Insert emoji"
          >
            <Smile size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Attach file"
          >
            <Paperclip size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Mention someone"
            onClick={() => setMentionOpen((prev) => !prev)}
            aria-expanded={mentionOpen}
          >
            <AtSign size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.actionsRight}>
          <span className={styles.hint}>
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">↵</Kbd>
            <span>to send</span>
          </span>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={value.trim().length === 0}
            aria-label="Send reply"
          >
            <Send size={14} strokeWidth={2.4} aria-hidden="true" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default ReplyComposer
