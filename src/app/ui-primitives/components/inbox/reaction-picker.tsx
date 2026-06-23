"use client"

import { Plus, Smile } from "lucide-react"
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import styles from "./reaction-picker.module.css"
import type { ReactionEmoji } from "./inbox-types"

interface ReactionPickerProps {
  /** Defaults shown when no value is provided. */
  reactions?: ReadonlyArray<ReactionEmoji>
  /** Optional trigger element. When omitted a smile button is shown. */
  trigger?: ReactNode
  /** Defaults to true. When false, the picker stays inline (no expand button). */
  showMore?: boolean
  /** Callback fired when a reaction is chosen. */
  onSelect?: (reaction: ReactionEmoji) => void
  className?: string
}

const DEFAULT_REACTIONS: ReadonlyArray<ReactionEmoji> = [
  { id: "thumbs-up", glyph: "👍", label: "Thumbs up" },
  { id: "heart", glyph: "❤️", label: "Heart" },
  { id: "fire", glyph: "🔥", label: "Fire" },
  { id: "laugh", glyph: "😂", label: "Laughing" },
  { id: "celebrate", glyph: "🎉", label: "Celebrate" },
  { id: "wrench", glyph: "🔧", label: "Wrench" },
]

const EXTRA_REACTIONS: ReadonlyArray<ReactionEmoji> = [
  { id: "muscle", glyph: "💪", label: "Strong" },
  { id: "spark", glyph: "✨", label: "Spark" },
  { id: "clap", glyph: "👏", label: "Clap" },
  { id: "thinking", glyph: "🤔", label: "Thinking" },
  { id: "thumbs-down", glyph: "👎", label: "Thumbs down" },
  { id: "fuel", glyph: "⛽", label: "Fuel" },
]

export function ReactionPicker({
  reactions = DEFAULT_REACTIONS,
  trigger,
  showMore = true,
  onSelect,
  className,
}: ReactionPickerProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleSelect = (reaction: ReactionEmoji) => {
    onSelect?.(reaction)
    setOpen(false)
    setExpanded(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false)
      setExpanded(false)
    }
  }

  const renderedReactions = expanded ? [...reactions, ...EXTRA_REACTIONS] : reactions
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div
      ref={containerRef}
      className={classes}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger ?? (
          <>
            <Smile size={14} strokeWidth={2.3} aria-hidden="true" />
            <span className={styles.triggerLabel}>React</span>
          </>
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-label="Choose a reaction"
        >
          <ul className={styles.list}>
            {renderedReactions.map((reaction) => (
              <li key={reaction.id}>
                <button
                  type="button"
                  className={styles.option}
                  aria-label={`React with ${reaction.label}`}
                  onClick={() => handleSelect(reaction)}
                >
                  <span aria-hidden="true">{reaction.glyph}</span>
                </button>
              </li>
            ))}
            {showMore && !expanded ? (
              <li>
                <button
                  type="button"
                  className={styles.more}
                  aria-label="Show more reactions"
                  onClick={() => setExpanded(true)}
                >
                  <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default ReactionPicker
