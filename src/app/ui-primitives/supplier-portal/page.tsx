import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Supplier portal | UI Primitives",
}

interface PortalEntry {
  index: string
  title: string
  href: string
  description: string
}

const entries: ReadonlyArray<PortalEntry> = [
  {
    index: "01",
    title: "Supplier login surface",
    href: "/ui-primitives/supplier-portal/login",
    description:
      "Supplier-specific sign-in: account ID + password + 2FA hint + request-access link. Brand-paned trade entry.",
  },
  {
    index: "02",
    title: "Order request card",
    href: "/ui-primitives/supplier-portal/order-request",
    description:
      "Inbound PO from the workshop — line items, GST-aware totals, delivery-by chip and lifecycle state.",
  },
  {
    index: "03",
    title: "Order acknowledgement",
    href: "/ui-primitives/supplier-portal/order-acknowledgement",
    description:
      "Accept / partial / decline + lead-time confirmation + carrier picker + tracking placeholder.",
  },
  {
    index: "04",
    title: "Backorder notice",
    href: "/ui-primitives/supplier-portal/backorder-notice",
    description:
      "Stock-out broadcast — reason, expected restock, alternative SKU suggestion and affected customer count.",
  },
  {
    index: "05",
    title: "Price update broadcast",
    href: "/ui-primitives/supplier-portal/price-update",
    description:
      "Old → new pricing with effective date, percent delta and the impact on active workshop quotes.",
  },
  {
    index: "06",
    title: "New SKU announcement",
    href: "/ui-primitives/supplier-portal/new-sku",
    description:
      "Hero card for a brand-new part with description, suggested RRP, launch chip and add-to-catalog CTA.",
  },
  {
    index: "07",
    title: "Supplier dashboard overview",
    href: "/ui-primitives/supplier-portal/dashboard-overview",
    description:
      "Open POs, monthly volume sparkline, payment-status summary and the supplier-side activity feed.",
  },
  {
    index: "08",
    title: "Catalog upload wizard",
    href: "/ui-primitives/supplier-portal/catalog-upload",
    description:
      "Three-step CSV → column map → review wizard reusing the data-import primitive set.",
  },
  {
    index: "09",
    title: "Invoice submission form",
    href: "/ui-primitives/supplier-portal/invoice-submission",
    description:
      "PO reference + line items + GST + attachment + submit CTA. AUD with 10% GST handling.",
  },
  {
    index: "10",
    title: "Payment status row",
    href: "/ui-primitives/supplier-portal/payment-status",
    description:
      "Semantic table row — invoice number, amount, due date, status chip and days-since-submit chip. Overdue rows alert.",
  },
  {
    index: "11",
    title: "Supplier performance scorecard",
    href: "/ui-primitives/supplier-portal/performance-scorecard",
    description:
      "On-time delivery + order accuracy radial meters with lead-time variance chip — tone-coded.",
  },
  {
    index: "12",
    title: "Supplier roster",
    href: "/ui-primitives/supplier-portal/roster",
    description:
      "Grid of trade reps with avatar, role and last-active label — quick access to the right human.",
  },
  {
    index: "13",
    title: "Compliance cert upload",
    href: "/ui-primitives/supplier-portal/compliance-cert",
    description:
      "Certificate type picker + file upload + expiry date + checksum verification chip.",
  },
  {
    index: "14",
    title: "Volume discount tier card",
    href: "/ui-primitives/supplier-portal/volume-tier",
    description:
      "Tier name + threshold + discount percent + current-spend progress with a next-tier preview.",
  },
]

export default function SupplierPortalIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23 / Supplier portal"
        title="Supplier portal primitives"
        description="Trade-facing surfaces — order acknowledgement, broadcasts, invoicing and compliance — composed from the rest of the system."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal" },
        ]}
      />
      <FormPatternReferences
        ids={["supplier-ops", "file-upload", "billing-payment-tax", "auth-security"]}
      />
      <section className={styles.section}>
        <div className={styles.grid}>
          {entries.map((entry) => (
            <Link key={entry.title} href={entry.href} className={styles.thumb}>
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h2 className={styles.thumbTitle}>{entry.title}</h2>
              <p className={styles.thumbCopy}>{entry.description}</p>
              <span className={styles.thumbFoot}>
                Open <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/ui-primitives/supplier-portal/full-portal"
          className={styles.fullPortalLink}
        >
          Open full supplier portal composition
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}
