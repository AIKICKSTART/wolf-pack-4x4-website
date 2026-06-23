import type {
  ApprovalStage,
  CaptionPreset,
  HashtagDescriptor,
  MediaBinderItem,
  PlatformDescriptor,
} from "../../components/social-scheduler"
import type { MediaTrayItem } from "../../components/data-display"

/**
 * Demo data for the Torque "Social post composer" screen.
 * A single real Oak Flats Muffler Men exhaust-promo post fanned out across the
 * three preview channels the brief calls for: Instagram, Facebook, TikTok.
 *
 * NOTE (dev only): the underlying agent console is internally codenamed Hermes;
 * customer-facing copy uses "Torque" exclusively.
 */

/** Only the three channels this composer previews: IG / FB / TikTok. */
export const COMPOSER_PLATFORMS: ReadonlyArray<PlatformDescriptor> = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "@mufflermen.au",
    charLimit: 2200,
    aspectRatios: ["1:1", "4:5", "9:16"],
    tone: "red",
    mark: "IG",
  },
  {
    key: "facebook",
    label: "Facebook",
    handle: "@MufflerMen",
    charLimit: 5000,
    aspectRatios: ["1:1", "16:9", "4:5"],
    tone: "teal",
    mark: "FB",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@mufflermenwollongong",
    charLimit: 2200,
    aspectRatios: ["9:16"],
    tone: "neutral",
    mark: "TT",
  },
]

/** The hero exhaust-promo caption Torque drafted, ready for the bay owner. */
export const PROMO_CAPTION =
  "Winter exhaust special at Oak Flats Muffler Men — $200 off any full cat-back system fitted before 30 June. " +
  "Hand-rolled in our Illawarra workshop: mandrel-bent, TIG-welded stainless, dyno-tuned for a deeper note without the drone. " +
  "Book the bay, we'll have your ride sounding right."

export const PROMO_HASHTAGS: ReadonlyArray<string> = [
  "#IllawarraExhaust",
  "#OakFlatsMufflermen",
  "#CatBackSpecial",
  "#WollongongMechanic",
  "#TIGWelded",
]

/** Brand-safe caption voice presets for the AI caption studio. */
export const CAPTION_PRESETS: ReadonlyArray<CaptionPreset> = [
  {
    id: "promo-deal",
    label: "Promo / deal",
    description: "Offer-led — clear price, clear deadline, clear booking CTA.",
    sample:
      "Winter exhaust special: $200 off any full cat-back fitted before 30 June. Hand-rolled stainless, dyno-tuned, booked the same week. ",
  },
  {
    id: "workshop-tape",
    label: "Workshop tape",
    description: "Time-lapse style — Daniel narrating bay action.",
    sample:
      "Cat-back going on a Ranger PX this morning. Mandrel-bent 3\" stainless, TIG-welded in-house. Deeper note, no drone. ",
  },
  {
    id: "before-after",
    label: "Before / after",
    description: "Cinematic reveal — peak crunch on the swap.",
    sample:
      "Before: tired factory tin can. After: hand-rolled 2.5\" sports system with twin tips. Same ute, different attitude. ",
  },
  {
    id: "local-trust",
    label: "Local trust",
    description: "Illawarra-first — lifetime workmanship, no surprises.",
    sample:
      "Oak Flats locals — every system we fit is backed by a lifetime workmanship warranty. Honest quote, no upsell. ",
  },
]

/** Suggested hashtags surfaced by the caption studio (with reach signals). */
export const HASHTAG_POOL: ReadonlyArray<HashtagDescriptor> = [
  { tag: "#IllawarraExhaust", reach: 84_200, trend: "up", competition: "low" },
  { tag: "#OakFlatsMufflermen", reach: 4_600, trend: "up", competition: "low" },
  { tag: "#CatBackSpecial", reach: 31_800, trend: "up", competition: "low" },
  { tag: "#WollongongMechanic", reach: 168_000, trend: "up", competition: "med" },
  { tag: "#TIGWelded", reach: 96_400, trend: "flat", competition: "med" },
  { tag: "#4WDExhaust", reach: 412_000, trend: "up", competition: "high" },
]

/**
 * Generated-media tray: real Mufflermen exhaust media from /public/media,
 * curated for this promo post. Used by the data-display MediaTray.
 */
