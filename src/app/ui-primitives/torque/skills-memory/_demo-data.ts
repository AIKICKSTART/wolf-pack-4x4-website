/**
 * Demo data for the Torque "Skills & memory" screen.
 *
 * Two surfaces, one fixture file:
 *   1. SKILLS — the installed Torque skills/tools the assistant can run, each
 *      with an enable toggle, a category, install scope and a last-used stamp.
 *   2. MEMORY FACTS — the knowledge facts the assistant has learned about the
 *      Oak Flats Muffler Men workshop, each with a source, a scope ACL and a
 *      confidence score.
 *
 * All copy is real Oak Flats Muffler Men marketing/workshop material (Illawarra
 * NSW — exhausts, mufflers, servicing, fabrication). Customer-facing identity is
 * "Torque", the Mufflermen business assistant. No customer-visible product
 * codename appears anywhere in this file.
 */

import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"
import type { ChipTone } from "../../components/primitives/chip"
import type { AvatarTone } from "../../components/primitives/avatar"
import type { ProgressRadialTone } from "../../components/primitives/progress-radial"
import type { ApiScopeAction } from "../../components/permissions/api-scope-chip"

/* ------------------------------------------------------------------ *
 * Business identity
 * ------------------------------------------------------------------ */

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW 2529"
export const ASSISTANT_NAME = "Torque"
export const ASSISTANT_ROLE = "Your Mufflermen business assistant"

/* ------------------------------------------------------------------ *
 * Skills catalog
 * ------------------------------------------------------------------ */

export type SkillCategory =
  | "workshop"
  | "marketing"
  | "bookings"
  | "quotes"
  | "knowledge"
  | "comms"

export type SkillState = "enabled" | "disabled" | "beta"

export interface TorqueSkill {
  readonly id: string
  /** Display name, e.g. "Exhaust quote builder". */
  readonly name: string
  /** Slugged tool id the runtime calls, e.g. "quotes.exhaust". */
  readonly toolId: string
  readonly category: SkillCategory
  /** One-line description of what the tool does for the shop. */
  readonly summary: string
  /** Whether the owner has the skill switched on. */
  readonly enabled: boolean
  /** Beta skills render an extra badge but are still toggleable. */
  readonly beta?: boolean
  /** Pre-formatted "last used" stamp, e.g. "12 min ago". */
  readonly lastUsed: string
  /** ISO timestamp for sort + the screen reader. */
  readonly lastUsedIso: string
  /** Times the skill has run this month. */
  readonly runsThisMonth: number
  /** Permission scopes the skill is granted, shown as ACL chips. */
  readonly scopes: ReadonlyArray<{ scope: string; description: string; action?: ApiScopeAction }>
}

export const SKILL_CATEGORY_LABEL: Readonly<Record<SkillCategory, string>> = {
  workshop: "Workshop",
  marketing: "Marketing",
  bookings: "Bookings",
  quotes: "Quotes",
  knowledge: "Knowledge",
  comms: "Comms",
}

export const SKILL_CATEGORY_TONE: Readonly<Record<SkillCategory, ChipTone>> = {
  workshop: "amber",
  marketing: "red",
  bookings: "teal",
  quotes: "green",
  knowledge: "neutral",
  comms: "teal",
}

