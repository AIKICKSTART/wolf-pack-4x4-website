"use client"

import { useState } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  type SmsMessage,
  type SmsStatus,
  type SmsTemplate,
} from "./workshop-ops-types"

import styles from "./sms-conversation-thread.module.css"

interface SmsConversationThreadProps {
  contactName: string
  contactPhone: string
  vehicleLabel: string
  rego: string
  messages: ReadonlyArray<SmsMessage>
  templates: ReadonlyArray<SmsTemplate>
  /** Default seeded composer text. */
  defaultComposer?: string
  className?: string
}

const STATUS_LABEL: Record<SmsStatus, string> = {
  queued: "Queued",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
  failed: "Failed",
}

const STATUS_TONE: Record<
  SmsStatus,
  "neutral" | "teal" | "amber" | "green" | "red"
> = {
  queued: "neutral",
  sent: "neutral",
  delivered: "teal",
  read: "green",
  failed: "red",
}

export function SmsConversationThread({
  contactName,
  contactPhone,
  vehicleLabel,
  rego,
  messages,
  templates,
  defaultComposer = "",
  className,
}: SmsConversationThreadProps) {
  const [composer, setComposer] = useState<string>(defaultComposer)
  const [activeTemplateId, setActiveTemplateId] = useState<string | undefined>(
    undefined,
  )

  const applyTemplate = (template: SmsTemplate) => {
    setComposer(template.body)
    setActiveTemplateId(template.id)
  }

  const classes = [styles.thread, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`SMS thread with ${contactName}`}>
      <header className={styles.head}>
        <Avatar name={contactName} size="md" tone="amber" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{contactName}</h3>
          <span className={styles.phone}>{contactPhone}</span>
        </div>
        <div className={styles.vehiclePill}>
          <span className={styles.vehicleLabel}>{vehicleLabel}</span>
          <span className={styles.regoPlate}>{rego}</span>
        </div>
      </header>

      <ol className={styles.timeline} aria-label="SMS messages">
        {messages.map((message) => {
          const isOut = message.direction === "out"
          return (
            <li
              key={message.id}
              className={[
                styles.bubbleRow,
                isOut ? styles.bubbleOut : styles.bubbleIn,
              ].join(" ")}
            >
              <div className={styles.bubble}>
                <p className={styles.bubbleBody}>{message.body}</p>
                <div className={styles.bubbleMeta}>
                  <time className={styles.bubbleTime}>{message.sentAt}</time>
                  {isOut ? (
                    <span
                      className={[
                        styles.status,
                        styles[`status-${message.status}`],
                      ].join(" ")}
                      aria-label={`Status: ${STATUS_LABEL[message.status]}`}
                    >
                      <Chip
                        label={STATUS_LABEL[message.status]}
                        tone={STATUS_TONE[message.status]}
                      />
                    </span>
                  ) : null}
                </div>
                {message.templateUsed ? (
                  <span className={styles.templateMark}>
                    Template · {message.templateUsed}
                  </span>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>

      <section className={styles.templates} aria-label="Quick-reply templates">
        <span className={styles.templatesLabel}>Quick replies</span>
        <div className={styles.templateRow}>
          {templates.map((template) => {
            const active = template.id === activeTemplateId
            return (
              <button
                key={template.id}
                type="button"
                className={[
                  styles.templateButton,
                  active ? styles.templateButtonActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={active}
                onClick={() => applyTemplate(template)}
                title={template.body}
              >
                {template.label}
              </button>
            )
          })}
        </div>
      </section>

      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label htmlFor={`sms-input-${contactName.replace(/\s+/g, "-")}`} className={styles.composerLabel}>
          Reply via SMS
        </label>
        <textarea
          id={`sms-input-${contactName.replace(/\s+/g, "-")}`}
          className={styles.composerInput}
          rows={3}
          value={composer}
          onChange={(event) => setComposer(event.target.value)}
          placeholder="Type a reply or pick a quick template…"
          aria-label={`Compose SMS to ${contactName}`}
        />
        <footer className={styles.composerFoot}>
          <span className={styles.charCount}>
            {composer.length}/160 chars
          </span>
          <button
            type="submit"
            className={styles.sendButton}
            disabled={composer.trim().length === 0}
          >
            Send SMS
          </button>
        </footer>
      </form>
    </section>
  )
}

export default SmsConversationThread
