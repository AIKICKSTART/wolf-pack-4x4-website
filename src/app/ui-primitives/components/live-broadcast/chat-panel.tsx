"use client"

import { ShieldCheck, Smile, Timer, Wrench } from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./chat-panel.module.css"
import type { ChatMessage, ChatRole, ReactionKind, SupporterTier } from "./live-broadcast-types"

interface ChatPanelProps {
  title?: string
  messages: ReadonlyArray<ChatMessage>
  /** When set, chat is in slow-mode (seconds between messages). */
  slowModeSeconds?: number
  /** When true, chat is paused / read-only. */
  isPaused?: boolean
  /** Quick-react emoji set the viewer can fire from the composer. */
  reactionSet?: ReadonlyArray<{ id: string; glyph: string; label: string; kind: ReactionKind }>
  /** Optional rate-limit countdown — drives the disabled state. */
  cooldownSeconds?: number
  /** Hook for an outer composition to handle send. Defaults to local state only. */
  onSend?: (value: string) => void
  /** Hook for reaction toggle. */
  onReact?: (kind: ReactionKind) => void
  className?: string
}

const TIER_LABEL: Record<SupporterTier, string> = {
  "workshop-crew": "Workshop Crew",
  "inner-circle": "Inner Circle",
  "pit-boss": "Pit Boss",
  platinum: "Platinum",
}

const ROLE_LABEL: Record<ChatRole, string> = {
  host: "Host",
  moderator: "Mod",
  crew: "Crew",
  viewer: "Viewer",
}

const ROLE_ICON: Record<ChatRole, React.ReactNode> = {
  host: <Wrench size={10} strokeWidth={2.4} aria-hidden="true" />,
  moderator: <ShieldCheck size={10} strokeWidth={2.4} aria-hidden="true" />,
  crew: null,
  viewer: null,
}

const DEFAULT_REACTIONS: ReadonlyArray<{ id: string; glyph: string; label: string; kind: ReactionKind }> = [
  { id: "flame", glyph: "🔥", label: "Muffler flame", kind: "muffler-flame" },
  { id: "wrench", glyph: "🔧", label: "Wrench", kind: "wrench" },
  { id: "dyno", glyph: "📈", label: "Dyno graph", kind: "dyno" },
  { id: "smoke", glyph: "💨", label: "Smoke", kind: "smoke" },
  { id: "aussie", glyph: "🇦🇺", label: "Aussie flag", kind: "aussie-flag" },
]

export function ChatPanel({
  title = "Live chat",
  messages,
  slowModeSeconds,
  isPaused = false,
  reactionSet = DEFAULT_REACTIONS,
  cooldownSeconds,
  onSend,
  onReact,
  className,
}: ChatPanelProps) {
  const logId = useId()
  const [draft, setDraft] = useState<string>("")

  const headerHint = useMemo(() => {
    if (isPaused) return "Chat paused by mod"
    if (slowModeSeconds) return `Slow mode · ${slowModeSeconds}s between messages`
    return "Open chat · all viewers"
  }, [isPaused, slowModeSeconds])

  const isLocked = isPaused || (cooldownSeconds !== undefined && cooldownSeconds > 0)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (isLocked) return
      const value = draft.trim()
      if (!value) return
      onSend?.(value)
      setDraft("")
    },
    [draft, isLocked, onSend]
  )

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault()
    }
  }, [])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value)
  }, [])

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.hint}>{headerHint}</span>
      </header>

      <ul
        id={logId}
        className={styles.log}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="false"
      >
        {messages.map((msg) => {
          const tierLabel = msg.tier ? TIER_LABEL[msg.tier] : undefined
          return (
            <li
              key={msg.id}
              className={[
                styles.message,
                styles[`role-${msg.role}`],
                msg.isPinned ? styles.pinned : "",
                msg.tier ? styles[`tier-${msg.tier}`] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Avatar
                name={msg.author}
                src={msg.authorAvatar}
                size="sm"
                tone={msg.role === "host" ? "red" : msg.role === "moderator" ? "amber" : "obsidian"}
              />
              <div className={styles.body}>
                <span className={styles.authorRow}>
                  <span className={styles.author}>{msg.author}</span>
                  {(msg.role === "host" || msg.role === "moderator") ? (
                    <span className={[styles.roleBadge, styles[`badge-${msg.role}`]].join(" ")}>
                      {ROLE_ICON[msg.role]} {ROLE_LABEL[msg.role]}
                    </span>
                  ) : null}
                  {tierLabel ? (
                    <span className={[styles.tierBadge, styles[`tierChip-${msg.tier ?? "workshop-crew"}`]].join(" ")}>
                      {tierLabel}
                    </span>
                  ) : null}
                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </span>
                <p className={styles.content}>
                  {msg.content}
                  {msg.reaction ? (
                    <span className={styles.reactionGlyph} aria-label={`Reaction: ${msg.reaction.replace("-", " ")}`}>
                      {msg.reaction === "muffler-flame" ? "🔥" : msg.reaction === "wrench" ? "🔧" : msg.reaction === "dyno" ? "📈" : msg.reaction === "smoke" ? "💨" : "🇦🇺"}
                    </span>
                  ) : null}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={styles.reactionStrip} role="group" aria-label="Quick reactions">
        {reactionSet.map((reaction) => (
          <button
            key={reaction.id}
            type="button"
            className={styles.reactionButton}
            aria-label={reaction.label}
            disabled={isLocked}
            onClick={() => onReact?.(reaction.kind)}
          >
            <span aria-hidden="true">{reaction.glyph}</span>
          </button>
        ))}
      </div>

      <form className={styles.composer} onSubmit={handleSubmit} aria-label="Send chat message">
        <button
          type="button"
          className={styles.composerIcon}
          aria-label="Open emoji picker"
          disabled={isLocked}
        >
          <Smile size={15} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <input
          type="text"
          className={styles.input}
          placeholder={isPaused ? "Chat paused" : "Say something to the bay…"}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLocked}
          aria-label="Chat message"
          maxLength={240}
        />
        {cooldownSeconds && cooldownSeconds > 0 ? (
          <span className={styles.cooldown} aria-live="polite">
            <Timer size={12} strokeWidth={2.4} aria-hidden="true" />
            <span className={styles.cooldownValue}>{cooldownSeconds}s</span>
          </span>
        ) : null}
        <button type="submit" className={styles.send} disabled={isLocked || draft.trim().length === 0}>
          Send
        </button>
      </form>
    </section>
  )
}

export default ChatPanel
