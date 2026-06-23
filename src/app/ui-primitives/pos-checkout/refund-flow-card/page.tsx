import type { Metadata } from "next"

import { RefundFlowCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { REFUND_CANDIDATES, REFUND_REASONS } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { RefundFlowInteractiveDemo } from "./refund-flow-interactive-demo"

export const metadata: Metadata = {
  title: "Refund flow | POS checkout",
  description:
    "Primitive 06 — refund stepper for selecting items, capturing reason, picking method and confirming the refund amount.",
}

export default function RefundFlowCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Refund flow"
        title="Refund flow card"
        description="Four-step refund stepper — select items, capture reason, choose method, confirm. Continue is disabled until each step's prerequisite is captured."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Refund flow" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful · operator drives the stepper</span>
        <RefundFlowInteractiveDemo />
        <span className={styles.stageCaption}>State 02 · midway · reason step locked</span>
        <RefundFlowCard
          receiptNumber="OFM-30418"
          items={REFUND_CANDIDATES}
          selectedItemIds={["ref-line-2"]}
          reasons={REFUND_REASONS}
          reason="Wrong fitment"
          method={null}
          step="reason"
        />
        <span className={styles.stageCaption}>State 03 · confirm step · ready to submit</span>
        <RefundFlowCard
          receiptNumber="OFM-30418"
          items={REFUND_CANDIDATES}
          selectedItemIds={["ref-line-1", "ref-line-3"]}
          reasons={REFUND_REASONS}
          reason="Workshop error"
          method="card"
          step="confirm"
        />
      </section>
    </main>
  )
}
