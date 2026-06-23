import type { Metadata } from "next"

import { TaxInfoEdit } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { CUSTOMER } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Tax info edit | Billing | UI Primitives",
  description:
    "Tax info edit primitive — country select, business name, ABN / VAT input with validation chip, reverse-charge VAT toggle.",
}

export default function TaxInfoEditPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05"
        title="Tax info edit"
        description="Tax identity form for invoicing. The tax ID label and validator change with country — AU/ABN, NZ/NZBN, GB/VAT, US/TFN. Reverse-charge VAT toggle appears only when applicable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Tax info edit" },
        ]}
      />
      <TaxInfoEdit
        initial={{
          country: "AU",
          businessName: CUSTOMER.name,
          taxIdValue: CUSTOMER.abn,
        }}
      />
    </main>
  )
}
