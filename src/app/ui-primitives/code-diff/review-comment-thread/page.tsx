import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReviewCommentThread } from "../../components/code-diff"
import type { ReviewCommentMessage } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Review comment thread | UI Primitives — Code diff",
}

const THREAD_ONE: ReadonlyArray<ReviewCommentMessage> = [
  {
    author: "Sophie Tan",
    avatarTone: "teal",
    timestamp: "2026-05-26 10:14 AEST",
    text: "We should pin the cohort weighting — otherwise instantQuote() will read whatever Edge Config has cached, which is stale on first deploy.",
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
    text: "Good call. Will pipe getCohortWeighting() through in the next push.",
    reactions: [{ glyph: "+1", count: 1 }],
  },
]

const THREAD_TWO: ReadonlyArray<ReviewCommentMessage> = [
  {
    author: "Jordan Pace",
    avatarTone: "amber",
    timestamp: "2026-05-25 14:02 AEST",
    text: "Reduced-motion fallback to PartsList is correct, but let’s also disable the autorotate on the 3D viewer if prefers-reduced-motion is on, even for users who explicitly enabled the viewer.",
  },
]

export default function ReviewCommentThreadPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 11"
        title="Review comment thread"
        description="Code-review thread anchored to a line — avatar, body, reactions, optional code suggestion block, and resolve toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Review comment thread" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>PR #482 · apps/web/quote-instant-pricing.ts L31</span>
          <ReviewCommentThread
            filePath="apps/web/quote-instant-pricing.ts"
            lineNumber={31}
            messages={THREAD_ONE}
          />
          <ReviewCommentThread
            filePath="apps/parts/catalogue.tsx"
            lineNumber={17}
            messages={THREAD_TWO}
            resolved
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The thread is aria-live polite so new replies announce as they post. The resolve
            toggle uses <code>aria-pressed</code> and updates in place. Suggestion blocks render as
            a mini-diff with their own apply CTA, distinct from the parent thread.
          </p>
        </div>
      </section>
    </main>
  )
}
