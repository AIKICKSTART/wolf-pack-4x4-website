/**
 * Services + area-hub primitives barrel for the Oak Flats Mufflermen
 * design system. Each export is a typed adapter over a shared primitive
 * (or a small net-new composition where no shared shape fits).
 */

export type {
  AreaRegion,
  AreaStat,
  AreaSuburb,
  CoverageDensity,
  ServiceAccent,
  ServiceCategory,
  ServiceDescriptor,
  ServiceFaq,
  ServiceLeadTime,
  ServiceProcessStep,
  ServiceTestimonial,
  ServicesCrumb,
} from "./services-areas-types"

export {
  AREA_REGION_LABEL,
  COVERAGE_DENSITY_LABEL,
  SERVICE_CATEGORY_LABEL,
  SERVICE_LEAD_TIME_LABEL,
  formatAudFromPrice,
} from "./services-areas-types"

export { ServicesIndexHero } from "./services-index-hero"
export type {
  ServicesIndexHeroCta,
  ServicesIndexHeroProps,
} from "./services-index-hero"

export { ServiceTile } from "./service-tile"
export type { ServiceTileProps } from "./service-tile"

export { ServiceDetailHero } from "./service-detail-hero"
export type {
  ServiceDetailHeroCta,
  ServiceDetailHeroProps,
} from "./service-detail-hero"

export { ServiceProcessSteps } from "./service-process-steps"
export type { ServiceProcessStepsProps } from "./service-process-steps"

export { ServiceFaqBlock } from "./service-faq-block"
export type { ServiceFaqBlockProps } from "./service-faq-block"

export { ServiceTestimonials } from "./service-testimonials"
export type { ServiceTestimonialsProps } from "./service-testimonials"

export { ServicePricingBand } from "./service-pricing-band"
export type { ServicePricingBandProps } from "./service-pricing-band"

export { ServiceCoverageCard } from "./service-coverage-card"
export type {
  ServiceCoverageCardCta,
  ServiceCoverageCardProps,
} from "./service-coverage-card"

export { AreaHubHero } from "./area-hub-hero"
export type {
  AreaHubHeroCta,
  AreaHubHeroProps,
} from "./area-hub-hero"

export { AreaCoverageMapMini } from "./area-coverage-map-mini"
export type {
  AreaCoverageMapMiniProps,
  AreaCoverageMapMiniWorkshop,
} from "./area-coverage-map-mini"

export { AreaStatsTrio } from "./area-stats-trio"
export type { AreaStatsTrioProps } from "./area-stats-trio"

export { AreaServicesGrid } from "./area-services-grid"
export type {
  AreaServiceEntry,
  AreaServicesGridProps,
} from "./area-services-grid"

export { ServicesBreadcrumb } from "./services-breadcrumb"
export type { ServicesBreadcrumbProps } from "./services-breadcrumb"

export { AreaSuburbListCard } from "./area-suburb-list-card"
export type { AreaSuburbListCardProps } from "./area-suburb-list-card"
