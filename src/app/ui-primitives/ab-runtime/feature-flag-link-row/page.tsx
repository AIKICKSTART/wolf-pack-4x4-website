import type { Metadata } from "next"

import { FeatureFlagLinkRow } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Feature flag link row | A/B runtime",
  description:
    "Primitive 14 — linked feature flag row showing environment, status, and rollout percent.",
}

export default function FeatureFlagLinkRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Link"
        title="Feature flag link row"
        description="A flag-link row that wires an experiment to its underlying feature flag. Surfaces environment (DEV / STG / PRD), current status, and the rollout percent. Clickable into the flag detail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Feature flag link row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four linked flags</span>
        <div className={styles.rowGroup}>
          <FeatureFlagLinkRow
            flagKey="quote_pdf_brand_header_v2"
            name="Quote PDF — brand header v2"
            description="Renders the brand-led header + structured line items on quote PDFs."
            environment="prod"
            status="ramping"
            rolloutPct={50}
            href="/ui-primitives/feature-flags/flag-card"
          />
          <FeatureFlagLinkRow
            flagKey="cta_suburb_pinned"
            name="Suburb-pinned landing CTA"
            description="Replaces generic CTA copy with suburb name on suburb landing pages."
            environment="prod"
            status="on"
            rolloutPct={30}
            href="/ui-primitives/feature-flags/flag-card"
          />
          <FeatureFlagLinkRow
            flagKey="nav_mobile_dock"
            name="Mobile bottom dock"
            description="Replaces hamburger sidebar with bottom-dock nav on mobile."
            environment="prod"
            status="on"
            rolloutPct={100}
            href="/ui-primitives/feature-flags/flag-card"
          />
          <FeatureFlagLinkRow
            flagKey="parts_ar_overlay"
            name="Parts AR overlay"
            description="3D parts viewer with WebXR AR overlay on supported devices."
            environment="staging"
            status="killed"
            rolloutPct={0}
            href="/ui-primitives/feature-flags/flag-card"
          />
          <FeatureFlagLinkRow
            flagKey="quote_pdf_qr_call_back"
            name="Quote PDF QR call-back"
            description="Embed a QR code linking back to the workshop call-back form."
            environment="dev"
            status="off"
            rolloutPct={0}
            href="/ui-primitives/feature-flags/flag-card"
          />
        </div>
      </section>
    </main>
  )
}
