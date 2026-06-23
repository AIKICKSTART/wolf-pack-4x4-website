import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AreaServicesGrid } from "../../components/services-areas-pages"
import { DEMO_AREA_SERVICES } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Area services grid | Services & areas | UI Primitives",
  description:
    "Grid of services available in an area with localised copy and a book CTA per service.",
}

export default function AreaServicesGridScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12"
        title="Area services grid"
        description="Grid of services available in this area. Composes the marketing FeatureGrid primitive — each service becomes a feature cell with the shared category icon, area-localised name, area-localised description, and a Book CTA link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Area services grid" },
        ]}
      />
      <AreaServicesGrid
        title="Services available in Illawarra"
        body="Every service runs out of the Albion Park Rail workshop, with mobile-fit runs for outer suburbs where the job allows."
        services={DEMO_AREA_SERVICES}
      />
    </main>
  )
}
