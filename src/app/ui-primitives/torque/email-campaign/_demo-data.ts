import type {
  BlockPaletteSection,
  EmailBlock,
  PersonalizationToken,
  SpamWarning,
  TestEmailRecipient,
} from "../../components/email-builder"
import type {
  DigestArticle,
  DigestStat,
} from "../../components/emails"
import type { ApprovalStage } from "../../components/social-scheduler"
import type { MediaTrayItem } from "../../components/data-display"
import type { StatTileTone } from "../../components/primitives/stat-tile"

/**
 * Demo data for the Torque "Email campaign composer" screen.
 * A single real Oak Flats Muffler Men winter newsletter/promo campaign — block
 * email body, audience segment, deliverability hints and an owner approval gate.
 *
 * NOTE (dev only): the underlying agent runtime is internally codenamed Hermes;
 * customer-facing copy uses "Torque" exclusively.
 */

/** From-line + recipient metadata used by the canvas + preview chrome. */
export const FROM_LINE = "Oak Flats Mufflermen <hello@mufflermen.com.au>"
export const PREVIEW_TO = "Illawarra workshop list · 1,284 subscribers"

/** The subject + preheader Torque drafted for the winter campaign. */
export const CAMPAIGN_SUBJECT =
  "Winter exhaust special — $200 off any cat-back fitted before 30 June"
export const CAMPAIGN_PREHEADER =
  "Mandrel-bent stainless, TIG-welded in our Oak Flats bay. Book the hoist before the cold snap."

/** Block-based email body — the ordered rows shown in the build canvas. */
export const EMAIL_BLOCKS: ReadonlyArray<EmailBlock> = [
  {
    id: "blk-hero",
    kind: "image",
    label: "Hero image · quad tips",
    preview: "Polished stainless quad tips on a Ranger PX — 600px wide.",
  },
  {
    id: "blk-heading",
    kind: "heading",
    label: "Heading",
    preview: "Winter cat-back special — $200 off, fitted before 30 June.",
  },
  {
    id: "blk-intro",
    kind: "personalization",
    label: "Greeting · merge token",
    preview: "Hi {{customer.first_name}}, the cold months are the right time…",
  },
  {
    id: "blk-spotlight",
    kind: "columns-2",
    label: "Two columns · system + warranty",
    preview: "Hand-rolled stainless · lifetime workmanship warranty.",
  },
  {
    id: "blk-cta",
    kind: "button",
    label: "Button · Book the bay",
    preview: "Book your fit-out → mufflermen.com.au/book",
  },
  {
    id: "blk-social",
    kind: "social-row",
    label: "Social row",
    preview: "Facebook · Instagram · YouTube",
  },
  {
    id: "blk-footer",
    kind: "footer",
    label: "Compliance footer",
    preview: "Address · unsubscribe · privacy",
  },
]

/** Drag-from block palette grouped by purpose. */
export const BLOCK_PALETTE_SECTIONS: ReadonlyArray<BlockPaletteSection> = [
  {
    id: "pal-content",
    title: "Content",
    items: [
      { kind: "heading", name: "Heading", hint: "Section title" },
      { kind: "image", name: "Image", hint: "Hero or inline shot" },
      { kind: "button", name: "Button", hint: "Booking CTA" },
      { kind: "personalization", name: "Merge token", hint: "First name, rego" },
    ],
  },
  {
    id: "pal-layout",
    title: "Layout",
    items: [
      { kind: "columns-2", name: "Two columns", hint: "Split copy" },
      { kind: "columns-3", name: "Three columns", hint: "Feature trio" },
      { kind: "divider", name: "Divider", hint: "Hairline rule" },
      { kind: "spacer", name: "Spacer", hint: "Vertical gap" },
    ],
  },
  {
    id: "pal-footer",
    title: "Footer & advanced",
    items: [
      { kind: "social-row", name: "Social row", hint: "Channel icons" },
      { kind: "footer", name: "Footer", hint: "Address + unsubscribe" },
      { kind: "html", name: "Custom HTML", hint: "Raw markup" },
    ],
  },
]

