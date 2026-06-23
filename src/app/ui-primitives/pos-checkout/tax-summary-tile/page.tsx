import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { ABN_EMPTY, ABN_FILLED } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { TaxSummaryInteractiveDemo } from "./tax-summary-interactive-demo"

export const metadata: Metadata = {
  title: "Tax summary tile | POS checkout",
  description:
    "Primitive 09 — AU GST inc / ex / BAS 1A summary with optional ABN and trading-name capture for trade tax invoices.",
}

export default function TaxSummaryTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Tax summary"
        title="Tax summary tile"
        description="AU GST breakdown — inc / ex / BAS 1A bucket and an ABN capture row for trade tax invoices. ABN preview formats 11 digits into the 2-3-3-3 group."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Tax summary" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful · ABN editor empty</span>
        <TaxSummaryInteractiveDemo totalIncGst={2116.5} initialAbn={ABN_EMPTY} />
        <span className={styles.stageCaption}>State 02 · stateful · valid ABN captured</span>
        <TaxSummaryInteractiveDemo totalIncGst={2116.5} initialAbn={ABN_FILLED} />
        <span className={styles.stageCaption}>State 03 · stateful · small sale · ABN partial</span>
        <TaxSummaryInteractiveDemo
          totalIncGst={64.95}
          initialAbn={{ abn: "1234567", tradingName: "Bay Auto Electrical" }}
        />
      </section>
    </main>
  )
}
