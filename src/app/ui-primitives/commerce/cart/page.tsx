import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

import { CartScene } from "./cart-scene"

export const metadata: Metadata = {
  title: "Cart | Commerce | UI Primitives",
  description:
    "Cart scene reference — five Manta exhaust line items, quantity steppers, coupon field, freight + GST summary aside.",
}

export default function CartPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 01"
        title="Cart"
        description="Five Manta exhaust line items with quantity steppers, save-for-later tray below, and order summary aside. Apply MUFFLER10 or VTVZ50 to see coupons applied."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Cart" },
        ]}
      />
      <CartScene />
    </main>
  )
}
