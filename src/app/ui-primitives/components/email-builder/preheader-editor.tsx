"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./preheader-editor.module.css"

interface PreheaderEditorProps {
  defaultSubject?: string
  defaultPreheader?: string
  /** Maximum subject length used by the character counter. */
  subjectLimit?: number
  /** Maximum preheader length used by the character counter. */
  preheaderLimit?: number
  /** Words that trigger spam warnings. */
  spamTriggers?: ReadonlyArray<string>
  className?: string
}

const DEFAULT_SPAM_TRIGGERS: ReadonlyArray<string> = [
  "free",
  "guarantee",
  "winner",
  "act now",
  "%%",
  "$$$",
  "click here",
  "urgent",
]

function detectTriggers(
  value: string,
  triggers: ReadonlyArray<string>,
): ReadonlyArray<string> {
  const lower = value.toLowerCase()
  return triggers.filter((trigger) => lower.includes(trigger))
}

export function PreheaderEditor({
  defaultSubject = "",
  defaultPreheader = "",
  subjectLimit = 72,
  preheaderLimit = 110,
  spamTriggers = DEFAULT_SPAM_TRIGGERS,
  className,
}: PreheaderEditorProps) {
  const [subject, setSubject] = useState<string>(defaultSubject)
  const [preheader, setPreheader] = useState<string>(defaultPreheader)

  const subjectTriggers = useMemo(
    () => detectTriggers(subject, spamTriggers),
    [subject, spamTriggers],
  )
  const preheaderTriggers = useMemo(
    () => detectTriggers(preheader, spamTriggers),
    [preheader, spamTriggers],
  )

  const subjectTone =
    subject.length > subjectLimit
      ? "red"
      : subject.length > subjectLimit - 12
      ? "amber"
      : "green"
  const preheaderTone =
    preheader.length > preheaderLimit
      ? "red"
      : preheader.length > preheaderLimit - 18
      ? "amber"
      : "green"

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Subject and preheader editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Subject + preheader</span>
        <h3 className={styles.title}>How your email lands in the inbox</h3>
      </header>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email-builder-subject">
          Subject line
          <span className={styles.fieldCount}>
            {subject.length}/{subjectLimit}
          </span>
        </label>
        <input
          id="email-builder-subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Winter workshop newsletter — what we shipped this month"
          className={styles.input}
          autoComplete="off"
        />
        <div className={styles.chipRow}>
          <Chip
            label={subject.length === 0 ? "Empty" : `${subject.length} chars`}
            tone={subjectTone}
            selected
          />
          {subjectTriggers.map((trigger) => (
            <Chip
              key={`subj-${trigger}`}
              label={`Spam trigger · "${trigger}"`}
              tone="red"
              selected
            />
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email-builder-preheader">
          Preheader text
          <span className={styles.fieldCount}>
            {preheader.length}/{preheaderLimit}
          </span>
        </label>
        <input
          id="email-builder-preheader"
          type="text"
          value={preheader}
          onChange={(event) => setPreheader(event.target.value)}
          placeholder="A peek at the winter parts shipment and a $20 service voucher inside."
          className={styles.input}
          autoComplete="off"
        />
        <div className={styles.chipRow}>
          <Chip
            label={preheader.length === 0 ? "Empty" : `${preheader.length} chars`}
            tone={preheaderTone}
            selected
          />
          {preheaderTriggers.map((trigger) => (
            <Chip
              key={`pre-${trigger}`}
              label={`Spam trigger · "${trigger}"`}
              tone="red"
              selected
            />
          ))}
        </div>
      </div>

      <div className={styles.inboxPreview} aria-hidden="true">
        <span className={styles.inboxAvatar}>OM</span>
        <span className={styles.inboxBody}>
          <span className={styles.inboxFrom}>Oak Flats Mufflermen</span>
          <span className={styles.inboxSubject}>
            {subject || "Your subject line preview"}
          </span>
          <span className={styles.inboxPreheader}>
            {preheader || "Preheader preview · this is what they see beside the subject"}
          </span>
        </span>
        <span className={styles.inboxMeta}>Now</span>
      </div>
    </section>
  )
}
