/**
 * Shared types for the Muffler Pulse social-scheduler primitive family.
 * A Postiz-style mirror expanded with Mufflermen-specific concerns.
 */

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "x"
  | "linkedin"
  | "youtube"
  | "threads"
  | "bluesky"

export type SocialTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface PlatformDescriptor {
  key: SocialPlatform
  label: string
  handle: string
  charLimit: number
  /** Recommended aspect ratios (e.g. "1:1", "9:16"). */
  aspectRatios: ReadonlyArray<string>
  tone: SocialTone
  /** Single-letter glyph for compact pills + previews. */
  mark: string
}

export type PostStatus =
  | "draft"
  | "in-review"
  | "scheduled"
  | "publishing"
  | "published"
  | "failed"

export interface PostVariant {
  platform: SocialPlatform
  body: string
  hashtags: ReadonlyArray<string>
  characterCount: number
  warning?: string
}

export interface ScheduledPost {
  id: string
  title: string
  scheduledFor: string
  /** ISO date, hour-resolution sufficient for the calendar. */
  status: PostStatus
  platforms: ReadonlyArray<SocialPlatform>
  preview: string
  engagement?: PostEngagement
  approver?: string
  /** Optional media descriptor IDs. */
  mediaIds?: ReadonlyArray<string>
}

export interface PostEngagement {
  likes: number
  comments: number
  shares: number
  saves: number
  /** Engagement rate as a decimal (0.084 for 8.4%). */
  rate: number
}

export interface ConnectedAccount {
  id: string
  platform: SocialPlatform
  handle: string
  displayName: string
  followerCount: number
  /** OAuth status. */
  status: "connected" | "expiring" | "expired" | "error" | "reconnecting"
  expiresAt?: string
  lastSyncedAt: string
  scopes: ReadonlyArray<string>
}

export interface HashtagGroup {
  id: string
  label: string
  category: "branded" | "trending" | "community" | "local"
  hashtags: ReadonlyArray<HashtagDescriptor>
  tone: SocialTone
}

export interface HashtagDescriptor {
  tag: string
  /** Estimated impressions (k = thousand). */
  reach: number
  trend: "up" | "down" | "flat"
  competition: "low" | "med" | "high"
}

export interface MentionInboxItem {
  id: string
  platform: SocialPlatform
  authorHandle: string
  authorName: string
  body: string
  kind: "mention" | "comment" | "dm" | "reply"
  sentiment: "positive" | "neutral" | "negative"
  receivedAt: string
  unread?: boolean
  /** Quoted post snippet, if reply. */
  context?: string
}

export interface AudiencePoint {
  date: string
  followers: number
}

export interface AudienceSeries {
  platform: SocialPlatform
  current: number
  delta30d: number
  points: ReadonlyArray<AudiencePoint>
}

export interface BestTimeCell {
  day: number
  hour: number
  /** 0..1 normalised engagement potential. */
  score: number
}

export interface MediaBinderItem {
  id: string
  fileName: string
  kind: "image" | "video" | "reel" | "carousel"
  durationSeconds?: number
  aspectRatio: string
  sizeMB: number
  /** Per-platform fit assessment. */
  fit: Partial<Record<SocialPlatform, "ok" | "warn" | "fail">>
  placeholder: string
}

export interface ApprovalStage {
  id: string
  label: string
  owner: string
  state: "pending" | "current" | "approved" | "rejected"
  completedAt?: string
  note?: string
}

export interface WebhookEvent {
  id: string
  platform: SocialPlatform
  kind:
    | "likes_spike"
    | "mention"
    | "dm"
    | "comment"
    | "token_refresh"
    | "share_burst"
    | "post_published"
    | "post_failed"
  summary: string
  receivedAt: string
  severity: "info" | "warn" | "error" | "success"
  payload?: Readonly<Record<string, string | number>>
}

export interface RepurposeStage {
  id: string
  label: string
  surface: "blog" | "thread" | "reel" | "carousel" | "newsletter" | "shorts"
  state: "queued" | "in-progress" | "ready" | "scheduled" | "blocked"
  owner: string
  eta?: string
  note?: string
}

export interface CaptionPreset {
  id: string
  label: string
  description: string
  /** A short voice example for hover tooltips. */
  sample: string
}

export interface CalendarCellPost {
  id: string
  title: string
  hour: number
  minute: number
  platforms: ReadonlyArray<SocialPlatform>
  status: PostStatus
}

export interface CalendarDay {
  date: string
  weekday: string
  dayNumber: number
  outsideMonth?: boolean
  isToday?: boolean
  posts: ReadonlyArray<CalendarCellPost>
}
