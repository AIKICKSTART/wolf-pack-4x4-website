/**
 * Demo fixtures for the Torque "Approval gate" screen.
 *
 * Torque is the Oak Flats Muffler Men business assistant. Before it does
 * anything sensitive on the owner's behalf — publish a website page, fire a
 * customer email blast, or deploy a site change — it parks the action here for
 * a one-tap human decision. Australian English, Illawarra NSW tradie register.
 *
 * Dev note: the underlying agent runtime is the Hermes control plane, but no
 * "Hermes" string is ever surfaced to the operator — customer-facing identity
 * is "Torque".
 */

import type { DiffLine } from "../../components/code-diff"
import type {
  EscalationQueueItem,
  HermesPriority,
} from "../../components/hermes-agent"
import type { StatusBadgeTone } from "../../components/data-display"

/** A pending Torque action awaiting the owner's approval. */
export type ActionKind = "publish-post" | "send-email" | "deploy"

/** A single risk flag Torque raised against an action. */
export interface RiskFlag {
  id: string
  /** Severity drives tone + ordering. */
  severity: "high" | "medium" | "low"
  label: string
  detail: string
}

/** A row in the preview / impact summary list. */
export interface PreviewStat {
  label: string
  value: string
  /** Optional tone for the value chip. */
  tone?: StatusBadgeTone
}

/** A full sensitive action queued for approval. */
export interface PendingApproval {
  id: string
  kind: ActionKind
  /** Short headline shown in the queue + detail header. */
  title: string
  /** One-line plain-English summary of what Torque wants to do. */
  summary: string
  /** Who/what Torque proposes to act on. */
  target: string
  /** When Torque drafted the action. */
  requestedLabel: string
  /** Priority lane, reused by the escalation-queue primitive. */
  priority: HermesPriority
  /** Confidence Torque has in the draft (0..100). */
  confidence: number
  /** Risk flags, highest severity first. */
  risks: ReadonlyArray<RiskFlag>
  /** Preview / impact figures. */
  stats: ReadonlyArray<PreviewStat>
  /** Rendered preview body (post copy, email body, or change notes). */
  previewLabel: string
  previewBody: ReadonlyArray<string>
  /** Unified diff lines (what changes vs what's live now). */
  diffPath: string
  diffRef: string
  diff: ReadonlyArray<DiffLine>
  /** Insertions / deletions / files for the diff stats bar. */
  diffStats: { insertions: number; deletions: number; filesChanged: number }
  /** Phrase the owner must type/confirm to approve (high-risk only). */
  confirmPhrase?: string
}

const ACTION_KIND_LABEL: Record<ActionKind, string> = {
  "publish-post": "Publish post",
  "send-email": "Send email",
  deploy: "Deploy",
}

const ACTION_KIND_TONE: Record<ActionKind, StatusBadgeTone> = {
  "publish-post": "info",
  "send-email": "brand",
  deploy: "warn",
}

export function actionKindLabel(kind: ActionKind): string {
  return ACTION_KIND_LABEL[kind]
}

export function actionKindTone(kind: ActionKind): StatusBadgeTone {
  return ACTION_KIND_TONE[kind]
}

// ── Pending approvals ──────────────────────────────────────────────────────

