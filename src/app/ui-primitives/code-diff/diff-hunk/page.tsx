import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DiffHunk } from "../../components/code-diff"
import type { DiffLine } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Diff hunk | UI Primitives — Code diff",
}

const QUOTE_HUNK_LINES: ReadonlyArray<DiffLine> = [
  { kind: "context", oldLineNumber: 24, newLineNumber: 24, text: "export async function buildQuote(input: QuoteInput): Promise<Quote> {" },
  { kind: "context", oldLineNumber: 25, newLineNumber: 25, text: "  const { partIds, bayId, customerTier } = input" },
  { kind: "removed", oldLineNumber: 26, text: "  const flagged = await isFlagEnabled('quote-pricing-v1')" },
  { kind: "added", newLineNumber: 26, text: "  const flagged = await isFlagEnabled('quote-instant-pricing')" },
  { kind: "added", newLineNumber: 27, text: "  const cohort = await resolveCohort(customerTier)" },
  { kind: "context", oldLineNumber: 27, newLineNumber: 28, text: "  if (!flagged) {" },
  { kind: "context", oldLineNumber: 28, newLineNumber: 29, text: "    return legacyQuote(input)" },
  { kind: "context", oldLineNumber: 29, newLineNumber: 30, text: "  }" },
  { kind: "removed", oldLineNumber: 30, text: "  return instantQuote(partIds, bayId)" },
  { kind: "added", newLineNumber: 31, text: "  return instantQuote(partIds, bayId, cohort)" },
  { kind: "context", oldLineNumber: 31, newLineNumber: 32, text: "}" },
]

export default function DiffHunkPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 01"
        title="Diff hunk"
        description="One unified hunk with the @@ range strip and tone-coded lines for added / removed / context / meta."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Diff hunk" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>apps/web/quote-instant-pricing.ts · feature/quote-instant-pricing</span>
          <DiffHunk
            filePath="apps/web/quote-instant-pricing.ts"
            range={{ oldStart: 24, oldLines: 8, newStart: 24, newLines: 9, context: "buildQuote()" }}
            lines={QUOTE_HUNK_LINES}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each hunk is its own <code>role=&quot;region&quot;</code> with an aria-label combining
            file path + range. Old + new line numbers gutter each line — added rows have no old
            number, removed rows have no new number. Tone is purely background-driven so screen
            readers still get the +/- marker.
          </p>
        </div>
      </section>
    </main>
  )
}
