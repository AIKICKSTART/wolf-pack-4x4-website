/**
 * Shared types for the unified-inbox primitive family.
 *
 * The unified-inbox sits one layer up from `inbox` (peer-to-peer messaging)
 * and `live-chat` (synchronous web-chat operator console). It is the
 * multi-channel front-desk surface that Tim, Mia and Daniel use at the
 * Mufflermen workshop to triage SMS, Facebook DM, Instagram DM, email
 * and web-chat conversations from a single queue with shared rules,
 * sentiment auto-tagging, SLA timers, presence, tags and merge tools.
 *
 * These primitives are visual references — no backend is wired.
 */

import type { SupportTone } from "../support/support-types"

/** Customer-facing inbound channel surfaced by the unified inbox. */
export type UnifiedChannel = "sms" | "facebook" | "instagram" | "email" | "web"

/** Auto-detected sentiment bucket for an inbound conversation. */
export type UnifiedSentiment = "positive" | "neutral" | "negative" | "upset"

/** Priority flag value for the priority-flag-row primitive. */
export type UnifiedPriority = "low" | "normal" | "high" | "urgent"

/** Operator presence status for the team-presence-rail primitive. */
export type UnifiedPresence = "online" | "away" | "busy" | "offline"

/** Connection state for a downstream channel integration. */
export type ChannelConnectionState =
  | "connected"
  | "degraded"
  | "expired"
  | "disconnected"

/** Bulk-action verb supported by the bulk-action-bar primitive. */
export type BulkAction = "assign" | "close" | "spam" | "move"

/** Auto-reply rule kind for the auto-reply-rule-card primitive. */
export type AutoReplyKind = "out-of-hours" | "away-message" | "first-touch"

/** Macro / canned-reply variable token. */
export interface MacroVariable {
  /** Inline token, e.g. "{{customer.firstName}}". */
  token: string
  /** Human-readable label. */
  label: string
}

/** Canned-reply macro consumed by composer-with-macros. */
export interface MacroChip {
  id: string
  /** Short label used on the chip strip, e.g. "DPF triage". */
  label: string
  /** Optional category for grouping inside richer pickers. */
  category?: string
  /** Body text with variable tokens. */
  body: string
  /** Variables that may be substituted into the body. */
  variables?: ReadonlyArray<MacroVariable>
}

/** Auto-detected tag with deterministic colour coding. */
export interface ColorTag {
  id: string
  label: string
  tone: SupportTone
}

/** Workshop team member used across assignees + presence rails. */
export interface UnifiedTeammate {
  id: string
  name: string
  role: string
  presence: UnifiedPresence
  /** Active conversation count carried by this teammate. */
  workload: number
  /** Soft cap for concurrent conversations. */
  capacity: number
  avatarSrc?: string
}

/** Single inbound conversation summary shown in the multi-channel list. */
export interface UnifiedConversation {
  id: string
  channel: UnifiedChannel
  /** Customer display name or anonymous label. */
  customerName: string
  /** Short subject line, e.g. "DPF clean question". */
  subject: string
  /** Single-line preview of the most recent inbound message. */
  preview: string
  /** Human-readable timestamp, e.g. "9:42 am" or "3m ago". */
  timestamp: string
  /** Unread message count for this conversation. */
  unreadCount?: number
  /** Auto-detected sentiment bucket. */
  sentiment?: UnifiedSentiment
  /** Priority flag the team has stamped on this conversation. */
  priority?: UnifiedPriority
  /** Assignee teammate id, undefined when unassigned. */
  assigneeId?: string
  /** Tag identifiers attached to this conversation. */
  tagIds?: ReadonlyArray<string>
  /** Whether this conversation is currently selected in the list. */
  active?: boolean
}

