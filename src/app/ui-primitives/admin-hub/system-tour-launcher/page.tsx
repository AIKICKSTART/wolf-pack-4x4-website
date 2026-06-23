import type { Metadata } from "next"

import { SystemTourLauncher } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { ADMIN_TOUR, ADMIN_TOUR_DONE, ADMIN_TOUR_FRESH } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "System tour launcher | Admin hub",
  description:
    "Primitive 12 — onboarding tour launcher with progress + per-step checklist. Three states — fresh new install, mid-tour, fully complete.",
}

export default function SystemTourLauncherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / System tour launcher"
        title="Onboarding tour launcher"
        description="Card that drives the first-run cockpit walkthrough — pick KPI tiles, invite crew, connect Tyro + Stripe, enable Hermes, schedule the Monday briefing. Three states — fresh install, mid-tour 60%, fully complete."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "System tour launcher" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · fresh install · 0%</span>
            <SystemTourLauncher tour={ADMIN_TOUR_FRESH} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · mid-tour · 60%</span>
            <SystemTourLauncher tour={ADMIN_TOUR} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · complete · 100%</span>
            <SystemTourLauncher tour={ADMIN_TOUR_DONE} />
          </div>
        </div>
      </section>
    </main>
  )
}
