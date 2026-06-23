/**
 * Demo data for the User profile screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) owner-profile fixtures: the
 * workshop principal's identity, an activity summary across the last cycle,
 * notification preferences, active sign-in sessions, and a recent-actions log.
 * All copy is production-ready language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is "Torque". The legacy
 * internal codename is never surfaced in any string below.
 */

import type { ProfileStat } from "../../components/account/profile-card"
import type { PlanTier } from "../../components/account/plan-badge"
import type { NotificationChannelRowItem } from "../../components/account/notification-channel-row"
import type { SessionRowItem } from "../../components/account/session-row"
import type { AuditLogRowItem } from "../../components/account/audit-log-row"
import type { StatTileTone, DeltaDirection } from "../../components/primitives/stat-tile"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const WORKSPACE_SLUG = "oak-flats-muffler-men"

/** Brand team photo used as the profile cover banner. */
export const COVER_IMAGE_SRC = "/media/oak-flats-muffler-men-team.webp"
export const COVER_IMAGE_ALT =
  "The Oak Flats Muffler Men crew on the workshop floor in Illawarra, NSW"

/** Owner identity surfaced on the profile card. */
export const OWNER_PROFILE = {
  name: "Daniel Carmody",
  role: "Owner · Workshop principal",
  email: "daniel@mufflermen.com.au",
  location: "Oak Flats, NSW 2529",
  phone: "+61 4xx 218 776",
  memberSince: "March 2019",
  bio: "Runs the bays at Oak Flats — mandrel-bent exhausts, DPF-back kits, logbook servicing and the odd weekend dyno tune. Torque handles the quotes and replies so Daniel can stay under the cars.",
} as const

/** Identity stat row shown beneath the profile card header. */
export const OWNER_STATS: ReadonlyArray<ProfileStat> = [
  { label: "Member since", value: "Mar 2019" },
  { label: "Active bays", value: "4", tone: "teal" },
  { label: "Team seats", value: "8 / 10", tone: "amber" },
  { label: "Jobs this month", value: "182", tone: "green" },
]

/** Plan tier shown beside the owner identity. */
export const PLAN_TIER: PlanTier = "workshop"
export const PLAN_CAPTION = "Renews 1 Jun 2026 · $149/mo"

/** Activity summary tiles — last 30 days across the owner's workshop. */
export interface ActivityStat {
  id: string
  label: string
  value: string
  unit?: string
  tone: StatTileTone
  caption?: string
  sparkline: ReadonlyArray<number>
  delta?: {
    value: string
    direction: DeltaDirection
    helpText?: string
  }
}

export const ACTIVITY_STATS: ReadonlyArray<ActivityStat> = [
  {
    id: "jobs",
    label: "Jobs completed",
    value: "182",
    tone: "green",
    caption: "Last 30 days · 4 bays",
    sparkline: [120, 138, 131, 150, 162, 158, 174, 182],
    delta: { value: "12%", direction: "up", helpText: "vs previous 30 days" },
  },
  {
    id: "quotes",
    label: "Quotes sent",
    value: "247",
    tone: "amber",
    caption: "68% accepted by customers",
    sparkline: [180, 194, 210, 205, 221, 230, 239, 247],
    delta: { value: "9%", direction: "up", helpText: "acceptance trending up" },
  },
  {
    id: "replies",
    label: "Torque replies",
    value: "1,840",
    tone: "teal",
    caption: "Avg first reply · 3m 12s",
    sparkline: [1320, 1410, 1485, 1560, 1648, 1712, 1788, 1840],
    delta: { value: "21%", direction: "up", helpText: "more handled for you" },
  },
  {
    id: "rating",
    label: "Google rating",
    value: "4.9",
    unit: "/5",
    tone: "red",
    caption: "312 reviews · 18 new this month",
    sparkline: [4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9],
    delta: { value: "0.1", direction: "up", helpText: "since last month" },
  },
]

