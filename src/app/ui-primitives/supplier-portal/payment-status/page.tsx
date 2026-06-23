import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PaymentStatusRow } from "../../components/supplier-portal"
import type { PaymentState } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Payment status row | UI Primitives — Supplier Portal",
}

interface PaymentRowEntry {
  invoiceNumber: string
  poRef: string
  amountAud: number
  dueDateLabel: string
  daysSinceSubmitted: number
  state: PaymentState
}

const entries: ReadonlyArray<PaymentRowEntry> = [
  {
    invoiceNumber: "MP-INV-04129",
    poRef: "PO-OF-0904",
    amountAud: 8420.5,
    dueDateLabel: "Due 14 Jun",
    daysSinceSubmitted: 4,
    state: "in-approval",
  },
  {
    invoiceNumber: "MP-INV-04127",
    poRef: "PO-OF-0892",
    amountAud: 4310.0,
    dueDateLabel: "Paid 21 May",
    daysSinceSubmitted: 18,
    state: "paid",
  },
  {
    invoiceNumber: "MP-INV-04118",
    poRef: "PO-OF-0871",
    amountAud: 1240.0,
    dueDateLabel: "Due 30 Apr",
    daysSinceSubmitted: 22,
    state: "disputed",
  },
  {
    invoiceNumber: "MP-INV-04102",
    poRef: "PO-OF-0844",
    amountAud: 3920.0,
    dueDateLabel: "Was due 12 May",
    daysSinceSubmitted: 38,
    state: "overdue",
  },
]

export default function PaymentStatusPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.10 / Supplier portal"
        title="Payment status row"
        description="Semantic table rows — paid, in approval, disputed and overdue. Overdue rows announce themselves to screen readers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Payment status row" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.tablePanel}>
          <table className={styles.paymentsTable} aria-label="Supplier invoice payment status">
            <thead>
              <tr>
                <th scope="col">Invoice</th>
                <th scope="col">Amount AUD</th>
                <th scope="col">Due</th>
                <th scope="col">Status</th>
                <th scope="col">Days since submit</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <PaymentStatusRow key={entry.invoiceNumber} {...entry} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
