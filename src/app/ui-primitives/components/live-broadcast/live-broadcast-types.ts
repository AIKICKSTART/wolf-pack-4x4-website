/**
 * Shared types for the Oak Flats Mufflermen live broadcast primitives.
 *
 * These primitives are visual references; players never autoplay and all
 * animated UI respects `prefers-reduced-motion`. They are themed for the
 * workshop's weekly dyno + supplier streams.
 */

export type LiveStreamState = "live" | "starting" | "ended" | "scheduled"

export type StreamHealth = "excellent" | "good" | "degraded" | "critical"

export type SupporterTier = "workshop-crew" | "inner-circle" | "pit-boss" | "platinum"

export type ReactionKind = "muffler-flame" | "wrench" | "dyno" | "smoke" | "aussie-flag"

export type ChatRole = "host" | "moderator" | "crew" | "viewer"

export interface BroadcastHost {
  id: string
  name: string
  /** Role label rendered on chip (e.g. "Lead Tech"). */
  role: string
  /** Optional avatar src. Falls back to initials. */
  avatar?: string
}

export interface BroadcastViewer {
  id: string
  handle: string
  /** Optional avatar src. Falls back to initials. */
  avatar?: string
  /** Suburb or state label (e.g. "Wollongong NSW"). */
  region?: string
  /** Watch-duration in seconds. */
  watchSeconds: number
  /** Supporter tier — controls badge styling. */
  tier?: SupporterTier
  /** Quick-action flag for the host backstage panel. */
  isFlagged?: boolean
}

export interface ChatMessage {
  id: string
  /** ISO timestamp or relative label (e.g. "19:04 AEST"). */
  timestamp: string
  author: string
  /** Optional avatar src for the author. */
  authorAvatar?: string
  /** Author role — drives chip tone + badge. */
  role: ChatRole
  /** Tier badge applied to author handle. */
  tier?: SupporterTier
  content: string
  /** Reaction overlay attached to the message. */
  reaction?: ReactionKind
  /** Marker for pinned host announcements. */
  isPinned?: boolean
}

export interface ReactionPulse {
  /** Stable id for keying the floating glyph. */
  id: string
  kind: ReactionKind
  /** Author handle (used as tooltip / aria copy). */
  fromHandle: string
}

export interface ScheduledBroadcast {
  id: string
  title: string
  /** ISO timestamp the broadcast goes live. */
  startsAt: string
  /** Friendly local-time label, e.g. "Tue 19:00 AEST". */
  localTimeLabel: string
  /** Expected duration label, e.g. "90 min". */
  durationLabel: string
  host: BroadcastHost
  /** Short blurb shown under the title. */
  blurb: string
  /** Total RSVP count. */
  rsvpCount: number
  /** Whether the viewer has RSVP'd. */
  rsvped?: boolean
}

export interface ReplayBroadcast {
  id: string
  title: string
  /** ISO timestamp of when the original broadcast aired. */
  airedAt: string
  /** Human-readable label e.g. "Aired 14 May 2026". */
  airedLabel: string
  /** Total runtime label e.g. "1h 27m". */
  runtimeLabel: string
  /** View count number. */
  viewCount: number
  host: BroadcastHost
  /** Optional poster URL. */
  posterSrc?: string
  /** Bookmarkable chapters with start time in seconds. */
  chapters: ReadonlyArray<ReplayChapter>
}

export interface ReplayChapter {
  id: string
  title: string
  /** Chapter start time in seconds. */
  startSeconds: number
  /** Pretty start label e.g. "0:00". */
  startLabel: string
}

export interface PollOption {
  id: string
  label: string
  votes: number
}

export interface LivePoll {
  id: string
  /** Poll question prompt. */
  question: string
  options: ReadonlyArray<PollOption>
  /** ID of the option the viewer chose. */
  selectedOptionId?: string
  /** Closed polls show final result and hide voting. */
  isClosed?: boolean
  /** Seconds remaining if open. */
  secondsLeft?: number
}

export interface QnaQuestion {
  id: string
  asker: string
  /** Optional avatar src for the asker. */
  askerAvatar?: string
  question: string
  upvotes: number
  /** Whether the viewer has upvoted. */
  upvoted?: boolean
  /** ISO timestamp for sort ordering, displayed as relative. */
  askedAt: string
  /** When answered, host marks the row complete. */
  isAnswered?: boolean
}

export interface SupporterTierDescriptor {
  tier: SupporterTier
  label: string
  /** Monthly price label e.g. "$5/mo". */
  priceLabel: string
  /** Short blurb above perks list. */
  tagline: string
  perks: ReadonlyArray<string>
  /** Current supporter count for tier. */
  supporterCount: number
  /** When set, marks viewer's current tier. */
  isCurrent?: boolean
}

export interface StreamHealthSnapshot {
  /** Current bitrate in kbps. */
  bitrateKbps: number
  /** Resolution label e.g. "1080p60". */
  resolutionLabel: string
  /** Encoder framerate. */
  fps: number
  /** Dropped-frame ratio 0..1. */
  droppedRatio: number
  /** Audio level 0..1. */
  audioLevel: number
  /** Health summary tone. */
  health: StreamHealth
  /** Last 24-sample bitrate history for the sparkline. */
  bitrateHistory: ReadonlyArray<number>
}

export interface RaidEvent {
  id: string
  /** Channel name initiating the raid. */
  fromChannel: string
  /** Channel handle for caption. */
  fromHandle: string
  /** Number of viewers the channel brings in. */
  viewerCount: number
  /** Avatar for the raider channel. */
  fromAvatar?: string
  /** Short message attached by raid host. */
  message?: string
}

export interface ClipMoment {
  id: string
  /** Anchor label e.g. "Falcon GT-HO peak boost". */
  label: string
  /** Pre/post window in seconds. */
  windowSeconds: number
  /** ISO timestamp of moment. */
  capturedAt: string
  /** Optional poster src for moment thumb. */
  posterSrc?: string
  /** Optional creator handle. */
  creator: string
}