const SEND_EMAIL: PendingApproval = {
  id: "act_4821",
  kind: "send-email",
  title: "Winter exhaust health-check EDM",
  summary:
    "Send the 'Beat the winter rattle' offer email to the Servicing Regulars segment.",
  target: "1,284 customers · Servicing Regulars (opted-in)",
  requestedLabel: "Drafted by Torque · 9:41 am",
  priority: "p1-critical",
  confidence: 82,
  risks: [
    {
      id: "r1",
      severity: "high",
      label: "Large send to a live list",
      detail:
        "1,284 recipients. Sends can't be recalled once away. Suppression list applied (38 unsubscribes held back).",
    },
    {
      id: "r2",
      severity: "medium",
      label: "Offer expiry inside 7 days",
      detail:
        "Coupon WINTER25 expires 30 Jun. Tight window for a regional list — expect call volume Mon–Tue.",
    },
    {
      id: "r3",
      severity: "low",
      label: "Reply-to is the shared inbox",
      detail: "Replies route to bookings@mufflermen.com.au, not a personal address.",
    },
  ],
  stats: [
    { label: "Recipients", value: "1,284", tone: "info" },
    { label: "Held (unsub)", value: "38", tone: "neutral" },
    { label: "Est. open rate", value: "41%", tone: "success" },
    { label: "Coupon", value: "WINTER25", tone: "brand" },
  ],
  previewLabel: "Email · subject + body preview",
  previewBody: [
    "Subject: Beat the winter rattle — $25 off your exhaust health check",
    "",
    "G'day {{first_name}},",
    "",
    "Cold mornings are rough on exhausts. A blown gasket or a tired muffler only gets louder (and dearer) the longer it's left.",
    "",
    "Book your exhaust health check at Oak Flats Muffler Men before 30 June and we'll knock $25 off with code WINTER25 — free visual on the cat, mounts and joins while you wait.",
    "",
    "Bays book out fast in the Illawarra cold snap, so grab a slot early.",
  ],
  diffPath: "campaigns/winter-exhaust-edm.yaml",
  diffRef: "draft → live",
  diff: [
    { kind: "meta", text: "@@ campaign config @@" },
    { kind: "context", oldLineNumber: 1, newLineNumber: 1, text: "segment: servicing-regulars" },
    { kind: "removed", oldLineNumber: 2, text: "status: draft" },
    { kind: "added", newLineNumber: 2, text: "status: scheduled" },
    { kind: "removed", oldLineNumber: 3, text: "recipients: 0" },
    { kind: "added", newLineNumber: 3, text: "recipients: 1284" },
    { kind: "context", oldLineNumber: 4, newLineNumber: 4, text: "coupon: WINTER25" },
    { kind: "added", newLineNumber: 5, text: "send_at: 2026-05-29T11:00:00+10:00" },
  ],
  diffStats: { insertions: 4, deletions: 2, filesChanged: 1 },
  confirmPhrase: "SEND 1284",
}

const PUBLISH_POST: PendingApproval = {
  id: "act_4819",
  kind: "publish-post",
  title: "New service page · DPF cleaning Illawarra",
  summary:
    "Publish the 'Diesel particulate filter (DPF) cleaning' service page to mufflermen.com.au.",
  target: "mufflermen.com.au/services/dpf-cleaning",
  requestedLabel: "Drafted by Torque · 8:58 am",
  priority: "p2-high",
  confidence: 91,
  risks: [
    {
      id: "r1",
      severity: "medium",
      label: "New public URL goes live",
      detail:
        "Adds a page to the live site and the sitemap. Internal links from the Servicing menu are wired up.",
    },
    {
      id: "r2",
      severity: "low",
      label: "Price stated on page",
      detail: "Lists 'from $290'. Confirm this matches the current DPF clean rate before publishing.",
    },
  ],
  stats: [
    { label: "Word count", value: "612", tone: "neutral" },
    { label: "Images", value: "3", tone: "neutral" },
    { label: "SEO score", value: "94", tone: "success" },
    { label: "From price", value: "$290", tone: "warn" },
  ],
  previewLabel: "Page · above-the-fold preview",
  previewBody: [
    "DPF cleaning in the Illawarra — from $290",
    "",
    "Clogged diesel particulate filter throwing limp-mode and dash lights? Oak Flats Muffler Men runs a full off-car DPF bake-and-flush that clears the soot a regen can't.",
    "",
    "We service utes, 4WDs and light commercials across Oak Flats, Shellharbour and Wollongong — most jobs turned around same day.",
  ],
  diffPath: "content/services/dpf-cleaning.mdx",
  diffRef: "+ new page",
  diff: [
    { kind: "meta", text: "@@ new file: dpf-cleaning.mdx @@" },
    { kind: "added", newLineNumber: 1, text: '---' },
    { kind: "added", newLineNumber: 2, text: 'title: "DPF cleaning Illawarra"' },
    { kind: "added", newLineNumber: 3, text: "status: published" },
    { kind: "added", newLineNumber: 4, text: "priceFrom: 290" },
    { kind: "added", newLineNumber: 5, text: "---" },
    { kind: "context", oldLineNumber: 6, newLineNumber: 6, text: "<ServiceHero region=\"Illawarra\" />" },
  ],
  diffStats: { insertions: 5, deletions: 0, filesChanged: 1 },
}

