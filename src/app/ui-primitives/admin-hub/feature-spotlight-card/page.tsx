import type { Metadata } from "next"

import { FeatureSpotlightCard } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { FEATURE_SPOTLIGHT, FEATURE_SPOTLIGHT_BRIEFINGS } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Feature spotlight card | Admin hub",
  description:
    "Primitive 13 — new-feature spotlight with bullets, try CTA and dismiss. Three states — Hermes auto-quote v2.6, Monday briefings beta, minimal short-form spotlight.",
}

const SHORT_SPOTLIGHT = {
  ...FEATURE_SPOTLIGHT,
  id: "spot-short",
  badge: "Quick tip",
  title: "Press Cmd+K from anywhere",
  description:
    "The command palette now opens from any surface — list, detail, even mid-form.",
  bullets: ["Works on Windows + macOS", "Suggestions adapt to current surface"],
  ctaLabel: "Try it",
  dismissLabel: "OK",
  releasedAt: "Wed 27 May 2026",
}

export default function FeatureSpotlightCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Feature spotlight card"
        title="Feature spotlight"
        description="Spotlights a new feature in the hub — badge, headline, description, bullet highlights, try CTA + dismiss. Three states — Hermes auto-quote v2.6, Monday briefings beta, and a short-form quick-tip spotlight."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Feature spotlight card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · Hermes auto-quote v2.6</span>
            <FeatureSpotlightCard spotlight={FEATURE_SPOTLIGHT} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · Monday briefings beta</span>
            <FeatureSpotlightCard spotlight={FEATURE_SPOTLIGHT_BRIEFINGS} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · quick-tip short form</span>
            <FeatureSpotlightCard spotlight={SHORT_SPOTLIGHT} />
          </div>
        </div>
      </section>
    </main>
  )
}
