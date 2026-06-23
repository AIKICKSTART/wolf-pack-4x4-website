/**
 * Demo fixtures for the Torque notifications inbox screen.
 *
 * Torque is Oak Flats Muffler Men's customer-facing business assistant
 * (Illawarra, NSW — exhausts, custom fabrication, servicing). Every visible
 * string below is owner-/operator-facing and must never surface the internal
 * engine codename. (Dev note: the engine behind Torque is internally the
 * "Hermes" run engine — that codename stays out of every visible string by
 * design.)
 */

import type { NotificationCardTone } from "@/app/ui-primitives/components/notifications/notification-card"
import type { MetricBlockItem } from "@/app/ui-primitives/components/data-display/metric-block"
import type { StatusBadgeSpec } from "@/app/ui-primitives/components/data-display/status-badge-grid"

/** The five alert families Torque groups the owner's inbox into. */
export type NotificationGroupId =
  | "system"
  | "agent"
  | "approval-pending"
  | "social"
  | "seo"

export interface InboxNotification {
  id: string
  group: NotificationGroupId
  tone: NotificationCardTone
  /** Short uppercase tag rendered above the title. */
  kicker: string
  title: string
  excerpt: string
  /** Human-readable relative time, shown in the meta row. */
  timestamp: string
  source: string
  unread: boolean
  /** Optional row actions (e.g. review, open). Kept demo-only (no hrefs). */
  actions?: ReadonlyArray<{ label: string; variant?: "primary" | "secondary" }>
}

export interface NotificationGroupMeta {
  id: NotificationGroupId
  label: string
  /** One-line description of what lands in this lane. */
  blurb: string
  /** Status-badge tone for the group heading chip. */
  tone: StatusBadgeSpec["tone"]
}

/** Group ordering + heading copy for the grouped inbox. */
export const NOTIFICATION_GROUPS: ReadonlyArray<NotificationGroupMeta> = [
  {
    id: "approval-pending",
    label: "Awaiting your sign-off",
    blurb: "High-impact actions Torque has parked for a one-tap owner decision.",
    tone: "warn",
  },
  {
    id: "system",
    label: "System & site",
    blurb: "Backups, deploys, uptime and the public mufflermen.com.au site.",
    tone: "info",
  },
  {
    id: "agent",
    label: "Torque activity",
    blurb: "What Torque handled on the front desk — quotes, bookings, replies.",
    tone: "brand",
  },
  {
    id: "social",
    label: "Social & reviews",
    blurb: "Facebook, Instagram and Google review activity worth a look.",
    tone: "success",
  },
  {
    id: "seo",
    label: "SEO & search",
    blurb: "Local search rankings, indexing and Illawarra keyword movement.",
    tone: "neutral",
  },
]

