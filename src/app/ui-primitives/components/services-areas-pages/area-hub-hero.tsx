import { TextFirstHero } from "../marketing"

import {
  AREA_REGION_LABEL,
  type AreaRegion,
} from "./services-areas-types"

export interface AreaHubHeroCta {
  label: string
  href: string
}

export interface AreaHubHeroProps {
  /** Kicker, e.g. "Regional hub". */
  kicker?: string
  /** Region — drives the headline label fallback. */
  region: AreaRegion
  /** Optional headline override. Defaults to the friendly region name. */
  headlineOverride?: string
  /** Supporting copy. */
  copy: string
  /** Suburbs count chip value. */
  suburbsCount: number
  /** Workshops count chip value. */
  workshopsCount: number
  /** Primary CTA — typically "Book service". */
  primaryCta: AreaHubHeroCta
  /** Secondary CTA — typically "Get a quote". */
  secondaryCta: AreaHubHeroCta
  /** Optional aria-label override for the hero region. */
  ariaLabel?: string
}

/**
 * Area hub hero adapter. Composes the marketing `TextFirstHero` primitive
 * in `split-credit` layout — the region name is the headline, the
 * suburbs/workshops counts become the trust indicators, and a small
 * "Mufflermen workshop" credit anchor is supplied to balance the layout.
 */
export function AreaHubHero({
  kicker = "Regional hub",
  region,
  headlineOverride,
  copy,
  suburbsCount,
  workshopsCount,
  primaryCta,
  secondaryCta,
  ariaLabel,
}: AreaHubHeroProps) {
  const headline = headlineOverride ?? AREA_REGION_LABEL[region]
  const label = ariaLabel ?? `${headline} area hub hero`

  return (
    <div role="region" aria-label={label}>
      <TextFirstHero
        kicker={kicker}
        headline={headline}
        subhead={copy}
        layout="split-credit"
        credit={`Oak Flats Muffler Men · ${AREA_REGION_LABEL[region]} coverage`}
        primaryAction={{ label: primaryCta.label, href: primaryCta.href, tone: "red" }}
        secondaryAction={{ label: secondaryCta.label, href: secondaryCta.href, tone: "chrome" }}
        trust={[
          { label: "Suburbs", value: suburbsCount.toLocaleString("en-AU") },
          { label: "Workshops", value: workshopsCount.toLocaleString("en-AU") },
        ]}
      />
    </div>
  )
}

export default AreaHubHero