const DEPLOY: PendingApproval = {
  id: "act_4817",
  kind: "deploy",
  title: "Deploy booking-widget hotfix",
  summary:
    "Deploy the Saturday-hours fix for the online booking widget to production.",
  target: "Production · mufflermen.com.au",
  requestedLabel: "Drafted by Torque · 8:12 am",
  priority: "p2-high",
  confidence: 88,
  risks: [
    {
      id: "r1",
      severity: "high",
      label: "Production deploy during open hours",
      detail:
        "Brief booking-widget reload while live. Rollback is one tap if takings drop. 3 active carts right now.",
    },
    {
      id: "r2",
      severity: "low",
      label: "Touches checkout path",
      detail: "Change is in availability logic only — payment + Stripe flow untouched.",
    },
  ],
  stats: [
    { label: "Files", value: "1", tone: "neutral" },
    { label: "Active carts", value: "3", tone: "warn" },
    { label: "Build", value: "passing", tone: "success" },
    { label: "Rollback", value: "1-tap", tone: "info" },
  ],
  previewLabel: "Change · plain-English summary",
  previewBody: [
    "Fixes Saturday slots showing as closed after 12pm.",
    "",
    "The booking widget was reading weekday hours for Saturday. This change reads the Saturday block (8:00–12:00) so customers stop seeing 'no slots' on Saturday mornings.",
    "",
    "No data migration. Affects the availability check only.",
  ],
  diffPath: "lib/booking/availability.ts",
  diffRef: "fix/sat-hours",
  diff: [
    { kind: "meta", text: "@@ -41,7 +41,7 @@ resolveHours(day)" },
    { kind: "context", oldLineNumber: 41, newLineNumber: 41, text: "  const day = slot.getDay()" },
    { kind: "removed", oldLineNumber: 42, text: "  if (day === 6) return WEEKDAY_HOURS" },
    { kind: "added", newLineNumber: 42, text: "  if (day === 6) return SATURDAY_HOURS" },
    { kind: "context", oldLineNumber: 43, newLineNumber: 43, text: "  if (day === 0) return CLOSED" },
    { kind: "context", oldLineNumber: 44, newLineNumber: 44, text: "  return WEEKDAY_HOURS" },
  ],
  diffStats: { insertions: 1, deletions: 1, filesChanged: 1 },
  confirmPhrase: "DEPLOY PROD",
}

export const PENDING_APPROVALS: ReadonlyArray<PendingApproval> = [
  SEND_EMAIL,
  PUBLISH_POST,
  DEPLOY,
]

// ── Escalation queue rows (reuse the hermes-agent EscalationQueueItem) ───────
// Surfaces the pending actions as a priority-sorted "needs you" lane. Handler
// label is deliberately the owner — these are decisions only a human makes.

export const APPROVAL_QUEUE_ITEMS: ReadonlyArray<EscalationQueueItem> = [
  {
    id: SEND_EMAIL.id,
    subject: SEND_EMAIL.title,
    priority: SEND_EMAIL.priority,
    reason: "Email blast > 1,000 recipients · needs sign-off",
    handlerName: "Daniel F.",
    handlerRole: "Owner · approver",
    waitSeconds: 372,
  },
  {
    id: DEPLOY.id,
    subject: DEPLOY.title,
    priority: DEPLOY.priority,
    reason: "Production deploy in open hours",
    handlerName: "Daniel F.",
    handlerRole: "Owner · approver",
    waitSeconds: 1980,
  },
  {
    id: PUBLISH_POST.id,
    subject: PUBLISH_POST.title,
    priority: PUBLISH_POST.priority,
    reason: "New public page + price on site",
    handlerName: "Daniel F.",
    handlerRole: "Owner · approver",
    waitSeconds: 2640,
  },
]

export const APPROVAL_QUEUE_COUNTS = {
  open: 3,
  breached: 0,
  resolved24h: 11,
} as const