/** The notifications themselves — realistic Oak Flats Muffler Men traffic. */
export const NOTIFICATIONS: ReadonlyArray<InboxNotification> = [
  // ── Awaiting sign-off ──────────────────────────────────────────────────
  {
    id: "n-approval-1",
    group: "approval-pending",
    tone: "warn",
    kicker: "Publish · service page",
    title: "New “DPF-back systems” service page is ready to publish",
    excerpt:
      "Torque drafted a page for Ranger & Hilux DPF-back upgrades with pricing-from copy and three workshop photos. Review the diff before it goes live.",
    timestamp: "4 min ago",
    source: "mufflermen.com.au",
    unread: true,
    actions: [
      { label: "Review & publish", variant: "primary" },
      { label: "View diff", variant: "secondary" },
    ],
  },
  {
    id: "n-approval-2",
    group: "approval-pending",
    tone: "warn",
    kicker: "Customer email",
    title: "Quote reply to the 2019 Hilux 2.8L cat-back enquiry",
    excerpt:
      "A $1,592 cat-back quote with a Thursday 9am Bay 2 hold is queued to send. It mentions the ADR drive-by limit — your call before it leaves.",
    timestamp: "12 min ago",
    source: "Web chat · Dapto",
    unread: true,
    actions: [
      { label: "Approve send", variant: "primary" },
      { label: "Edit reply", variant: "secondary" },
    ],
  },
  {
    id: "n-approval-3",
    group: "approval-pending",
    tone: "error",
    kicker: "Warranty",
    title: "Warranty dispute escalated to Daz",
    excerpt:
      "A customer questioned a mid-pipe weld repair under warranty. Torque attached the full job history and is holding the reply for the owner.",
    timestamp: "38 min ago",
    source: "Escalation · OFM-2291",
    unread: true,
    actions: [{ label: "Open case", variant: "secondary" }],
  },

  // ── System & site ──────────────────────────────────────────────────────
  {
    id: "n-system-1",
    group: "system",
    tone: "success",
    kicker: "Backup",
    title: "Nightly site backup completed",
    excerpt:
      "Full backup of the public site and booking data finished at 02:14 — 318 MB stored, restore point verified.",
    timestamp: "Today · 02:14",
    source: "System · backups",
    unread: false,
  },
  {
    id: "n-system-2",
    group: "system",
    tone: "info",
    kicker: "Deploy",
    title: "Booking widget updated to v3.2",
    excerpt:
      "The Oak Flats online booking widget now offers Saturday morning slots. Change deployed and smoke-tested.",
    timestamp: "Yesterday · 17:40",
    source: "System · deploy",
    unread: true,
  },
  {
    id: "n-system-3",
    group: "system",
    tone: "warn",
    kicker: "Uptime",
    title: "Brief slowdown on the quote form",
    excerpt:
      "The quote form took over 3s to load for ~7 minutes around lunch. Recovered on its own; worth watching if it repeats.",
    timestamp: "Yesterday · 12:31",
    source: "System · monitoring",
    unread: false,
  },

  // ── Torque activity ─────────────────────────────────────────────────────
  {
    id: "n-agent-1",
    group: "agent",
    tone: "success",
    kicker: "Booking",
    title: "Booked a Commodore muffler swap into Bay 1",
    excerpt:
      "Confirmed Friday 11:30am for a VE Commodore rear muffler replacement. Reminder SMS scheduled for Thursday.",
    timestamp: "2 min ago",
    source: "Torque · bookings",
    unread: true,
  },
  {
    id: "n-agent-2",
    group: "agent",
    tone: "info",
    kicker: "Service reminders",
    title: "Sent an exhaust health-check reminder run",
    excerpt:
      "Nudged 14 regulars due for an exhaust check before the long-weekend road trips. 3 have already replied.",
    timestamp: "1 hr ago",
    source: "Torque · campaigns",
    unread: false,
  },
  {
    id: "n-agent-3",
    group: "agent",
    tone: "system",
    kicker: "Front desk",
    title: "Answered 11 enquiries while you were on the tools",
    excerpt:
      "Opening hours, fitment questions and two stainless fabrication leads. All logged, nothing needs you.",
    timestamp: "1 hr ago",
    source: "Torque · web chat",
    unread: false,
  },

  // ── Social & reviews ────────────────────────────────────────────────────
  {
    id: "n-social-1",
    group: "social",
    tone: "success",
    kicker: "Google review",
    title: "New 5-star Google review from a Shellharbour customer",
    excerpt:
      "“Quietened my Navara without losing the grunt — sorted same day.” Torque drafted a thank-you reply for your okay.",
    timestamp: "26 min ago",
    source: "Google Business · Oak Flats",
    unread: true,
    actions: [{ label: "Review reply", variant: "secondary" }],
  },
  {
    id: "n-social-2",
    group: "social",
    tone: "info",
    kicker: "Instagram",
    title: "Twin 2.5in stainless reel is performing",
    excerpt:
      "Your custom-fab reel hit 1,240 views and 38 saves — well above the page average. Good moment to post the follow-up.",
    timestamp: "3 hr ago",
    source: "Instagram · @oakflatsmufflermen",
    unread: false,
  },
  {
    id: "n-social-3",
    group: "social",
    tone: "warn",
    kicker: "Facebook",
    title: "Unanswered Facebook message about towbar fitment",
    excerpt:
      "A customer asked whether you fit towbars as well as exhausts. Torque can reply, but the answer is outside its trained scope.",
    timestamp: "5 hr ago",
    source: "Facebook · Page inbox",
    unread: true,
  },

  // ── SEO & search ────────────────────────────────────────────────────────
  {
    id: "n-seo-1",
    group: "seo",
    tone: "success",
    kicker: "Ranking",
    title: "“exhaust shop Oak Flats” moved to #1",
    excerpt:
      "You overtook the Wollongong listing for the main local term. The new DPF-back content is starting to pull its weight.",
    timestamp: "Today · 06:10",
    source: "Search · local pack",
    unread: true,
  },
  {
    id: "n-seo-2",
    group: "seo",
    tone: "info",
    kicker: "Indexing",
    title: "Albion Park service-area page indexed",
    excerpt:
      "The new Albion Park catchment page is now in Google's index and eligible to rank for nearby searches.",
    timestamp: "Yesterday · 09:22",
    source: "Search Console",
    unread: false,
  },
  {
    id: "n-seo-3",
    group: "seo",
    tone: "warn",
    kicker: "Opportunity",
    title: "Rising searches for “Ranger DPF delete legal NSW”",
    excerpt:
      "Local interest is climbing for compliance-safe Ranger work. A short explainer page could capture it — Torque can draft one.",
    timestamp: "2 days ago",
    source: "Search · keyword trends",
    unread: false,
  },
]

/** Header KPI strip — the figures that frame the owner's inbox at a glance. */
export const INBOX_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "unread",
    label: "Unread",
    value: "8",
    delta: { label: "3 need you", direction: "up" },
  },
  {
    id: "awaiting",
    label: "Awaiting sign-off",
    value: "3",
    delta: { label: "1 urgent", direction: "up" },
  },
  {
    id: "handled",
    label: "Auto-handled today",
    value: "11",
    delta: { label: "82%", direction: "up" },
  },
  {
    id: "groups",
    label: "Active lanes",
    value: "5",
    delta: { label: "All clear soon", direction: "flat" },
  },
]

/** Status chips shown in the hero band beside the Torque identity. */
export const INBOX_STATUS_CHIPS: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "warn", label: "3 awaiting you" },
  { tone: "success", label: "Site healthy" },
  { tone: "info", label: "All channels watched" },
]
