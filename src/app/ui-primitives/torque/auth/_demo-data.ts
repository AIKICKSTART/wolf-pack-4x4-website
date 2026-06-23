/**
 * Demo fixtures for the Torque auth surface (sign in / create account).
 *
 * Customer-visible identity is "Torque — your Mufflermen business assistant".
 * (Dev note: the back-end console this maps to is internally codenamed
 *  elsewhere; that codename must never surface in customer-visible copy.)
 */

import type {
  AuthAsideTestimonial,
  LegalFineprintLink,
  OauthProvider,
  SocialProofMark,
} from "../../components/auth"

/** Brand assistant name shown to the owner everywhere on this surface. */
export const TORQUE_NAME = "Torque" as const

/** Headline line for the marketing pane — required brand string. */
export const TORQUE_TAGLINE_LINE =
  "Torque — your Mufflermen business assistant" as const

/** Sign-up wizard step labels, shared by the stepper and the form. */
export const SIGNUP_STEPS = ["Account", "Workshop", "Verify"] as const

/** Provider order for the OAuth row on both panels. */
export const OAUTH_PROVIDERS: OauthProvider[] = ["google", "apple", "microsoft"]

/** Legal links rendered under each form. */
export const LEGAL_LINKS: LegalFineprintLink[] = [
  { label: "Workshop Operator Terms", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Cookie Notice", href: "#cookies" },
]

/** Workshop type options for the sign-up profile step. */
export const WORKSHOP_TYPES: ReadonlyArray<{ value: string; label: string }> = [
  { value: "", label: "Choose type" },
  { value: "independent", label: "Independent muffler & exhaust shop" },
  { value: "fleet", label: "Fleet & commercial servicing" },
  { value: "council", label: "Council / depot workshop" },
  { value: "performance", label: "Performance & fabrication" },
]

/** Region options seeded to the Illawarra footprint. */
export const SERVICE_REGIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "", label: "Choose region" },
  { value: "oak-flats", label: "Oak Flats & Shellharbour" },
  { value: "wollongong", label: "Wollongong" },
  { value: "albion-park", label: "Albion Park & Dapto" },
  { value: "kiama", label: "Kiama & the south coast" },
]

/**
 * Trust marks shown on the marketing pane — real-sounding Illawarra workshops
 * and fleets, no live customer names.
 */
export const TRUST_MARKS: SocialProofMark[] = [
  { label: "Shellharbour City Fleet" },
  { label: "Lakeside Towing" },
  { label: "Princes Hwy Auto" },
  { label: "Dapto Diesel Co." },
]

/** Owner testimonials for the rotating marquee on the marketing pane. */
export const AUTH_TESTIMONIALS: AuthAsideTestimonial[] = [
  {
    quote:
      "I send Torque one message before I open the roller door and the day's posts, quotes and call-backs are already drafted.",
    attribution: "Daniel",
    role: "Owner · Oak Flats Muffler Men",
  },
  {
    quote:
      "It writes like us — plain, local, no hype. Customers can't tell a bot drafted the winter exhaust post.",
    attribution: "Workshop front desk",
    role: "Oak Flats Muffler Men",
  },
  {
    quote:
      "Booking enquiries from the Illawarra get a same-day reply now, even when both hoists are flat out.",
    attribution: "Service coordinator",
    role: "Oak Flats Muffler Men",
  },
]

/** Bullet highlights under the marketing headline. */
export const BRAND_HIGHLIGHTS: ReadonlyArray<{
  stat: string
  label: string
}> = [
  { stat: "1", label: "message in — blog, socials & quotes out" },
  { stat: "24/7", label: "enquiry cover across the Illawarra" },
  { stat: "0", label: "agencies, retainers or guesswork" },
]

/** Email the demo two-factor step is sent to. */
export const VERIFY_EMAIL = "daniel@mufflermen.com.au" as const

/** Demo OTP the verify step accepts, so the scene completes end to end. */
export const VERIFY_DEMO_CODE = "041988" as const

/** Password strength tiers the sign-up flow treats as acceptable. */
export const STRONG_ENOUGH: ReadonlyArray<"fair" | "good" | "strong"> = [
  "fair",
  "good",
  "strong",
]
