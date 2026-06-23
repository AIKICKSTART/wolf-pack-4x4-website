import type { Metadata } from "next"

import { SplitTenderCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { TENDER_BALANCED, TENDER_OVERPAID } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { SplitTenderInteractiveDemo } from "./split-tender-interactive-demo"

export const metadata: Metadata = {
  title: "Split tender | POS checkout",
  description:
    "Primitive 04 — split payment editor for cash + card + voucher + loyalty across one sale with live tendered vs total progress.",
}

export default function SplitTenderCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Split tender"
        title="Split tender card"
        description="Editor for splitting a sale across cash, card, voucher and loyalty tenders. Progress bar tone-codes amber while under, green when balanced, red on overpay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Split tender" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful · partial tender, change remaining</span>
        <SplitTenderInteractiveDemo total={1279.0} />
        <span className={styles.stageCaption}>State 02 · fully tendered — cash + card + voucher</span>
        <SplitTenderCard total={1279.0} entries={TENDER_BALANCED} />
        <span className={styles.stageCaption}>State 03 · overpaid · change due</span>
        <SplitTenderCard total={1279.0} entries={TENDER_OVERPAID} />
      </section>
    </main>
  )
}
