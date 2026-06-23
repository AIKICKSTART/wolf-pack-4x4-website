import type { Metadata } from "next"

import { RecallNoticeRow } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import { RECALL_FORD, RECALL_HSV, RECALL_TOYOTA } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Recall notice row | Workshop ops",
  description:
    "Primitive 12 — manufacturer recall hit row with affected fleet, reach %, and reach-out CTA — three states.",
}

export default function RecallNoticeRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Recall notice row"
        title="Manufacturer recall hit row"
        description="One row per active recall hit on the Mufflermen customer fleet — severity, affected count, customers reached, and an SMS reach-out batch CTA. Three states — Ford Ranger Raptor high-severity recall mid-outreach, an HSV Clubsport moderate notice just opened, and a Toyota Hilux N80 stop-drive in active scheduling."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Recall notice row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <RecallNoticeRow recall={RECALL_FORD} />
          <RecallNoticeRow recall={RECALL_HSV} />
          <RecallNoticeRow recall={RECALL_TOYOTA} />
        </div>
      </section>
    </main>
  )
}
