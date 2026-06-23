import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintSheet } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Print preview frame | UI Primitives — Print & PDF",
}

export default function PreviewFrameDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 12"
        title="Print preview frame"
        description="Dark-on-light inspection chrome that wraps any printable surface. Toolbar with doc id + format, decorative ruler, dropshadow stage, and a Print button that calls window.print()."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Print preview frame" },
        ]}
      />
      <section className={styles.canvas} aria-label="Print preview frame demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Wraps every preview surface inside this section. The dark frame is purely for the
            web — when you actually print, every dark UI element is hidden by the @media print
            rules and only the white paper inside survives.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-DOC-PREVIEW-DEMO"
          documentLabel="Preview frame — minimal sheet inside"
          format="A4"
          pages={2}
        >
          <PrintSheet
            format="A4"
            header={
              <div>
                <strong style={{ fontSize: "var(--primitive-text-md)", color: "var(--primitive-ink)", fontWeight: 700 }}>
                  Print preview frame demo
                </strong>
                <p style={{ margin: "var(--primitive-space-0-5) 0 0", color: "var(--primitive-muted)", fontSize: "11px" }}>
                  The dark surface outside this sheet is the inspection chrome. Click Print to
                  send the inside-only document to the browser print dialog.
                </p>
              </div>
            }
            footer={<span>Preview frame is the boundary between dashboard and paper.</span>}
          >
            <p
              style={{
                margin: 0,
                fontSize: "var(--primitive-text-xs)",
                color: "var(--primitive-ink-soft)",
                lineHeight: 1.6,
              }}
            >
              The frame composes four pieces. (1) a toolbar with document identity and a real
              Print button. (2) a decorative ruler line for visual scale. (3) the paper stage
              with a soft drop-shadow. (4) a status bar at the bottom indicating live preview.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "var(--primitive-text-xs)",
                color: "var(--primitive-ink-soft)",
                lineHeight: 1.6,
              }}
            >
              At print time, all of (1) (2) (3) (4) collapse via @media print and the browser
              prints just the white sheet contents.
            </p>
          </PrintSheet>
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
