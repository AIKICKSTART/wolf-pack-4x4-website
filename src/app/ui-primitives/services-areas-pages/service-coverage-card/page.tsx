import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceCoverageCard } from "../../components/services-areas-pages"
import { DEMO_SUBURB_CHIPS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service coverage card | Services & areas | UI Primitives",
  description:
    "Coverage card showing where a service runs — radius rings, drive time, suburb chips.",
}

export default function ServiceCoverageCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08"
        title="Service coverage card"
        description="Coverage card rendered on the service detail page. Composes the maps StaticMapCanvas and ServiceRadiusOverlay for the radius rings, surfaces the average drive time as a stat, lists the suburbs covered as a chip cloud, and exposes a 'see all suburbs' CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service coverage card" },
        ]}
      />
      <ServiceCoverageCard
        title="Where custom exhausts run"
        suburbs={DEMO_SUBURB_CHIPS}
        averageDriveTime="14 min"
        seeAllCta={{
          label: "See all suburbs",
          href: "/ui-primitives/services-areas-pages/area-suburb-list-card",
        }}
      />
    </main>
  )
}
