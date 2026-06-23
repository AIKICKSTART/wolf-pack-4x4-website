/**
 * Shared types for the collaborative comments / annotations primitives.
 *
 * Scope: Figma / Loom-style comments and annotations on workshop
 * documents, designs, recordings, and floor-plans. Distinct from inbox
 * (h2h messaging) and AI assistant chat primitives.
 */

export type CommentStatus = "open" | "resolved" | "reopened"

export type ReactionEmoji =
  | "like"
  | "love"
  | "lightbulb"
  | "question"
  | "fire"
  | "clap"

export type MentionTargetKind = "user" | "team" | "role"

export type StickyNoteTone = "yellow" | "pink" | "teal" | "amber"

export type CommentActivityKind =
  | "commented"
  | "replied"
  | "resolved"
  | "reopened"
  | "mentioned"
  | "liked"
  | "annotated"

export interface CommentAuthor {
  id: string
  name: string
  /** Optional avatar src. Falls back to initials in Avatar primitive. */
  avatar?: string
  /** Short role label rendered as a chip. */
  role?: string
}

export interface MentionTarget {
  id: string
  kind: MentionTargetKind
  name: string
  /** Short qualifier like "Bay 3" or "Senior Tech". */
  qualifier?: string
}

export interface MentionToken {
  /** Stable identifier of the resolved target. */
  targetId: string
  kind: MentionTargetKind
  /** Display value already prefixed with @. */
  display: string
}

export interface ReactionSummary {
  emoji: ReactionEmoji
  count: number
  /** Whether the viewing user added this reaction. */
  mine?: boolean
}

export interface CommentReply {
  id: string
  author: CommentAuthor
  body: string
  timestamp: string
  /** Optional reactions on this reply. */
  reactions?: ReadonlyArray<ReactionSummary>
}

export interface CommentRecord {
  id: string
  author: CommentAuthor
  body: string
  timestamp: string
  status: CommentStatus
  reactions?: ReadonlyArray<ReactionSummary>
  replies?: ReadonlyArray<CommentReply>
  /** Optional resolution note. */
  resolutionNote?: string
}

export interface AnnotationPosition {
  /** Percentage from left (0–100). */
  x: number
  /** Percentage from top (0–100). */
  y: number
}

export interface AnnotationPinRecord {
  id: string
  /** 1-based label rendered inside the pin. */
  number: number
  status: CommentStatus
  position: AnnotationPosition
  /** Optional short label shown on hover. */
  label?: string
}

export interface CommentThreadRecord {
  id: string
  title: string
  /** Optional pin number that anchored this thread on a canvas. */
  pinNumber?: number
  status: CommentStatus
  author: CommentAuthor
  excerpt: string
  timestamp: string
  replyCount: number
  /** Whether the viewer is mentioned in this thread. */
  hasMention?: boolean
}

export interface ActivityEvent {
  id: string
  actor: CommentAuthor
  kind: CommentActivityKind
  /** Display verbiage rendered after the chip. */
  description: string
  /** Optional thread title for context. */
  threadTitle?: string
  timestamp: string
}

export const REACTION_GLYPH: Record<ReactionEmoji, string> = {
  like: "👍",
  love: "❤️",
  lightbulb: "💡",
  question: "❓",
  fire: "🔥",
  clap: "👏",
}

export const REACTION_LABEL: Record<ReactionEmoji, string> = {
  like: "Like",
  love: "Love",
  lightbulb: "Idea",
  question: "Question",
  fire: "On fire",
  clap: "Applaud",
}
