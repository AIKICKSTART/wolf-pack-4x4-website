import { TextFirstHero } from "../marketing"

export interface ServicesIndexHeroCta {
  label: string
  href: string
}

export interface ServicesIndexHeroProps {
  /** Small kicker rendered above the headline. */
  kicker: string
  /** Display headline. */
  headline: string
  /** Supporting copy under the headline. */
  copy: string
  /** Total number of services on the index. Rendered as a trust chip. */
  serviceCount: number
  /** Average lead time, e.g. "2-week build". Rendered as a trust chip. */
  leadTime: string
  /** Primary CTA — typically "Book". */
  primaryCta: ServicesIndexHeroCta
  /** Secondary CTA — typically "Get a quote". */
  secondaryCta: ServicesIndexHeroCta
  /** Optional override label on services-count trust item. */
  countChipLabel?: string
  /** Optional override label on lead-time trust item. */
  leadTimeChipLabel?: string
}

/**
 * Services-index hero adapter. Composes the marketing `TextFirstHero`
 * primitive and supplies services-specific kicker, count chip, and
 * lead-time chip via the `trust` strip.
 *
 * Wraps the underlying primitive in a `<div role="region">` so the
 * caller-facing surface still carries an explicit region landmark, mirroring
 * the live services index page anatomy.
 */
export function ServicesIndexHero({
  kicker,
  headline,
  copy,
  serviceCount,
  leadTime,
  primaryCta,
  secondaryCta,
  countChipLabel = "Services",
  leadTimeChipLabel = "Lead time",
}: ServicesIndexHeroProps) {
  return (
    <div role="region" aria-label="Services index hero">
      <TextFirstHero
        kicker={kicker}
        headline={headline}
        subhead={copy}
        layout="left-aligned"
        primaryAction={{ label: primaryCta.label, href: primaryCta.href, tone: "red" }}
        secondaryAction={{ label: secondaryCta.label, href: secondaryCta.href, tone: "chrome" }}
        trust={[
          { label: countChipLabel, value: serviceCount.toLocaleString("en-AU") },
          { label: leadTimeChipLabel, value: leadTime },
        ]}
      />
    </div>
  )
}

export default ServicesIndexHero
