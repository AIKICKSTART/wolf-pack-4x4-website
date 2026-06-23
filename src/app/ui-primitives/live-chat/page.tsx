import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./live-chat.module.css"

export const metadata: Metadata = {
  title: "Live chat operator console | UI Primitives",
  description:
    "Live chat operator console primitives for the Mufflermen workshop — queue, active chat, status pill, macros, customer context, co-browse, sentiment, transfer, wrap-up, volume gauge, SLA chip, multi-chat tabs, team presence, KB snippets and a full console composition.",
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
    title: "Chat queue inbox",
    body:
      "Operator's pending chats — Mine / Unassigned / At-risk filter chips, SLA risk colour-coding and per-row wait timer.",
    href: "/ui-primitives/live-chat/chat-queue-inbox",
    accent: "teal",
    glyph: "◖▢",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 02",
    title: "Active chat window",
    body:
      "Centre pane — header + bubble thread (compose MessageBubble) + ReplyComposer with mention picker.",
    href: "/ui-primitives/live-chat/active-chat-window",
    accent: "red",
    glyph: "▤▦",
    state: "Stateful · compose",
  },
  {
    kicker: "Primitive 03",
    title: "Operator status pill",
    body:
      "Available / Away / In wrap / Busy availability pill — status-dot pulse + auto-set on inactivity.",
    href: "/ui-primitives/live-chat/operator-status-pill",
    accent: "green",
    glyph: "●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Quick replies + macro panel",
    body:
      "Macro library docked beside composer — pinned shortcut chips above MacroPicker for one-tap inserts.",
    href: "/ui-primitives/live-chat/quick-replies-macro-panel",
    accent: "violet",
    glyph: "/",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 05",
    title: "Customer context card",
    body:
      "Right-rail visitor profile — avatar, persona chip, page-viewing block, cart contents, past chats + open ticket counts.",
    href: "/ui-primitives/live-chat/customer-context-card",
    accent: "amber",
    glyph: "♂",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Co-browsing screen viewer",
    body:
      "Mock browser frame showing what the visitor sees + animated pointer indicator + Request control CTA.",
    href: "/ui-primitives/live-chat/co-browsing-screen-viewer",
    accent: "teal",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Sentiment indicator",
    body:
      "Frustrated → Neutral → Delighted real-time meter (compose RadialMeter + Chip) with recent-shift indicator.",
    href: "/ui-primitives/live-chat/sentiment-indicator",
    accent: "green",
    glyph: "♥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Transfer chat modal",
    body:
      "Choose operator or team + transfer-with-context toggle + hand-off note (compose BasicDialog).",
    href: "/ui-primitives/live-chat/transfer-chat-modal",
    accent: "violet",
    glyph: "⇄",
    state: "Stateful · dialog",
  },
  {
    kicker: "Primitive 09",
    title: "Wrap-up form",
    body:
      "Post-chat outcome chips + tags + notes + send-transcript toggle, all wrapped in a modal.",
    href: "/ui-primitives/live-chat/wrap-up-form",
    accent: "green",
    glyph: "✓",
    state: "Stateful · dialog",
  },
  {
    kicker: "Primitive 10",
    title: "Chat volume gauge",
    body:
      "Live team chat-load radial meter + queue length chip + projected ETA chip — role=status, aria-live.",
    href: "/ui-primitives/live-chat/chat-volume-gauge",
    accent: "red",
    glyph: "◔",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Chat SLA timer chip",
    body:
      "Per-chat first / next / resolve timer with tone-shifting (composes support/SlaTimerChip).",
    href: "/ui-primitives/live-chat/chat-sla-timer-chip",
    accent: "amber",
    glyph: "⏱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Multi-chat tabs",
    body:
      "Tab strip across active chats — avatar + name + unread badge + close affordance + role=tab.",
    href: "/ui-primitives/live-chat/multi-chat-tabs",
    accent: "teal",
    glyph: "▥",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 13",
    title: "Operator team presence",
    body:
      "Avatars with status dots + role caption + current chat load chip — Slack-like presence panel.",
    href: "/ui-primitives/live-chat/operator-team-presence",
    accent: "amber",
    glyph: "○●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "KB snippet suggester",
    body:
      "Context-aware article list with match-score chip, preview + Insert-in-reply CTA + open in side pane.",
    href: "/ui-primitives/live-chat/kb-snippet-suggester",
    accent: "violet",
    glyph: "?",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full operator console",
    body:
      "Composed console — Queue left + MultiChatTabs top + ActiveChatWindow + CustomerContextCard right + macros + sentiment + KB + WrapUpForm + TransferChatModal triggers.",
    href: "/ui-primitives/live-chat/full-console",
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

export default function LiveChatIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Live chat / 14 primitives + composition"
        title="Live chat operator console"
        description="Operator-side primitives for the Mufflermen storefront — synchronous web chat surfaces that sit between the inbox primitives (peer-to-peer messaging) and the support primitives (asynchronous tickets). Realistic scenarios: Mick Davis asking about Hilux fitment, Leah following up on a Commodore quote, an anonymous visitor lodging a Manta DPF warranty rattle, Tom checking on Falcon BA mid-pipe stock. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Live chat primitives">
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
