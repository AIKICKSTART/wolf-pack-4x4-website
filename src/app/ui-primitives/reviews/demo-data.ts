/**
 * Static demo data for the reviews showcase routes.
 * All names are fictional Illawarra residents. Pricing in AUD.
 */

import type { DonutSegment } from "../components/charts/donut-chart"
import type {
  RatingBreakdownTier,
} from "../components/reviews/rating-breakdown-bar"
import type { ReviewPhoto } from "../components/reviews/photo-review-attachment"
import type {
  ModerationRow,
} from "../components/reviews/review-moderation-queue"
import type {
  ReviewSentiment,
  StarRating,
} from "../components/reviews/reviews-types"

export interface DemoReview {
  id: string
  reviewer: string
  suburb: string
  rating: StarRating
  headline: string
  body: string
  timestamp: string
  helpful: number
  verified: boolean
  verifiedDate?: string
  sentiment: ReviewSentiment
  tags: ReadonlyArray<string>
  photos?: ReadonlyArray<ReviewPhoto>
  reply?: {
    responderName: string
    responderRole: string
    body: string
    timestamp: string
  }
}

export const DEMO_REVIEWS: ReadonlyArray<DemoReview> = [
  {
    id: "rev-001",
    reviewer: "Marcus Hendricks",
    suburb: "Albion Park",
    rating: 5,
    headline: "Manta cat-back on the Falcon — perfect tuck",
    body:
      "Booked Bay 2 for a Manta cat-back fit on my BA XR6T. The team measured ground clearance against the diff and rear bar before lifting it up, so the tip sits flush with the bumper cut-out. Quote was AUD 1,820 fitted — landed exactly there. Drone at 100 km/h is gone after they swapped the resonator placement.",
    timestamp: "3 days ago",
    helpful: 18,
    verified: true,
    verifiedDate: "Job 2026-05-21",
    sentiment: "positive",
    tags: ["Manta cat-back", "Bay 2", "Falcon XR6T"],
    photos: [
      { id: "p-001-a", alt: "Manta cat-back tip flush with rear bar" },
      { id: "p-001-b", alt: "Underside view of muffler tuck" },
      { id: "p-001-c", alt: "Workshop bay shot during fitment" },
    ],
    reply: {
      responderName: "Dani · Oak Flats Mufflermen",
      responderRole: "Workshop response",
      body:
        "Cheers Marcus — glad the drone is sorted. Drop in for a torque check after the next thousand kays.",
      timestamp: "2 days ago",
    },
  },
  {
    id: "rev-002",
    reviewer: "Priya Sandhu",
    suburb: "Shellharbour",
    rating: 4.5,
    headline: "Quote walk-through was the standout",
    body:
      "Came in for a Y-pipe replacement on the Mazda CX-5. The quote breakdown showed every part code — VicSpring resonator, Manta clamps, gasket pack — with the AUD line item next to each. Felt like buying through the parts counter, not a black-box invoice. Half a star off because the courtesy ute wasn’t available, but they Ubered me home.",
    timestamp: "1 week ago",
    helpful: 9,
    verified: true,
    verifiedDate: "Job 2026-05-15",
    sentiment: "positive",
    tags: ["Quote confidence", "Mazda CX-5"],
    reply: {
      responderName: "Brett · Oak Flats Mufflermen",
      responderRole: "Workshop response",
      body:
        "Thanks Priya. We’re booking another courtesy ute in next month so the wait list isn’t so tight.",
      timestamp: "5 days ago",
    },
  },
  {
    id: "rev-003",
    reviewer: "Toby Whelan",
    suburb: "Warilla",
    rating: 5,
    headline: "ADR cheatsheet saved me at engineering",
    body:
      "Their ADR-83 cheatsheet PDF that came with the job pack passed first time at engineering certification. Every clamp torque + heat-shield mount was photographed with serials. Booked Bay 2 again next week for the Hilux.",
    timestamp: "2 weeks ago",
    helpful: 27,
    verified: true,
    verifiedDate: "Job 2026-05-08",
    sentiment: "positive",
    tags: ["ADR cheatsheet", "Engineering cert"],
  },
  {
    id: "rev-004",
    reviewer: "Sarah Eltham",
    suburb: "Dapto",
    rating: 3,
    headline: "Good fit, quote walked up mid-job",
    body:
      "The job itself was clean — Magnaflow muffler on the Subaru Outback. But the original AUD 980 quote climbed to AUD 1,240 when they hit a seized hanger bolt. Heads-up on the price walk would have been better than a phone call after they’d already drilled it out.",
    timestamp: "3 weeks ago",
    helpful: 12,
    verified: true,
    verifiedDate: "Job 2026-05-01",
    sentiment: "mixed",
    tags: ["Subaru Outback", "Quote movement"],
    reply: {
      responderName: "Dani · Oak Flats Mufflermen",
      responderRole: "Workshop response",
      body:
        "Fair feedback Sarah — we’re trialling a quote-movement SMS so the customer signs off the new total before extra drill time.",
      timestamp: "2 weeks ago",
    },
  },
  {
    id: "rev-005",
    reviewer: "Hamish Doherty",
    suburb: "Oak Flats",
    rating: 2,
    headline: "Booking system double-allocated Bay 2",
    body:
      "Booked Bay 2 online for 09:00 and rocked up to find another car on the hoist. Ended up waiting 90 minutes for Bay 1 to clear. Crew were apologetic but the website let it happen.",
    timestamp: "1 month ago",
    helpful: 6,
    verified: true,
    verifiedDate: "Job 2026-04-24",
    sentiment: "negative",
    tags: ["Booking system", "Bay conflict"],
    reply: {
      responderName: "Brett · Oak Flats Mufflermen",
      responderRole: "Workshop response",
      body:
        "Apologies Hamish — we patched the bay-conflict bug the same week. Reach out and the next mid-pipe job is on us.",
      timestamp: "3 weeks ago",
    },
  },
]

