import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintSheet } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Print sheet | UI Primitives — Print & PDF",
}

export default function PrintSheetDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 01"
        title="Print sheet"
        description="The compositional A4 / Letter / 80mm receipt sheet every other print document is built on top of. The wrapper owns paper colour, page margins, and the @page CSS for printing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Print sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Print sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Pass header, footer, and body children. The wrapper handles aspect-ratio, padding,
            and applies the light-theme token overrides so all child content reads as printed
            paper, regardless of the outer dark dashboard.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-DOC-SHEET-A4"
          documentLabel="Bare print sheet (A4)"
          format="A4"
        >
          <PrintSheet
            format="A4"
            header={
              <div>
                <strong style={{ fontSize: "14px", color: "var(--primitive-ink)", fontWeight: 700 }}>
                  Document header slot
                </strong>
                <p style={{ margin: "var(--primitive-space-0-5) 0 0", color: "var(--primitive-muted)", fontSize: "11px" }}>
                  Brand crest, document title, doc-meta — whatever the printable surface needs.
                </p>
              </div>
            }
            footer={
              <>
                <span>Footer slot · disclaimers, legal, generated-at line</span>
                <span>Oak Flats Mufflermen · sample sheet</span>
              </>
            }
          >
            <h2 style={{ margin: 0, fontSize: "var(--primitive-text-lg)", color: "var(--primitive-ink)", fontWeight: 700 }}>
              Sheet body
            </h2>
            <p style={{ margin: 0, fontSize: "var(--primitive-text-xs)", color: "var(--primitive-ink-soft)", lineHeight: 1.55 }}>
              All child content automatically inherits the light theme. Default font is set to a
              print-friendly stack. Background gains a faint paper grain via repeating
              gradients. <code>aspect-ratio: 1 / 1.414</code> locks the A4 ratio on screen; the
              <code>@page</code> rule takes over when printed.
            </p>
            <ul style={{ paddingLeft: "18px", fontSize: "11px", color: "var(--primitive-ink-soft)" }}>
              <li>White background, near-black text</li>
              <li>Serif display font for headings</li>
              <li>Print-only @page rule sets A4 + 14mm/12mm margins</li>
              <li>Hides the inspection chrome when printed</li>
            </ul>
          </PrintSheet>
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
