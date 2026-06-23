/**
 * Shared marketplace fixtures.
 *
 * Realistic Mufflermen-grade plugin data shared across every sub-route + the
 * full-marketplace composition. Kept in the route folder rather than in the
 * primitives folder because these are showcase props, not primitive props.
 */

import type {
  CompatibilityCell,
  CompatibilitySurface,
  InstallState,
  MomentumDirection,
  PermissionScope,
  PluginCategory,
  PricingTier,
} from "../components/marketplace/marketplace-types"

export interface FixturePlugin {
  id: string
  name: string
  author: string
  description: string
  category: PluginCategory
  installState: InstallState
  rating: number
  ratingCount: number
  pricingTier: PricingTier
  priceLabel?: string
  version: string
  releaseDate: string
}

export const PLUGINS: ReadonlyArray<FixturePlugin> = [
  {
    id: "stripe-payments",
    name: "Stripe payments",
    author: "Stripe Inc.",
    description:
      "Take card, Apple Pay and Afterpay through the workshop quoting tool. Auto-reconciles to Xero overnight.",
    category: "payments",
    installState: "installed",
    rating: 4.8,
    ratingCount: 1842,
    pricingTier: "pay-per-use",
    priceLabel: "1.75% + $0.30",
    version: "5.4.2",
    releaseDate: "21 May 2026",
  },
  {
    id: "twilio-sms",
    name: "Twilio SMS",
    author: "Twilio",
    description:
      "Send booking confirmations and job-ready SMS to customers when bay 02 finishes the exhaust install.",
    category: "telephony",
    installState: "update-available",
    rating: 4.6,
    ratingCount: 924,
    pricingTier: "pay-per-use",
    priceLabel: "$0.05 / SMS",
    version: "3.12.0",
    releaseDate: "18 May 2026",
  },
  {
    id: "xero-invoices",
    name: "Xero invoices",
    author: "Xero AU",
    description:
      "Push completed quote tickets into Xero as draft invoices ready for the front-of-house to send.",
    category: "payments",
    installState: "installed",
    rating: 4.7,
    ratingCount: 612,
    pricingTier: "pro",
    priceLabel: "$24 / month",
    version: "2.8.1",
    releaseDate: "12 May 2026",
  },
  {
    id: "abn-lookup",
    name: "ABN lookup",
    author: "Australian Business Register",
    description:
      "Verify ABNs on the fleet account form before the workshop accepts a new commercial contract.",
    category: "compliance",
    installState: "install",
    rating: 4.5,
    ratingCount: 218,
    pricingTier: "free",
    version: "1.6.0",
    releaseDate: "24 May 2026",
  },
  {
    id: "manta-parts-feed",
    name: "Manta parts feed",
    author: "Manta Performance",
    description:
      "Live parts catalogue and stock feed from Manta — 6-inch chrome tips through to high-flow cats.",
    category: "workflow",
    installState: "install",
    rating: 4.4,
    ratingCount: 142,
    pricingTier: "pro",
    priceLabel: "$48 / month",
    version: "0.9.4",
    releaseDate: "26 May 2026",
  },
  {
    id: "hermes-content-sync",
    name: "Hermes content sync",
    author: "Verridian",
    description:
      "Mirror Hermes blog posts and Mufflerpulse podcast episodes into the public mufflermen.com.au site.",
    category: "marketing",
    installState: "installing",
    rating: 4.9,
    ratingCount: 88,
    pricingTier: "enterprise",
    priceLabel: "Contact sales",
    version: "1.3.0",
    releaseDate: "27 May 2026",
  },
  {
    id: "openai-quote-bot",
    name: "Quote drafter (OpenAI)",
    author: "OpenAI",
    description:
      "Draft a workshop quote from the customer voice memo. Front-of-house edits, signs, and sends.",
    category: "ai",
    installState: "install",
    rating: 4.5,
    ratingCount: 432,
    pricingTier: "pay-per-use",
    priceLabel: "$0.06 / quote",
    version: "1.1.0",
    releaseDate: "19 May 2026",
  },
  {
    id: "hubspot-crm",
    name: "HubSpot CRM",
    author: "HubSpot",
    description:
      "Sync workshop contacts and quote requests into the Oak Flats Mufflermen fleet sales pipeline.",
    category: "crm",
    installState: "installed",
    rating: 4.3,
    ratingCount: 1284,
    pricingTier: "free",
    version: "8.2.4",
    releaseDate: "08 May 2026",
  },
]

