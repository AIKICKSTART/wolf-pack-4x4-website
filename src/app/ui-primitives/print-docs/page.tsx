import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./print-docs.module.css"

export const metadata: Metadata = {
  title: "Print Documents | UI Primitives",
}

interface PrintDocEntry {
  index: string
  title: string
  href: string
  description: string
}

const entries: ReadonlyArray<PrintDocEntry> = [
  {
    index: "01",
    title: "Print sheet",
    href: "/ui-primitives/print-docs/sheet",
    description:
      "A4 / Letter / 80mm receipt sheet wrapper. Compositional surface every document is built on top of.",
  },
  {
    index: "02",
    title: "Tax invoice",
    href: "/ui-primitives/print-docs/invoice",
    description:
      "ABN-bearing tax invoice — bill-to block, line items, GST 10%, payment instructions, footer.",
  },
  {
    index: "03",
    title: "Thermal receipt",
    href: "/ui-primitives/print-docs/receipt",
    description:
      "80mm thermal-roll receipt — workshop crest, line items, totals, change, barcode + footer message.",
  },
  {
    index: "04",
    title: "Work order",
    href: "/ui-primitives/print-docs/work-order",
    description:
      "Workshop job sheet — customer, vehicle, scope, technician grid, hours log, parts table, sign-offs.",
  },
  {
    index: "05",
    title: "Quotation",
    href: "/ui-primitives/print-docs/quote",
    description:
      "Formal quote with valid-until date, numbered scope, pricing breakdown, T&Cs, signature blocks.",
  },
  {
    index: "06",
    title: "Packing slip",
    href: "/ui-primitives/print-docs/packing-slip",
    description:
      "Outbound packing slip — ship-from / ship-to / freight tracking, packed-vs-ordered table, sign-off.",
  },
  {
    index: "07",
    title: "Purchase order",
    href: "/ui-primitives/print-docs/purchase-order",
    description:
      "Supplier purchase order — supplier block, deliver-to block, line items, terms, authorised signature.",
  },
  {
    index: "08",
    title: "Consent form",
    href: "/ui-primitives/print-docs/consent-form",
    description:
      "Customer consent for performance / emissions work — risk disclosure, ADR ack, signature blocks.",
  },
  {
    index: "09",
    title: "Compliance certificate",
    href: "/ui-primitives/print-docs/compliance-cert",
    description:
      "Ornamental certificate of compliance — crest, scope certified, ADR ref, technician sign-off, QR.",
  },
  {
    index: "10",
    title: "Barcode block",
    href: "/ui-primitives/print-docs/barcode",
    description:
      "Pure-SVG Code-128-style barcode rendered from any string — human-readable label below.",
  },
  {
    index: "11",
    title: "QR block",
    href: "/ui-primitives/print-docs/qr",
    description:
      "Pure-SVG 21×21 QR placeholder generated from a hash of the input. Renders the label underneath.",
  },
  {
    index: "12",
    title: "Print preview frame",
    href: "/ui-primitives/print-docs/preview-frame",
    description:
      "Dark inspection chrome that wraps any printable surface — toolbar, ruler, print button, status bar.",
  },
]

export default function PrintDocsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23 / Print & PDF"
        title="Tax invoices, work orders, receipts, certificates"
        description="Every printable surface the Mufflermen workshop emits — paper-light documents that read correctly on screen and on A4. Each primitive lives on its own route inside the dark inspection frame."
      />
      <section className={styles.section} aria-label="Print documents primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 12 primitives</span>
          <h2 className={styles.sectionTitle}>Pick a document</h2>
          <p className={styles.subhead}>
            Every document defaults to light theme inside the printSheet wrapper while the
            inspection chrome stays dark. Use the in-page Print button to test the browser print
            dialog.
          </p>
        </header>
        <div className={styles.grid}>
          {entries.map((entry) => (
            <Link key={entry.href} className={styles.thumb} href={entry.href}>
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h3 className={styles.thumbTitle}>{entry.title}</h3>
              <p className={styles.thumbCopy}>{entry.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">{">"}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
