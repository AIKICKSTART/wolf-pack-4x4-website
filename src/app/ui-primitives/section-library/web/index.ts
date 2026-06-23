/**
 * Web section library — public barrel.
 *
 * Five production-ready, token-driven Oak Flats Mufflermen page sections, each
 * composed from existing UI primitives and each shipping a `BlockManifest` so
 * the CMS canvas can drag, edit, and document it:
 *
 *   1. Website hero          — section/website-hero
 *   2. Service overview      — section/service-overview
 *   3. Exhaust repair        — section/exhaust-repair
 *   4. Performance exhaust   — section/performance-exhaust
 *   5. Workshop trust        — section/workshop-trust
 *
 * TOKEN-DRIVEN ONLY: every section reads central `--primitive-*` tokens; no raw
 * color/size/space/radius/motion literals. CTAs use the `--primitive-btn-*`
 * red→amber metallic DNA via the underlying marketing primitives.
 */

import type { BlockManifest } from "../../builder/model"

// — Website hero ———————————————————————————————————————————
export { WebsiteHeroSection } from "./website-hero/website-hero-section"
export type { WebsiteHeroSectionProps } from "./website-hero/website-hero-section"
export { websiteHeroManifest } from "./website-hero/website-hero-section.manifest"

// — Service overview ———————————————————————————————————————
export { ServiceOverviewSection } from "./service-overview/service-overview-section"
export type {
  ServiceOverviewItem,
  ServiceOverviewSectionProps,
} from "./service-overview/service-overview-section"
export { serviceOverviewManifest } from "./service-overview/service-overview-section.manifest"

// — Exhaust repair —————————————————————————————————————————
export { ExhaustRepairSection } from "./exhaust-repair/exhaust-repair-section"
export type { ExhaustRepairSectionProps } from "./exhaust-repair/exhaust-repair-section"
export { exhaustRepairManifest } from "./exhaust-repair/exhaust-repair-section.manifest"

// — Performance exhaust ————————————————————————————————————
export { PerformanceExhaustSection } from "./performance-exhaust/performance-exhaust-section"
export type { PerformanceExhaustSectionProps } from "./performance-exhaust/performance-exhaust-section"
export { performanceExhaustManifest } from "./performance-exhaust/performance-exhaust-section.manifest"

// — Workshop trust —————————————————————————————————————————
export { WorkshopTrustSection } from "./workshop-trust/workshop-trust-section"
export type { WorkshopTrustSectionProps } from "./workshop-trust/workshop-trust-section"
export { workshopTrustManifest } from "./workshop-trust/workshop-trust-section.manifest"

// — Aggregate ——————————————————————————————————————————————

import { websiteHeroManifest } from "./website-hero/website-hero-section.manifest"
import { serviceOverviewManifest } from "./service-overview/service-overview-section.manifest"
import { exhaustRepairManifest } from "./exhaust-repair/exhaust-repair-section.manifest"
import { performanceExhaustManifest } from "./performance-exhaust/performance-exhaust-section.manifest"
import { workshopTrustManifest } from "./workshop-trust/workshop-trust-section.manifest"

/** Every web section manifest, in showcase order. */
export const webSectionManifests: readonly BlockManifest[] = [
  websiteHeroManifest,
  serviceOverviewManifest,
  exhaustRepairManifest,
  performanceExhaustManifest,
  workshopTrustManifest,
]
