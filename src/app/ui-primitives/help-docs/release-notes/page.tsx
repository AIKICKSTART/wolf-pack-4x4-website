import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReleaseNotesEntry } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Release notes | UI Primitives — Help & Docs",
}

export default function ReleaseNotesPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 13"
        title="Release notes"
        description="Release notes timeline entry: version badge + date + summary + categorised change chips (Added / Fixed / Changed / Deprecated / Removed) + read-more link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Release notes" },
        ]}
      />
      <section className={styles.canvas} aria-label="Release notes demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Renders the changelog in chronological order with the newest at the top. Floor
            staff scan the latest entry, deeper history reachable via the read-more link.
          </p>
        </div>
        <div className={styles.stage} style={{ display: "grid", gap: 18 }}>
          <ReleaseNotesEntry
            version="4.12.0"
            releaseDate="24 May 2026"
            releaseIso="2026-05-24"
            summary="Custom catback quote preset and Magnaflow rebate ledger"
            changes={[
              { category: "added", label: "Custom-catback preset in the quote builder." },
              { category: "added", label: "Magnaflow ANZ rebate ledger view." },
              { category: "fixed", label: "Bay assignment race when two staff edit at once." },
              { category: "changed", label: "Margin floor now defaults to 28% — was 26%." },
            ]}
            readMoreHref="/ui-primitives/help-docs/article"
          />
          <ReleaseNotesEntry
            version="4.11.2"
            releaseDate="08 May 2026"
            releaseIso="2026-05-08"
            summary="Stripe dispute holds + workshop handover audit"
            changes={[
              {
                category: "added",
                label: "Audit trail on workshop handover between bays.",
              },
              { category: "fixed", label: "Stripe disputes correctly hold settlement." },
              { category: "removed", label: "Legacy /v0/quotes endpoint." },
            ]}
            readMoreHref="/ui-primitives/help-docs/article"
          />
          <ReleaseNotesEntry
            version="4.11.0"
            releaseDate="22 Apr 2026"
            releaseIso="2026-04-22"
            summary="Quote v2 lineage and labour-band picker"
            changes={[
              { category: "added", label: "Roll any quote to v2 with full lineage." },
              { category: "added", label: "Labour-band picker in the quote builder." },
              { category: "deprecated", label: "Free-text labour rate field." },
            ]}
            readMoreHref="/ui-primitives/help-docs/article"
          />
          <ReleaseNotesEntry
            version="4.10.3"
            releaseDate="05 Apr 2026"
            releaseIso="2026-04-05"
            summary="Vehicle dataset refresh and bay scheduler tweaks"
            changes={[
              { category: "added", label: "2026 model-year vehicles in catalogue." },
              { category: "fixed", label: "Drag-to-reschedule misalign in week-view." },
              { category: "changed", label: "Sidebar copy: 'Workshop' renamed 'Floor'." },
            ]}
            readMoreHref="/ui-primitives/help-docs/article"
          />
          <ReleaseNotesEntry
            version="4.10.0"
            releaseDate="14 Mar 2026"
            releaseIso="2026-03-14"
            summary="Floor handover board + SMS templates"
            changes={[
              { category: "added", label: "Floor handover board for shift change." },
              { category: "added", label: "Customer SMS templates with merge tags." },
              { category: "fixed", label: "PDF quote export font hinting." },
            ]}
            readMoreHref="/ui-primitives/help-docs/article"
          />
        </div>
      </section>
    </main>
  )
}
