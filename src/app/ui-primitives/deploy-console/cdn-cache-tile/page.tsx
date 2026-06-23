import type { Metadata } from "next"

import { CdnCacheTile } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { CDN_PATTERNS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "CDN cache tile | Deploy console",
  description:
    "Primitive 07 — cache hit rate + TTL + purge controls per path pattern.",
}

export default function CdnCacheTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Tile"
        title="CDN cache tile"
        description="One tile per pattern. Hit ratio bar tone shifts from red through green based on the rate, TTL is shown in minutes and the live RPM is rendered with tabular-nums. The purge button disables while a purge is in flight."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "CDN cache tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · 98.4% hit ratio · immutable Next chunks</span>
        <CdnCacheTile pattern={CDN_PATTERNS[0]} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · 61.2% hit ratio · stale-while-revalidate search</span>
        <CdnCacheTile pattern={CDN_PATTERNS[2]} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · purge in flight · varies-by-suburb local SEO pages</span>
        <CdnCacheTile pattern={CDN_PATTERNS[3]} />
      </section>
    </main>
  )
}
