import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintInvoice, PrintPreviewFrame } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Tax invoice | UI Primitives — Print & PDF",
}

export default function PrintInvoiceDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 02"
        title="Tax invoice"
        description="Full NSW-compliant tax invoice — ABN-bearing crest, bill-to block, GST 10% breakdown, payment instructions. Renders crisp on screen and prints as paper-ready A4."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Tax invoice" },
        ]}
      />
      <section className={styles.canvas} aria-label="Tax invoice demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Emitted at job close-out from the workshop POS. The supplier ABN, customer details,
            and itemised parts roll out of the work order. GST is calculated server-side and
            inserted as a totals row.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-INV-2026-04812"
          documentLabel="Tax invoice — Manta catback installation"
          format="A4"
        >
          <PrintInvoice
            invoiceNumber="OFM-INV-2026-04812"
            issuedAt="24 May 2026"
            issuedIso="2026-05-24"
            dueAt="07 June 2026"
            dueIso="2026-06-07"
            from={{
              name: "Oak Flats Mufflermen Pty Ltd",
              abn: "47 612 985 003",
              addressLines: [
                "31 Industrial Drive",
                "Oak Flats NSW 2529",
                "Australia",
              ],
              email: "ops@mufflermen.com.au",
              phone: "+61 (0) 2 4256 1188",
            }}
            billTo={{
              name: "Jared Whittaker",
              addressLines: [
                "14 Tongarra Road",
                "Albion Park NSW 2527",
              ],
              email: "jared.whittaker@example.com",
              phone: "+61 412 884 901",
            }}
            items={[
              {
                sku: "MANTA-MK4M3-CB-001",
                description: "Manta 3.0in stainless catback — Holden VF Commodore SS",
                quantity: 1,
                unitPrice: 1685,
              },
              {
                sku: "MANTA-MUF-MM01-CHR",
                description: "Manta MM01 muffler — chrome straight-through, 3.0in",
                quantity: 1,
                unitPrice: 285,
              },
              {
                sku: "OFM-WELD-LBR-04",
                description: "Workshop labour — bay 04 fitment, 2.5 hr",
                quantity: 2.5,
                unitPrice: 165,
              },
              {
                sku: "OFM-DYNO-RUN-01",
                description: "Post-fit dyno run + tune verification",
                quantity: 1,
                unitPrice: 220,
              },
            ]}
            totals={{
              subtotal: 2602.5,
              gst: 260.25,
              total: 2862.75,
              currency: "AUD",
            }}
            paymentTerms="Net 14 days from issue"
            paymentInstructions={[
              "Bank transfer: BSB 062-501 · Account 1056 4823 · Westpac Oak Flats",
              "EFTPOS / card available in workshop — surcharge applies to credit",
              "Reference invoice number on all payments",
            ]}
            notes="All works carried out under workshop warranty for 12 months / 20,000 km. Engine modifications recorded against VIN for ADR compliance audit."
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
