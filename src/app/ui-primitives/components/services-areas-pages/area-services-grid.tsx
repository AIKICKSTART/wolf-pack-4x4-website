import {
  BrakeRotorIcon,
  ClipboardCheckIcon,
  ExhaustPipeIcon,
  ExtractorHeadersIcon,
  MigWelderIcon,
  MufflerIcon,
  TachometerIcon,
} from "../icons"
import { FeatureGrid } from "../marketing"

import type { ServiceCategory } from "./services-areas-types"
import { SERVICE_CATEGORY_LABEL } from "./services-areas-types"

export interface AreaServiceEntry {
  id: string
  category: ServiceCategory
  /** Localised name for this area, e.g. "Custom exhausts Illawarra". */
  localisedName: string
  /** Two-line area-specific description. */
  description: string
  /** Book CTA href, e.g. `/services/custom-exhaust?area=illawarra`. */
  bookHref: string
}

export interface AreaServicesGridProps {
  /** Section kicker. */
  kicker?: string
  /** Section heading, e.g. "Services available in Illawarra". */
  title: string
  /** Optional body copy. */
  body?: string
  /** Localised services in this area. */
  services: ReadonlyArray<AreaServiceEntry>
}

function CategoryIcon({ category }: { category: ServiceCategory }) {
  switch (category) {
    case "custom-exhaust":
      return <ExhaustPipeIcon size={28} tone="red" />
    case "muffler-repair":
      return <MufflerIcon size={28} tone="amber" />
    case "extractors-headers":
      return <ExtractorHeadersIcon size={28} tone="teal" />
    case "performance-chips":
      return <TachometerIcon size={28} tone="red" />
    case "cold-air-induction":
      return <BrakeRotorIcon size={28} tone="teal" />
    case "tig-fabrication":
      return <MigWelderIcon size={28} tone="amber" />
    case "audit-inspection":
      return <ClipboardCheckIcon size={28} tone="green" />
    default:
      return null
  }
}

/**
 * Area services grid adapter. Composes the marketing `FeatureGrid`
 * primitive — each service in the area becomes a feature with the shared
 * icon, area-localised name, area-localised description, and a Book CTA
 * link.
 */
export function AreaServicesGrid({
  kicker = "Available services",
  title,
  body,
  services,
}: AreaServicesGridProps) {
  return (
    <FeatureGrid
      kicker={kicker}
      heading={title}
      body={body}
      columns={3}
      features={services.map((entry) => ({
        id: entry.id,
        icon: <CategoryIcon category={entry.category} />,
        title: entry.localisedName,
        description: entry.description,
        href: entry.bookHref,
        linkLabel: `Book ${SERVICE_CATEGORY_LABEL[entry.category]}`,
      }))}
    />
  )
}

export default AreaServicesGrid
