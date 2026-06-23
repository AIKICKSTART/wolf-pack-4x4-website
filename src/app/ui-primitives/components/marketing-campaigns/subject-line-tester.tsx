"use client"

import { Sparkles, Smile, X } from "lucide-react"
import { useId, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"

import styles from "./subject-line-tester.module.css"
import type { SpamScore } from "./marketing-campaigns-types"

interface SubjectLineTesterProps {
  /** Initial subject line. */
  defaultSubject?: string
  /** AI-suggested alternates. */
  suggestions: ReadonlyArray<string>
  className?: string
}

const SPAM_TONE: Record<SpamScore, ChipTone> = {
  clean: "green",
  low: "teal",
  medium: "amber",
  high: "red",
}

const SPAM_LABEL: Record<SpamScore, string> = {
  clean: "Clean",
  low: "Low",
  medium: "Medium",
  high: "High",
}

/** Heuristic spam score for the demo. */
function detectSpamScore(text: string): SpamScore {
  const lower = text.toLowerCase()
  const flags = [
    "free",
    "$$$",
    "act now",
    "limited time",
    "guarantee",
    "winner",
  ]
  const hits = flags.reduce(
    (n, flag) => (lower.includes(flag) ? n + 1 : n),
    0,
  )
  if (text.split(/\s+/).filter(Boolean).length > 12) return "medium"
  if (hits >= 2) return "high"
  if (hits === 1) return "medium"
  if (/!{2,}/.test(text)) return "medium"
  if (text.length < 8) return "low"
  return "clean"
}

/** Emoji suitability — checks reasonable usage. */
function detectEmojiSuitability(text: string): {
  score: "ok" | "too-many" | "none"
  count: number
} {
  const matches = text.match(/\p{Extended_Pictographic}/gu) ?? []
  if (matches.length === 0) {
    return { score: "none", count: 0 }
  }
  if (matches.length > 3) {
    return { score: "too-many", count: matches.length }
  }
  return { score: "ok", count: matches.length }
}

export function SubjectLineTester({
  defaultSubject = "Manta cat-back is in",
  suggestions,
  className,
}: SubjectLineTesterProps) {
  const inputId = useId()
  const dialogId = useId()
  const [subject, setSubject] = useState<string>(defaultSubject)
  const [open, setOpen] = useState<boolean>(false)

  const trimmed = subject.trim()
  const spam = detectSpamScore(trimmed)
  const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length
  const emoji = detectEmojiSuitability(trimmed)
  const charCount = subject.length

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Subject line tester"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Subject line</span>
        <span className={styles.charCount}>{charCount} characters</span>
      </header>

      <label className={styles.fieldLabel} htmlFor={inputId}>
        Test subject
      </label>
      <input
        id={inputId}
        type="text"
        value={subject}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSubject(event.target.value)
        }
        placeholder="Manta cat-back is in"
        className={styles.input}
        autoComplete="off"
        spellCheck
      />

      <div className={styles.scoreRow}>
        <Chip
          label={`Spam · ${SPAM_LABEL[spam]}`}
          tone={SPAM_TONE[spam]}
          selected
        />
        <Chip
          label={`${wordCount} words`}
          tone={wordCount > 0 && wordCount <= 9 ? "teal" : "amber"}
        />
        <Chip
          icon={<Smile size={11} strokeWidth={2.4} aria-hidden="true" />}
          label={
            emoji.score === "ok"
              ? `Emoji · ${emoji.count} fit`
              : emoji.score === "too-many"
                ? `Emoji · ${emoji.count} too many`
                : "Emoji · none"
          }
          tone={
            emoji.score === "ok"
              ? "green"
              : emoji.score === "too-many"
                ? "amber"
                : "neutral"
          }
        />
      </div>

      <button
        type="button"
        className={styles.suggestButton}
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Sparkles size={14} strokeWidth={2.4} aria-hidden="true" />
        {open ? "Hide AI suggestions" : "AI suggestions"}
      </button>

      {open ? (
        <div
          id={dialogId}
          className={styles.dialog}
          role="dialog"
          aria-modal="true"
          aria-label="AI subject line suggestions"
        >
          <div className={styles.dialogHead}>
            <span>Generated alternates</span>
            <button
              type="button"
              className={styles.dialogClose}
              aria-label="Close suggestions"
              onClick={() => setOpen(false)}
            >
              <X size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
          <ul className={styles.suggestList}>
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className={styles.suggestItem}
                  onClick={() => {
                    setSubject(s)
                    setOpen(false)
                  }}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

export default SubjectLineTester
