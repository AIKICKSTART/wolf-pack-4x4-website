import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BlameStrip } from "../../components/code-diff"
import type { BlameRow } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Blame strip | UI Primitives — Code diff",
}

const ROWS: ReadonlyArray<BlameRow> = [
  { lineNumber: 1, code: "import { resolveCohort } from './cohorts'", sha: "d6e0b88a", author: "Marcus Halverson", date: "2026-05-26" },
  { lineNumber: 2, code: "import { instantQuote } from './instant-quote'", sha: "d6e0b88a", author: "Marcus Halverson", date: "2026-05-26" },
  { lineNumber: 3, code: "import { legacyQuote } from './legacy-quote'", sha: "a92f4c10", author: "Sophie Tan", date: "2026-04-12" },
  { lineNumber: 4, code: "", sha: "a92f4c10", author: "Sophie Tan", date: "2026-04-12" },
  { lineNumber: 5, code: "export async function buildQuote(input: QuoteInput) {", sha: "a92f4c10", author: "Sophie Tan", date: "2026-04-12" },
  { lineNumber: 6, code: "  const { partIds, bayId, customerTier } = input", sha: "3f1b09a4", author: "Jordan Pace", date: "2026-05-01" },
  { lineNumber: 7, code: "  const flagged = await isFlagEnabled('quote-instant-pricing')", sha: "d6e0b88a", author: "Marcus Halverson", date: "2026-05-26" },
  { lineNumber: 8, code: "  const cohort = await resolveCohort(customerTier)", sha: "d6e0b88a", author: "Marcus Halverson", date: "2026-05-26" },
  { lineNumber: 9, code: "  if (!flagged) return legacyQuote(input)", sha: "a92f4c10", author: "Sophie Tan", date: "2026-04-12" },
  { lineNumber: 10, code: "  return instantQuote(partIds, bayId, cohort)", sha: "d6e0b88a", author: "Marcus Halverson", date: "2026-05-26" },
  { lineNumber: 11, code: "}", sha: "a92f4c10", author: "Sophie Tan", date: "2026-04-12" },
]

export default function BlameStripPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 08"
        title="Blame strip"
        description="Per-line blame rail showing the commit + author for each line. Hover or focus a cell to see the full popover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Blame strip" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>apps/web/quote-instant-pricing.ts</span>
          <BlameStrip filePath="apps/web/quote-instant-pricing.ts" rows={ROWS} />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each blame cell is focusable so the popover opens on keyboard navigation too. The rail
            is wrapped in a labelled list, and the code body is a parallel column so screen
            readers can read either side independently.
          </p>
        </div>
      </section>
    </main>
  )
}