export const SKILLS: ReadonlyArray<TorqueSkill> = [
  {
    id: "skill-quote-exhaust",
    name: "Exhaust quote builder",
    toolId: "quotes.exhaust",
    category: "quotes",
    summary:
      "Builds a fixed-price quote for a cat-back, mid-pipe or full system from the make, model and what the customer wants it to sound like.",
    enabled: true,
    lastUsed: "8 min ago",
    lastUsedIso: "2026-05-29T08:41:00+10:00",
    runsThisMonth: 142,
    scopes: [
      { scope: "quotes.write", description: "Draft and price exhaust quotes." },
      { scope: "vehicles.read", description: "Look up the customer's vehicle fitment." },
      { scope: "parts.read", description: "Read current parts and labour pricing." },
    ],
  },
  {
    id: "skill-booking",
    name: "Workshop booking",
    toolId: "bookings.create",
    category: "bookings",
    summary:
      "Takes a customer's preferred day, checks the four-bay diary and locks in a muffler, exhaust-fit or rego-check slot.",
    enabled: true,
    lastUsed: "31 min ago",
    lastUsedIso: "2026-05-29T08:18:00+10:00",
    runsThisMonth: 268,
    scopes: [
      { scope: "bookings.write", description: "Create and reschedule workshop bookings." },
      { scope: "calendar.read", description: "Read bay availability across the four bays." },
    ],
  },
  {
    id: "skill-service-reminder",
    name: "Service reminder",
    toolId: "comms.reminder",
    category: "comms",
    summary:
      "Texts regulars when their logbook service or pink-slip inspection is due, with a one-tap link back to the booking page.",
    enabled: true,
    lastUsed: "2 h ago",
    lastUsedIso: "2026-05-29T06:55:00+10:00",
    runsThisMonth: 96,
    scopes: [
      { scope: "customers.read", description: "Read the customer's service history." },
      { scope: "messaging.send", description: "Send SMS and email reminders." },
    ],
  },
  {
    id: "skill-social-post",
    name: "Social post writer",
    toolId: "marketing.social",
    category: "marketing",
    summary:
      "Drafts on-brand Facebook and Instagram posts about a finished job, a stainless fabrication or a weekend special.",
    enabled: true,
    lastUsed: "Yesterday",
    lastUsedIso: "2026-05-28T16:20:00+10:00",
    runsThisMonth: 54,
    scopes: [
      { scope: "media.read", description: "Pull workshop photos from the media library." },
      { scope: "social.write", description: "Draft posts for the owner to approve." },
    ],
  },
  {
    id: "skill-diagnose",
    name: "Noise diagnosis helper",
    toolId: "workshop.diagnose",
    category: "workshop",
    summary:
      "Turns a customer's description of a rattle, drone or blow into the likely cause and the parts a bay tech should check first.",
    enabled: true,
    lastUsed: "14 min ago",
    lastUsedIso: "2026-05-29T08:35:00+10:00",
    runsThisMonth: 73,
    scopes: [
      { scope: "vehicles.read", description: "Match symptoms to common faults by model." },
      { scope: "knowledge.read", description: "Read the workshop knowledge base." },
    ],
  },
  {
    id: "skill-fab-spec",
    name: "Fabrication spec sheet",
    toolId: "workshop.fabrication",
    category: "workshop",
    summary:
      "Captures a mandrel-bent stainless job — pipe diameter, bends and tip — into a spec sheet for the fabrication bay.",
    enabled: true,
    beta: true,
    lastUsed: "3 days ago",
    lastUsedIso: "2026-05-26T11:10:00+10:00",
    runsThisMonth: 19,
    scopes: [
      { scope: "parts.read", description: "Read stainless stock and tip catalogue." },
      { scope: "jobs.write", description: "Open a fabrication job card." },
    ],
  },
  {
    id: "skill-review-reply",
    name: "Review reply drafter",
    toolId: "marketing.reviews",
    category: "marketing",
    summary:
      "Writes a warm, specific reply to a new Google review — thanking the customer and mentioning the work that was done.",
    enabled: false,
    lastUsed: "1 week ago",
    lastUsedIso: "2026-05-22T09:30:00+10:00",
    runsThisMonth: 7,
    scopes: [
      { scope: "reviews.read", description: "Read incoming Google reviews." },
      { scope: "reviews.write", description: "Draft replies for owner approval." },
    ],
  },
  {
    id: "skill-rego-check",
    name: "Pink-slip lookup",
    toolId: "knowledge.rego",
    category: "knowledge",
    summary:
      "Answers what an NSW pink slip (eSafety inspection) covers and whether the shop's exhaust work keeps a car compliant.",
    enabled: true,
    lastUsed: "5 h ago",
    lastUsedIso: "2026-05-29T03:50:00+10:00",
    runsThisMonth: 38,
    scopes: [{ scope: "knowledge.read", description: "Read compliance and pricing knowledge." }],
  },
  {
    id: "skill-parts-order",
    name: "Parts re-order",
    toolId: "workshop.parts",
    category: "workshop",
    summary:
      "Flags when mufflers, clamps or aluminised tube are running low and drafts a supplier order for the owner to send.",
    enabled: false,
    beta: true,
    lastUsed: "Never",
    lastUsedIso: "2026-05-01T00:00:00+10:00",
    runsThisMonth: 0,
    scopes: [
      { scope: "parts.read", description: "Read current stock levels." },
      { scope: "suppliers.write", description: "Draft re-order requests." },
    ],
  },
  {
    id: "skill-followup",
    name: "Quote follow-up",
    toolId: "comms.followup",
    category: "comms",
    summary:
      "Checks back with customers who got a quote but haven't booked, with a friendly nudge and the price still locked in.",
    enabled: true,
    lastUsed: "1 h ago",
    lastUsedIso: "2026-05-29T07:40:00+10:00",
    runsThisMonth: 61,
    scopes: [
      { scope: "quotes.read", description: "Read open quotes and their age." },
      { scope: "messaging.send", description: "Send the follow-up message." },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Memory facts
 * ------------------------------------------------------------------ */

export type FactSourceKind = "owner" | "job" | "review" | "website" | "system"

export type FactScope = "private" | "team" | "public"

export interface MemoryFactSource {
  readonly kind: FactSourceKind
  /** Where the fact came from, e.g. "Owner — Daniel" or "Job #4821". */
  readonly label: string
  readonly avatarTone: AvatarTone
}

export interface MemoryFact {
  readonly id: string
  /** The learned statement, written as the assistant would store it. */
  readonly statement: string
  /** Short topic tag, e.g. "Pricing" or "Hours". */
  readonly topic: string
  readonly source: MemoryFactSource
  /** Who can read this fact. */
  readonly scope: FactScope
  /** 0–100 confidence the assistant holds in the fact. */
  readonly confidence: number
  /** Pre-formatted last-confirmed stamp. */
  readonly confirmed: string
  /** ISO date for sort + the screen reader. */
  readonly confirmedIso: string
}

export const FACT_SCOPE_LABEL: Readonly<Record<FactScope, string>> = {
  private: "Owner only",
  team: "Bay crew",
  public: "Customer-facing",
}

export const FACT_SCOPE_TONE: Readonly<Record<FactScope, StatusBadgeTone>> = {
  private: "warn",
  team: "info",
  public: "success",
}

/** The scope an ACL action chip maps a fact scope to. */
export const FACT_SCOPE_ACTION: Readonly<Record<FactScope, ApiScopeAction>> = {
  private: "admin",
  team: "write",
  public: "read",
}

export const FACT_SOURCE_LABEL: Readonly<Record<FactSourceKind, string>> = {
  owner: "Owner",
  job: "Job card",
  review: "Review",
  website: "Website",
  system: "System",
}

export function confidenceTone(confidence: number): ProgressRadialTone {
  if (confidence >= 85) return "green"
  if (confidence >= 65) return "teal"
  if (confidence >= 45) return "amber"
  return "red"
}

export const MEMORY_FACTS: ReadonlyArray<MemoryFact> = [
  {
    id: "fact-hours",
    statement:
      "The workshop is open Monday to Friday 8am–5pm and Saturday 8am–noon. Closed Sundays and public holidays.",
    topic: "Hours",
    source: { kind: "owner", label: "Owner — Daniel", avatarTone: "red" },
    scope: "public",
    confidence: 99,
    confirmed: "Confirmed today",
    confirmedIso: "2026-05-29T08:00:00+10:00",
  },
  {
    id: "fact-cat-back-price",
    statement:
      "A stainless cat-back system for a Hilux is quoted from $1,150 fitted, including a mandrel-bent mid-pipe and a polished tip.",
    topic: "Pricing",
    source: { kind: "job", label: "Job #4821", avatarTone: "amber" },
    scope: "team",
    confidence: 78,
    confirmed: "Confirmed 3 days ago",
    confirmedIso: "2026-05-26T10:00:00+10:00",
  },
  {
    id: "fact-fabrication",
    statement:
      "All exhaust fabrication is done in-house on a mandrel bender — no off-the-shelf only, custom stainless and aluminised systems are built on site.",
    topic: "Capability",
    source: { kind: "website", label: "Service page", avatarTone: "teal" },
    scope: "public",
    confidence: 96,
    confirmed: "Confirmed last week",
    confirmedIso: "2026-05-22T14:00:00+10:00",
  },
  {
    id: "fact-pink-slip",
    statement:
      "The shop is an authorised NSW inspection station and can do pink-slip (eSafety) checks while a car is in for exhaust work.",
    topic: "Compliance",
    source: { kind: "owner", label: "Owner — Daniel", avatarTone: "red" },
    scope: "public",
    confidence: 92,
    confirmed: "Confirmed today",
    confirmedIso: "2026-05-29T07:30:00+10:00",
  },
  {
    id: "fact-drone-fix",
    statement:
      "Highway drone on a fitted cat-back is usually fixed by adding a resonator to the mid-pipe rather than swapping the muffler.",
    topic: "Diagnosis",
    source: { kind: "job", label: "Job #4790", avatarTone: "amber" },
    scope: "team",
    confidence: 71,
    confirmed: "Confirmed 5 days ago",
    confirmedIso: "2026-05-24T09:15:00+10:00",
  },
  {
    id: "fact-warranty",
    statement:
      "Stainless systems fabricated by the shop carry a lifetime warranty against rust-through; mild-steel work is 12 months.",
    topic: "Warranty",
    source: { kind: "owner", label: "Owner — Daniel", avatarTone: "red" },
    scope: "public",
    confidence: 88,
    confirmed: "Confirmed last week",
    confirmedIso: "2026-05-21T11:00:00+10:00",
  },
  {
    id: "fact-reviews",
    statement:
      "Customers most often praise the quiet, deep tone on diesel utes and the tidy welds — worth mentioning in marketing copy.",
    topic: "Reputation",
    source: { kind: "review", label: "Google reviews", avatarTone: "green" },
    scope: "team",
    confidence: 64,
    confirmed: "Updated yesterday",
    confirmedIso: "2026-05-28T15:00:00+10:00",
  },
  {
    id: "fact-supplier-pricing",
    statement:
      "The trade margin on the main muffler supplier's list is treated as owner-only and must never be quoted to a customer.",
    topic: "Pricing",
    source: { kind: "system", label: "Pricing policy", avatarTone: "obsidian" },
    scope: "private",
    confidence: 100,
    confirmed: "Policy — locked",
    confirmedIso: "2026-05-01T00:00:00+10:00",
  },
  {
    id: "fact-turnaround",
    statement:
      "A standard cat-back fit is a same-day job; a full custom fabrication is usually one to two working days.",
    topic: "Turnaround",
    source: { kind: "website", label: "Service page", avatarTone: "teal" },
    scope: "public",
    confidence: 85,
    confirmed: "Confirmed last week",
    confirmedIso: "2026-05-23T13:00:00+10:00",
  },
  {
    id: "fact-loaner",
    statement:
      "There is no loan car; locals are pointed to the Oak Flats train station a short walk away if they need to head off.",
    topic: "Logistics",
    source: { kind: "owner", label: "Owner — Daniel", avatarTone: "red" },
    scope: "team",
    confidence: 58,
    confirmed: "Needs re-check",
    confirmedIso: "2026-05-18T10:00:00+10:00",
  },
]

/* ------------------------------------------------------------------ *
 * Header glance metrics (derived snapshots, pre-formatted)
 * ------------------------------------------------------------------ */

export interface GlanceStat {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly unit?: string
  readonly delta?: string
  readonly direction?: "up" | "down" | "flat"
  readonly tone: "red" | "amber" | "teal" | "green" | "neutral"
}

export const GLANCE_STATS: ReadonlyArray<GlanceStat> = [
  {
    id: "skills-on",
    label: "Skills enabled",
    value: "7",
    unit: "/ 10",
    delta: "+1",
    direction: "up",
    tone: "green",
  },
  {
    id: "runs",
    label: "Skill runs · month",
    value: "758",
    delta: "+12%",
    direction: "up",
    tone: "teal",
  },
  {
    id: "facts",
    label: "Memory facts",
    value: "10",
    delta: "+3",
    direction: "up",
    tone: "amber",
  },
  {
    id: "confidence",
    label: "Avg confidence",
    value: "83",
    unit: "%",
    delta: "+4",
    direction: "up",
    tone: "green",
  },
]
