import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OrderRequestCard, type OrderRequestLine } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Order request card | UI Primitives — Supplier Portal",
}

const lines: ReadonlyArray<OrderRequestLine> = [
  {
    id: "ln-1",
    title: "Manta 3in stainless cat-back",
    sku: "MAN-MK24-405",
    unitPrice: 1289,
    quantity: 4,
  },
  {
    id: "ln-2",
    title: "Manta single-out 2.25in MX-5",
    sku: "MAN-MX5-NB",
    unitPrice: 745,
    quantity: 2,
  },
  {
    id: "ln-3",
    title: "Manta Hilux N80 DPF-back",
    sku: "MAN-N80-DPF",
    unitPrice: 1095,
    quantity: 3,
  },
]

export default function OrderRequestPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.02 / Supplier portal"
        title="Order request card"
        description="An inbound PO from Oak Flats Mufflermen. Acknowledgement is the next surface a supplier sees."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Order request" },
        ]}
      />
      <section className={styles.canvas}>
        <OrderRequestCard
          poNumber="PO-OF-0921"
          requestedBy="Lara Donaghy · Oak Flats parts desk"
          requestedOn="29 May · 09:14"
          deliverByLabel="Deliver by 5 Jun"
          state="requested"
          lines={lines}
        />
      </section>
    </main>
  )
}
