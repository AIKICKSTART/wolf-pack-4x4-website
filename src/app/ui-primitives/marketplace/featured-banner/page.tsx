import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  FeaturedBanner,
  type FeaturedBannerSlide,
} from "../../components/marketplace/featured-banner"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Featured banner | Marketplace | UI Primitives",
  description: "Marketplace featured carousel banner with dot indicators and install CTA.",
}

const SLIDES: ReadonlyArray<FeaturedBannerSlide> = [
  {
    id: "feat-hermes",
    kicker: "Editor's pick",
    title: "Hermes content sync",
    description:
      "One-click mirror from the Hermes editor into the public mufflermen.com.au site — keeps your shop's blog and Mufflerpulse audio show notes in lockstep.",
    ctaLabel: "Install Hermes",
    badgeLabel: "HX",
  },
  {
    id: "feat-stripe",
    kicker: "Pay with confidence",
    title: "Stripe payments",
    description:
      "Take Apple Pay, Afterpay and card payments through the workshop quoting tool with overnight Xero reconciliation.",
    ctaLabel: "Install Stripe",
    badgeLabel: "ST",
  },
  {
    id: "feat-quote",
    kicker: "AI for the workshop",
    title: "Quote drafter",
    description:
      "Voice memo in, draft quote out. Front-of-house reviews and signs — no more lost notes from the bay floor.",
    ctaLabel: "Try Quote drafter",
    badgeLabel: "AI",
  },
]

export default function FeaturedBannerShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.3 / Featured banner"
        title="Featured banner"
        description="Carousel-style hero with auto-advance, dot pagination, and a single primary install CTA per slide."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Featured banner" },
        ]}
      />

      <section className={styles.section} aria-labelledby="featured-banner-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Carousel</span>
          <h2 id="featured-banner-demo" className={styles.sectionTitle}>
            Three featured plugins — 8 second auto-advance
          </h2>
        </header>
        <FeaturedBanner slides={SLIDES} autoplayMs={8000} />
      </section>
    </main>
  )
}
