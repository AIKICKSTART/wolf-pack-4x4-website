import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CycleCountRow } from "../../components/inventory-deep"

import { CYCLE_COUNTS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Cycle count row | Inventory deep",
  description:
    "Primitive 07 — cycle count row with expected vs counted variance chip + accept/recount verdict buttons.",
}

export default function CycleCountRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Cycle count"
        title="Cycle count row"
        description="Cycle-count line — book qty vs counted qty, classified variance (match / minor / major) and inline Accept / Recount verdict buttons."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Cycle count row" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Match · clean book balance</span>
        <table className={styles.cycleTable}>
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Expected</th>
              <th scope="col">Counted</th>
              <th scope="col">Variance</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            <CycleCountRow {...CYCLE_COUNTS[0]} />
          </tbody>
        </table>

        <span className={styles.stageCaption}>Minor variance</span>
        <table className={styles.cycleTable}>
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Expected</th>
              <th scope="col">Counted</th>
              <th scope="col">Variance</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            <CycleCountRow {...CYCLE_COUNTS[1]} />
            <CycleCountRow {...CYCLE_COUNTS[3]} />
          </tbody>
        </table>

        <span className={styles.stageCaption}>Major variance · investigate</span>
        <table className={styles.cycleTable}>
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Expected</th>
              <th scope="col">Counted</th>
              <th scope="col">Variance</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            <CycleCountRow {...CYCLE_COUNTS[2]} />
            <CycleCountRow {...CYCLE_COUNTS[4]} />
          </tbody>
        </table>
      </section>
    </main>
  )
}
