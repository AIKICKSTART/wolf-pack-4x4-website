import type { Metadata } from "next"

import { BannerStrip } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_BANNERS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Banner strip | Notifications system",
  description:
    "Primitive 03 — full-width page-top banner with four variants and optional dismiss.",
}

const [announce, alert, promo, maintenance] = MOCK_BANNERS

export default function BannerStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Banner strip"
        title="Banner strip"
        description="A top-of-page banner used for workshop announcements, alerts, promo strips, and maintenance notices. Renders an aria-live region (polite for promo/announcement, assertive for alert/maintenance)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Banner strip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Announcement + promo (dismissible)</span>
        <div className={styles.demoBanner}>
          <BannerStrip spec={announce} />
          <BannerStrip spec={promo} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Alert (assertive aria-live)</span>
        <BannerStrip spec={alert} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Maintenance (non-dismissible)</span>
        <BannerStrip spec={maintenance} />
      </section>
    </main>
  )
}
