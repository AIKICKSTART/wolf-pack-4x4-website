"use client"

import { LogOut } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"
import { OnlineStatusDot } from "./online-status-dot"
import type { CollabUser } from "./realtime-collab-types"
import styles from "./room-participants-panel.module.css"

interface RoomParticipantWithFocus extends CollabUser {
  /** Current focus area in the room (e.g. "Quote total"). */
  focus?: string
}

interface RoomParticipantsPanelProps {
  /** Room / doc title displayed at top of panel. */
  title: string
  /** Participants ordered by status / role. */
  participants: ReadonlyArray<RoomParticipantWithFocus>
  /** Leave-room handler. */
  onLeave?: () => void
  className?: string
}

export function RoomParticipantsPanel({
  title,
  participants,
  onLeave,
  className,
}: RoomParticipantsPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="high" className={classes}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Room participants</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <Chip
          label={`${participants.length} in room`}
          tone="teal"
        />
      </header>
      <ol className={styles.list} aria-label="Room participants">
        {participants.map((person) => {
          const status = person.status ?? "online"
          return (
            <li key={person.id} className={styles.item} data-status={status}>
              <span className={styles.avatarWrap}>
                <Avatar
                  name={person.name}
                  src={person.avatar}
                  size="md"
                  tone={person.tone ?? "obsidian"}
                />
                <span className={styles.statusOverlay}>
                  <OnlineStatusDot status={status} size="xs" pulse={status === "online"} />
                </span>
              </span>
              <div className={styles.copy}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{person.name}</span>
                  {person.role && (
                    <span className={styles.role}>{person.role}</span>
                  )}
                </div>
                {person.focus && (
                  <span className={styles.focus}>
                    Focus: <strong>{person.focus}</strong>
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      {onLeave && (
        <footer className={styles.foot}>
          <button
            type="button"
            className={styles.leaveBtn}
            onClick={onLeave}
          >
            <LogOut size={14} strokeWidth={2.4} aria-hidden="true" />
            Leave room
          </button>
        </footer>
      )}
    </GlassSurface>
  )
}

export default RoomParticipantsPanel
