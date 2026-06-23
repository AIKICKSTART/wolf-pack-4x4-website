import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceTile } from "../../components/services-areas-pages"
import { DEMO_SERVICES } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service tile | Services & areas | UI Primitives",
  description:
    "Single service tile primitive — category iconmark, name, short description, lead-time + price chips.",
}

export default function ServiceTileScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02"
        title="Service tile"
        description="Single service tile rendered in the services index grid. Composes the shared icons family for the category iconmark and a tone-coded accent rail. Each tile carries the category type chip, lead-time chip, and average-price chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service tile" },
        ]}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {DEMO_SERVICES.map((service) => (
          <ServiceTile
            key={service.id}
            category={service.category}
            name={service.name}
            description={service.shortDescription}
            leadTime={service.leadTime}
            averagePriceAud={service.averagePriceAud}
            accent={service.accent}
            href={`/ui-primitives/services-areas-pages/service-detail-hero`}
          />
        ))}
      </div>
    </main>
  )
}