export const DEMO_BREAKDOWN: ReadonlyArray<RatingBreakdownTier> = [
  { stars: 5, count: 312 },
  { stars: 4, count: 84 },
  { stars: 3, count: 22 },
  { stars: 2, count: 11 },
  { stars: 1, count: 6 },
]

export const DEMO_SENTIMENT_SEGMENTS: ReadonlyArray<DonutSegment> = [
  { label: "Positive", value: 312, tone: "green" },
  { label: "Mixed", value: 84, tone: "amber" },
  { label: "Negative", value: 17, tone: "red" },
]

export const DEMO_TREND: ReadonlyArray<number> = [
  4.4, 4.5, 4.6, 4.7, 4.6, 4.7, 4.8, 4.8, 4.7, 4.8,
  4.9, 4.8, 4.8, 4.9, 4.9, 4.7, 4.8, 4.9, 4.9, 4.8,
  4.8, 4.9, 4.9, 4.8, 4.9, 4.8, 4.9, 4.9, 5.0, 4.9,
]

export const DEMO_MODERATION_ROWS: ReadonlyArray<ModerationRow> = [
  {
    id: "mod-001",
    reviewerName: "Caelan Burrows",
    suburb: "Kiama",
    rating: 4,
    headline: "Clean install but pricier than the Wollongong shop",
    snippet:
      "Beautiful Manta install on the BT-50 — bay was spotless. AUD 2,180 was about AUD 200 above the Wollongong quote.",
    submittedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: "mod-002",
    reviewerName: "Anonymous",
    suburb: "—",
    rating: 1,
    headline: "WORST SHOP EVER call me on 0410… ",
    snippet:
      "These guys are crooks, I'll come back with a hammer, call my mobile 0410xxx xxx and I'll tell you everything.",
    submittedAt: "4 hours ago",
    status: "pending",
    autoFlag: "Possible spam · contact info",
  },
  {
    id: "mod-003",
    reviewerName: "Renee Costello",
    suburb: "Berkeley",
    rating: 5,
    headline: "Loved the courtesy text on quote movement",
    snippet:
      "Got an SMS when the hanger bolt was seized — confirmed the AUD 120 extra before they touched the impact gun. That’s how it should be done.",
    submittedAt: "Yesterday",
    status: "pending",
  },
  {
    id: "mod-004",
    reviewerName: "Jordan Vella",
    suburb: "Albion Park Rail",
    rating: 3,
    headline: "Job fine, the playlist in the waiting room is rough",
    snippet:
      "Honestly the install on the Hyundai i30 N was great but the waiting-room speaker was cooked. Off-topic? Maybe.",
    submittedAt: "Yesterday",
    status: "pending",
    autoFlag: "Possibly off-topic",
  },
]
