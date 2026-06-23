import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceTestimonials } from "../../components/services-areas-pages"
import { DEMO_TESTIMONIALS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service testimonials | Services & areas | UI Primitives",
  description:
    "Service-specific testimonials wall with star rating, customer name, vehicle, and quote.",
}

export default function ServiceTestimonialsScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06"
        title="Service testimonials"
        description="Service-category testimonials wall. Composes the marketing TestimonialWall primitive — surfaces the star rating, the customer name (with avatar), the customer vehicle, and the quote text."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service testimonials" },
        ]}
      />
      <ServiceTestimonials
        title="Recent Illawarra customers"
        testimonials={DEMO_TESTIMONIALS}
      />
    </main>
  )
}
