import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { COUPON_OPTIONS, DISCOUNT_REASONS } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { DiscountPickerInteractiveDemo } from "./discount-picker-interactive-demo"

export const metadata: Metadata = {
  title: "Discount picker | POS checkout",
  description:
    "Primitive 08 — discount type picker for percent / dollar / coupon with required reason chip and live final-total preview.",
}

export default function DiscountPickerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Discount picker"
        title="Discount picker"
        description="Percent / dollar / coupon kinds with required reason capture and live final-total preview. Each kind reveals its own input shape."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Discount picker" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful percent · 15% off · trade rate</span>
        <DiscountPickerInteractiveDemo
          baseTotal={1279.0}
          initialKind="percent"
          initialPercent={15}
          initialReason="Trade rate"
          reasons={DISCOUNT_REASONS}
          coupons={COUPON_OPTIONS}
        />
        <span className={styles.stageCaption}>State 02 · stateful dollar · $50 · price match</span>
        <DiscountPickerInteractiveDemo
          baseTotal={1279.0}
          initialKind="dollar"
          initialDollar={50}
          initialReason="Price match"
          reasons={DISCOUNT_REASONS}
          coupons={COUPON_OPTIONS}
        />
        <span className={styles.stageCaption}>State 03 · stateful coupon · MUFFLER10</span>
        <DiscountPickerInteractiveDemo
          baseTotal={1279.0}
          initialKind="coupon"
          initialCoupon="MUFFLER10"
          initialReason="Loyalty perk"
          reasons={DISCOUNT_REASONS}
          coupons={COUPON_OPTIONS}
        />
      </section>
    </main>
  )
}
