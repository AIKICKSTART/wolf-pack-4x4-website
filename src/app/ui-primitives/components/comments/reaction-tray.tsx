"use client"

import { useMemo, useState } from "react"

import styles from "./reaction-tray.module.css"
import type { ReactionEmoji, ReactionSummary } from "./comment-types"
import { REACTION_GLYPH, REACTION_LABEL } from "./comment-types"

interface ReactionTrayProps {
  reactions?: ReadonlyArray<ReactionSummary>
  /** Stable id used so multiple trays can coexist without focus collisions. */
  commentId: string
  onToggle?: (emoji: ReactionEmoji) => void
  className?: string
}

interface InternalReactionState {
  emoji: ReactionEmoji
  count: number
  mine: boolean
}

export function ReactionTray({
  reactions,
  commentId,
  onToggle,
  className,
}: ReactionTrayProps) {
  const initial = useMemo<ReadonlyArray<InternalReactionState>>(() => {
    const seed = reactions ?? []
    return seed.map((reaction) => ({
      emoji: reaction.emoji,
      count: reaction.count,
      mine: Boolean(reaction.mine),
    }))
  }, [reactions])
  const [state, setState] = useState<ReadonlyArray<InternalReactionState>>(initial)

  const handleToggle = (emoji: ReactionEmoji) => {
    setState((prev) => {
      const exists = prev.find((r) => r.emoji === emoji)
      if (!exists) {
        return [...prev, { emoji, count: 1, mine: true }]
      }
      return prev
        .map((r) => {
          if (r.emoji !== emoji) {
            return r
          }
          const nextMine = !r.mine
          const nextCount = r.count + (nextMine ? 1 : -1)
          return { ...r, mine: nextMine, count: nextCount }
        })
        .filter((r) => r.count > 0)
    })
    onToggle?.(emoji)
  }

  if (state.length === 0) {
    return <span className={[styles.tray, styles.trayEmpty].join(" ")} aria-hidden="true" />
  }

  const classes = [styles.tray, className].filter(Boolean).join(" ")

  return (
    <ul className={classes} aria-label="Reactions">
      {state.map((reaction) => {
        const label = REACTION_LABEL[reaction.emoji]
        return (
          <li key={`${commentId}-${reaction.emoji}`}>
            <button
              type="button"
              role="button"
              aria-pressed={reaction.mine}
              aria-label={`${label}, ${reaction.count} ${reaction.count === 1 ? "person" : "people"}`}
              className={[
                styles.btn,
                reaction.mine ? styles.btnPressed : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleToggle(reaction.emoji)}
            >
              <span className={styles.glyph} aria-hidden="true">
                {REACTION_GLYPH[reaction.emoji]}
              </span>
              <span className={styles.count}>{reaction.count}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ReactionTray
