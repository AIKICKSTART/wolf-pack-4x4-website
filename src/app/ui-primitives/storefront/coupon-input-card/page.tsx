import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CouponInputCard } from "../../components/storefront"

import { COUPON_APPLIED, COUPON_AUTO } from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Coupon input card | Storefront",
  description: "Primitive 13 — coupon entry with apply/error/applied and auto-apply.",
}

export default function CouponInputCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Coupon input card"
        title="Coupon input card"
        description="Promo code entry with apply, validation error, applied success and auto-applied chip. Suggestion CTA surfaces eligible codes inline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Coupon input card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · empty with suggestion</span>
        <CouponInputCard
          suggestion={{ code: "MUFFLER10", label: "10% off exhaust hardware" }}
        />
        <span className={styles.stageCaption}>State 02 · applied · manual entry</span>
        <CouponInputCard applied={COUPON_APPLIED} />
        <span className={styles.stageCaption}>State 03 · auto-applied trade discount</span>
        <CouponInputCard applied={COUPON_AUTO} title="Trade promo" />
      </section>
    </main>
  )
}
