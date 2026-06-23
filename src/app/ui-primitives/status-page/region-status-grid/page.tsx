import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RegionStatusGrid } from "../../components/status-page"

import { REGION_ENTRIES } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Region status grid | Status page",
  description:
    "Primitive 02 — region status grid for AU-East, AU-West, US-East, US-West, EU-Central, APAC.",
}

export default function RegionStatusGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Grid"
        title="Region status grid"
        description="The Mufflermen platform runs across two AU regions plus three global edges. This grid surfaces per-region operational status, a tone-coded latency chip and a small services-deployed meta line. Each cell is keyboard-traversable and the surrounding section is a labelled region."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Region status grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 regions · mixed status</span>
        <RegionStatusGrid
          caption="Regional status · 27 May 2026 · 19:40 AEST"
          regions={REGION_ENTRIES}
        />
      </section>
    </main>
  )
}
