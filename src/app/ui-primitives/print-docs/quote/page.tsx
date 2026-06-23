import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintQuote } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Quotation | UI Primitives — Print & PDF",
}

export default function PrintQuoteDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 05"
        title="Quotation"
        description="Formal quotation — brand header, customer block, valid-until date, numbered scope items, pricing breakdown, T&Cs, and acceptance signature blocks."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Quotation" },
        ]}
      />
      <section className={styles.canvas} aria-label="Quote demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Sent to a customer before they commit. Each quote rolls forward into a work order
            once accepted. Valid-until date prevents stale-pricing disputes.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-QTE-26-2218"
          documentLabel="Quotation — custom catback fabrication"
          format="A4"
        >
          <PrintQuote
            quoteNumber="OFM-QTE-26-2218"
            issuedAt="24 May 2026"
            issuedIso="2026-05-24"
            validUntil="07 June 2026"
            validUntilIso="2026-06-07"
            from={{
              name: "Oak Flats Mufflermen Pty Ltd",
              abn: "47 612 985 003",
              addressLines: [
                "31 Industrial Drive",
                "Oak Flats NSW 2529",
              ],
              email: "ops@mufflermen.com.au",
              phone: "+61 (0) 2 4256 1188",
            }}
            customer={{
              name: "Jared Whittaker",
              addressLines: [
                "14 Tongarra Road",
                "Albion Park NSW 2527",
              ],
              email: "jared.whittaker@example.com",
              phone: "+61 412 884 901",
            }}
            vehicle="2015 Holden Commodore VF SS · Rego CCV-12K"
            scopeItems={[
              {
                index: "01",
                title: "Workshop fabrication",
                detail:
                  "Bench-build a 3.0in mandrel-bent stainless catback to suit the VF SS sedan. Includes tube prep, TIG welds at every join, and pressure leak-down test.",
              },
              {
                index: "02",
                title: "Manta MM01 muffler integration",
                detail:
                  "Splice the Manta MM01 chrome straight-through into the fabricated section. Align tips to factory exit point with hand-shaped tip cups.",
              },
              {
                index: "03",
                title: "Dyno verification",
                detail:
                  "Two pulls on the workshop chassis dyno post-fit. Supply printed AFR + power sheet with the invoice.",
              },
            ]}
            pricing={[
              {
                description: "3.0in stainless tube + mandrel bends",
                quantity: 1,
                unitPrice: 480,
              },
              {
                description: "Workshop fabrication labour (6 hr · bay 03)",
                quantity: 6,
                unitPrice: 165,
              },
              {
                description: "Manta MM01 chrome muffler",
                quantity: 1,
                unitPrice: 285,
              },
              {
                description: "Dyno run + tune verification",
                quantity: 1,
                unitPrice: 220,
              },
            ]}
            subtotal={1975}
            gst={197.5}
            total={2172.5}
            currency="AUD"
            termsAndConditions={[
              "Quote valid for 14 days from issue date.",
              "50% deposit required to secure workshop slot.",
              "Workshop warranty 12 months / 20,000 km on fabrication welds.",
              "ADR 83/00 emissions compliance assumed — verify on receipt of vehicle.",
              "Cancellation within 48 hours of booking attracts 25% rescheduling fee.",
            ]}
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
