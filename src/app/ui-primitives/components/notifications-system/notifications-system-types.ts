/**
 * Notifications System primitive family — shared types.
 *
 * Oak Flats Mufflermen production notification surface — toasts, banners,
 * push prompts, preference matrix, snooze, DND, digest, sounds, delivery
 * reports, message templates, priority rules, quiet-hours and notification
 * centre primitives.
 */

export type NotificationTone = "info" | "success" | "warning" | "danger"

export type NotificationChannelId = "in-app" | "email" | "sms" | "push-web" | "push-mobile"

export type NotificationEventId =
  | "quote-new"
  | "quote-accepted"
  | "booking-confirmed"
  | "booking-changed"
  | "service-complete"
  | "invoice-paid"
  | "roadworthy-expiring"
  | "recall-hit"
  | "hermes-escalation"
  | "inventory-low"
  | "payment-failed"

export interface NotificationChannelMeta {
  id: NotificationChannelId
  label: string
  hint: string
}

export interface NotificationEventMeta {
  id: NotificationEventId
  label: string
  description: string
  tone: NotificationTone
}

export type WeekdayCode = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"

export interface TimeWindow {
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}

export interface DeliveryReportRow {
  id: string
  channel: NotificationChannelId
  recipient: string
  subject: string
  sentAtISO: string
  status: DeliveryStatus
  attempts: number
  latencyMs?: number
}

export type DeliveryStatus =
  | "sent"
  | "delivered"
  | "opened"
  | "clicked"
  | "failed"
  | "queued"
  | "bounced"

export type SnoozeDurationId = "15m" | "1h" | "today" | "until-mon" | "custom"

export interface SnoozeDuration {
  id: SnoozeDurationId
  label: string
  hint: string
  resumesAt: string
}

export interface NotificationSoundPreset {
  id: string
  label: string
  hint: string
  /** Localized path to a small audio file. Never auto-played. */
  src?: string
}

export interface DigestScheduleValue {
  cadence: "daily" | "weekly"
  weekday?: WeekdayCode
  hour: number
  minute: number
  timezone: string
  recipients: number
}

export type PriorityRuleAction = "escalate" | "page" | "email-supervisor" | "sms-on-call"

export interface PriorityRuleSpec {
  id: string
  event: NotificationEventId
  ifUnreadMinutes: number
  action: PriorityRuleAction
  enabled: boolean
}

export interface EventTemplateValue {
  event: NotificationEventId
  channel: NotificationChannelId
  subject: string
  body: string
  /** Available merge tags for the editor. */
  mergeTags: ReadonlyArray<string>
}

export interface NotificationCentreItem {
  id: string
  tone: NotificationTone
  event: NotificationEventId
  title: string
  body: string
  receivedAtISO: string
  read: boolean
  channel: NotificationChannelId
}

export interface QuietHoursValue {
  weekdays: ReadonlyArray<WeekdayCode>
  window: TimeWindow
  weekendAllDay: boolean
}

export type ToastPlacement =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"

export interface ToastDescriptor {
  id: string
  tone: NotificationTone
  title: string
  description?: string
  actionLabel?: string
  durationMs?: number
}

export type BannerVariant = "announcement" | "alert" | "promo" | "maintenance"

export interface BannerSpec {
  id: string
  variant: BannerVariant
  title: string
  message: string
  ctaLabel?: string
  dismissible?: boolean
}

export interface ChannelMatrixCell {
  event: NotificationEventId
  channel: NotificationChannelId
  enabled: boolean
}
