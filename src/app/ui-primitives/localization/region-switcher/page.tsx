import type { Metadata } from "next"

import { RegionSwitcher } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { REGIONS } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Region switcher | Localization",
  description:
    "Primitive 02 — region tiles with timezone, currency, and measurement-system chips per supported market. Selecting a region updates the workshop defaults for date, currency, and units.",
}

export default function RegionSwitcherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Switching"
        title="Region switcher"
        description="Region selector showing timezone, currency, and metric vs imperial units per supported market. Each tile is a radio — only one region is active at a time. Drives the rest of the workshop's localization defaults."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Region switcher" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Australia is default</span>
        <RegionSwitcher regions={REGIONS} value="au" />
      </section>
    </main>
  )
}
