"use client"

import { useState, type ChangeEvent } from "react"

import { BasicDialog } from "../overlays/basic-dialog"
import { Chip } from "../primitives/chip"
import { TagInput } from "../primitives/tag-input"

import {
  CHAT_OUTCOME_LABEL,
  CHAT_OUTCOME_TONE,
  type ChatOutcome,
} from "./live-chat-types"
import styles from "./wrap-up-form.module.css"

export interface WrapUpPayload {
  outcome: ChatOutcome
  tags: ReadonlyArray<string>
  notes: string
  sendTranscript: boolean
}

interface WrapUpFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Visitor display name for context + announcement. */
  visitorName: string
  /** Pre-suggested tags surfaced as picker chips. */
  suggestedTags?: ReadonlyArray<string>
  /** Chat duration summary line, e.g. "8m 22s · 14 messages". */
  durationSummary?: string
  /** Confirm callback. */
  onConfirm?: (payload: WrapUpPayload) => void
}

const OUTCOMES: ReadonlyArray<ChatOutcome> = [
  "resolved",
  "booked",
  "quoted",
  "escalated",
  "follow-up",
  "abandoned",
]

export function WrapUpForm({
  open,
  onOpenChange,
  visitorName,
  suggestedTags,
  durationSummary,
  onConfirm,
}: WrapUpFormProps) {
  const [outcome, setOutcome] = useState<ChatOutcome>("resolved")
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes] = useState<string>("")
  const [sendTranscript, setSendTranscript] = useState<boolean>(true)

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed.length === 0) return
    setTags((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed],
    )
  }

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value)
  }

  const handleConfirm = () => {
    onConfirm?.({
      outcome,
      tags,
      notes: notes.trim(),
      sendTranscript,
    })
    onOpenChange(false)
  }

  return (
    <BasicDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Wrap up chat with ${visitorName}`}
      description="Categorise the outcome, tag the chat and add the notes future-you (or the next operator) will need."
      size="md"
      actions={
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => onOpenChange(false)}
          >
            Save as draft
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleConfirm}
          >
            Submit + close chat
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <section
          className={styles.section}
          aria-label="Chat outcome"
        >
          <span className={styles.label}>Outcome</span>
          <div className={styles.chipRow}>
            {OUTCOMES.map((option) => {
              const tone = CHAT_OUTCOME_TONE[option]
              return (
                <Chip
                  key={option}
                  label={CHAT_OUTCOME_LABEL[option]}
                  selected={outcome === option}
                  onSelect={() => setOutcome(option)}
                  tone={
                    tone === "red"
                      ? "red"
                      : tone === "amber"
                        ? "amber"
                        : tone === "green"
                          ? "green"
                          : tone === "teal"
                            ? "teal"
                            : "neutral"
                  }
                />
              )
            })}
          </div>
        </section>

        <section className={styles.section} aria-label="Chat tags">
          <span className={styles.label}>Tags</span>
          <TagInput
            value={tags}
            placeholder="Add a tag and press enter"
            onChange={(next) => setTags(next)}
          />
          {suggestedTags && suggestedTags.length > 0 ? (
            <div className={styles.chipRow}>
              {suggestedTags
                .filter((tag) => !tags.includes(tag))
                .map((tag) => (
                  <Chip
                    key={tag}
                    label={`+ ${tag}`}
                    onSelect={() => addTag(tag)}
                  />
                ))}
            </div>
          ) : null}
        </section>

        <section className={styles.section} aria-label="Wrap-up notes">
          <label htmlFor="wrap-notes" className={styles.label}>
            Notes
          </label>
          <textarea
            id="wrap-notes"
            className={styles.notes}
            placeholder="What was the outcome? What follow-up is owed?"
            value={notes}
            onChange={handleNotesChange}
          />
        </section>

        <div className={styles.transcriptRow}>
          <div className={styles.transcriptText}>
            <span className={styles.transcriptTitle}>Send transcript</span>
            <span className={styles.transcriptDesc}>
              Email a clean copy to {visitorName} for their records.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={sendTranscript}
            aria-label="Send transcript to visitor"
            className={[
              styles.switch,
              sendTranscript ? styles.switchOn : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setSendTranscript((prev) => !prev)}
          />
        </div>

        {durationSummary ? (
          <div className={styles.summary}>
            <span className={styles.summaryTitle}>Chat summary</span>
            <span className={styles.summaryRow}>
              <span>Duration</span>
              <strong>{durationSummary}</strong>
            </span>
            <span className={styles.summaryRow}>
              <span>Outcome</span>
              <strong>{CHAT_OUTCOME_LABEL[outcome]}</strong>
            </span>
            <span className={styles.summaryRow}>
              <span>Tags</span>
              <strong>{tags.length}</strong>
            </span>
          </div>
        ) : null}
      </div>
    </BasicDialog>
  )
}

export default WrapUpForm
