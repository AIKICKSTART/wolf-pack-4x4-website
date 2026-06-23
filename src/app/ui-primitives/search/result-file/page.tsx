import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchResultFile } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "File result | UI Primitives — Search",
}

export default function ResultFilePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 10"
        title="File result"
        description="Search result variant tuned for the document store — kind-tinted file icon, file name, full path, size, modified time (semantic time element), owner, and an open CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "File result" },
        ]}
      />
      <section className={styles.canvas} aria-label="File result demo">
        <div className={styles.note}>
          <span>Kinds</span>
          <p>
            Five tinted variants: pdf (red), doc (teal), image (amber), sheet (green), zip
            (neutral). The fallback &ldquo;generic&rdquo; uses neutral chrome.
          </p>
        </div>
        <div className={styles.stage}>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <SearchResultFile
              href="#"
              kind="pdf"
              name="BA Falcon catback fitment guide.pdf"
              path="/wiki/exhaust/ba-falcon/fitment-guide.pdf"
              size="1.2 MB"
              modifiedAt="2026-05-12T10:14:00+10:00"
              modifiedLabel="12 May 2026"
              ownerName="Liv Bartolomeo"
            />
            <SearchResultFile
              href="#"
              kind="doc"
              name="Workshop opening checklist.docx"
              path="/handbook/opening-checklist.docx"
              size="38 KB"
              modifiedAt="2026-04-29T08:30:00+10:00"
              modifiedLabel="29 Apr 2026"
              ownerName="Liv Bartolomeo"
            />
            <SearchResultFile
              href="#"
              kind="image"
              name="Bay 04 — VE Commodore catback.jpg"
              path="/jobs/2415/photos/bay-04-catback-fit.jpg"
              size="3.8 MB"
              modifiedAt="2026-05-27T15:22:00+10:00"
              modifiedLabel="Yesterday"
              ownerName="Brent Holloway"
            />
            <SearchResultFile
              href="#"
              kind="sheet"
              name="Q2 2026 supplier ledger.xlsx"
              path="/finance/supplier-ledger-q2-2026.xlsx"
              size="412 KB"
              modifiedAt="2026-05-20T09:48:00+10:00"
              modifiedLabel="20 May 2026"
              ownerName="Sandra Cook"
            />
            <SearchResultFile
              href="#"
              kind="zip"
              name="Customer quote archive — May.zip"
              path="/archive/quotes/2026-05.zip"
              size="14.6 MB"
              modifiedAt="2026-05-31T17:00:00+10:00"
              modifiedLabel="Today"
              ownerName="Hugo Eastman"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