/** Notification preferences the owner can toggle on this screen. */
export const NOTIFICATION_PREFS: ReadonlyArray<NotificationChannelRowItem> = [
  {
    channel: "email",
    destination: "daniel@mufflermen.com.au",
    enabled: true,
    categories: ["quote", "booking", "job"],
  },
  {
    channel: "sms",
    destination: "+61 4xx 218 776",
    enabled: true,
    categories: ["booking", "alert"],
  },
  {
    channel: "push",
    destination: "Daniel's iPhone · Torque app",
    enabled: false,
    categories: ["job", "alert"],
  },
  {
    channel: "in-app",
    destination: "Torque workspace inbox",
    enabled: true,
    categories: ["quote", "marketing", "alert"],
  },
]

/** Active sign-in sessions for the owner account. */
export const SESSIONS: ReadonlyArray<SessionRowItem> = [
  {
    id: "sess-office",
    device: "desktop",
    label: "Front office PC",
    browser: "Chrome 124 · Windows 11",
    ip: "203.0.113.24",
    location: "Oak Flats, NSW",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "sess-iphone",
    device: "phone",
    label: "Daniel's iPhone 15",
    browser: "Torque app · iOS 18.4",
    ip: "203.0.113.91",
    location: "Oak Flats, NSW",
    lastActive: "8 min ago",
  },
  {
    id: "sess-bay-ipad",
    device: "tablet",
    label: "Bay 1 iPad",
    browser: "Safari 17 · iPadOS",
    ip: "203.0.113.24",
    location: "Oak Flats, NSW",
    lastActive: "1 hr ago",
  },
  {
    id: "sess-laptop",
    device: "laptop",
    label: "Home MacBook",
    browser: "Safari 17 · macOS Sonoma",
    ip: "198.51.100.7",
    location: "Shellharbour, NSW",
    lastActive: "Yesterday, 7:42 pm",
  },
]

/** Recent actions on the owner account — a personal audit trail. */
export const RECENT_ACTIONS: ReadonlyArray<AuditLogRowItem> = [
  {
    id: "act-quote",
    actorName: "Daniel Carmody",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Approved quote",
    objectKind: "Quote",
    objectLabel: "#Q-4821 · Hilux 2.8L DPF-back system",
    ip: "203.0.113.24",
    timestamp: "Today, 2:14 pm",
    tone: "success",
  },
  {
    id: "act-reply",
    actorName: "Torque",
    action: "Sent reply on your behalf",
    objectKind: "Review",
    objectLabel: "5★ Google review · Maria P.",
    ip: "—",
    timestamp: "Today, 11:02 am",
    tone: "info",
  },
  {
    id: "act-roster",
    actorName: "Daniel Carmody",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Changed role",
    objectKind: "Team",
    objectLabel: "Tyler Brooks → Apprentice (viewer)",
    ip: "203.0.113.24",
    timestamp: "Yesterday, 4:51 pm",
    tone: "info",
  },
  {
    id: "act-payout",
    actorName: "Daniel Carmody",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Updated payout details",
    objectKind: "Billing",
    objectLabel: "Workshop plan · Westpac account",
    ip: "198.51.100.7",
    timestamp: "27 May 2026, 8:09 pm",
    tone: "warn",
  },
  {
    id: "act-signin",
    actorName: "Daniel Carmody",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "New sign-in",
    objectKind: "Security",
    objectLabel: "Home MacBook · Shellharbour, NSW",
    ip: "198.51.100.7",
    timestamp: "26 May 2026, 7:42 pm",
    tone: "warn",
  },
  {
    id: "act-export",
    actorName: "Daniel Carmody",
    actorEmail: "daniel@mufflermen.com.au",
    actorTone: "red",
    action: "Generated export",
    objectKind: "Reports",
    objectLabel: "May owner report · PDF",
    ip: "203.0.113.24",
    timestamp: "25 May 2026, 9:30 am",
    tone: "success",
  },
]
