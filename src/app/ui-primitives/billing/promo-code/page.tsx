import type { Metadata } from "next"

import { PromoCodeRedeem } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Promo code redeem | Billing | UI Primitives",
  description:
    "Promo code redeem primitive — code entry, applied-state chip, benefit chip, expiry chip, remove action.",
}

export default function PromoCodePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09"
        title="Promo code redeem"
        description="Promo code entry — try MUFFLER10 or VTVZ50. Applied state shows a benefit chip on the left, code with description, expiry date, and a Remove action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Promo code" },
        ]}
      />
      <PromoCodeRedeem />
    </main>
  )
}
