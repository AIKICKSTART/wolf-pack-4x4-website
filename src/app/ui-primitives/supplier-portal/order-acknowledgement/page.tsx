import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OrderAcknowledgementForm } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Order acknowledgement | UI Primitives — Supplier Portal",
}

export default function OrderAcknowledgementPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.03 / Supplier portal"
        title="Order acknowledgement form"
        description="Three-decision acknowledgement with lead time, carrier and tracking placeholder."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Acknowledgement" },
        ]}
      />
      <section className={styles.canvas}>
        <OrderAcknowledgementForm
          poNumber="PO-OF-0921"
          defaultDecision="partial"
          defaultLeadTimeDays={7}
          defaultCarrier="startrack"
        />
      </section>
    </main>
  )
}