export const GENERATED_MEDIA: ReadonlyArray<MediaTrayItem> = [
  {
    id: "gm-quad-tips",
    title: "Polished quad tips — hero crop",
    meta: "4:5 · 2.1 MB · auto-generated",
    tag: "Hero",
    src: "/media/generated/gallery-polished-quad-tips.webp",
  },
  {
    id: "gm-tig-macro",
    title: "TIG weld macro — detail",
    meta: "1:1 · 1.6 MB · auto-generated",
    tag: "Detail",
    src: "/media/generated/gallery-tig-weld-macro.webp",
  },
  {
    id: "gm-mandrel",
    title: "Mandrel bender — bay action",
    meta: "16:9 · 2.4 MB · auto-generated",
    tag: "B-roll",
    src: "/media/generated/gallery-mandrel-bender-workshop.webp",
  },
  {
    id: "gm-hoist",
    title: "Hoist + cat-back fit",
    meta: "4:3 · 1.9 MB · workshop",
    tag: "Bay",
    src: "/media/cinematic/workshop-hoist-exhaust.webp",
  },
  {
    id: "gm-product-macro",
    title: "Stainless system — studio macro",
    meta: "3:2 · 1.4 MB · catalogue",
    tag: "Product",
    src: "/media/cinematic/exhaust-product-macro.webp",
  },
]

/** Per-platform aspect-ratio fit for the attached media (MediaBinder). */
export const MEDIA_BINDER_ITEMS: ReadonlyArray<MediaBinderItem> = [
  {
    id: "mb-quad-tips",
    fileName: "polished-quad-tips-4x5.webp",
    kind: "image",
    aspectRatio: "4:5",
    sizeMB: 2.1,
    placeholder: "4:5",
    fit: { instagram: "ok", facebook: "ok", tiktok: "warn" },
  },
  {
    id: "mb-fab-reel",
    fileName: "cat-back-fab-timelapse.mp4",
    kind: "reel",
    durationSeconds: 28,
    aspectRatio: "9:16",
    sizeMB: 19.8,
    placeholder: "REEL",
    fit: { instagram: "ok", tiktok: "ok", facebook: "warn" },
  },
  {
    id: "mb-mandrel",
    fileName: "mandrel-bender-bay.webp",
    kind: "image",
    aspectRatio: "16:9",
    sizeMB: 2.4,
    placeholder: "16:9",
    fit: { facebook: "ok", instagram: "warn", tiktok: "fail" },
  },
]

/** Brand-safety checks Torque runs on the caption before queueing. */
export interface BrandCheck {
  id: string
  label: string
  state: "pass" | "warn"
  detail: string
}

export const BRAND_CHECKS: ReadonlyArray<BrandCheck> = [
  {
    id: "bc-claims",
    label: "Claims & pricing",
    state: "pass",
    detail: "$200 off + 30 June deadline match the live promo in the CMS.",
  },
  {
    id: "bc-voice",
    label: "Brand voice",
    state: "pass",
    detail: "Honest, local, no hype. On-voice for Oak Flats Muffler Men.",
  },
  {
    id: "bc-noise",
    label: "Noise / legal",
    state: "warn",
    detail: "Mentions a \"deeper note\" — keep wording road-legal, avoid \"loudest\".",
  },
  {
    id: "bc-cta",
    label: "Booking CTA",
    state: "pass",
    detail: "Clear book-the-bay call to action present on all three channels.",
  },
]

/** Schedule/approval workflow stages for this post. */
export const APPROVAL_STAGES: ReadonlyArray<ApprovalStage> = [
  {
    id: "ap-draft",
    label: "Torque draft",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-05-29T07:48:00+10:00",
    note: "Caption + 5 hashtags drafted from the live winter-special promo.",
  },
  {
    id: "ap-brand",
    label: "Brand-safe check",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-05-29T07:49:00+10:00",
    note: "3 of 4 checks clear. One note on road-legal noise wording.",
  },
  {
    id: "ap-owner",
    label: "Owner sign-off",
    owner: "Daniel (owner)",
    state: "current",
    note: "Awaiting one-tap approval before the post fans out to IG / FB / TikTok.",
  },
  {
    id: "ap-scheduled",
    label: "Scheduled",
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
  tone: "red" | "amber" | "teal" | "green" | "neutral"
  caption: string
}

export const COMPOSER_STATS: ReadonlyArray<ComposerStat> = [
  {
    id: "cs-channels",
    label: "Channels armed",
    value: "3",
    unit: "/ 3",
    tone: "green",
    caption: "Instagram, Facebook, TikTok",
  },
  {
    id: "cs-reach",
    label: "Est. combined reach",
    value: "72.8",
    unit: "k",
    tone: "teal",
    caption: "Based on 30-day audience trend",
  },
  {
    id: "cs-checks",
    label: "Brand checks",
    value: "3",
    unit: "/ 4 clear",
    tone: "amber",
    caption: "1 note on road-legal noise wording",
  },
  {
    id: "cs-window",
    label: "Best post window",
    value: "5:00",
    unit: "pm",
    tone: "red",
    caption: "Tradies' afternoon scroll, Tue–Thu",
  },
]

export const SCHEDULE_TIME = "Tue 2 Jun · 5:00 pm AEST"