/** Single message rendered inside conversation-thread-view. */
export interface UnifiedThreadMessage {
  id: string
  /** Direction of the message. */
  direction: "inbound" | "outbound"
  /** Author display name (customer or teammate). */
  authorName: string
  /** Body text — plain string for showcase use. */
  body: string
  /** Human-readable timestamp, e.g. "9:42 am". */
  timestamp: string
  /** Channel the message arrived on; defaults to the conversation channel. */
  channel?: UnifiedChannel
  /** Whether the message has been read by the customer. */
  read?: boolean
}

/** Customer 360 summary used by customer-context-rail. */
export interface UnifiedCustomerProfile {
  id: string
  name: string
  email?: string
  phone?: string
  /** Suburb / locality, e.g. "Oak Flats NSW". */
  locality?: string
  /** Lifetime value in AUD cents. */
  lifetimeValueCents: number
  /** Number of past jobs completed by the workshop. */
  jobCount: number
  avatarSrc?: string
}

/** Past workshop job for the customer-context-rail recent-jobs block. */
export interface UnifiedRecentJob {
  id: string
  /** Title, e.g. "Manta cat-back fit · N80 Hilux". */
  title: string
  /** Pretty completion date, e.g. "12 Apr 2026". */
  completedAt: string
  /** Total invoice value in AUD cents. */
  totalCents: number
}

export const CHANNEL_LABEL: Record<UnifiedChannel, string> = {
  sms: "SMS",
  facebook: "Facebook",
  instagram: "Instagram",
  email: "Email",
  web: "Web chat",
}

export const CHANNEL_GLYPH: Record<UnifiedChannel, string> = {
  sms: "✉",
  facebook: "f",
  instagram: "◎",
  email: "@",
  web: "◖",
}

export const CHANNEL_TONE: Record<UnifiedChannel, SupportTone> = {
  sms: "violet",
  facebook: "teal",
  instagram: "red",
  email: "amber",
  web: "green",
}

export const SENTIMENT_LABEL: Record<UnifiedSentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
  upset: "Upset",
}

export const SENTIMENT_TONE: Record<UnifiedSentiment, SupportTone> = {
  positive: "green",
  neutral: "neutral",
  negative: "amber",
  upset: "red",
}

export const PRIORITY_LABEL: Record<UnifiedPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
}

export const PRIORITY_TONE: Record<UnifiedPriority, SupportTone> = {
  low: "neutral",
  normal: "teal",
  high: "amber",
  urgent: "red",
}

export const PRESENCE_LABEL: Record<UnifiedPresence, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
}

export const PRESENCE_TONE: Record<UnifiedPresence, SupportTone> = {
  online: "green",
  away: "amber",
  busy: "red",
  offline: "neutral",
}

export const CHANNEL_CONNECTION_LABEL: Record<ChannelConnectionState, string> =
  {
    connected: "Connected",
    degraded: "Degraded",
    expired: "OAuth expired",
    disconnected: "Disconnected",
  }

export const CHANNEL_CONNECTION_TONE: Record<
  ChannelConnectionState,
  SupportTone
> = {
  connected: "green",
  degraded: "amber",
  expired: "red",
  disconnected: "neutral",
}

export const AUTO_REPLY_KIND_LABEL: Record<AutoReplyKind, string> = {
  "out-of-hours": "Out of hours",
  "away-message": "Away message",
  "first-touch": "First-touch ack",
}

export const BULK_ACTION_LABEL: Record<BulkAction, string> = {
  assign: "Assign",
  close: "Close",
  spam: "Mark spam",
  move: "Move",
}

/** Format AUD cents into a compact AUD label. */
export function formatAud(cents: number): string {
  const dollars = cents / 100
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
}

/** Format remaining SLA minutes, supporting breaches and hour rollover. */
export function formatSlaRemaining(minutes: number): string {
  if (minutes <= 0) {
    const overdue = Math.abs(minutes)
    if (overdue >= 60) {
      const hours = Math.floor(overdue / 60)
      const mins = overdue % 60
      return mins > 0 ? `Breached ${hours}h ${mins}m` : `Breached ${hours}h`
    }
    return `Breached ${overdue}m`
  }
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m left` : `${hours}h left`
  }
  return `${minutes}m left`
}
