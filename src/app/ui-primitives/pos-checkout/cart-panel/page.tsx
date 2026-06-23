import type { Metadata } from "next"

import { CartPanel } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { CART_LINES, CART_LINES_LITE } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { CartPanelInteractiveDemo } from "./cart-panel-interactive-demo"

export const metadata: Metadata = {
  title: "Cart panel | POS checkout",
  description:
    "Primitive 01 — running register cart panel with line items, quantity steppers, swipe-to-remove and live GST totals.",
}

export default function CartPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Cart panel"
        title="Cart panel"
        description="Running register with line items, quantity steppers and swipe-to-remove. Inc/ex GST totals stay in tabular-nums."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Cart panel" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful cart with stepper + swipe</span>
        <CartPanelInteractiveDemo initialLines={CART_LINES} />
        <span className={styles.stageCaption}>State 02 · light cart · oil + wipers</span>
        <CartPanel lines={CART_LINES_LITE} />
        <span className={styles.stageCaption}>State 03 · empty drawer</span>
        <CartPanel lines={[]} title="Empty drawer" kicker="Bay 1 · idle" />
      </section>
    </main>
  )
}
