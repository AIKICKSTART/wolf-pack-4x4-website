import type { Metadata } from "next"

import { QuickActionGrid } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { QUICK_ACTIONS } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Quick action grid | Admin hub",
  description:
    "Primitive 02 — 3×3 grid of pinnable shortcuts (new quote, book bay, schedule post, send invoice, dyno run, parts order). Three states — full 3×3, 2-column compact, pinned-only filter.",
}

const PINNED_ONLY = QUICK_ACTIONS.filter((a) => a.pinned)
const COMPACT_SET = QUICK_ACTIONS.slice(0, 6)

export default function QuickActionGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Quick action grid"
        title="3×3 quick-action grid"
        description="Pinnable shortcuts laid out 3 across. Pinned actions show keyboard shortcut chips, unpinned actions show a NEW badge or quieter glyph. Three states — full 9-tile manager view, 6-tile compact, and pinned-only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Quick action grid" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · full 3×3 manager view</span>
            <QuickActionGrid actions={QUICK_ACTIONS} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · 2-column compact</span>
            <QuickActionGrid actions={COMPACT_SET} columns={2} heading="Compact actions" />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · pinned-only filter</span>
            <QuickActionGrid actions={PINNED_ONLY} heading="Pinned only" />
          </div>
        </div>
      </section>
    </main>
  )
}
