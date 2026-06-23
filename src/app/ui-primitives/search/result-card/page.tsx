import type { Metadata } from "next"

import { FileText } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { SearchResultCard } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Result card | UI Primitives — Search",
}

const QUERY = "BA Falcon catback"

export default function ResultCardPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 08"
        title="Result card · generic"
        description="The generic search-result card variant — thumbnail slot, source pill, URL line, mark-highlighted snippet, and a tag rail. Use when the more specific variants (product / file / person) don't fit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Result card" },
        ]}
      />
      <section className={styles.canvas} aria-label="Result card demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Long-form result cards for the document store, knowledge base, or any non-commerce
            content. The thumbnail slot accepts any ReactNode — icon, monogram, image.
          </p>
        </div>

        <div className={styles.stage}>
          <div style={{ display: "grid", gap: "var(--primitive-space-3)" }}>
            <SearchResultCard
              href="#"
              query={QUERY}
              source="Workshop wiki"
              url="/wiki/exhaust/ba-falcon"
              title="BA Falcon catback fitment notes"
              snippet="Workshop-internal fitment guide for the BA Falcon catback range. Bracket spacing, hangers, and supercharged-variant clearance notes for the assistance of any new technician."
              thumbnail={<FileText size={24} strokeWidth={1.6} aria-hidden="true" />}
              tags={[
                { id: "t1", label: "Fitment" },
                { id: "t2", label: "Ford" },
                { id: "t3", label: "Internal" },
              ]}
            />
            <SearchResultCard
              href="#"
              query={QUERY}
              source="Supplier portal"
              url="https://magnaflow.com/parts/14416"
              title="Magnaflow product page — BA Falcon catback"
              snippet="Magnaflow's catback specification sheet for the BA Falcon, including dB compliance, material spec, and a full bill of materials."
              tags={[
                { id: "t1", label: "Supplier" },
                { id: "t2", label: "External" },
              ]}
            />
            <SearchResultCard
              href="#"
              query={QUERY}
              source="Customer record"
              url="/crm/charlie-vass"
              title="Charlie Vass — BA Falcon catback fit · ticket 2415"
              snippet="Customer history record: 2003 BA Falcon, scheduled for a Magnaflow catback fit in Bay 04 on the 28th. Returning customer; previous tip swap in 2024."
              tags={[
                { id: "t1", label: "Customer" },
                { id: "t2", label: "Active job" },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
