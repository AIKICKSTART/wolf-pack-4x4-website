import type { Metadata } from "next"

import { DealValueChip } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Deal value chip | CRM",
  description:
    "Primitive 07 — deal value chip with AUD currency, period (one-off / monthly / annual), and a likelihood multiplier indicator.",
}

export default function DealValueScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Deal value chip"
        title="Deal value chip"
        description="Compact pill showing the deal amount, the deal period, and an optional likelihood multiplier — the title attribute reveals the weighted value."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Deal value" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>One-off jobs</span>
        <div className={styles.demoInline}>
          <DealValueChip amount={2400} period="one-off" likelihood={10} />
          <DealValueChip amount={1850} period="one-off" likelihood={25} />
          <DealValueChip amount={3650} period="one-off" likelihood={50} />
          <DealValueChip amount={1420} period="one-off" likelihood={80} />
          <DealValueChip amount={2180} period="one-off" likelihood={100} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Fleet contracts</span>
        <div className={styles.demoInline}>
          <DealValueChip amount={1240} period="monthly" likelihood={65} />
          <DealValueChip amount={2680} period="monthly" likelihood={80} />
          <DealValueChip amount={18400} period="annual" likelihood={45} />
          <DealValueChip amount={62400} period="annual" likelihood={20} />
        </div>
      </section>
    </main>
  )
}