export interface FixtureCategoryCount {
  category: PluginCategory
  count: number
}

export const CATEGORY_COUNTS: ReadonlyArray<FixtureCategoryCount> = [
  { category: "crm", count: 18 },
  { category: "email", count: 22 },
  { category: "forms", count: 11 },
  { category: "analytics", count: 14 },
  { category: "marketing", count: 26 },
  { category: "payments", count: 9 },
  { category: "workflow", count: 17 },
  { category: "devtools", count: 31 },
  { category: "ai", count: 8 },
  { category: "telephony", count: 6 },
  { category: "compliance", count: 7 },
  { category: "productivity", count: 19 },
]

export interface FixtureCompatibilityRow {
  id: string
  feature: string
  cells: Record<CompatibilitySurface, CompatibilityCell>
}

export const COMPATIBILITY_ROWS: ReadonlyArray<FixtureCompatibilityRow> = [
  {
    id: "payments",
    feature: "Card payments",
    cells: {
      site: "supported",
      mufflerpulse: "unsupported",
      hermes: "partial",
      api: "supported",
      cli: "partial",
    },
  },
  {
    id: "refunds",
    feature: "Refunds + voids",
    cells: {
      site: "supported",
      mufflerpulse: "unsupported",
      hermes: "unsupported",
      api: "supported",
      cli: "supported",
    },
  },
  {
    id: "webhook-events",
    feature: "Webhook events",
    cells: {
      site: "supported",
      mufflerpulse: "partial",
      hermes: "supported",
      api: "supported",
      cli: "supported",
    },
  },
  {
    id: "afterpay",
    feature: "Afterpay instalments",
    cells: {
      site: "supported",
      mufflerpulse: "unsupported",
      hermes: "unsupported",
      api: "partial",
      cli: "unsupported",
    },
  },
  {
    id: "apple-pay",
    feature: "Apple Pay button",
    cells: {
      site: "supported",
      mufflerpulse: "unsupported",
      hermes: "unsupported",
      api: "partial",
      cli: "unsupported",
    },
  },
]

export const PERMISSIONS_SAMPLE: ReadonlyArray<PermissionScope> = [
  "read-data",
  "write-data",
  "send-email",
  "access-webhooks",
  "run-on-schedule",
]

export interface FixtureReview {
  id: string
  authorName: string
  rating: number
  body: string
  timestamp: string
  helpfulCount: number
  verifiedPurchase: boolean
}

export const REVIEWS: ReadonlyArray<FixtureReview> = [
  {
    id: "rev-01",
    authorName: "Mick B.",
    rating: 5,
    body:
      "Took five minutes to wire up. Customers paying with Apple Pay on the quote tablet drove our same-day conversions up 14% in the first fortnight.",
    timestamp: "2 days ago",
    helpfulCount: 42,
    verifiedPurchase: true,
  },
  {
    id: "rev-02",
    authorName: "Mara K.",
    rating: 4,
    body:
      "Solid integration, but the refunds flow needs a one-click confirm. We use the API workaround for now and it's fine.",
    timestamp: "5 days ago",
    helpfulCount: 18,
    verifiedPurchase: true,
  },
  {
    id: "rev-03",
    authorName: "Darren O.",
    rating: 5,
    body:
      "Reconciles to Xero overnight with zero manual matching. Shellharbour bay 02 has not flagged a mismatched payment since we installed.",
    timestamp: "1 wk ago",
    helpfulCount: 27,
    verifiedPurchase: true,
  },
  {
    id: "rev-04",
    authorName: "Tahnee G.",
    rating: 3,
    body:
      "Works fine on the site, but I really want Mufflerpulse support. Tagging the team — please ship this for the podcast checkout.",
    timestamp: "3 wk ago",
    helpfulCount: 9,
    verifiedPurchase: false,
  },
]

