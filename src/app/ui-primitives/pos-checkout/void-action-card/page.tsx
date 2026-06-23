import type { Metadata } from "next"

import { VoidActionCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import styles from "../pos-checkout.module.css"

import { VoidActionInteractiveDemo } from "./void-action-interactive-demo"

export const metadata: Metadata = {
  title: "Void action | POS checkout",
  description:
    "Primitive 11 — manager-approval void card with PIN keypad and dot indicators. Error tone-codes the dots red when the PIN is rejected.",
}

export default function VoidActionCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Void action"
        title="Void action card"
        description="Manager-approval void with a PIN keypad. Dot indicators tone-code red when the PIN is wrong. Confirm CTA stays disabled until the PIN length is met."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Void action" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful · keypad live, dots fill as you tap</span>
        <VoidActionInteractiveDemo
          transactionRef="OFM-30418"
          operator="Mia"
          amount={2116.5}
        />
        <span className={styles.stageCaption}>State 02 · partial PIN entered</span>
        <VoidActionCard
          transactionRef="OFM-30418"
          operator="Mia"
          amount={2116.5}
          pin="42"
        />
        <span className={styles.stageCaption}>State 03 · PIN rejected · error tone</span>
        <VoidActionCard
          transactionRef="OFM-30419"
          operator="Mia"
          amount={689.0}
          pin="4242"
          errorMessage="Manager PIN incorrect — request Daniel"
        />
      </section>
    </main>
  )
}
