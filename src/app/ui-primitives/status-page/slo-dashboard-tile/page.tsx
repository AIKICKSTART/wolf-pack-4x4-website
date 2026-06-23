import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SloDashboardTile } from "../../components/status-page"

import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "SLO dashboard tile | Status page",
  description:
    "Primitive 10 — SLO tile with objective, actual, status chip and remaining error budget meter.",
}

export default function SloDashboardTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / SLO"
        title="SLO dashboard tile"
        description="Each tile shows a single service-level objective — name, target, actual, a tone-coded status chip and an error-budget remaining meter scoped to either 30-day or 90-day window. The meter is a true ARIA meter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "SLO dashboard tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three SLOs · mixed health</span>
        <div className={styles.demoTriple}>
          <SloDashboardTile
            name="Quote engine availability"
            objective={0.9995}
            actual={0.9996}
            remainingBudget={0.62}
            window="30d"
          />
          <SloDashboardTile
            name="Customer SMS p95 < 15s"
            objective={0.99}
            actual={0.985}
            remainingBudget={0.18}
            window="30d"
          />
          <SloDashboardTile
            name="Payment gateway success rate"
            objective={0.999}
            actual={0.9988}
            remainingBudget={0.41}
            window="90d"
          />
        </div>
      </section>
    </main>
  )
}
