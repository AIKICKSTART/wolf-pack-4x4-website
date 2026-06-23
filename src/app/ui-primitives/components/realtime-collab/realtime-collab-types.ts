/**
 * Shared types for the real-time collaboration indicators primitive group.
 *
 * Scope: Figma / Linear style multi-user presence, locks, conflicts, and
 * live activity on a shared document. Distinct from:
 *   - `comments/` (Figma / Loom annotations on a doc — single cursor)
 *   - `inbox/`    (human-to-human DM / chat threads)
 *   - `live-chat/`(operator-side customer chat)
 *   - `whiteboard/cursor-presence-marker` (canvas-only single cursor)
 *   - `ai/`       (assistant chat)
 *
 * Every primitive here speaks this vocabulary so presence stacks, cursors,
 * typing indicators, locks, conflicts, share links, and version chips stay
 * consistent across the showcase + full-room composition.
 */
import type { AvatarTone } from "../primitives/avatar"

/** Online/idle/offline/busy presence used on dots + avatar borders. */
export type PresenceStatus = "online" | "idle" | "offline" | "busy"

/** Cursor tone (reuses the same palette as whiteboard markers). */
export type CursorTone = "blue" | "amber" | "purple" | "green" | "pink" | "orange"

/** Permission role chip kinds for share links + participants panel. */
export type CollabRole = "viewer" | "commenter" | "editor" | "admin"

/** Granted scope a collab share link unlocks. */
export type ShareLinkScope = "view" | "comment" | "edit" | "admin"

/** Activity verb used in presence-activity-feed event composition. */
export type CollabActivityKind =
  | "joined"
  | "left"
  | "commented"
  | "resolved"
  | "edited"
  | "added"
  | "reacted"
  | "renamed"
  | "shared"

/** A collaborator on the document. */
export interface CollabUser {
  /** Stable identifier. */
  id: string
  /** Display name. */
  name: string
  /** Optional avatar src — falls back to initials in Avatar primitive. */
  avatar?: string
  /** Optional short role label rendered as a chip. */
  role?: string
  /** Live presence status. */
  status?: PresenceStatus
  /** Avatar tone — drives stack ring + cursor colour. */
  tone?: AvatarTone
  /** Cursor tone override — falls back to a stable map of avatar tones. */
  cursorTone?: CursorTone
  /** Optional IANA timezone string for time-zone-indicator-chip. */
  timezone?: string
}

/** A point inside the multi-cursor overlay stage (percentage 0..100). */
export interface CollabCursorPoint {
  /** 0..100, percentage from the left edge of the overlay stage. */
  x: number
  /** 0..100, percentage from the top edge of the overlay stage. */
  y: number
}

/** A single cursor's live position on the overlay. */
export interface CollabCursor {
  id: string
  user: CollabUser
  position: CollabCursorPoint
  /** Optional small label appended after the name. */
  hint?: string
}

/** Activity entry for the presence activity feed. */
export interface CollabActivityEntry {
  id: string
  actor: CollabUser
  kind: CollabActivityKind
  /** Display verbiage rendered after the kind chip. */
  description: string
  /** Optional context anchor (field name / section / version). */
  target?: string
  /** Human relative timestamp (e.g. "2s ago"). */
  timestamp: string
}

/** A document being edited collaboratively (collab-room-card). */
export interface CollabRoomDoc {
  id: string
  title: string
  /** Short label like "QUOTE", "INVOICE", "JOB CARD". */
  kind: string
  /** Active collaborators currently in the room. */
  activeUsers: ReadonlyArray<CollabUser>
  /** Human label like "Edited 2m ago". */
  lastEditedLabel: string
  /** Optional overflow count when activeUsers is truncated. */
  overflow?: number
}

/** A read-receipt entry (avatar + when each saw the latest change). */
export interface CollabReadReceipt {
  id: string
  reader: CollabUser
  /** Human label e.g. "Just now" / "12s ago". */
  seenAt: string
}

/** Returns "Mx" style two-letter initials from a name. */
export function collabInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return "?"
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

/** Maps an AvatarTone to a CursorTone fallback. */
export function defaultCursorTone(tone: AvatarTone | undefined): CursorTone {
  switch (tone) {
    case "red":
      return "pink"
    case "amber":
      return "amber"
    case "teal":
      return "blue"
    case "green":
      return "green"
    case "obsidian":
      return "purple"
    default:
      return "blue"
  }
}

/** Label for a share-link scope chip. */
export const SHARE_SCOPE_LABEL: Record<ShareLinkScope, string> = {
  view: "View",
  comment: "Comment",
  edit: "Edit",
  admin: "Admin",
}

/** Label for a role chip. */
export const COLLAB_ROLE_LABEL: Record<CollabRole, string> = {
  viewer: "Viewer",
  commenter: "Commenter",
  editor: "Editor",
  admin: "Admin",
}

/** Label for a presence status (used by dots + avatar borders). */
export const PRESENCE_LABEL: Record<PresenceStatus, string> = {
  online: "Online",
  idle: "Idle",
  offline: "Offline",
  busy: "Busy",
}