/** Merge tokens available to the campaign. */
export const PERSONALIZATION_TOKENS: ReadonlyArray<PersonalizationToken> = [
  {
    token: "{{customer.first_name}}",
    label: "Customer first name",
    sample: "Daniel",
    group: "Customer",
  },
  {
    token: "{{vehicle.rego}}",
    label: "Vehicle registration",
    sample: "CV-42-RT",
    group: "Vehicle",
  },
  {
    token: "{{vehicle.make_model}}",
    label: "Make & model",
    sample: "Ford Ranger PX",
    group: "Vehicle",
  },
  {
    token: "{{quote.total}}",
    label: "Last quote total",
    sample: "$1,480",
    group: "Quote",
  },
  {
    token: "{{service.last_date}}",
    label: "Last service date",
    sample: "12 Mar 2026",
    group: "Service",
  },
]

/** Rendered newsletter highlight stats (EmailMonthlyDigest). */
export const DIGEST_STATS: ReadonlyArray<DigestStat> = [
  { label: "Cat-backs fitted", value: "37", delta: "+9 on May" },
  { label: "Avg fit-out time", value: "3.2h", delta: "−18 min" },
  { label: "5-star reviews", value: "26", delta: "+11 this month" },
  { label: "Bays booked", value: "92%", delta: "Winter rush" },
]

/** Rendered newsletter article links (EmailMonthlyDigest). */
export const DIGEST_ARTICLES: ReadonlyArray<DigestArticle> = [
  {
    title: "Why a deeper note doesn't mean a louder ute",
    blurb:
      "Tuning a cat-back for tone without crossing the road-legal line — what we actually measure on the dyno.",
    url: "https://mufflermen.com.au/journal/deeper-note-road-legal",
    tag: "Workshop",
  },
  {
    title: "Stainless vs aluminised: the 10-year question",
    blurb:
      "Why every system we hand-roll is 409 or 304 stainless, and what that buys you in an Illawarra winter.",
    url: "https://mufflermen.com.au/journal/stainless-vs-aluminised",
    tag: "Parts",
  },
  {
    title: "Ranger PX cat-back — start to finish in the bay",
    blurb:
      "A full mandrel-bent, TIG-welded fit-out, photographed on the hoist from first cut to twin tips.",
    url: "https://mufflermen.com.au/journal/ranger-px-catback",
    tag: "Build",
  },
]

/** Spam / deliverability warnings surfaced for this campaign. */
export const SPAM_SCORE = 2.4
export const SPAM_BODY_EXCERPT =
  "Winter cat-back special — $200 off, fitted before 30 June. Hand-rolled stainless, dyno-tuned, booked the same week."
export const SPAM_WARNINGS: ReadonlyArray<SpamWarning> = [
  {
    id: "spam-dollar",
    message: "Subject uses a dollar amount — fine here, but avoid stacking \"$$$\".",
    severity: "low",
  },
  {
    id: "spam-deadline",
    message: "\"before 30 June\" reads as urgency — keep it factual, not hyped.",
    severity: "low",
  },
  {
    id: "spam-image",
    message: "Hero image is heavy vs text — add alt text and a plain-text part.",
    severity: "medium",
  },
]

/** Deliverability hints shown beside the spam score. */
export interface DeliverabilityHint {
  id: string
  label: string
  state: "pass" | "warn"
  detail: string
}

export const DELIVERABILITY_HINTS: ReadonlyArray<DeliverabilityHint> = [
  {
    id: "dl-spf",
    label: "SPF · DKIM · DMARC",
    state: "pass",
    detail: "All three aligned for mufflermen.com.au — authenticated send.",
  },
  {
    id: "dl-text",
    label: "Plain-text part",
    state: "pass",
    detail: "Multipart MIME generated — image-only fallback covered.",
  },
  {
    id: "dl-ratio",
    label: "Image-to-text ratio",
    state: "warn",
    detail: "60/40 image-heavy — one more copy block would steady inboxing.",
  },
  {
    id: "dl-unsub",
    label: "One-click unsubscribe",
    state: "pass",
    detail: "List-Unsubscribe header present — required for bulk send.",
  },
]

/**
 * Audience segments the campaign can target. The first is the chosen segment.
 */
export interface AudienceSegment {
  id: string
  name: string
  description: string
  recipients: number
  selected: boolean
}

