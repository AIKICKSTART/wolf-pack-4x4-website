import type { Metadata } from "next"

import { SystemStatusBanner } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import {
  STATUS_DEGRADED,
  STATUS_INCIDENT,
  STATUS_OPERATIONAL,
} from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "System status banner | Admin hub",
  description:
    "Primitive 03 — top banner reporting all-good, degraded, or active incident with link out to the live status page. Three states — operational, degraded with affected services, active incident.",
}

export default function SystemStatusBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / System status banner"
        title="Top-of-hub status banner"
        description="Reports the workshop platform health at a glance — pulse indicator, headline state, affected services and a CTA into the live status page. Three states — green operational, amber Hermes degraded, red Tyro incident."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "System status banner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · all systems operational</span>
            <SystemStatusBanner status={STATUS_OPERATIONAL} />
          </div>
          <div>
            <span className={styles.demoStateLabel}>State 2 · Hermes degraded</span>
            <SystemStatusBanner status={STATUS_DEGRADED} />
          </div>
          <div>
            <span className={styles.demoStateLabel}>State 3 · active incident</span>
            <SystemStatusBanner status={STATUS_INCIDENT} />
          </div>
        </div>
      </section>
    </main>
  )
}
