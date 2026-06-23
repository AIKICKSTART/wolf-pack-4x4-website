"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { TagInput } from "../primitives/tag-input"

import type { TestEmailRecipient } from "./email-builder-types"
import styles from "./send-test-email-card.module.css"

interface SendTestEmailCardProps {
  /** Initial recipients displayed as chips. */
  defaultRecipients?: ReadonlyArray<TestEmailRecipient>
  /** Variant labels e.g. "A — current", "B — heading swap". */
  variants?: ReadonlyArray<string>
  className?: string
}

type SendStatus = "idle" | "sending" | "sent"

const DEFAULT_VARIANTS: ReadonlyArray<string> = [
  "A — current draft",
  "B — heading swap",
  "C — punchier CTA",
]

export function SendTestEmailCard({
  defaultRecipients = [],
  variants = DEFAULT_VARIANTS,
  className,
}: SendTestEmailCardProps) {
  const [tags, setTags] = useState<string[]>(
    defaultRecipients.map((entry) => entry.email),
  )
  const [variant, setVariant] = useState<string>(variants[0] ?? "")
  const [status, setStatus] = useState<SendStatus>("idle")

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleSend = () => {
    if (status === "sending" || tags.length === 0) return
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 700)
  }

  return (
    <section className={classes} aria-label="Send test email">
      <header className={styles.head}>
        <span className={styles.kicker}>Send test</span>
        <h3 className={styles.title}>Preview in a real inbox</h3>
      </header>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Recipients</span>
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Add an email — Enter to confirm"
          label="Test recipient list"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Variant</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="Test variant">
          {variants.map((option) => (
            <Chip
              key={option}
              label={option}
              tone={variant === option ? "teal" : "neutral"}
              selected={variant === option}
              onSelect={() => setVariant(option)}
            />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={status === "sending" || tags.length === 0}
        >
          {status === "sending" ? "Sending…" : "Send test email"}
        </button>
        <Chip
          label={
            status === "sent"
              ? `Sent to ${tags.length} inbox${tags.length === 1 ? "" : "es"}`
              : status === "sending"
              ? "Queueing…"
              : "Awaiting send"
          }
          tone={status === "sent" ? "green" : status === "sending" ? "amber" : "neutral"}
          selected={status !== "idle"}
        />
      </footer>
    </section>
  )
}
