"use client"

import { Avatar } from "../primitives/avatar"

import type {
  MentorChatMessage,
  MentorSuggestion,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./mentor-chat-card.module.css"

export interface MentorChatCardProps {
  /** Eyebrow eg "Hermes / Mentor". */
  kicker: string
  /** Big title eg "Hermes is on standby". */
  title: string
  /** Mentor display name eg "Hermes". */
  mentorName: string
  /** Mentor short pitch shown under the title. */
  mentorRole: string
  /** Conversation. */
  messages: ReadonlyArray<MentorChatMessage>
  /** Suggested next-step prompt chips. */
  suggestions: ReadonlyArray<MentorSuggestion>
  /** Optional placeholder for the chat input. */
  inputPlaceholder?: string
  /** Whether the mentor is typing right now. */
  typing?: boolean
  className?: string
}

export function MentorChatCard({
  kicker,
  title,
  mentorName,
  mentorRole,
  messages,
  suggestions,
  inputPlaceholder = "Ask Hermes about your next step…",
  typing = false,
  className,
}: MentorChatCardProps) {
  const classes = [shell.shell, shell.toneTeal, styles.card, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={title}>
      <header className={styles.head}>
        <Avatar
          name={mentorName}
          tone="teal"
          size="md"
          status="online"
        />
        <div className={styles.identity}>
          <span className={shell.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.role}>{mentorRole}</p>
        </div>
        <span className={[shell.chip, shell.toneTeal].join(" ")}>Online</span>
      </header>

      <ul
        className={styles.transcript}
        aria-label="Mentor transcript"
        aria-live="polite"
      >
        {messages.map((message) => (
          <li
            key={message.id}
            className={[
              styles.message,
              message.role === "mentor" ? styles.messageMentor : styles.messageUser,
            ].join(" ")}
          >
            <span className={styles.messageMeta}>
              {message.role === "mentor" ? mentorName : "You"} ·{" "}
              <span className={shell.mono}>{message.timestamp}</span>
            </span>
            <span className={styles.messageBody}>{message.text}</span>
          </li>
        ))}
        {typing ? (
          <li className={[styles.message, styles.messageMentor, styles.typing].join(" ")}>
            <span className={styles.messageMeta}>{mentorName} is typing…</span>
            <span className={styles.typingDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </li>
        ) : null}
      </ul>

      <section className={styles.suggestionsBlock} aria-label="Suggested next steps">
        <span className={shell.sectionLabel}>Suggested next steps</span>
        <ul className={styles.suggestionList}>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                className={styles.suggestionChip}
                title={suggestion.hint}
              >
                <span>{suggestion.label}</span>
                <span className={styles.suggestionHint}>{suggestion.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <form
        className={styles.inputRow}
        aria-label="Ask Hermes"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="so-mentor-input" className={styles.srOnly}>
          Send a message to {mentorName}
        </label>
        <input
          id="so-mentor-input"
          name="mentor-input"
          type="text"
          className={shell.input}
          placeholder={inputPlaceholder}
          autoComplete="off"
        />
        <button
          type="submit"
          className={[shell.button, shell.buttonPrimary, shell.toneTeal].join(" ")}
          aria-label="Send message"
        >
          Send <span aria-hidden="true">↗</span>
        </button>
      </form>
    </article>
  )
}

export default MentorChatCard
