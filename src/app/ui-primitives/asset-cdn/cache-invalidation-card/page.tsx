import type { Metadata } from "next"

import { CacheInvalidationCard } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_CACHE_INVALIDATIONS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Cache invalidation card | Asset CDN",
  description: "Primitive 04 — cache invalidation card with pattern, scope, strategy, and affected count.",
}

export default function CacheInvalidationCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Cache invalidation card"
        title="Cache invalidation card"
        description="A single invalidation event — pattern, scope, strategy chip, affected URL count, and a pulsing propagation indicator. Three cards below cover hard purge, soft purge, and a tag-based purge tied to the 2604 dyno cycle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Cache invalidation card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three strategies</span>
        <div className={styles.demoQuotaGrid}>
          {DEMO_CACHE_INVALIDATIONS.map((invalidation) => (
            <CacheInvalidationCard key={invalidation.id} invalidation={invalidation} />
          ))}
        </div>
      </section>
    </main>
  )
}
