import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
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
import { Divider, SectionHeading } from "../../components/primitives"
import {
  ExhaustRepairSection,
  PerformanceExhaustSection,
  ServiceOverviewSection,
  WebsiteHeroSection,
  WorkshopTrustSection,
} from "../../section-library/web"
import {
  BlogFeatureSection,
  ContactEnquirySection,
  FaqAccordionSection as ContentFaqSection,
  LocalSeoSuburbSection,
  PartsProductSection,
  VideoHeroSection,
} from "../../section-library/content"

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
import styles from "./complete.module.css"

export const metadata: Metadata = {
  title: "Complete landing page | Landing Pages",
  description:
    "The fullest Oak Flats Mufflermen marketing landing page — every landing primitive plus the web and content section library (hero, services, exhaust repair, performance, trust, video, parts, blog, local-SEO, FAQ, contact form) sequenced into one cohesive, token-driven page.",
}

const SERVICES = [
  { value: "muffler", label: "Direct-fit muffler swap" },
  { value: "catback", label: "Full catback install" },
  { value: "headers", label: "Headers / extractors" },
  { value: "diesel", label: "Diesel DPF-back" },
  { value: "audit", label: "Fleet audit + ADR sign-off" },
  { value: "noise", label: "Drone / noise tuning" },
] as const

export default function CompleteLandingPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Landing pages / Complete"
        title="The complete landing page"
        description="Every section in the system, sequenced end-to-end — the website hero, the landing primitives, and the full web + content section library composed into one cohesive Oak Flats Mufflermen marketing page. Token-driven, light/dark, responsive 320 → 1920, and aligned with the live front landing and parts pages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Complete" },
        ]}
      />

      {/* ── Act 1 · Hook + trust ─────────────────────────────── */}
      <section className={styles.act} aria-label="Hero and trust">
        <WebsiteHeroSection />
        <SocialProofStrip
          kicker="Trust"
          heading="Welded in. Signed off. Backed by partners."
          rating={{ stars: 4.9, reviewCount: 612, source: "Google & Facebook" }}
          customerSinceLabel="Serving Illawarra customers since 1972"
          logos={SOCIAL_PROOF_LOGOS}
        />
        <MetricCounterStrip metrics={METRICS} />
      </section>

      <Divider label="Services" tone="red" decorative={false} />

      {/* ── Act 2 · What we do ───────────────────────────────── */}
      <section className={styles.act} aria-label="Services">
        <ServiceOverviewSection />
        <ExhaustRepairSection />
        <PerformanceExhaustSection />
        <FeatureGridSection
          kicker="What's inside every install"
          heading="Stainless. Signed off. Built for South Coast roads."
          body="Every Mufflermen install comes with the same six commitments. No upsells. No second visits."
          features={FEATURE_ITEMS}
        />
      </section>

      <Divider label="Proof" tone="amber" decorative={false} />

      {/* ── Act 3 · Proof ────────────────────────────────────── */}
      <section className={styles.act} aria-label="Proof and trust">
        <WorkshopTrustSection />
        <TestimonialCarousel
          kicker="What customers say"
          heading="Welds that hold up. Quotes that hold to the dollar."
          entries={TESTIMONIALS}
        />
        <CaseStudyCard caseStudy={CASE_STUDIES[0]!} />
      </section>

      <Divider label="Parts + suppliers" tone="teal" decorative={false} />

      {/* ── Act 4 · Cinematic + parts (aligns with parts pages) ─ */}
      <section className={styles.act} aria-label="Video, parts and partners">
        <VideoHeroSection />
        <PartsProductSection />
        <PartnerLogoGrid
          kicker="Suppliers + partners"
          heading="The brands welded into every Mufflermen install."
          body="South Coast distribution for the brands tradies trust — Manta, Pacemaker, X-Force, Redback, Genie."
          partners={PARTNERS}
        />
      </section>

      <Divider label="Decide" tone="red" decorative={false} />

      {/* ── Act 5 · Plans + comparison ───────────────────────── */}
      <section className={styles.act} aria-label="Plans and comparison">
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
      </section>

      <Divider label="Read + local" tone="amber" decorative={false} />

      {/* ── Act 6 · Content + local SEO ──────────────────────── */}
      <section className={styles.act} aria-label="Blog and local">
        <BlogFeatureSection />
        <LocalSeoSuburbSection />
      </section>

      <Divider label="Answers" tone="teal" decorative={false} />

      {/* ── Act 7 · Questions ────────────────────────────────── */}
      <section className={styles.act} aria-label="Frequently asked questions">
        <SectionHeading
          kicker="Workshop FAQ"
          title="The questions we hear before every booking"
          description="Two views — the quick workshop answers, then the deeper customer FAQ."
          size="md"
        />
        <FaqAccordionSection
          kicker="Workshop FAQ"
          heading="The questions we hear before every booking."
          body="Search by keyword — Mufflermen reception flags the answer."
          entries={FAQ_ENTRIES}
        />
        <ContentFaqSection />
      </section>

      <Divider label="Book it" tone="red" decorative={false} />

      {/* ── Act 8 · Convert ──────────────────────────────────── */}
      <section className={styles.act} aria-label="Book and enquire">
        <HeroCentredSection
          badge={{ label: "Bookings open Monday 7am" }}
          kicker="Ready when you are"
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

        <div className={styles.formRow}>
          <LeadCaptureForm
            kicker="Workshop quote"
            heading="Get a workshop quote in 24 hours."
            lede="Three short steps. We email a quote with line-item parts + labour within one business day."
            services={SERVICES}
          />
          <div className={styles.events}>
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <ContactEnquirySection />

        <CtaBandSection
          kicker="Ready to book?"
          title="Welded in. Signed off. Driven home Friday."
          subtext="Bookings open from Monday 7am. Most catbacks fitted same week — fleet jobs slotted overnight."
          primary={{ label: "Book a workshop slot", href: "#book" }}
          secondary={{ label: "Call the workshop", href: "tel:+61242567000", variant: "ghost" }}
        />
      </section>
    </main>
  )
}
