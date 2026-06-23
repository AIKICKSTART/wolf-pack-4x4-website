import type { Metadata } from "next"

import { PartsPullList } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import { PARTS_PULL } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Parts pull list | Workshop ops",
  description:
    "Primitive 04 — required parts pull checklist with in-stock / back-order badges and bin location — three states.",
}

const ALL_PULLED = PARTS_PULL.map((part) => ({ ...part, pulled: true }))
const COMPACT_THREE = PARTS_PULL.slice(0, 3)

export default function PartsPullListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Parts pull list"
        title="Parts pull checklist"
        description="Parts puller bench — bin location, supplier, in-stock vs back-order, line totals. Three states — Bay 3 Hilux N80 pull (mid-progress with Manta lines pulled and Genie tip on back-order), a fully picked pull, and a compact dispatch-bench view."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Parts pull list" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <PartsPullList
            jobLabel="WO-2847 · Hilux N80 cat-back upgrade"
            bayLabel="Bay 3"
            parts={PARTS_PULL}
          />
          <PartsPullList
            jobLabel="WO-2851 · Falcon GT XB twin stainless"
            bayLabel="Bay 4 · hoist"
            parts={ALL_PULLED}
          />
          <PartsPullList
            jobLabel="WO-2853 · Ranger Raptor turbo-back"
            bayLabel="Bay 6 · dyno"
            parts={COMPACT_THREE}
            variant="compact"
          />
        </div>
      </section>
    </main>
  )
}
