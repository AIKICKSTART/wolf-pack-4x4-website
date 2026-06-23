import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintSheet, QrBlock } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "QR block | UI Primitives — Print & PDF",
}

const samples: ReadonlyArray<{ value: string; label: string }> = [
  {
    value: "https://verify.mufflermen.com.au/c/OFM-CRT-26-0021",
    label: "Cert verify URL",
  },
  {
    value: "https://mufflermen.com.au/w/OFM-WO-26-1142",
    label: "Work order link",
  },
  {
    value: "https://mufflermen.com.au/p/MANTA-MK4M3-CB-001",
    label: "Parts catalogue",
  },
]

export default function QrBlockDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 11"
        title="QR block"
        description="Pure-SVG QR placeholder — 21×21 module grid generated from a hash of the input. Visual approximation only — not a real scanner-compliant QR, but used as a deterministic stamp on documents."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "QR block" },
        ]}
      />
      <section className={styles.canvas} aria-label="QR block demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Used on compliance certificates and work orders so the customer can verify the
            document online. In production, swap the placeholder for a real qrcode-svg renderer
            from the server side; the visual reserves the exact box size and label.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-DOC-QR-DEMO"
          documentLabel="QR block — 3 sample values"
          format="A4"
        >
          <PrintSheet
            format="A4"
            header={
              <div>
                <strong style={{ fontSize: "var(--primitive-text-md)", color: "var(--primitive-ink)", fontWeight: 700 }}>
                  QR samples
                </strong>
                <p style={{ margin: "var(--primitive-space-0-5) 0 0", color: "var(--primitive-muted)", fontSize: "11px" }}>
                  Each QR is rendered from the value below. Pure SVG, scales without loss.
                </p>
              </div>
            }
            footer={<span>Placeholder for visual fidelity — replace with real qrcode-svg in production.</span>}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--primitive-space-4)",
              }}
            >
              {samples.map((sample) => (
                <article
                  key={sample.value}
                  style={{
                    display: "grid",
                    gap: "var(--primitive-space-2)",
                    padding: "14px",
                    border: "1px solid var(--primitive-line)",
                    borderRadius: "4px",
                    background: "var(--primitive-paper-card)",
                    justifyItems: "center",
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
                  <QrBlock value={sample.value} size={120} />
                </article>
              ))}
            </div>
          </PrintSheet>
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