export interface FixtureTrendingItem {
  id: string
  rank: number
  name: string
  author: string
  momentum: MomentumDirection
  momentumLabel: string
  trendCaption: string
}

export const TRENDING: ReadonlyArray<FixtureTrendingItem> = [
  {
    id: "tr-01",
    rank: 1,
    name: "Hermes content sync",
    author: "Verridian",
    momentum: "up",
    momentumLabel: "+ 42%",
    trendCaption: "Installs spiked after the Mufflerpulse cross-post launch.",
  },
  {
    id: "tr-02",
    rank: 2,
    name: "Quote drafter (OpenAI)",
    author: "OpenAI",
    momentum: "up",
    momentumLabel: "+ 28%",
    trendCaption: "Front-of-house cuts a 7-minute quote down to 80 seconds.",
  },
  {
    id: "tr-03",
    rank: 3,
    name: "Manta parts feed",
    author: "Manta Performance",
    momentum: "up",
    momentumLabel: "+ 19%",
    trendCaption: "Live stock check stops the parts receiver double-ordering.",
  },
  {
    id: "tr-04",
    rank: 4,
    name: "Stripe payments",
    author: "Stripe Inc.",
    momentum: "flat",
    momentumLabel: "Steady",
    trendCaption: "Holds the top spot — already on 86% of workshop installs.",
  },
  {
    id: "tr-05",
    rank: 5,
    name: "Twilio SMS",
    author: "Twilio",
    momentum: "down",
    momentumLabel: "− 6%",
    trendCaption: "Some bays moved to WhatsApp Business after the update.",
  },
  {
    id: "tr-06",
    rank: 6,
    name: "Xero invoices",
    author: "Xero AU",
    momentum: "up",
    momentumLabel: "+ 4%",
    trendCaption: "Strong renewal week from the fleet plan workshops.",
  },
  {
    id: "tr-07",
    rank: 7,
    name: "ABN lookup",
    author: "Australian Business Register",
    momentum: "up",
    momentumLabel: "+ 12%",
    trendCaption: "Free + fast — every fleet onboarding flow installs it.",
  },
  {
    id: "tr-08",
    rank: 8,
    name: "HubSpot CRM",
    author: "HubSpot",
    momentum: "flat",
    momentumLabel: "Steady",
    trendCaption: "Top of the CRM category for the eighth consecutive week.",
  },
]

export interface FixtureRecentlyUpdatedItem {
  id: string
  name: string
  version: string
  releaseDate: string
  changelogExcerpt: string
}

export const RECENTLY_UPDATED: ReadonlyArray<FixtureRecentlyUpdatedItem> = [
  {
    id: "ru-01",
    name: "Hermes content sync",
    version: "1.3.0",
    releaseDate: "27 May 2026",
    changelogExcerpt:
      "Adds cross-posting to Mufflerpulse audio show notes, redacts customer PII before publish.",
  },
  {
    id: "ru-02",
    name: "Manta parts feed",
    version: "0.9.4",
    releaseDate: "26 May 2026",
    changelogExcerpt:
      "Live stock fixed for the Albion Park bay; broken catalogue images replaced with placeholders.",
  },
  {
    id: "ru-03",
    name: "Stripe payments",
    version: "5.4.2",
    releaseDate: "21 May 2026",
    changelogExcerpt:
      "Apple Pay on the quote tablet, faster Afterpay redirect, fewer drop-offs at the consent screen.",
  },
  {
    id: "ru-04",
    name: "Quote drafter (OpenAI)",
    version: "1.1.0",
    releaseDate: "19 May 2026",
    changelogExcerpt:
      "New voice-memo capture, redacts customer numberplates before sending to the model.",
  },
  {
    id: "ru-05",
    name: "Twilio SMS",
    version: "3.12.0",
    releaseDate: "18 May 2026",
    changelogExcerpt:
      "Sender ID resolution fixed for the Shellharbour bay; opt-out keyword list expanded.",
  },
]
