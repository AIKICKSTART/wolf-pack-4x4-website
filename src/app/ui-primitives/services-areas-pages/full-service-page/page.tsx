import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ServiceCoverageCard,
  ServiceDetailHero,
  ServiceFaqBlock,
  ServicePricingBand,
  ServiceProcessSteps,
  ServiceTestimonials,
  ServicesBreadcrumb,
} from "../../components/services-areas-pages"
import {
  DEMO_FAQS,
  DEMO_PROCESS_STEPS,
  DEMO_SERVICE_CRUMBS,
  DEMO_SUBURB_CHIPS,
  DEMO_TESTIMONIALS,
} from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Full service page composition | Services & areas | UI Primitives",
  description:
    "End-to-end service detail page composition — breadcrumb, detail hero, process steps, pricing band, coverage card, FAQ, and testimonials.",
}

export default function FullServicePageScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Full composition"
        title="Full service page"
        description="A full service detail page wired from the 14 primitives. Breadcrumb → detail hero → process steps → pricing band → coverage card → FAQ → testimonials, in the same order as the live service detail surface."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Full service page" },
        ]}
      />
      <div style={{ display: "grid", gap: 18 }}>
        <ServicesBreadcrumb crumbs={DEMO_SERVICE_CRUMBS} />
        <ServiceDetailHero
          kicker="Workshop service"
          headline="Custom stainless cat-back exhausts"
          body="Mandrel-bent stainless cat-backs built around the vehicle, the sound target, and the way it is actually driven. Fitted in-house at Albion Park Rail."
          soundChip="Deeper note"
          complianceChip="ADR-compliant"
          performanceChip="+12% flow"
          primaryCta={{ label: "Book service", href: "#book" }}
          secondaryCta={{ label: "Get a quote", href: "#quote" }}
        />
        <ServiceProcessSteps
          title="From drop-off to handover"
          steps={DEMO_PROCESS_STEPS}
        />
        <ServicePricingBand fromPriceAud={1450} />
        <ServiceCoverageCard
          title="Where custom exhausts run"
          suburbs={DEMO_SUBURB_CHIPS}
          averageDriveTime="14 min"
          seeAllCta={{
            label: "See all suburbs",
            href: "/ui-primitives/services-areas-pages/area-suburb-list-card",
          }}
        />
        <ServiceFaqBlock title="Questions customers ask" faqs={DEMO_FAQS} />
        <ServiceTestimonials
          title="Recent Illawarra customers"
          testimonials={DEMO_TESTIMONIALS}
        />
      </div>
    </main>
  )
}
