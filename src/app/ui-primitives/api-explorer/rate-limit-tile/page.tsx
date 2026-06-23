import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RateLimitTile } from "../../components/api-explorer"
import { RATE_LIMIT_BURST, RATE_LIMIT_FREE, RATE_LIMIT_PLUS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Rate-limit tile | API Explorer",
  description:
    "Primitive 08 — quota tile with reset, used/limit, and sparkline trend. Three states: healthy, burst, near limit.",
}

export default function RateLimitTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Rate-limit tile"
        title="Rate-limit tile"
        description="A compact quota tile combining used/limit numbers, a tone-shifting progress bar, a reset time pill, and a 10-sample recent-usage sparkline. Free tier sits at 600 req/min, Plus at 6000."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Rate-limit tile" },
        ]}
      />

      <section className={styles.gridThree} aria-label="Rate limit states">
        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 01 / Healthy (Plus)</span>
          <RateLimitTile {...RATE_LIMIT_PLUS} />
        </div>
        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 02 / Free tier under load</span>
          <RateLimitTile {...RATE_LIMIT_FREE} />
        </div>
        <div className={styles.routeSection}>
          <span className={styles.sectionLabel}>State 03 / Near limit</span>
          <RateLimitTile {...RATE_LIMIT_BURST} />
        </div>
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          Progress tone shifts teal → amber → red as the ratio crosses 60% and 85%. The
          sparkline mirrors the same palette via the shared Sparkline primitive.
        </p>
      </aside>
    </main>
  )
}
