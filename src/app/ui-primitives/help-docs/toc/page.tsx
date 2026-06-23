import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TableOfContents } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Table of contents | UI Primitives — Help & Docs",
}

const items = [
  { id: "toc-quoting", label: "Quoting workflow", depth: 2 as const },
  { id: "toc-quoting-inbound", label: "Inbound enquiry", depth: 3 as const },
  { id: "toc-quoting-build", label: "Building the quote", depth: 3 as const },
  { id: "toc-workshop", label: "Workshop floor", depth: 2 as const },
  { id: "toc-billing", label: "Billing", depth: 2 as const },
  { id: "toc-billing-stripe", label: "Stripe disputes", depth: 3 as const },
  { id: "toc-account", label: "Account management", depth: 2 as const },
]

export default function TocPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 07"
        title="Table of contents"
        description="Sticky right-side TOC. Highlights the currently visible heading via IntersectionObserver; smooth-scrolls (or jumps under reduced-motion) when a link is clicked."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Table of contents" },
        ]}
      />
      <section className={styles.canvas} aria-label="Table of contents demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Long articles past three screens get a TOC. Scroll the prose below and watch the
            active marker move with the visible heading.
          </p>
        </div>
        <div
          className={styles.stage}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 260px",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 16, color: "var(--primitive-body)" }}>
            <h2 id="toc-quoting" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Quoting workflow
            </h2>
            <p>
              The quoting workflow is split into two phases — inbound enquiry triage and the
              build of the actual quote line items.
            </p>
            <h3 id="toc-quoting-inbound" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Inbound enquiry
            </h3>
            <p>
              Every inbound enquiry creates a triage ticket. The desk triages by vehicle
              segment first, then by urgency.
            </p>
            <h3 id="toc-quoting-build" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Building the quote
            </h3>
            <p>
              Quotes are built in the quote tool. Line items can be parts, labour, or custom
              fabrication. Each line carries its own margin.
            </p>
            <h2 id="toc-workshop" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Workshop floor
            </h2>
            <p>
              Once a quote is signed, the job moves to the workshop floor and gets a bay
              assignment for a particular shift.
            </p>
            <h2 id="toc-billing" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Billing
            </h2>
            <p>
              Billing happens on completion. Deposits attach at quote sign; balance attaches
              at job close.
            </p>
            <h3 id="toc-billing-stripe" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Stripe disputes
            </h3>
            <p>
              A Stripe dispute creates a hold in the supplier ledger until resolved.
            </p>
            <h2 id="toc-account" style={{ color: "var(--primitive-text-strong)", margin: 0 }}>
              Account management
            </h2>
            <p>
              Owners can invite crew members, set permissions, and review the audit log.
            </p>
          </div>
          <TableOfContents items={items} />
        </div>
      </section>
    </main>
  )
}
