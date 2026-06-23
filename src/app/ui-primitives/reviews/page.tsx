import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./reviews.module.css"

export const metadata: Metadata = {
  title: "Customer Reviews | UI Primitives",
  description:
    "Customer reviews + ratings primitive surface — review cards, rating breakdowns, sentiment, verified-purchase chips, photo attachments, owner replies, moderation queue, and the full reviews-page composition.",
}

interface ReviewsScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ReviewsScene> = [
  {
    kicker: "Primitive 01",
    title: "Review card",
    body: "Reviewer + verified chip + stars + headline + body + photos + workshop reply slot.",
    href: "/ui-primitives/reviews/review-card",
    accent: "amber",
    glyph: "★",
    state: "Stateless · slots",
  },
  {
    kicker: "Primitive 02",
    title: "Rating breakdown bar",
    body: "5★ → 1★ horizontal bars with percentage + per-tier count chip.",
    href: "/ui-primitives/reviews/rating-breakdown-bar",
    accent: "green",
    glyph: "≣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Star rating selector",
    body: "Interactive 1–5 selector with half-star support and hover preview.",
    href: "/ui-primitives/reviews/star-rating-selector",
    accent: "amber",
    glyph: "☆",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 04",
    title: "Sentiment chip",
    body: "Tone-shifted chip: Positive / Mixed / Negative for review aggregation.",
    href: "/ui-primitives/reviews/review-sentiment-chip",
    accent: "teal",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Verified purchase chip",
    body: "Small ‘verified purchase’ chip with hover tooltip for the job date.",
    href: "/ui-primitives/reviews/verified-purchase-chip",
    accent: "green",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Photo attachment",
    body: "Photo strip on a review with click-to-expand lightbox modal.",
    href: "/ui-primitives/reviews/photo-review-attachment",
    accent: "violet",
    glyph: "▣",
    state: "Stateful · modal",
  },
  {
    kicker: "Primitive 07",
    title: "Owner response card",
    body: "Workshop reply nested under a review — avatar, badge, body, timestamp.",
    href: "/ui-primitives/reviews/owner-response-card",
    accent: "red",
    glyph: "↩",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Filter chips",
    body: "All / 5★ / 4★ / Critical / Verified / Last 30 days toggle row.",
    href: "/ui-primitives/reviews/review-filter-chips",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · toggles",
  },
  {
    kicker: "Primitive 09",
    title: "Summary card",
    body: "Overall ★ avg + count + breakdown + sentiment donut + 30-day trend.",
    href: "/ui-primitives/reviews/review-summary-card",
    accent: "amber",
    glyph: "Σ",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Request prompt",
    body: "Post-job ‘leave a review’ card — star selector + textarea + submit.",
    href: "/ui-primitives/reviews/review-request-prompt",
    accent: "green",
    glyph: "✎",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 11",
    title: "Moderation queue",
    body: "Pending reviews with approve / edit / reject row actions + auto-flag.",
    href: "/ui-primitives/reviews/review-moderation-queue",
    accent: "amber",
    glyph: "⚖",
    state: "Stateful · table",
  },
  {
    kicker: "Primitive 12",
    title: "Spam / abuse flag",
    body: "Report-this-review panel — reason chips + optional context + send.",
    href: "/ui-primitives/reviews/spam-abuse-flag",
    accent: "red",
    glyph: "⚑",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 13",
    title: "Sort bar",
    body: "Most helpful / Most recent / Highest / Lowest / With photos chips.",
    href: "/ui-primitives/reviews/most-helpful-sort-bar",
    accent: "teal",
    glyph: "⇅",
    state: "Stateful · chips",
  },
  {
    kicker: "Primitive 14",
    title: "Rich reply editor",
    body: "Workshop reply editor with canned-reply picker + insert-name token.",
    href: "/ui-primitives/reviews/rich-review-reply-editor",
    accent: "red",
    glyph: "⌨",
    state: "Stateful · editor",
  },
  {
    kicker: "Composition",
    title: "Full reviews surface",
    body: "Summary + filters + sort + reviews list with replies + moderation aside.",
    href: "/ui-primitives/reviews/full-surface",
    accent: "amber",
    glyph: "★◐",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ReviewsScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function ReviewsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Reviews / 14 primitives + composition"
        title="Customer reviews primitives"
        description="The customer reviews + ratings stack — review cards, rating breakdowns, star selectors, sentiment + verified chips, photo lightboxes, owner replies, moderation queue, abuse reporting, and the full reviews-page composition. Static reference content, no production data."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no review data is persisted
      </span>

      <FormPatternReferences
        ids={["feedback-review", "survey-nps", "support-comment-composer"]}
      />

      <section className={styles.grid} aria-label="Reviews primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
