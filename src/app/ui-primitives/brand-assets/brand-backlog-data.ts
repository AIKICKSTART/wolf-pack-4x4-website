export type BrandBacklogIcon =
  | "sales"
  | "payment"
  | "vehicle"
  | "process"
  | "warranty"
  | "portrait"
  | "weld"
  | "inspection"
  | "sound"
  | "social"
  | "review"
  | "signage"
  | "email"
  | "care"
  | "merch"

export interface BrandBacklogAsset {
  id: string
  title: string
  contentType: string
  format: string
  status: "Template ready"
  outputPath: string
  sourceLogo: string
  viewportCoverage: ReadonlyArray<string>
  usage: string
  proof: string
  icon: BrandBacklogIcon
}

export interface BrandBacklogLane {
  title: string
  body: string
  tone: string
  items: ReadonlyArray<BrandBacklogAsset>
}

const primaryLogo = "/media/brand/mufflermen-logo-primary.webp"
const navLogo = "/media/brand/mufflermen-logo-nav.webp"
const iconLogo = "/media/brand/mufflermen-logo-icon-512.webp"
const viewportCoverage = ["320", "390", "768", "1280", "1920"] as const

function asset(
  id: string,
  title: string,
  contentType: string,
  format: string,
  usage: string,
  proof: string,
  icon: BrandBacklogIcon,
  sourceLogo = primaryLogo,
): BrandBacklogAsset {
  return {
    id,
    title,
    contentType,
    format,
    status: "Template ready",
    outputPath: `/media/brand/backlog/${id}.${format === "HTML" ? "html" : "svg"}`,
    sourceLogo,
    viewportCoverage,
    usage,
    proof,
    icon,
  }
}

export const backlogManifestPath = "/media/brand/backlog/asset-backlog-manifest.json"

