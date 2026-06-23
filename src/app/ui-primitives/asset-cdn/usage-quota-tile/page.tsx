import type { Metadata } from "next"

import { UsageQuotaTile } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_QUOTAS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Usage quota tile | Asset CDN",
  description: "Primitive 09 — quota tile for bandwidth, storage, image ops, and video minutes.",
}

export default function UsageQuotaTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Quota tile"
        title="Usage quota tile"
        description="Bandwidth is the headline — 0.94 TB of the 1.2 TB monthly bucket, 78 percent used and 8.4 percent above the prior cycle. Storage, image ops, and video minutes sit alongside, each picking their own tone from the same threshold ramp."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Quota tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four resources</span>
        <div className={styles.demoQuotaGrid}>
          {DEMO_QUOTAS.map((quota) => (
            <UsageQuotaTile key={quota.resource} quota={quota} />
          ))}
        </div>
      </section>
    </main>
  )
}
