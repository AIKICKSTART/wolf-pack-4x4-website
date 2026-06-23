import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPackingSlip, PrintPreviewFrame } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Packing slip | UI Primitives — Print & PDF",
}

export default function PrintPackingSlipDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 06"
        title="Packing slip"
        description="Outbound packing slip — ship-from / ship-to / freight tracking blocks, ordered-vs-packed table, freight barcode, dual sign-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Packing slip" },
        ]}
      />
      <section className={styles.canvas} aria-label="Packing slip demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Travels with the carton from the dispatch bay. The receiving end ticks each row,
            countersigns the bottom, and emails a photo back to clear the order.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-PSL-26-0814"
          documentLabel="Packing slip — Magnaflow parts to Wollongong wholesale"
          format="A4"
        >
          <PrintPackingSlip
            orderRef="OFM-PSL-26-0814"
            packedAt="24 May 2026 · 11:08"
            packedIso="2026-05-24T11:08:00+10:00"
            shipFrom={{
              name: "Oak Flats Mufflermen — Dispatch",
              addressLines: [
                "31 Industrial Drive",
                "Oak Flats NSW 2529",
              ],
              contact: "+61 (0) 2 4256 1188",
            }}
            shipTo={{
              name: "Wollongong Performance Wholesale",
              addressLines: [
                "Unit 4 / 88 Auburn Street",
                "Wollongong NSW 2500",
              ],
              contact: "Attn: receiving desk · +61 2 4225 4012",
            }}
            items={[
              {
                sku: "MANTA-MK4M3-CB-001",
                description: "Manta MK4M3 catback — VF Commodore SS",
                quantityOrdered: 3,
                quantityPacked: 3,
              },
              {
                sku: "MANTA-MUF-MM01-CHR",
                description: "Manta MM01 muffler — chrome 3.0in",
                quantityOrdered: 5,
                quantityPacked: 5,
              },
              {
                sku: "OFM-CLP-30-SS",
                description: "Stainless clamp 3.0in",
                quantityOrdered: 20,
                quantityPacked: 18,
              },
              {
                sku: "OFM-GSKT-FLG-3",
                description: "3-bolt flange gasket",
                quantityOrdered: 30,
                quantityPacked: 30,
              },
            ]}
            freightMethod="Direct Freight Express — overnight"
            freightTrackingNumber="DFE-2052-44190"
            packedBy="Pho N."
            notes="2 × clamps short-supplied — backorder on next Magnaflow shipment (ETA 31 May)."
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