export const backlogLanes: ReadonlyArray<BrandBacklogLane> = [
  {
    title: "Sales stack",
    body: "Direct-response assets that help turn quotes, phone calls, and walk-ins into booked work.",
    tone: "var(--primitive-red)",
    items: [
      asset(
        "quote-approval-card",
        "Quote approval card",
        "Quote conversion",
        "SVG",
        "Send after a workshop quote to make the approve-call-book path obvious.",
        "Primary Mufflermen lockup, phone, email, address, and quote CTA are embedded.",
        "sales",
        navLogo,
      ),
      asset(
        "finance-payment-option-tile",
        "Finance / payment-option tile",
        "Payment support",
        "SVG",
        "Use in quote decks and service pages when the customer needs payment context.",
        "Uses the real logo with red/amber primitive tokens and no generic finance branding.",
        "payment",
      ),
      asset(
        "vehicle-specific-landing-cover",
        "Vehicle-specific landing cover",
        "Landing hero",
        "SVG",
        "Drop into Falcon, HSV, Ranger, and import-performance campaign pages.",
        "Logo-locked header plus vehicle/service slots for responsive hero crops.",
        "vehicle",
        navLogo,
      ),
      asset(
        "before-after-install-strip",
        "Before-after install strip",
        "Proof strip",
        "SVG",
        "Show fitment transformation across quote pages, socials, and after-service emails.",
        "Mufflermen mark anchors both before and after frames with workshop-safe labels.",
        "process",
      ),
      asset(
        "warranty-badge-system",
        "Warranty badge system",
        "Trust badges",
        "SVG",
        "Attach to quote cards, product rows, and aftercare docs.",
        "Icon mark is used as the badge source so small-format brand recognition holds.",
        "warranty",
        iconLogo,
      ),
    ],
  },
  {
    title: "Workshop trust",
    body: "Assets that show fabrication quality, process clarity, and real credibility inside the workshop.",
    tone: "var(--primitive-teal)",
    items: [
      asset(
        "technician-portrait-set",
        "Technician portrait set",
        "People proof",
        "SVG",
        "Frame technician profile photos when the team is ready to publish portraits.",
        "Logo strip and role chips are already branded; portrait slots stay replaceable.",
        "portrait",
        navLogo,
      ),
      asset(
        "weld-detail-macro-pack",
        "Weld-detail macro pack",
        "Craft proof",
        "SVG",
        "Use as a macro-image wrapper for TIG, stainless, and exhaust fabrication content.",
        "Real lockup sits on the inspection rail next to weld-quality callouts.",
        "weld",
      ),
      asset(
        "hoist-inspection-checklist-card",
        "Hoist inspection checklist card",
        "Checklist",
        "SVG",
        "Show customers what gets checked before exhaust work begins.",
        "Branded checklist card with phone and workshop identity built in.",
        "inspection",
        navLogo,
      ),
      asset(
        "underbody-fitment-storyboard",
        "Underbody fitment storyboard",
        "Storyboard",
        "SVG",
        "Structure underbody sequence frames for web explainers and short-form video planning.",
        "Each frame is logo-tagged and labelled for same-vehicle continuity work.",
        "process",
      ),
      asset(
        "dyno-sound-test-certificate-frame",
        "Dyno / sound-test certificate frame",
        "Certificate",
        "SVG",
        "Wrap sound-test or dyno proof screenshots before publishing.",
        "Uses the Mufflermen icon as a certificate seal plus full contact strip.",
        "sound",
        iconLogo,
      ),
    ],
  },
  {
    title: "Local social",
    body: "Reusable campaign pieces for weekly posting without designing from scratch every time.",
    tone: "var(--primitive-amber)",
    items: [
      asset(
        "google-business-cover-rotation",
        "Google Business cover rotation",
        "Local cover",
        "SVG",
        "Rotate weekly Google Business profile covers without rebuilding the layout.",
        "Real nav lockup sits in the cover masthead with service-area messaging.",
        "social",
        navLogo,
      ),
      asset(
        "promo-tile-carousel-set",
        "Promo tile carousel set",
        "Carousel",
        "SVG",
        "Use for Facebook and Instagram multi-card promos.",
        "Every tile includes the approved mark from the real Mufflermen logo library.",
        "social",
      ),
      asset(
        "story-template-booking-cta",
        "Story template with booking CTA",
        "Vertical story",
        "SVG",
        "Use for 1080x1920 story posts and booking reminders.",
        "Logo safe area is locked to the top; CTA and phone strip are bottom-safe.",
        "social",
        navLogo,
      ),
      asset(
        "review-request-graphic",
        "Review-request graphic",
        "Review ask",
        "SVG",
        "Send after successful pickup to ask for a Google review.",
        "Mufflermen badge and real contact details are visible in the review card.",
        "review",
        iconLogo,
      ),
      asset(
        "weekend-event-poster",
        "Weekend event poster",
        "Poster",
        "SVG",
        "Use for local cars-and-coffee, open bay, and community event posts.",
        "Primary logo anchors the top with event slots and service-area footer.",
        "social",
      ),
    ],
  },
  {
    title: "Fleet + signage",
    body: "Brand pieces that work across vehicles, premises, and trade-show style environments.",
    tone: "var(--primitive-green)",
    items: [
      asset(
        "service-vehicle-door-decal",
        "Service-vehicle door decal",
        "Vehicle decal",
        "SVG",
        "Use as the van/ute door mark and wrap planning plate.",
        "Exact primary logo is centered with address and contact details below.",
        "vehicle",
      ),
      asset(
        "workshop-fascia-mockup",
        "Workshop fascia mockup",
        "Building sign",
        "SVG",
        "Preview the street-facing fascia and bay sign layout.",
        "Real logo is placed on a high-contrast fascia panel with no fake signage.",
        "signage",
      ),
      asset(
        "a-frame-footpath-sign",
        "A-frame footpath sign",
        "Footpath sign",
        "SVG",
        "Print or mock up the daily walk-in sign for the workshop entrance.",
        "Logo, phone, service list, and red CTA are layout-locked.",
        "signage",
        navLogo,
      ),
      asset(
        "counter-mat-service-desk-strip",
        "Counter mat / service desk strip",
        "Counter mat",
        "SVG",
        "Use across reception, quote handoff, and parts counter surfaces.",
        "Horizontal lockup stays inside a safe area with service category chips.",
        "signage",
        navLogo,
      ),
      asset(
        "show-banner-pull-up-stand",
        "Show banner / pull-up stand",
        "Pull-up banner",
        "SVG",
        "Use for events, sponsor stalls, and local performance gatherings.",
        "Primary lockup is oversized and balanced with proof points and contact details.",
        "signage",
      ),
    ],
  },
  {
    title: "Retention assets",
    body: "Post-install and repeat-business media that keeps customers coming back.",
    tone: "var(--primitive-red)",
    items: [
      asset(
        "service-reminder-card",
        "Service reminder card",
        "Reminder",
        "SVG",
        "Send after fitment for inspection, rattle check, and future upgrade prompts.",
        "Mufflermen lockup and contact strip are embedded for direct response.",
        "care",
        navLogo,
      ),
      asset(
        "loyalty-referral-card",
        "Loyalty / referral card",
        "Referral",
        "SVG",
        "Hand to repeat customers and club referrals.",
        "Logo badge and referral code block are branded without third-party marks.",
        "review",
        iconLogo,
      ),
      asset(
        "thank-you-email-header",
        "Thank-you email header",
        "Email header",
        "HTML",
        "Use at the top of post-install thank-you and care emails.",
        "HTML header uses an absolute real-logo image and live contact details.",
        "email",
        navLogo,
      ),
      asset(
        "review-follow-up-signature-block",
        "Review follow-up signature block",
        "Email signature",
        "HTML",
        "Use in review follow-up replies and service reminder sequences.",
        "Logo image is sourced from the approved nav lockup, not generated text.",
        "email",
        navLogo,
      ),
      asset(
        "care-guide-one-pager",
        "Care-guide one-pager",
        "Aftercare sheet",
        "SVG",
        "Attach to handover and email after performance exhaust installs.",
        "Primary logo, checklist structure, and workshop contact details are embedded.",
        "care",
      ),
    ],
  },
  {
    title: "Merch / community",
    body: "Brand extensions that make the workshop feel like a proper performance nameplate, not just a service logo.",
    tone: "var(--primitive-amber)",
    items: [
      asset(
        "shirt-front-back-print",
        "Shirt front / back print",
        "Apparel",
        "SVG",
        "Use as the base artboard for staff and event shirts.",
        "Front and back placements use the exact primary logo and badge mark.",
        "merch",
      ),
      asset(
        "hat-patch-mark",
        "Hat patch mark",
        "Patch",
        "SVG",
        "Use for embroidered caps, patch proofs, and small-format merch.",
        "Icon logo is the source mark so thread detail stays readable.",
        "merch",
        iconLogo,
      ),
      asset(
        "hoodie-chest-lockup",
        "Hoodie chest lockup",
        "Apparel",
        "SVG",
        "Use as a left-chest or centre-chest hoodie placement proof.",
        "Nav lockup is sized to chest-safe proportions with no improvised type.",
        "merch",
        navLogo,
      ),
      asset(
        "stubby-cooler-artwork",
        "Stubby cooler artwork",
        "Merch wrap",
        "SVG",
        "Use as a wrap preview for local giveaways and customer packs.",
        "Logo repeat and phone strip are generated from approved brand files.",
        "merch",
        iconLogo,
      ),
      asset(
        "cars-and-coffee-poster-set",
        "Cars-and-coffee poster set",
        "Community poster",
        "SVG",
        "Use for local meetups, club posts, and performance-community sponsorships.",
        "Primary lockup, workshop address, and event details are in the same template.",
        "social",
      ),
    ],
  },
]

export const backlogAssets = backlogLanes.flatMap((lane) => lane.items)
