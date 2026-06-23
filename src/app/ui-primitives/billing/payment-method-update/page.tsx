import type { Metadata } from "next"

import { PaymentMethodUpdate } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Payment method update | Billing | UI Primitives",
  description:
    "Card update primitive — number / exp / cvc with brand-detection chip, billing address, 3D Secure banner, save-default toggle.",
}

export default function PaymentMethodUpdatePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04"
        title="Payment method update"
        description="Card update surface with brand-detection chip on the right of the section header, billing address with NSW state default, 3DS reassurance banner, and save-as-default toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Payment method update" },
        ]}
      />
      <PaymentMethodUpdate
        initialBillingAddress={{
          line1: "22 Industrial Drive",
          suburb: "Oak Flats",
          state: "NSW",
          postcode: "2529",
        }}
      />
    </main>
  )
}
