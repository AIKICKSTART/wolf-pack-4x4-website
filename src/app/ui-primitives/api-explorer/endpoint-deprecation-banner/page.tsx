import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EndpointDeprecationBanner } from "../../components/api-explorer"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Deprecation banner | API Explorer",
  description:
    "Primitive 14 — endpoint deprecation banner. Three states: standard, with migration note, sunset imminent.",
}

export default function DeprecationBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Deprecation banner"
        title="Endpoint deprecation banner"
        description="Pinned banner above a deprecated endpoint's docs. Surfaces the deprecated path, a clear replacement link, and the sunset date. Variants exist for added migration context and final-90-day warnings."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Deprecation banner" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Standard banner">
        <span className={styles.sectionLabel}>State 01 / Standard</span>
        <EndpointDeprecationBanner
          endpoint="POST /v0/quote"
          replacementEndpoint="POST /v1/quotes"
          replacementHref="/ui-primitives/api-explorer/endpoint-detail-card"
          sunsetDate="2026-12-31"
        />
      </section>

      <section className={styles.routeSection} aria-label="Migration note">
        <span className={styles.sectionLabel}>State 02 / With migration note</span>
        <EndpointDeprecationBanner
          endpoint="GET /v0/parts"
          replacementEndpoint="GET /v1/parts"
          replacementHref="/ui-primitives/api-explorer/endpoint-detail-card"
          sunsetDate="2026-12-31"
          message="The shape changes — line items live under data[] now, and stock counts are scoped per suburb. See the migration guide."
        />
      </section>

      <section className={styles.routeSection} aria-label="Sunset imminent">
        <span className={styles.sectionLabel}>State 03 / Sunset imminent</span>
        <EndpointDeprecationBanner
          endpoint="POST /v0/booking"
          replacementEndpoint="POST /v1/bookings"
          replacementHref="/ui-primitives/api-explorer/endpoint-detail-card"
          sunsetDate="2026-06-30 — 32 days left"
          headline="Final 30 days — migrate now"
          message="After 2026-06-30 the endpoint returns 410 Gone. The shop kiosk image must be updated to v1 before the upgrade window."
        />
      </section>
    </main>
  )
}
