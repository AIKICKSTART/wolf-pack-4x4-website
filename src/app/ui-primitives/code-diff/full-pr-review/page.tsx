import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ApproveChangesButton,
  CommitGraphMini,
  DiffStatsBar,
  FileTreeChanges,
  PullRequestCard,
  ReviewCommentThread,
  SideBySideDiff,
} from "../../components/code-diff"
import type {
  CommitGraphNode,
  DiffLine,
  FileChange,
  ReviewCommentMessage,
} from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Full PR review | UI Primitives — Code diff",
}

const FILES: ReadonlyArray<FileChange> = [
  { path: "apps/web/quote-instant-pricing.ts", kind: "modified", insertions: 28, deletions: 12 },
  { path: "apps/web/cohorts.ts", kind: "added", insertions: 64, deletions: 0 },
  { path: "apps/web/instant-quote.ts", kind: "modified", insertions: 9, deletions: 4 },
  { path: "apps/web/legacy-quote-v1.ts", kind: "deleted", insertions: 0, deletions: 142 },
  { path: "packages/feature-flags/quote-instant-pricing.json", kind: "added", insertions: 18, deletions: 0 },
  { path: "tests/quote-flow.spec.ts", kind: "modified", insertions: 34, deletions: 8 },
  { path: "tests/legacy-quote.spec.ts", kind: "deleted", insertions: 0, deletions: 96 },
]

const QUOTE_LINES: ReadonlyArray<DiffLine> = [
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

const THREAD: ReadonlyArray<ReviewCommentMessage> = [
  {
    author: "Sophie Tan",
    avatarTone: "teal",
    timestamp: "2026-05-26 10:14 AEST",
    text: "We should pin the cohort weighting before calling instantQuote — Edge Config can be stale on first deploy.",
    reactions: [
      { glyph: "+1", count: 2 },
      { glyph: "eyes", count: 1 },
    ],
    suggestion: {
      remove: ["  return instantQuote(partIds, bayId, cohort)"],
      add: [
        "  const weighting = await getCohortWeighting(cohort)",
        "  return instantQuote(partIds, bayId, cohort, weighting)",
      ],
    },
  },
  {
    author: "Marcus Halverson",
    avatarTone: "red",
    timestamp: "2026-05-26 10:31 AEST",
    text: "Good call — pushing the weighting fetch next.",
  },
]

const NODES: ReadonlyArray<CommitGraphNode> = [
  { sha: "f01a2c30", lane: "main", branchLabel: "main" },
  { sha: "e22b1a40", lane: "main" },
  { sha: "d8a09b55", lane: "feature", branchLabel: "feature/quote-instant-pricing" },
  { sha: "c61f2240", lane: "feature" },
  { sha: "d6e0b88a", lane: "feature", branchLabel: "HEAD" },
]

export default function FullPrReviewPage() {
  return (
    <main className={styles.page}>
      <div className={styles.pageHeaderHero}>
        <PageHeader
          kicker="Code diff · Full PR review composition"
          title="PR #482 — quote-instant-pricing"
          description="Every code-diff primitive assembled — header card, stats, file-tree rail, side-by-side diff with an inline review thread, commit-graph side panel, and an approve-changes footer."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Code diff", href: "/ui-primitives/code-diff" },
            { label: "Full PR review" },
          ]}
        />
      </div>

      <div style={{ width: "min(100%, 1400px)", margin: "0 auto" }}>
        <PullRequestCard
          number={482}
          title="Wire up quote-instant-pricing flag"
          author="Marcus Halverson"
          status="changes-requested"
          fromBranch="feature/quote-instant-pricing"
          toBranch="main"
          checks={[
            { name: "ci · unit", status: "passing", durationLabel: "1m 42s" },
            { name: "ci · e2e (Playwright)", status: "failing", durationLabel: "3m 18s" },
            { name: "ci · typecheck", status: "passing", durationLabel: "42s" },
            { name: "ci · lighthouse", status: "pending", durationLabel: "—" },
          ]}
          reviewers={[
            { name: "Sophie Tan", tone: "teal" },
            { name: "Jordan Pace", tone: "amber" },
            { name: "Ari Castellano", tone: "green" },
          ]}
        />
      </div>

      <div style={{ width: "min(100%, 1400px)", margin: "0 auto" }}>
        <DiffStatsBar insertions={153} deletions={262} filesChanged={7} />
      </div>

      <div className={styles.reviewShell}>
        <aside className={styles.reviewLeft} aria-label="Files changed rail">
          <FileTreeChanges
            files={FILES}
            selectedPath="apps/web/quote-instant-pricing.ts"
          />
        </aside>
        <section className={styles.reviewMain} aria-label="Diff and review">
          <SideBySideDiff
            filePath="apps/web/quote-instant-pricing.ts"
            oldLabel="main · a92f4c1"
            newLabel="feature/quote-instant-pricing · d6e0b88"
            oldRef="main"
            newRef="HEAD"
            lines={QUOTE_LINES}
          />
          <ReviewCommentThread
            filePath="apps/web/quote-instant-pricing.ts"
            lineNumber={31}
            messages={THREAD}
          />
        </section>
        <aside className={styles.reviewRight} aria-label="Commit graph rail">
          <CommitGraphMini nodes={NODES} title="Branch history" />
        </aside>
      </div>

      <div style={{ width: "min(100%, 1400px)", margin: "0 auto" }}>
        <ApproveChangesButton
          policy="review-required"
          approvalsRequired={2}
          initialVerdict={null}
        />
      </div>
    </main>
  )
}
