import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintPurchaseOrder } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Purchase order | UI Primitives — Print & PDF",
}

export default function PrintPurchaseOrderDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 07"
        title="Purchase order"
        description="Supplier purchase order — buyer crest, supplier block, deliver-to block, line items with currency, terms, authorised signature."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Purchase order" },
        ]}
      />
      <section className={styles.canvas} aria-label="Purchase order demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Issued from workshop procurement to wholesale suppliers. The PO number anchors every
            follow-up — invoice match, delivery dispute, backorder tracking.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-PO-26-0337"
          documentLabel="Purchase order — Magnaflow ANZ restock"
          format="A4"
        >
          <PrintPurchaseOrder
            poNumber="OFM-PO-26-0337"
            issuedAt="24 May 2026"
            issuedIso="2026-05-24"
            requiredBy="07 June 2026"
            requiredByIso="2026-06-07"
            buyer={{
              name: "Oak Flats Mufflermen Pty Ltd",
              abn: "47 612 985 003",
              addressLines: [
                "31 Industrial Drive",
                "Oak Flats NSW 2529",
              ],
              contactName: "Tom Halloran",
              phone: "+61 (0) 2 4256 1188",
              email: "procurement@mufflermen.com.au",
            }}
            supplier={{
              name: "Magnaflow ANZ Distribution",
              abn: "73 095 188 442",
              addressLines: [
                "12 Anniversary Avenue",
                "Terrey Hills NSW 2084",
              ],
              contactName: "Wholesale desk",
              phone: "+61 (0) 2 9986 1100",
              email: "wholesale@magnaflow.com.au",
            }}
            shipTo={{
              name: "Oak Flats Mufflermen — Goods inwards",
              addressLines: [
                "31 Industrial Drive",
                "Oak Flats NSW 2529",
              ],
              contactName: "Receiving desk · bay 02",
              phone: "+61 (0) 2 4256 1188",
            }}
            lines={[
              {
                sku: "MF-CB-VF-3.0",
                description: "Magnaflow VF Commodore 3.0in catback",
                quantity: 4,
                unitPrice: 1180,
              },
              {
                sku: "MF-MUF-MAGCOR-3",
                description: "Magnaflow Magnacore 3.0in muffler",
                quantity: 8,
                unitPrice: 192,
              },
              {
                sku: "MF-CLP-30-V",
                description: "V-band clamp 3.0in",
                quantity: 25,
                unitPrice: 38,
              },
              {
                sku: "MF-FLG-3B-3.0",
                description: "3-bolt flange + gasket kit",
                quantity: 40,
                unitPrice: 18,
              },
            ]}
            subtotal={7896}
            gst={789.6}
            total={8685.6}
            currency="AUD"
            terms={[
              "Net 30 days from delivery date.",
              "Goods to arrive packed, palletised, and signed by carrier.",
              "Damaged stock must be reported within 5 business days to qualify for replacement.",
              "Reference PO number on all delivery and invoice paperwork.",
            ]}
            authorisedBy="Tom Halloran · Workshop manager"
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
