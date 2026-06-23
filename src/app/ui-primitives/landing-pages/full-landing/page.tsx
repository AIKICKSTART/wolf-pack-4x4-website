import type { Metadata } from "next"

import {
  CaseStudyCard,
  ComparisonTableSection,
  CtaBandSection,
  EventCard,
  FaqAccordionSection,
  FeatureGridSection,
  HeroCentredSection,
  LeadCaptureForm,
  MetricCounterStrip,
  PartnerLogoGrid,
  PricingTableCard,
  SocialProofStrip,
  TestimonialCarousel,
} from "../../components/landing-pages"
import { ButtonDnaLink } from "../../components/button-dna-link"

import {
  CASE_STUDIES,
  COMPARISON_AXES,
  COMPARISON_ROWS,
  EVENTS,
  FAQ_ENTRIES,
  FEATURE_ITEMS,
  METRICS,
  MUFFLERMEN_TAGLINE,
  PARTNERS,
  PRICING_TIERS,
  SOCIAL_PROOF_LOGOS,
  TESTIMONIALS,
} from "../_mock-data"

export const metadata: Metadata = {
  title: "Full landing composition | Landing Pages",
  description:
    "Bonus composition — every landing primitive sequenced into the full Oak Flats Mufflermen marketing landing page.",
}

const SERVICES = [
  { value: "muffler", label: "Direct-fit muffler swap" },
  { value: "catback", label: "Full catback install" },
  { value: "headers", label: "Headers / extractors" },
  { value: "diesel", label: "Diesel DPF-back" },
  { value: "audit", label: "Fleet audit + ADR sign-off" },
  { value: "noise", label: "Drone / noise tuning" },
] as const

export default function FullLandingPage() {
  return (
    <main
      style={{
        display: "grid",
        gap: "clamp(32px, 4vw, 64px)",
        padding: "clamp(20px, 3vw, 36px)",
        maxWidth: 1280,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonDnaLink />
      </div>

      <HeroCentredSection
        badge={{ label: "Wollongong · Est 1972" }}
        kicker="Oak Flats Mufflermen"
        headline={MUFFLERMEN_TAGLINE}
        subhead="Hand-fitted stainless catbacks, ADR-signed installs, and a five-year weld warranty — under one tin roof since 1972."
        primary={{ label: "Book a workshop slot", href: "#book" }}
        secondary={{ label: "Call the workshop", href: "tel:+61242567000", variant: "ghost" }}
        pillars={[
          { label: "Years welding utes", value: "53+" },
          { label: "Vehicles serviced", value: "8,240" },
          { label: "Five-star reviews", value: "612" },
          { label: "Fleet vehicles on audit", value: "124" },
        ]}
        kinetic={{ fontId: "anton", motion: "letter-rise" }}
      />

      <SocialProofStrip
        kicker="Trust"
        heading="Welded in. Signed off. Backed by partners."
        rating={{ stars: 4.9, reviewCount: 612, source: "Google & Facebook" }}
        customerSinceLabel="Serving Illawarra customers since 1972"
        logos={SOCIAL_PROOF_LOGOS}
      />

      <MetricCounterStrip metrics={METRICS} />

      <FeatureGridSection
        kicker="What's inside every install"
        heading="Stainless. Signed off. Built for South Coast roads."
        body="Every Mufflermen install comes with the same six commitments. No upsells. No second visits."
        features={FEATURE_ITEMS}
      />

      <TestimonialCarousel
        kicker="What customers say"
        heading="Welds that hold up. Quotes that hold to the dollar."
        entries={TESTIMONIALS}
      />

      <PricingTableCard
        kicker="Plans"
        heading="Workshop Pass · Trade Pack · Fleet Plus"
        body="Pick a plan that fits your workload. Cancel anytime — no contracts beyond the current calendar month."
        tiers={PRICING_TIERS}
      />

      <ComparisonTableSection
        kicker="Compare options"
        heading="Mufflermen vs the chains vs mobile-only fitters"
        body="What you get with a Mufflermen install versus the alternatives on the South Coast."
        axes={COMPARISON_AXES}
        rows={COMPARISON_ROWS}
        selfAxisId="mufflermen"
      />

      <CaseStudyCard caseStudy={CASE_STUDIES[0]!} />

      <FaqAccordionSection
        kicker="Workshop FAQ"
        heading="The questions we hear before every booking."
        body="Search by keyword — Mufflermen reception flags the answer."
        entries={FAQ_ENTRIES}
      />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "clamp(20px, 3vw, 36px)",
        }}
      >
        <LeadCaptureForm
          kicker="Workshop quote"
          heading="Get a workshop quote in 24 hours."
          lede="Three short steps. We email a quote with line-item parts + labour within one business day."
          services={SERVICES}
        />
        <div
          style={{
            display: "grid",
            gap: 14,
          }}
        >
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <PartnerLogoGrid
        kicker="Suppliers + partners"
        heading="The brands welded into every Mufflermen install."
        body="South Coast distribution for the brands tradies trust — Manta, Pacemaker, X-Force, Redback, Genie."
        partners={PARTNERS}
      />

      <CtaBandSection
        kicker="Ready to book?"
        title="Welded in. Signed off. Driven home Friday."
        subtext="Bookings open from Monday 7am. Most catbacks fitted same week — fleet jobs slotted overnight."
        primary={{ label: "Book a workshop slot", href: "#book" }}
        secondary={{ label: "Call the workshop", href: "tel:+61242567000", variant: "ghost" }}
      />
    </main>
  )
}
