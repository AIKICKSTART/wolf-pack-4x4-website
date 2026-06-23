/**
 * Shared types for the landing-pages primitive family.
 *
 * Authored for Oak Flats Mufflermen marketing surfaces. Tone tokens stay
 * aligned with the umbrella `--primitive-*` palette so each primitive can be
 * dropped into any landing surface — dark canonical or light polished.
 */
import type { ReactNode } from "react"

export type LandingTone = "red" | "amber" | "teal" | "green" | "chrome"

export type LandingAccent = "red" | "amber" | "teal" | "green"

export type LandingButtonVariant = "primary" | "secondary" | "ghost"

export interface LandingAction {
  label: string
  href: string
  variant?: LandingButtonVariant
  /** Marks a `tel:` or `mailto:` link so the icon switches to phone/mail. */
  kind?: "default" | "phone" | "mail" | "download"
}

export interface LandingBadge {
  label: string
  tone?: LandingAccent
}

export interface LandingRating {
  /** 1-5 stars, supports half steps internally via display only. */
  stars: number
  reviewCount: number
  source?: string
}

export interface LandingMediaTile {
  /** Decorative label used by the placeholder media block. */
  label: string
  caption?: string
  tone?: LandingAccent
  /** Optional kicker shown in the corner of the placeholder. */
  badge?: string
}

export interface LandingHeroSplitCopy {
  badge?: LandingBadge
  kicker: string
  /** Allow ReactNode so the consumer can drop KineticText headings in. */
  headline: ReactNode
  subhead: string
  bullets?: ReadonlyArray<string>
  primary: LandingAction
  secondary?: LandingAction
}

export interface LandingHeroCentredCopy {
  badge?: LandingBadge
  kicker: string
  headline: ReactNode
  subhead: string
  primary: LandingAction
  secondary?: LandingAction
  /** Trust-strip below the CTA: short labelled stats. */
  pillars?: ReadonlyArray<{ label: string; value: string }>
}

export interface LandingSocialProofLogo {
  id: string
  label: string
  /** Short helper text under the logo, e.g. "Partner since 2014". */
  caption?: string
}

export interface LandingFeatureItem {
  id: string
  iconId: LandingFeatureIcon
  title: string
  body: string
  /** Optional inline link below the body. */
  link?: { label: string; href: string }
}

export type LandingFeatureIcon =
  | "wrench"
  | "shield"
  | "flame"
  | "gauge"
  | "spark"
  | "calendar"
  | "map"
  | "phone"
  | "truck"
  | "stack"

export interface LandingTestimonial {
  id: string
  quote: string
  name: string
  /** Suburb / vehicle line. */
  role: string
  /** Optional case study link. */
  caseStudyHref?: string
  rating: 1 | 2 | 3 | 4 | 5
}

export interface LandingPricingFeature {
  label: string
  included: boolean
}

export interface LandingPricingTier {
  id: string
  name: string
  tagline: string
  monthlyPrice: number
  setupNote?: string
  features: ReadonlyArray<LandingPricingFeature>
  cta: LandingAction
  recommended?: boolean
  accent?: LandingAccent
}

export interface LandingComparisonAxis {
  id: string
  label: string
}

export interface LandingComparisonRow {
  id: string
  /** Capability or service being compared. */
  label: string
  /** Value/check for each axis. Length must match axes. */
  values: ReadonlyArray<LandingComparisonCell>
}

export interface LandingComparisonCell {
  state: "yes" | "no" | "partial"
  detail?: string
}

export interface LandingFaqEntry {
  id: string
  question: string
  answer: string
  tags?: ReadonlyArray<string>
}

export interface LandingMetric {
  id: string
  /** Display number, e.g. 4250. */
  value: number
  suffix?: string
  prefix?: string
  label: string
  caption?: string
  decimals?: number
}

export interface LandingCaseStudy {
  id: string
  client: string
  vehicle: string
  problem: string
  solution: string
  results: ReadonlyArray<{ label: string; value: string }>
  pdfHref: string
}

export interface LandingEvent {
  id: string
  title: string
  date: string
  /** ISO datetime used for the time tag. */
  isoDate: string
  location: string
  summary: string
  rsvpHref: string
  /** Capacity for the "X spots left" line. */
  capacity?: { taken: number; total: number }
  tone?: LandingAccent
}

export interface LandingPartner {
  id: string
  name: string
  href: string
  category: string
  caption?: string
}

export interface LandingLeadFormValues {
  name: string
  email: string
  phone: string
  vehicle: string
  service: string
  notes?: string
}

export type LandingLeadFormStep = 0 | 1 | 2

export interface LandingMediaTone {
  tone: LandingAccent
}
