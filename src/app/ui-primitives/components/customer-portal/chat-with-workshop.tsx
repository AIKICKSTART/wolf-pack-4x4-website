"use client"

import { useMemo, useState } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { MufflermenMonogramIcon } from "../icons/mufflermen-monogram"
import { SignalPulseIcon } from "../icons/signal-pulse"
import {
  CHAT_SENDER_LABEL,
  type ChatSender,
  type ChatStatus,
  type CustomerChatMessage,
} from "./customer-portal-types"

import styles from "./chat-with-workshop.module.css"

interface ChatWithWorkshopProps {
  customerName: string
  vehicleLabel: string
  rego: string
  messages: ReadonlyArray<CustomerChatMessage>
  /** Optional handler called when "Send" is hit. */
  onSend?: (body: string) => void
  /** Initial composer seed — useful for showcase states. */
  initialComposer?: string
  /** Marks the workshop as typing-back when true. */
  workshopTyping?: boolean
  /** Marks Hermes as actively responding ("AI handover"). */
  hermesAssisting?: boolean
  className?: string
}

const SENDER_TONE: Readonly<
  Record<ChatSender, "amber" | "red" | "teal" | "neutral">
> = {
  customer: "neutral",
  workshop: "red",
  hermes: "teal",
}

const STATUS_TONE: Readonly<
  Record<ChatStatus, "neutral" | "teal" | "green">
> = {
  sent: "neutral",
  delivered: "teal",
  read: "green",
}

const STATUS_LABEL: Readonly<Record<ChatStatus, string>> = {
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
}

export function ChatWithWorkshop({
  customerName,
  vehicleLabel,
  rego,
  messages,
  onSend,
  initialComposer = "",
  workshopTyping = false,
  hermesAssisting = false,
  className,
}: ChatWithWorkshopProps) {
  const [composer, setComposer] = useState<string>(initialComposer)

  const lastWorkshopMsg = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i]
      if (msg && msg.sender === "workshop") return msg
    }
    return undefined
  }, [messages])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (composer.trim().length === 0) return
    onSend?.(composer.trim())
    setComposer("")
  }

  const classes = [styles.thread, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Workshop chat for ${customerName}`}>
      <header className={styles.head}>
        <div className={styles.headBrand}>
          <span className={styles.brandMark} aria-hidden="true">
            <MufflermenMonogramIcon size={32} tone="red" motion="none" />
          </span>
          <div className={styles.brandText}>
            <span className={styles.brandKicker}>Workshop direct</span>
            <h3 className={styles.brandTitle}>Oak Flats Mufflermen</h3>
            <span className={styles.brandSub}>
              Powered by{" "}
              <span className={styles.hermesMark}>Hermes Agent</span>
            </span>
          </div>
        </div>
        <div className={styles.headContext}>
          <span className={styles.contextLabel}>Job context</span>
          <span className={styles.contextVehicle}>{vehicleLabel}</span>
          <span className={styles.contextRego}>{rego}</span>
        </div>
      </header>

      {(workshopTyping || hermesAssisting) && lastWorkshopMsg ? (
        <div className={styles.statusStrip}>
          <span className={styles.statusDot} aria-hidden="true">
            <SignalPulseIcon size={12} tone="teal" motion="pulse" />
          </span>
          <span>
            {workshopTyping ? "Brad is typing" : "Hermes is drafting a reply"}{" "}
            — last update <time>{lastWorkshopMsg.sentAt}</time>
          </span>
        </div>
      ) : null}

      <ol className={styles.timeline} aria-label="Chat messages">
        {messages.map((message) => {
          const isCustomer = message.sender === "customer"
          const senderTone = SENDER_TONE[message.sender]
          return (
            <li
              key={message.id}
              className={[
                styles.row,
                isCustomer ? styles.rowOut : styles.rowIn,
              ].join(" ")}
            >
              {!isCustomer ? (
                <Avatar
                  name={
                    message.authorName ?? CHAT_SENDER_LABEL[message.sender]
                  }
                  size="sm"
                  tone={senderTone === "neutral" ? "obsidian" : senderTone}
                />
              ) : null}
              <div className={styles.bubbleColumn}>
                {!isCustomer && message.authorName ? (
                  <span className={styles.author}>
                    {message.authorName}{" "}
                    <span className={styles.authorRole}>
                      · {CHAT_SENDER_LABEL[message.sender]}
                    </span>
                  </span>
                ) : null}
                <div
                  className={[
                    styles.bubble,
                    message.sender === "hermes" ? styles.bubbleHermes : "",
                    message.sender === "workshop" ? styles.bubbleWorkshop : "",
                    isCustomer ? styles.bubbleCustomer : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className={styles.bubbleBody}>{message.body}</p>
                  <div className={styles.bubbleMeta}>
                    <time className={styles.bubbleTime}>{message.sentAt}</time>
                    {isCustomer && message.status ? (
                      <Chip
                        label={STATUS_LABEL[message.status]}
                        tone={STATUS_TONE[message.status]}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <form className={styles.composer} onSubmit={handleSubmit}>
        <label
          htmlFor={`chat-input-${rego.replace(/[^a-zA-Z0-9]/g, "")}`}
          className={styles.composerLabel}
        >
          Send a message to the workshop
        </label>
        <textarea
          id={`chat-input-${rego.replace(/[^a-zA-Z0-9]/g, "")}`}
          className={styles.composerInput}
          rows={3}
          value={composer}
          onChange={(event) => setComposer(event.target.value)}
          placeholder="Question for Brad, photo of the rattle, anything goes…"
          aria-label={`Compose chat message about ${vehicleLabel}`}
        />
        <footer className={styles.composerFoot}>
          <span className={styles.composerHint}>
            Auto-routes to Hermes after hours · Mon–Fri 7:30–17:30 staffed
          </span>
          <button
            type="submit"
            className={styles.sendButton}
            disabled={composer.trim().length === 0}
          >
            Send
          </button>
        </footer>
      </form>
    </section>
  )
}

export default ChatWithWorkshop