export const AUDIENCE_SEGMENTS: ReadonlyArray<AudienceSegment> = [
  {
    id: "seg-illawarra-4wd",
    name: "Illawarra 4WD & ute owners",
    description: "Opted-in, within 40km of Oak Flats, ute/4WD on file.",
    recipients: 642,
    selected: true,
  },
  {
    id: "seg-past-customers",
    name: "Past exhaust customers",
    description: "Had a system fitted in the last 3 years — repeat-fit prospects.",
    recipients: 408,
    selected: false,
  },
  {
    id: "seg-newsletter-all",
    name: "Full newsletter list",
    description: "Everyone opted in to workshop news — broadest reach.",
    recipients: 1_284,
    selected: false,
  },
]

/** Brand media curated for the campaign (data-display MediaTray). */
export const CAMPAIGN_MEDIA: ReadonlyArray<MediaTrayItem> = [
  {
    id: "cm-quad-tips",
    title: "Polished quad tips — hero",
    meta: "600×750 · 2.1 MB · hero block",
    tag: "Hero",
    src: "/media/generated/gallery-polished-quad-tips.webp",
  },
  {
    id: "cm-tig-macro",
    title: "TIG weld macro — detail",
    meta: "600×600 · 1.6 MB · two-column",
    tag: "Detail",
    src: "/media/generated/gallery-tig-weld-macro.webp",
  },
  {
    id: "cm-mandrel",
    title: "Mandrel bender — bay action",
    meta: "600×338 · 2.4 MB · inline",
    tag: "B-roll",
    src: "/media/generated/gallery-mandrel-bender-workshop.webp",
  },
  {
    id: "cm-hoist",
    title: "Hoist + cat-back fit",
    meta: "600×450 · 1.9 MB · inline",
    tag: "Bay",
    src: "/media/cinematic/workshop-hoist-exhaust.webp",
  },
  {
    id: "cm-product",
    title: "Stainless system — studio macro",
    meta: "600×400 · 1.4 MB · catalogue",
    tag: "Product",
    src: "/media/cinematic/exhaust-product-macro.webp",
  },
]

/** Test-send recipients (email-builder SendTestEmailCard). */
export const TEST_RECIPIENTS: ReadonlyArray<TestEmailRecipient> = [
  { email: "daniel@mufflermen.com.au", label: "Owner" },
  { email: "front-desk@mufflermen.com.au", label: "Front desk" },
]

export const TEST_VARIANTS: ReadonlyArray<string> = [
  "A — current draft",
  "B — savings-first subject",
  "C — local-trust angle",
]

/** Owner approval-before-send workflow stages. */
export const APPROVAL_STAGES: ReadonlyArray<ApprovalStage> = [
  {
    id: "ap-draft",
    label: "Torque draft",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-05-29T08:02:00+10:00",
    note: "Block body, subject + preheader and audience segment drafted from the live winter promo.",
  },
  {
    id: "ap-deliver",
    label: "Deliverability check",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-05-29T08:04:00+10:00",
    note: "Spam score 2.4/10. One note on image-to-text ratio.",
  },
  {
    id: "ap-owner",
    label: "Owner sign-off",
    owner: "Daniel (owner)",
    state: "current",
    note: "Awaiting one-tap approval before the campaign sends to 642 Illawarra 4WD & ute owners.",
  },
  {
    id: "ap-send",
    label: "Scheduled send",
    owner: "Torque queue",
    state: "pending",
  },
]

/** Headline readiness figures for the composer stat row. */
export interface ComposerStat {
  id: string
  label: string
  value: string
  unit?: string
  tone: StatTileTone
  caption: string
}

export const COMPOSER_STATS: ReadonlyArray<ComposerStat> = [
  {
    id: "cs-audience",
    label: "Audience selected",
    value: "642",
    unit: "recipients",
    tone: "teal",
    caption: "Illawarra 4WD & ute owners, opted in",
  },
  {
    id: "cs-spam",
    label: "Spam score",
    value: "2.4",
    unit: "/ 10",
    tone: "green",
    caption: "Pristine — authenticated send",
  },
  {
    id: "cs-blocks",
    label: "Body blocks",
    value: "7",
    unit: "blocks",
    tone: "amber",
    caption: "Hero, copy, CTA, footer composed",
  },
  {
    id: "cs-send",
    label: "Send window",
    value: "7:30",
    unit: "am",
    tone: "red",
    caption: "Tradies' pre-shift read, Thu 5 Jun",
  },
]

export const SEND_TIME = "Thu 5 Jun · 7:30 am AEST"
export const SEND_TIMEZONE = "Send-time optimised for the Illawarra tradie morning read."
