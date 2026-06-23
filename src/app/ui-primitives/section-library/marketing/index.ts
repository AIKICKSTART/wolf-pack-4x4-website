/**
 * Marketing section library — public barrel.
 *
 * Six reusable, production-ready Mufflermen page sections, each composed from
 * existing UI primitives, fully token-driven (carbon/metallic via the central
 * `--primitive-*` tokens; CTAs use the metallic-red→amber button DNA), and each
 * paired with a `BlockManifest` so the builder canvas can drag it.
 *
 *  1. CTA banner            — booking conversion banner
 *  2. Before / after gallery — install proof grid with toggles
 *  3. Testimonials & reviews — ReviewSummaryCard + TestimonialWall
 *  4. Promo campaign        — offer banner + StatCounterRow + FeatureSpotlight
 *  5. Social campaign       — channel rail + ProcessSteps + NewsletterCta
 *  6. Pricing & service     — PricingCtaSection + FeatureGrid
 */

import type { BlockManifest } from "../../builder/model/manifest"

// — Components ————————————————————————————————————————————————
export { CtaSection } from "./sections/cta-section"
export type {
  CtaSectionAction,
  CtaSectionAssurance,
  CtaSectionProps,
} from "./sections/cta-section"

export { BeforeAfterGallery } from "./sections/before-after-gallery"
export type {
  BeforeAfterGalleryProps,
  BeforeAfterItem,
} from "./sections/before-after-gallery"

export { TestimonialsSection } from "./sections/testimonials-section"
export type {
  TestimonialsSectionProps,
  TestimonialsSectionSummary,
} from "./sections/testimonials-section"

export { PromoCampaignSection } from "./sections/promo-campaign-section"
export type { PromoCampaignSectionProps } from "./sections/promo-campaign-section"

export { SocialCampaignSection } from "./sections/social-campaign-section"
export type {
  SocialCampaignSectionProps,
  SocialChannelStat,
} from "./sections/social-campaign-section"

export { PricingServiceSection } from "./sections/pricing-service-section"
export type { PricingServiceSectionProps } from "./sections/pricing-service-section"

// — Shared icon set ———————————————————————————————————————————
export { sectionIcon } from "./icons"
export type { SectionIconName } from "./icons"

// — Manifests —————————————————————————————————————————————————
export { ctaSectionManifest } from "./sections/cta-section.manifest"
export { beforeAfterGalleryManifest } from "./sections/before-after-gallery.manifest"
export { testimonialsSectionManifest } from "./sections/testimonials-section.manifest"
export { promoCampaignSectionManifest } from "./sections/promo-campaign-section.manifest"
export { socialCampaignSectionManifest } from "./sections/social-campaign-section.manifest"
export { pricingServiceSectionManifest } from "./sections/pricing-service-section.manifest"

import { ctaSectionManifest } from "./sections/cta-section.manifest"
import { beforeAfterGalleryManifest } from "./sections/before-after-gallery.manifest"
import { testimonialsSectionManifest } from "./sections/testimonials-section.manifest"
import { promoCampaignSectionManifest } from "./sections/promo-campaign-section.manifest"
import { socialCampaignSectionManifest } from "./sections/social-campaign-section.manifest"
import { pricingServiceSectionManifest } from "./sections/pricing-service-section.manifest"

/** Every marketing section manifest, in showcase order. */
export const marketingSectionManifests: readonly BlockManifest[] = [
  ctaSectionManifest,
  beforeAfterGalleryManifest,
  testimonialsSectionManifest,
  promoCampaignSectionManifest,
  socialCampaignSectionManifest,
  pricingServiceSectionManifest,
]
