import type { Metadata } from "next"

import { ActivityFeedRow } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { ACTIVITY_ROWS } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Activity feed row | Admin hub",
  description:
    "Primitive 04 — chronological event row with actor avatar, verb, surface chip, target, and timestamp. Three states — single row, dense feed, mixed-tone stack.",
}

export default function ActivityFeedRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Activity feed row"
        title="Activity feed row"
        description="A single chronological event row. Actor avatar, name, action verb, surface chip, target label, optional detail line, role + timestamp. Three states — a single quote-approval, a dense top-of-day feed, and a mixed-tone activity stack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Activity feed row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · single row</span>
            <ActivityFeedRow row={ACTIVITY_ROWS[0]} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · dense top-of-day feed</span>
            <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
              {ACTIVITY_ROWS.slice(0, 4).map((row) => (
                <ActivityFeedRow key={row.id} row={row} />
              ))}
            </div>
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · mixed-tone stack</span>
            <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
              {ACTIVITY_ROWS.slice(3).map((row) => (
                <ActivityFeedRow key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
