"use client"

import { ArrowUpRight } from "lucide-react"

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"
import { PresenceAvatarStack } from "./presence-avatar-stack"
import type { CollabRoomDoc } from "./realtime-collab-types"
import styles from "./collab-room-card.module.css"

interface CollabRoomCardProps {
  /** Document / room data. */
  room: CollabRoomDoc
  /** Open-room CTA handler. */
  onOpen?: () => void
  className?: string
}

export function CollabRoomCard({ room, onOpen, className }: CollabRoomCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const total = room.activeUsers.length + (room.overflow ?? 0)
  const usersLabel = total === 1 ? "user online" : "users online"

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <header className={styles.head}>
        <Chip label={room.kind} tone="teal" />
        <span className={styles.kindBadge} aria-hidden="true">
          ROOM
        </span>
      </header>
      <h3 className={styles.title}>{room.title}</h3>
      <div className={styles.meta}>
        <span className={styles.edit}>{room.lastEditedLabel}</span>
        <span className={styles.divider} aria-hidden="true">
          ·
        </span>
        <span className={styles.count}>
          {total} {usersLabel}
        </span>
      </div>
      <div className={styles.stackRow}>
        <PresenceAvatarStack
          users={room.activeUsers}
          max={4}
          size="sm"
          ariaLabel={`${total} active collaborators in ${room.title}`}
        />
      </div>
      <button
        type="button"
        className={styles.cta}
        onClick={onOpen}
        aria-label={`Open ${room.title}`}
      >
        Open room
        <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </GlassSurface>
  )
}

export default CollabRoomCard
