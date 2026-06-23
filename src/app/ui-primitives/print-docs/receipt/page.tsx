import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintReceipt } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Thermal receipt | UI Primitives — Print & PDF",
}

export default function PrintReceiptDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 03"
        title="Thermal receipt"
        description="Compact 80mm thermal roll receipt — workshop crest, transaction id, line items, totals, change, barcode and footer message. Mono-font, narrow column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Thermal receipt" },
        ]}
      />
      <section className={styles.canvas} aria-label="Thermal receipt demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Issued from the parts counter for over-the-counter sales. 80mm roll, mono-font, full
            transaction trace. The barcode at the bottom encodes the transaction id so the
            customer can reference it back to the system later.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-TXN-26-052401-0418"
          documentLabel="POS receipt — parts counter sale"
          format="Receipt"
        >
          <PrintReceipt
            workshopName="Oak Flats Mufflermen"
            workshopAddress="31 Industrial Drive, Oak Flats NSW 2529"
            workshopAbn="47 612 985 003"
            transactionId="OFM-TXN-26-052401-0418"
            transactionAt="24 May 2026 · 14:32"
            transactionIso="2026-05-24T14:32:00+10:00"
            staffName="Brett K."
            items={[
              {
                sku: "MANTA-CLP-2.5",
                name: "Manta clamp 2.5in",
                quantity: 2,
                unitPrice: 18,
              },
              {
                sku: "OFM-GSKT-FLG",
                name: "Flange gasket 3-bolt",
                quantity: 1,
                unitPrice: 14.5,
              },
              {
                sku: "OFM-WD-ROD-308",
                name: "Welding rod 308L · 5kg",
                quantity: 1,
                unitPrice: 86,
              },
            ]}
            subtotal={136.5}
            gst={13.65}
            total={150.15}
            paid={150.15}
            paymentMethod="EFTPOS"
            currency="AUD"
            footerMessage="Thanks for trading with Oak Flats Mufflermen"
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
