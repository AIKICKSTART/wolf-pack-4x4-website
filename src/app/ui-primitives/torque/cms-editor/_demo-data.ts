/**
 * Demo data for the CMS page editor screen.
 *
 * A real Oak Flats Muffler Men (Illawarra NSW) campaign landing page being
 * edited in the visual page-builder: the winter "Tow-Pack Exhaust" promo for
 * 4x4 and ute owners across Oak Flats, Shellharbour and the wider Illawarra.
 * All copy is production-ready workshop marketing language.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque".
 * The legacy internal codename is never surfaced in any string below.
 */

import type {
  BlockDefinition,
  CanvasBlock,
  PageNode,
  SlotGroup,
} from "../../components/cms/cms-types"

/** The page currently open in the editor. */
export const EDITING_PAGE = {
  title: "Tow-Pack Exhaust Winter Deal",
  slug: "deals/tow-pack-winter",
  reviewer: "Mia P.",
  branch: "campaign/winter-tow-pack",
  scheduledFor: "01 Jun · 06:00 AEST",
} as const

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"

/* ---- Left rail: site page tree ------------------------------------------- */

export const PAGE_TREE: ReadonlyArray<PageNode> = [
  {
    id: "home",
    slug: "",
    title: "Home",
    state: "published",
    ownerInitials: "DF",
    children: [
      {
        id: "services",
        slug: "services",
        title: "Services",
        state: "published",
        ownerInitials: "DF",
        children: [
          {
            id: "svc-exhausts",
            slug: "services/custom-exhausts",
            title: "Custom Exhaust Systems",
            state: "published",
            ownerInitials: "DF",
          },
          {
            id: "svc-servicing",
            slug: "services/logbook-servicing",
            title: "Logbook Servicing",
            state: "published",
            ownerInitials: "JT",
          },
          {
            id: "svc-dpf",
            slug: "services/dpf-cleaning",
            title: "DPF Clean & Diagnostics",
            state: "review",
            ownerInitials: "JT",
          },
        ],
      },
      {
        id: "deals",
        slug: "deals",
        title: "Deals & Campaigns",
        state: "published",
        ownerInitials: "DF",
        children: [
          {
            id: "deal-winter",
            slug: "deals/tow-pack-winter",
            title: "Tow-Pack Exhaust Winter Deal",
            state: "draft",
            ownerInitials: "DF",
          },
          {
            id: "deal-rego",
            slug: "deals/rego-check-combo",
            title: "Rego-Ready Service Combo",
            state: "scheduled",
            ownerInitials: "Mia",
          },
        ],
      },
      {
        id: "suburbs",
        slug: "suburbs",
        title: "Suburb Landings",
        state: "published",
        ownerInitials: "DF",
        children: [
          {
            id: "sub-oakflats",
            slug: "suburbs/oak-flats",
            title: "Exhausts in Oak Flats",
            state: "published",
            ownerInitials: "DF",
          },
          {
            id: "sub-shellharbour",
            slug: "suburbs/shellharbour",
            title: "Exhausts in Shellharbour",
            state: "published",
            ownerInitials: "Mia",
          },
          {
            id: "sub-albion",
            slug: "suburbs/albion-park",
            title: "Exhausts in Albion Park",
            state: "draft",
            ownerInitials: "Mia",
          },
        ],
      },
      {
        id: "parts",
        slug: "parts",
        title: "Parts Catalogue",
        state: "published",
        ownerInitials: "JT",
      },
      {
        id: "blog",
        slug: "blog",
        title: "Workshop Journal",
        state: "published",
        ownerInitials: "Mia",
        children: [
          {
            id: "blog-egt",
            slug: "blog/egt-towing-safe",
            title: "Keeping EGTs Safe When Towing",
            state: "published",
            ownerInitials: "JT",
          },
        ],
      },
      {
        id: "contact",
        slug: "contact",
        title: "Book a Bay",
        state: "published",
        ownerInitials: "DF",
      },
    ],
  },
]

/* ---- Centre: canvas block rows for the campaign page --------------------- */

export const CANVAS_BLOCKS: ReadonlyArray<CanvasBlock> = [
  {
    id: "blk-hero",
    definitionId: "hero-promo",
    name: "Winter promo hero",
    category: "hero",
    tone: "red",
    glyph: "▤",
    summary: "“Tow heavy, breathe easy.” 3-inch mandrel systems fitted in a day.",
    selected: true,
  },
  {
    id: "blk-offer",
    definitionId: "offer-strip",
    name: "Offer strip — $300 off",
    category: "feature",
    tone: "amber",
    glyph: "◳",
    summary: "$300 off a full 3in DPF-back system on 4x4 utes, fitted before 30 June.",
  },
  {
    id: "blk-fitment",
    definitionId: "fitment-grid",
    name: "Fits your ute grid",
    category: "feature",
    tone: "teal",
    glyph: "◳",
    summary: "Ranger, Hilux, LandCruiser 79, GWM Cannon, Amarok, Patrol Y62.",
  },
  {
    id: "blk-proof",
    definitionId: "review-proof",
    name: "Reviews & ratings",
    category: "text",
    tone: "neutral",
    glyph: "≡",
    summary: "4.9★ from 312 Illawarra drivers — pull-quotes from real bookings.",
  },
  {
    id: "blk-gallery",
    definitionId: "build-gallery",
    name: "Recent builds gallery",
    category: "media",
    tone: "teal",
    glyph: "▣",
    summary: "Six fitted systems shot in the Oak Flats bays.",
  },
  {
    id: "blk-form",
    definitionId: "quote-form",
    name: "Get my tow-pack quote",
    category: "form",
    tone: "violet",
    glyph: "✎",
    summary: "Rego + vehicle lookup → same-day quote, no obligation.",
  },
  {
    id: "blk-cta",
    definitionId: "book-cta",
    name: "Book a bay CTA",
    category: "cta",
    tone: "green",
    glyph: "▶",
    summary: "Call (02) 4256 7890 or book online — Oak Flats, open Mon–Sat.",
  },
]

