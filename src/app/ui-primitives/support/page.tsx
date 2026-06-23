import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./support.module.css"

export const metadata: Metadata = {
  title: "Customer support + helpdesk | UI Primitives",
  description:
    "Customer-support and helpdesk primitives for the Mufflermen workshop — ticket rows, priority chips, SLA timers, conversation threads, internal notes, macros, status workflow, CSAT, NPS, KB suggester, customer profile, multi-channel inbox, triage rules, AI suggested replies and a composed helpdesk view.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Ticket row",
    body: "Id, subject, customer avatar, status chip, priority chip, assignee, last update and live SLA chip — the workhorse helpdesk list row.",
    href: "/ui-primitives/support/ticket-row",
    accent: "teal",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Priority chip",
    body: "P0 critical, P1 high, P2 normal, P3 low. P0 pulses to draw the eye. Short or long label variants.",
    href: "/ui-primitives/support/ticket-priority-chip",
    accent: "red",
    glyph: "P0",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Support conversation thread",
    body: "Public replies interleaved with internal notes — channel indicator (email / chat / SMS / phone) per entry plus author, timestamp and visibility chip.",
    href: "/ui-primitives/support/support-conversation-thread",
    accent: "teal",
    glyph: "◖◗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Internal note composer",
    body: "Yellow-tinted composer with a Not-visible-to-customer badge, @-mention picker, and ⌘+↵ submit.",
    href: "/ui-primitives/support/internal-note-composer",
    accent: "amber",
    glyph: "@",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 05",
    title: "Macro picker",
    body: "Searchable macro list, live preview pane, variable placeholder chips, Insert button (aria-pressed).",
    href: "/ui-primitives/support/macro-picker",
    accent: "violet",
    glyph: "M",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 06",
    title: "SLA timer chip",
    body: "Live SLA timer — green > 4h, amber 1-4h, red < 1h, critical-red when breached. role=status + aria-live.",
    href: "/ui-primitives/support/sla-timer-chip",
    accent: "amber",
    glyph: "⏱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Ticket status workflow",
    body: "New → Open → Pending → On hold → Resolved → Closed; current state highlighted; allowed-transition chips below.",
    href: "/ui-primitives/support/ticket-status-workflow",
    accent: "teal",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "CSAT score card",
    body: "Average score, smiley + star scale, response count, rating histogram and customer comment excerpt.",
    href: "/ui-primitives/support/csat-score-card",
    accent: "green",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "NPS survey card",
    body: "0-10 picker with promoter / passive / detractor colour-coding, follow-up textarea and previous-response trend chip.",
    href: "/ui-primitives/support/nps-survey-card",
    accent: "violet",
    glyph: "NPS",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 10",
    title: "Linked articles suggester",
    body: "Side panel — KB titles, category caption, match-score chip per article, open-in-side-pane CTA.",
    href: "/ui-primitives/support/linked-articles-suggester",
    accent: "teal",
    glyph: "?",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Customer profile sidebar",
    body: "Avatar, name, contact, lifetime value, vehicles list, prior tickets and pinned internal notes.",
    href: "/ui-primitives/support/customer-profile-sidebar",
    accent: "amber",
    glyph: "♂",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Multi-channel inbox",
    body: "Tab strip across Email / Chat / SMS / Phone / X / Facebook with per-channel count + filter chips. role=tablist.",
    href: "/ui-primitives/support/multi-channel-inbox",
    accent: "teal",
    glyph: "▥",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 13",
    title: "Triage rules card",
    body: "If [condition], then [route to team] + [set priority] + [tag with]. Uses the existing form pattern.",
    href: "/ui-primitives/support/triage-rules-card",
    accent: "neutral",
    glyph: "if",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "AI suggested reply card",
    body: "Confidence chip, suggested text preview, optional rationale, Use / Refine / Reject actions.",
    href: "/ui-primitives/support/ai-suggested-reply-card",
    accent: "violet",
    glyph: "✦",
    state: "Stateful · choice",
  },
  {
    kicker: "Composition",
    title: "Full helpdesk",
    body: "Composed helpdesk — MultiChannelInbox + TicketRow list + SupportConversationThread + CustomerProfileSidebar right + LinkedArticlesSuggester + InternalNoteComposer + MacroPicker open.",
    href: "/ui-primitives/support/full-helpdesk",
    accent: "red",
    glyph: "▣▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function SupportIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Support / 14 primitives + composition"
        title="Customer support + helpdesk primitives"
        description="Helpdesk surfaces for the Mufflermen workshop crew — ticket queues, conversation threads, internal notes, macros, SLAs, CSAT, NPS, knowledge-base suggestions, customer profile, unified multi-channel inbox, triage automation and AI suggested replies. Realistic Mufflermen scenarios — Hilux fitment queries, Manta warranty claims, Bay 2 reschedules. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <FormPatternReferences ids={["support-comment-composer", "feedback-review"]} />

      <section className={styles.grid} aria-label="Support primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
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
