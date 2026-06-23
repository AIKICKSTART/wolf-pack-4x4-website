/* Shared types for the customer-support / helpdesk primitive system. */

export type TicketStatus =
  | "new"
  | "open"
  | "pending"
  | "on-hold"
  | "resolved"
  | "closed"

export type TicketPriority = "p0" | "p1" | "p2" | "p3"

export type SupportChannel = "email" | "chat" | "sms" | "phone" | "x" | "facebook"

export type NoteVisibility = "public" | "internal"

export type SupportTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "neutral"
  | "violet"

export type SlaBucket = "safe" | "warning" | "danger" | "breached"

export type CsatRating = 1 | 2 | 3 | 4 | 5

export type AiConfidence = "high" | "medium" | "low"

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  new: "New",
  open: "Open",
  pending: "Pending customer",
  "on-hold": "On hold",
  resolved: "Resolved",
  closed: "Closed",
}

export const TICKET_STATUS_TONE: Record<TicketStatus, SupportTone> = {
  new: "teal",
  open: "amber",
  pending: "violet",
  "on-hold": "neutral",
  resolved: "green",
  closed: "neutral",
}

export const TICKET_STATUS_ORDER: ReadonlyArray<TicketStatus> = [
  "new",
  "open",
  "pending",
  "on-hold",
  "resolved",
  "closed",
]

export const TICKET_STATUS_TRANSITIONS: Record<
  TicketStatus,
  ReadonlyArray<TicketStatus>
> = {
  new: ["open", "closed"],
  open: ["pending", "on-hold", "resolved"],
  pending: ["open", "resolved"],
  "on-hold": ["open", "closed"],
  resolved: ["open", "closed"],
  closed: ["open"],
}

export const TICKET_PRIORITY_LABEL: Record<TicketPriority, string> = {
  p0: "P0 · Critical",
  p1: "P1 · High",
  p2: "P2 · Normal",
  p3: "P3 · Low",
}

export const TICKET_PRIORITY_SHORT: Record<TicketPriority, string> = {
  p0: "P0",
  p1: "P1",
  p2: "P2",
  p3: "P3",
}

export const TICKET_PRIORITY_TONE: Record<TicketPriority, SupportTone> = {
  p0: "red",
  p1: "amber",
  p2: "teal",
  p3: "neutral",
}

export const CHANNEL_LABEL: Record<SupportChannel, string> = {
  email: "Email",
  chat: "Chat",
  sms: "SMS",
  phone: "Phone",
  x: "X",
  facebook: "Facebook",
}

export const CHANNEL_GLYPH: Record<SupportChannel, string> = {
  email: "@",
  chat: "◖",
  sms: "✉",
  phone: "☏",
  x: "𝕏",
  facebook: "f",
}

export const CHANNEL_TONE: Record<SupportChannel, SupportTone> = {
  email: "teal",
  chat: "green",
  sms: "violet",
  phone: "amber",
  x: "neutral",
  facebook: "teal",
}

export const VISIBILITY_LABEL: Record<NoteVisibility, string> = {
  public: "Public reply",
  internal: "Internal note",
}

export const VISIBILITY_TONE: Record<NoteVisibility, SupportTone> = {
  public: "teal",
  internal: "amber",
}

export const SLA_BUCKET_TONE: Record<SlaBucket, SupportTone> = {
  safe: "green",
  warning: "amber",
  danger: "red",
  breached: "red",
}

export const SLA_BUCKET_LABEL: Record<SlaBucket, string> = {
  safe: "On track",
  warning: "Due soon",
  danger: "Almost breached",
  breached: "Breached",
}

export const AI_CONFIDENCE_LABEL: Record<AiConfidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
}

export const AI_CONFIDENCE_TONE: Record<AiConfidence, SupportTone> = {
  high: "green",
  medium: "amber",
  low: "neutral",
}

/** Bucket an SLA deadline (in minutes from now) into a tone bucket. */
export function bucketForRemainingMinutes(minutes: number): SlaBucket {
  if (minutes <= 0) return "breached"
  if (minutes < 60) return "danger"
  if (minutes < 240) return "warning"
  return "safe"
}
