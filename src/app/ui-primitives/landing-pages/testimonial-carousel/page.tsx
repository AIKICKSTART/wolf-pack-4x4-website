import type { Metadata } from "next"

import { TestimonialCarousel } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { TESTIMONIALS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Testimonial carousel | Landing Pages",
  description:
    "Primitive 05 — testimonial carousel with avatar initials, rating, quote, and case-study link.",
}

export default function TestimonialCarouselPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Testimonial carousel"
        title="Testimonial carousel"
        description="Customer testimonials in a single-view carousel with prev / next, dot indicators, and an optional autoplay loop. Three states: default, autoplay, and a single-testimonial spotlight."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Testimonial carousel" },
        ]}
      />

      <span className={styles.stageCaption}>State · Default (manual nav)</span>
      <TestimonialCarousel
        kicker="What customers say"
        heading="Welds that hold up. Quotes that hold to the dollar."
        entries={TESTIMONIALS}
      />

      <span className={styles.stageCaption}>State · Autoplay (6s)</span>
      <TestimonialCarousel
        heading="From the South Coast workshop floor"
        entries={TESTIMONIALS}
        autoplayMs={6000}
      />

      <span className={styles.stageCaption}>State · Single testimonial spotlight</span>
      <TestimonialCarousel
        kicker="Council fleet sign-off"
        heading="Quarterly audit, zero downtime"
        entries={TESTIMONIALS.slice(3, 4)}
      />
    </main>
  )
}
