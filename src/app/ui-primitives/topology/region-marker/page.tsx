import type { Metadata } from "next"

import { RegionMarker } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Region marker | Topology",
  description:
    "Primitive 07 — region marker chip with ISO flag glyph (or pin fallback), id, label and datacentre count chip.",
}

export default function RegionMarkerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Region marker"
        title="Region marker"
        description="A compact region marker chip — region id, display label, optional ISO flag glyph, and a datacentre count chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Region marker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Solid surface</span>
        <div className={styles.miniRow}>
          <RegionMarker
            region={{ id: "ap-southeast-2", label: "Sydney", country: "AU", datacentres: 3 }}
          />
          <RegionMarker
            region={{ id: "ap-southeast-1", label: "Singapore", country: "SG", datacentres: 3 }}
          />
          <RegionMarker
            region={{ id: "us-west-2", label: "Oregon", country: "US", datacentres: 4 }}
          />
          <RegionMarker
            region={{ id: "eu-central-1", label: "Frankfurt", country: "DE", datacentres: 3 }}
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Ghost variant — no flag</span>
        <div className={styles.miniRow}>
          <RegionMarker
            region={{ id: "ap-southeast-2", label: "Sydney", datacentres: 3 }}
            ghost
          />
          <RegionMarker
            region={{ id: "ap-southeast-4", label: "Melbourne", datacentres: 2 }}
            ghost
          />
        </div>
      </section>
    </main>
  )
}
