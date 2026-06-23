import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BarcodeBlock, PrintPreviewFrame, PrintSheet } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Barcode block | UI Primitives — Print & PDF",
}

const samples: ReadonlyArray<{ value: string; label?: string }> = [
  { value: "OFM-TXN-26-052401-0418", label: "POS transaction id" },
  { value: "OFM-WO-26-1142", label: "Work order ref" },
  { value: "MANTA-MK4M3-CB-001", label: "Parts SKU" },
  { value: "DFE-2052-44190", label: "Freight tracking" },
]

export default function BarcodeBlockDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 10"
        title="Barcode block"
        description="Pure-SVG Code-128-style barcode rendered from any string. Visual approximation only — not a true scanner-compliant barcode, but consistent and crisp at any print size."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Barcode block" },
        ]}
      />
      <section className={styles.canvas} aria-label="Barcode block demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Stamped on receipts, packing slips, and work orders so the workshop can scan an item
            back to its system record. Renders as deterministic SVG bars so the visual is
            consistent across machines and print drivers.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-DOC-BARCODE-DEMO"
          documentLabel="Barcode block — 4 sample values"
          format="A4"
        >
          <PrintSheet
            format="A4"
            header={
              <div>
                <strong style={{ fontSize: "var(--primitive-text-md)", color: "var(--primitive-ink)", fontWeight: 700 }}>
                  Barcode samples
                </strong>
                <p style={{ margin: "var(--primitive-space-0-5) 0 0", color: "var(--primitive-muted)", fontSize: "11px" }}>
                  Each barcode is rendered from the value below. Pure SVG, scales without loss.
                </p>
              </div>
            }
            footer={<span>Reference Code-128 only — for visual fidelity in print documents.</span>}
          >
            <div style={{ display: "grid", gap: "var(--primitive-space-4)" }}>
              {samples.map((sample) => (
                <article
                  key={sample.value}
                  style={{
                    display: "grid",
                    gap: "var(--primitive-space-1)",
                    padding: "14px 18px",
                    border: "1px solid var(--primitive-line)",
                    borderRadius: "4px",
                    background: "var(--primitive-paper-card)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--primitive-red)",
                      fontFamily: "Geist Mono, monospace",
                      fontSize: "var(--primitive-text-2xs)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {sample.label}
                  </span>
                  <BarcodeBlock value={sample.value} />
                </article>
              ))}
            </div>
          </PrintSheet>
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
