import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbTestimonial } from "../../components/locations-pages"

import { SUBURB_TESTIMONIALS } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Suburb testimonial | Locations & Suburbs",
  description:
    "Primitive 08 — suburb-tagged testimonial. Composes QuoteBubble + Avatar + Chip.",
}

export default function SuburbTestimonialPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Suburb testimonial"
        title="Suburb testimonial"
        description="Customer card adapter — composes QuoteBubble for the quote body, Avatar for the customer mark, and a teal Chip for the suburb tag."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Suburb testimonial" },
        ]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {SUBURB_TESTIMONIALS.map((entry) => (
          <SuburbTestimonial key={entry.customerName} {...entry} />
        ))}
      </div>
    </main>
  )
}