/* ---- Right rail: inspector groups for the selected hero block ------------- */

export const HERO_INSPECTOR_GROUPS: ReadonlyArray<SlotGroup> = [
  {
    id: "content",
    label: "Content",
    fields: [
      {
        id: "hero-eyebrow",
        label: "Eyebrow",
        kind: "text",
        value: "Winter tow-pack deal · Illawarra",
        required: true,
      },
      {
        id: "hero-heading",
        label: "Headline",
        kind: "text",
        value: "Tow heavy. Breathe easy.",
        required: true,
        hint: "Keep under 32 characters so it holds on mobile.",
      },
      {
        id: "hero-sub",
        label: "Subheading",
        kind: "textarea",
        value:
          "Mandrel-bent 3-inch systems built and fitted at Oak Flats in a day — more torque on the hills, cooler EGTs on the van, and a note worth the windows down.",
      },
      {
        id: "hero-cta",
        label: "Button label",
        kind: "text",
        value: "Get my tow-pack quote",
        required: true,
      },
    ],
  },
  {
    id: "media",
    label: "Media",
    fields: [
      {
        id: "hero-image",
        label: "Background image",
        kind: "image",
        value: "ranger-v6-3in-dpf-back.webp",
        hint: "1600×900 minimum · focal point auto-set on the tailpipe.",
      },
      {
        id: "hero-overlay",
        label: "Overlay tint",
        kind: "color",
        value: "#0f172a",
        hint: "Navy keeps white copy legible over the workshop shot.",
      },
    ],
  },
  {
    id: "layout",
    label: "Layout & behaviour",
    fields: [
      {
        id: "hero-align",
        label: "Text alignment",
        kind: "select",
        value: "left",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Centre" },
          { value: "right", label: "Right" },
        ],
      },
      {
        id: "hero-height",
        label: "Min height (vh)",
        kind: "number",
        value: 78,
        hint: "Caps at 92vh so the offer strip peeks above the fold.",
      },
      {
        id: "hero-badge",
        label: "Show “$300 off” badge",
        kind: "toggle",
        value: true,
      },
      {
        id: "hero-reduce-motion",
        label: "Respect reduced motion",
        kind: "toggle",
        value: true,
        hint: "Parallax disabled for visitors who opt out of motion.",
      },
    ],
  },
]

/* ---- Block library palette ----------------------------------------------- */

export const LIBRARY_BLOCKS: ReadonlyArray<BlockDefinition> = [
  {
    id: "lib-hero-promo",
    name: "Promo hero",
    category: "hero",
    tone: "red",
    glyph: "▤",
    description: "Full-bleed deal hero with headline, badge and primary CTA.",
    branded: true,
  },
  {
    id: "lib-hero-suburb",
    name: "Suburb hero",
    category: "hero",
    tone: "red",
    glyph: "▤",
    description: "Localised hero — “Exhausts in {suburb}” with map pin.",
  },
  {
    id: "lib-offer-strip",
    name: "Offer strip",
    category: "feature",
    tone: "amber",
    glyph: "◳",
    description: "Bold price-anchor banner with expiry countdown.",
  },
  {
    id: "lib-fitment-grid",
    name: "Fitment grid",
    category: "feature",
    tone: "teal",
    glyph: "◳",
    description: "Vehicle-by-vehicle “fits your ute” card grid.",
  },
  {
    id: "lib-spec-table",
    name: "Spec comparison",
    category: "feature",
    tone: "teal",
    glyph: "◳",
    description: "Stainless vs aluminised vs OEM comparison table.",
  },
  {
    id: "lib-rich-text",
    name: "Rich text",
    category: "text",
    tone: "neutral",
    glyph: "≡",
    description: "Owner-editable prose block with headings and lists.",
  },
  {
    id: "lib-review-proof",
    name: "Review proof",
    category: "text",
    tone: "neutral",
    glyph: "≡",
    description: "Star rating with pull-quotes from real bookings.",
  },
  {
    id: "lib-build-gallery",
    name: "Build gallery",
    category: "media",
    tone: "teal",
    glyph: "▣",
    description: "Masonry gallery of fitted-system photos from the bays.",
  },
  {
    id: "lib-video",
    name: "Reel embed",
    category: "media",
    tone: "teal",
    glyph: "▣",
    description: "Autoplay-muted build reel from Mufflerpulse social.",
  },
  {
    id: "lib-quote-form",
    name: "Quote form",
    category: "form",
    tone: "violet",
    glyph: "✎",
    description: "Rego + vehicle lookup capturing same-day quote leads.",
    branded: true,
  },
  {
    id: "lib-booking-form",
    name: "Booking form",
    category: "form",
    tone: "violet",
    glyph: "✎",
    description: "Pick a bay, date and service with calendar slots.",
  },
  {
    id: "lib-book-cta",
    name: "Book-a-bay CTA",
    category: "cta",
    tone: "green",
    glyph: "▶",
    description: "Phone + online-booking call to action with hours.",
  },
  {
    id: "lib-map-embed",
    name: "Map & hours",
    category: "embed",
    tone: "neutral",
    glyph: "</>",
    description: "Oak Flats workshop map, hours and directions embed.",
  },
  {
    id: "lib-faq",
    name: "FAQ accordion",
    category: "embed",
    tone: "neutral",
    glyph: "</>",
    description: "Common tow-pack and warranty questions, collapsible.",
  },
]
