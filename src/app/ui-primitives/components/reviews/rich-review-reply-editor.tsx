"use client"

import { useCallback, useId, useRef, useState } from "react"

import { Chip } from "../primitives/chip"
import {
  MacroPicker,
  type MacroEntry,
} from "../support/macro-picker"

import styles from "./rich-review-reply-editor.module.css"

export interface ReplyToken {
  /** Inline token marker, e.g. "{{customer.firstName}}". */
  token: string
  label: string
}

export interface RichReviewReplyEditorProps {
  customerFirstName: string
  reviewSnippet?: string
  cannedReplies?: ReadonlyArray<MacroEntry>
  tokens?: ReadonlyArray<ReplyToken>
  onPost?: (body: string) => void
  className?: string
}

const DEFAULT_TOKENS: ReadonlyArray<ReplyToken> = [
  { token: "{{customer.firstName}}", label: "Customer first name" },
  { token: "{{job.reference}}", label: "Job reference" },
  { token: "{{workshop.name}}", label: "Workshop name" },
]

const DEFAULT_CANNED: ReadonlyArray<MacroEntry> = [
  {
    id: "thanks-positive",
    title: "Thank-you (positive)",
    shortcut: "/thanks",
    category: "Replies",
    body:
      "Cheers {{customer.firstName}}, the Bay 2 crew really appreciates the kind words on job {{job.reference}}. Drop in any time for a torque check.",
  },
  {
    id: "apology-quote-confidence",
    title: "Apology — quote confidence",
    shortcut: "/quote-fix",
    category: "Replies",
    body:
      "{{customer.firstName}}, we hear you on the quote walk-through. The {{workshop.name}} team is rebuilding the quote breakdown so the next visit lands cleaner.",
  },
  {
    id: "follow-up-fitment",
    title: "Manta cat-back fitment follow-up",
    shortcut: "/manta-fit",
    category: "Replies",
    body:
      "Hi {{customer.firstName}} — happy the Manta tuck sat where you wanted. Loop us in if the resonator drone changes after a few hot/cold cycles.",
  },
]

export function RichReviewReplyEditor({
  customerFirstName,
  reviewSnippet,
  cannedReplies = DEFAULT_CANNED,
  tokens = DEFAULT_TOKENS,
  onPost,
  className,
}: RichReviewReplyEditorProps) {
  const [body, setBody] = useState<string>("")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const textareaId = useId()
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  const insertAtCursor = useCallback((insertion: string) => {
    const el = textareaRef.current
    if (!el) {
      setBody((current) => `${current}${insertion}`)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    setBody((current) => `${current.slice(0, start)}${insertion}${current.slice(end)}`)
    requestAnimationFrame(() => {
      const next = start + insertion.length
      el.focus()
      el.setSelectionRange(next, next)
    })
  }, [])

  const handleMacro = useCallback(
    (macro: MacroEntry) => {
      insertAtCursor(macro.body)
    },
    [insertAtCursor],
  )

  const handleToken = useCallback(
    (token: string) => {
      insertAtCursor(token)
    },
    [insertAtCursor],
  )

  const handleInsertName = useCallback(() => {
    insertAtCursor(customerFirstName)
  }, [customerFirstName, insertAtCursor])

  const handlePost = () => {
    if (body.trim().length === 0) return
    onPost?.(body.trim())
    setBody("")
  }

  return (
    <section className={classes} aria-label="Workshop reply editor">
      <span className={styles.kicker}>Workshop reply</span>
      <h3 className={styles.title}>Reply to {customerFirstName}</h3>
      {reviewSnippet ? (
        <div className={styles.context}>
          <span className={styles.contextLabel}>Replying to</span>
          <p className={styles.contextBody}>“{reviewSnippet}”</p>
        </div>
      ) : null}
      <div className={styles.tokenRow} aria-label="Insert tokens">
        <Chip label={`Insert: ${customerFirstName}`} tone="teal" onSelect={handleInsertName} />
        {tokens.map((token) => (
          <Chip
            key={token.token}
            label={token.label}
            tone="neutral"
            onSelect={() => handleToken(token.token)}
          />
        ))}
      </div>
      <label className={styles.macroLabel} htmlFor={textareaId}>
        Your reply
      </label>
      <textarea
        id={textareaId}
        ref={textareaRef}
        className={styles.editor}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder={`Hey ${customerFirstName} — thanks for taking the time…`}
        maxLength={1500}
      />
      <div className={styles.macroSlot}>
        <span className={styles.macroLabel}>Canned replies</span>
        <MacroPicker macros={cannedReplies} onInsert={handleMacro} />
      </div>
      <div className={styles.actions}>
        <span className={styles.helper}>
          {body.length}/1500 · posts publicly under workshop badge
        </span>
        <button
          type="button"
          className={styles.post}
          disabled={body.trim().length === 0}
          onClick={handlePost}
        >
          Post reply
        </button>
      </div>
    </section>
  )
}

export default RichReviewReplyEditor
