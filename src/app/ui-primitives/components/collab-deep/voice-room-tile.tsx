"use client"

import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import type {
  CollabUser,
  CursorTone,
  VoiceParticipant,
  VoiceSpeakerState,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX, VOICE_STATE_LABEL } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./voice-room-tile.module.css"

interface VoiceRoomTileProps {
  /** Display name of the voice room, e.g. "Bay floor". */
  roomName: string
  /** Optional subtitle, e.g. "Workshop · 3 listening". */
  subtitle?: string
  /** Voice participants. */
  participants: ReadonlyArray<VoiceParticipant>
  /** Total listener count (may be larger than participants list). */
  listenerCount: number
  /** Optional whether the local viewer is already inside. */
  joined?: boolean
  /** Join / leave handler. */
  onToggleJoin?: () => void
  className?: string
}

const STATE_CLASS: Record<VoiceSpeakerState, string> = {
  speaking: styles.stateSpeaking,
  muted: styles.stateMuted,
  listening: styles.stateListening,
  "raised-hand": styles.stateRaised,
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

function summary(
  roomName: string,
  participants: ReadonlyArray<VoiceParticipant>,
  listenerCount: number,
): string {
  const speakers = participants.filter((p) => p.state === "speaking").length
  return `${roomName}, ${listenerCount} in room, ${speakers} speaking`
}

/** Voice/audio room tile with active-speaker rings + participants. */
export function VoiceRoomTile({
  roomName,
  subtitle,
  participants,
  listenerCount,
  joined = false,
  onToggleJoin,
  className,
}: VoiceRoomTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={summary(roomName, participants, listenerCount)}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
            <path d="M18 11a6 6 0 1 1-12 0M12 17v4M9 21h6" strokeLinecap="round" />
          </svg>
        </span>
        <div className={styles.headCopy}>
          <h3 className={styles.roomName}>{roomName}</h3>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden="true" />
          Live audio
        </span>
      </header>

      <ul className={styles.list}>
        {participants.map((participant) => {
          const tint = toneHex(participant.user)
          const level = participant.level ?? 0
          const style: CSSProperties = {
            "--voice-tint": tint,
            "--voice-level": String(Math.max(0, Math.min(100, level)) / 100),
          } as CSSProperties
          return (
            <li
              key={participant.id}
              className={[styles.item, STATE_CLASS[participant.state]].join(" ")}
              style={style}
            >
              <span className={styles.ring} aria-hidden="true" />
              <span className={styles.avatarSlot}>
                <Avatar
                  name={participant.user.name}
                  src={participant.user.avatar}
                  size="md"
                  tone={participant.user.tone ?? "obsidian"}
                />
              </span>
              <span className={styles.itemMeta}>
                <span className={styles.name}>{participant.user.name}</span>
                <span className={styles.state}>
                  {VOICE_STATE_LABEL[participant.state]}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      <footer className={styles.footer}>
        <span className={styles.count}>
          <strong className={styles.countNumber}>{listenerCount}</strong> in room
        </span>
        <button
          type="button"
          className={[
            styles.join,
            joined ? styles.joinActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={onToggleJoin}
          aria-pressed={joined}
        >
          {joined ? "Leave room" : "Join room"}
        </button>
      </footer>
    </section>
  )
}

export default VoiceRoomTile
