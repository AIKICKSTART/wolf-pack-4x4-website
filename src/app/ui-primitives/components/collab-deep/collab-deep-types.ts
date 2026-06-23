/**
 * Shared types for the collab-deep primitive family.
 *
 * Scope: deep, opinionated collaboration primitives that sit on top of
 * the existing `realtime-collab/` (presence dots, simple stacks, basic
 * cursors), `whiteboard/` (single-cursor canvas markers), and
 * `comments/` (annotations + threads on a canvas) families. Use this
 * file for vocabulary that the deep family needs but the shallow
 * families do not — three-way merge conflicts, follow mode, voice rooms,
 * screen shares, lock zones, commit pulses, cursor trails.
 *
 * Reuses `CollabUser`, `CursorTone`, `PresenceStatus`,
 * `CollabCursorPoint`, etc. from `../realtime-collab/realtime-collab-types`
 * so the showcase + full composition stay consistent with the shallow
 * realtime-collab primitives.
 */

import type {
  CollabCursorPoint,
  CollabUser,
  CursorTone,
} from "../realtime-collab/realtime-collab-types"

export type { CollabUser, CollabCursorPoint, CursorTone }

/** Stable map of cursor tones to the deep-collab cursor / lock palette,
 *  expressed as references to the central design tokens. `blue`, `amber`,
 *  and `green` resolve to the shared primitive accents; the identity-only
 *  tones (`purple`, `pink`, `orange`) resolve to the family-scoped tone
 *  variables declared in `*.module.css` (`:global(:root)` block). Every
 *  value is a `var(--…)` reference so no bare color literal ships here. */
export const COLLAB_DEEP_TONE_HEX: Record<CursorTone, string> = {
  blue: "var(--primitive-teal)",
  amber: "var(--primitive-amber)",
  purple: "var(--collab-tone-purple)",
  green: "var(--primitive-green)",
  pink: "var(--collab-tone-pink)",
  orange: "var(--collab-tone-orange)",
}

/** A floating cursor on a deep canvas, with a typed activity hint. */
export interface DeepCursor {
  id: string
  user: CollabUser
  position: CollabCursorPoint
  /** Optional short verb shown after the name, e.g. "typing", "selecting". */
  activity?: string
}

/** Source of a 3-way conflict version. */
export type ConflictVersionSource = "mine" | "theirs" | "base"

/** A single version inside a 3-way merge conflict. */
export interface ConflictVersion {
  /** Stable identifier. */
  id: string
  /** Which slot in the 3-way diff this is. */
  source: ConflictVersionSource
  /** Author of this revision (omitted for the `base` ancestor). */
  author?: CollabUser
  /** Human relative timestamp like "12s ago". */
  timestamp?: string
  /** The textual contents of this version. */
  body: string
  /** Optional pre-counted edit stats. */
  stats?: {
    added: number
    removed: number
  }
}

/** Choice a user can make from the conflict modal. */
export type ConflictResolution = "keep-mine" | "keep-theirs" | "merge"

/** A single awareness entry on the strip — "who's looking at what". */
export interface AwarenessEntry {
  id: string
  user: CollabUser
  /** Short label of where they're focused, e.g. "Title block". */
  focus: string
  /** Optional secondary qualifier, e.g. "Editing" or "Reading". */
  qualifier?: string
  /** Optional relative duration label, e.g. "2m". */
  durationLabel?: string
}

/** Reason a section is locked. */
export type LockReason = "editing" | "reviewing" | "rendering" | "exporting"

/** A lock zone (someone is editing a card / row / section). */
export interface LockZone {
  /** Stable identifier. */
  id: string
  /** Display label of the locked area. */
  label: string
  /** User holding the lock. */
  holder: CollabUser
  /** Why the section is locked. */
  reason: LockReason
  /** Human relative timestamp e.g. "1m ago". */
  since?: string
}

/** A remote selection bar on a field or block. */
export interface RemoteSelection {
  id: string
  user: CollabUser
  /** Short label of what was selected. */
  selectionLabel: string
  /** Optional character count shown in the bar tail. */
  charCount?: number
}

/** A single cursor trail step (heat trail). */
export interface CursorTrailStep {
  /** Stable identifier (e.g. "mia-3"). */
  id: string
  /** Owner of this trail. */
  user: CollabUser
  /** Trail samples, oldest first → newest last. */
  samples: ReadonlyArray<CollabCursorPoint>
}

/** A single live-edit ping shown on a field. */
export interface LiveEdit {
  /** Stable identifier. */
  id: string
  /** Label of the field being edited. */
  fieldLabel: string
  /** User actively editing the field. */
  user: CollabUser
  /** Optional preview snippet of what they are typing. */
  preview?: string
}

/** A single commit pulse strip event. */
export interface CommitPulseEvent {
  id: string
  /** Display label, e.g. "saved description". */
  label: string
  /** Author of the change. */
  user: CollabUser
  /** Human relative timestamp e.g. "just now". */
  timestamp: string
  /** Optional badge, e.g. "+12 / -4". */
  delta?: string
}

/** Active speaker state inside a voice room tile. */
export type VoiceSpeakerState = "speaking" | "muted" | "listening" | "raised-hand"

/** A participant inside a voice room. */
export interface VoiceParticipant {
  /** Stable identifier (reuses `CollabUser.id` if available). */
  id: string
  user: CollabUser
  state: VoiceSpeakerState
  /** Optional audio level 0–100, used to drive the active speaker ring. */
  level?: number
}

/** Map a lock reason to a chip tone the deep family already paints. */
export const LOCK_REASON_LABEL: Record<LockReason, string> = {
  editing: "Editing",
  reviewing: "Reviewing",
  rendering: "Rendering",
  exporting: "Exporting",
}

/** Map a conflict source to a chip label. */
export const CONFLICT_SOURCE_LABEL: Record<ConflictVersionSource, string> = {
  mine: "Yours",
  theirs: "Theirs",
  base: "Original",
}

/** Map a voice speaker state to a label. */
export const VOICE_STATE_LABEL: Record<VoiceSpeakerState, string> = {
  speaking: "Speaking",
  muted: "Muted",
  listening: "Listening",
  "raised-hand": "Hand raised",
}
