import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MaintenanceWindowBanner } from "../../components/status-page"

import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Maintenance window banner | Status page",
  description:
    "Primitive 04 — top-of-page maintenance window banner with scheduled / in-progress / completed phase.",
}

export default function MaintenanceWindowBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Banner"
        title="Maintenance window banner"
        description="A top-of-page banner that announces a maintenance window — scheduled, in progress, or completed. role=alert while in progress so the change announces to assistive tech; role=status otherwise. Supports an affected-services line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Maintenance window banner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three phases</span>
        <div className={styles.demoStack}>
          <MaintenanceWindowBanner
            title="Scheduled — Payment gateway certificate rotation"
            phase="scheduled"
            startsAt="29 May · 02:00 AEST"
            endsAt="29 May · 03:00 AEST"
            impactSummary="Brief settlement delays expected. No customer-visible checkout impact."
            affectedServices={["Payment gateway"]}
          />
          <MaintenanceWindowBanner
            title="In progress — Workshop scheduler database failover"
            phase="in-progress"
            startsAt="28 May · 19:30 AEST"
            endsAt="28 May · 20:30 AEST"
            impactSummary="Read-only mode active. Customer bookings can be viewed but not modified."
            affectedServices={["Workshop scheduler", "Parts catalogue"]}
          />
          <MaintenanceWindowBanner
            title="Completed — Quote engine v4.2 deploy"
            phase="completed"
            startsAt="27 May · 22:00 AEST"
            endsAt="27 May · 22:18 AEST"
            impactSummary="No customer impact. Rollout completed 12 minutes ahead of window."
            affectedServices={["Quote engine"]}
          />
        </div>
      </section>
    </main>
  )
}
