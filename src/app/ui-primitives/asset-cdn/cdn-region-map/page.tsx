import type { Metadata } from "next"

import { CdnRegionMap } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_REGIONS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "CDN region map | Asset CDN",
  description: "Primitive 07 — world map of CDN regions with cache-hit rate, throughput, latency, and PoP count.",
}

export default function CdnRegionMapScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Region map"
        title="CDN region map"
        description="Global cache-hit telemetry tuned for OFM's Australian audience. Sydney sits at 96.8 percent, Melbourne and Perth close behind, then the Auckland and Singapore exit nodes. North America and Europe round out the long tail with origin-pull fall-throughs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Region map" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 8 regions</span>
        <CdnRegionMap regions={DEMO_REGIONS} highlightId="syd" />
      </section>
    </main>
  )
}
