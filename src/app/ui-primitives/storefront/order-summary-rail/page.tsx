import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OrderSummaryRail } from "../../components/storefront"

import {
  CART_LINES_FULL,
  CART_LINES_LITE,
  CART_TOTALS_FULL,
  CART_TOTALS_LITE,
} from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Order summary rail | Storefront",
  description: "Primitive 08 — sticky right rail with items, shipping, GST and total.",
}

export default function OrderSummaryRailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Order summary rail"
        title="Order summary rail"
        description="Sticky checkout rail — items with qty pip, shipping with ETA, GST inc, coupon discount and grand total. Trust marks below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Order summary rail" },
        ]}
      />
      <section className={styles.stageFrame}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, alignItems: "start" }}>
          <div>
            <span className={styles.stageCaption}>State 01 · full · MUFFLER10 applied · free freight</span>
            <OrderSummaryRail
              lines={CART_LINES_FULL}
              totals={CART_TOTALS_FULL}
              couponCode="MUFFLER10"
              shippingService="TNT Sensitive Express"
              freightEtaLabel="2–4 business days"
            />
          </div>
          <div>
            <span className={styles.stageCaption}>State 02 · lite · paid freight · no coupon</span>
            <OrderSummaryRail
              lines={CART_LINES_LITE}
              totals={CART_TOTALS_LITE}
              shippingService="Standard road"
              freightEtaLabel="5–7 business days"
            />
          </div>
          <div>
            <span className={styles.stageCaption}>State 03 · single line · no trust note</span>
            <OrderSummaryRail
              lines={CART_LINES_LITE}
              totals={CART_TOTALS_LITE}
              showSecureNote={false}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
