import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Unified inbox | UI Primitives",
  description:
    "Unified-inbox primitives for the Mufflermen front desk — SMS, Facebook DM, Instagram DM, email and web chat in one queue with sentiment auto-tagging, SLA countdowns, presence, tags and merge tools.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Multi-channel list",
    body:
      "Conversation list with per-channel icon (SMS / FB / IG / email / web), unread badge and sentiment dot.",
    href: "/ui-primitives/unified-inbox/multi-channel-list",
    accent: "teal",
    glyph: "✉◖",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 02",
    title: "Conversation thread view",
    body:
      "Central viewer with inbound / outbound bubbles, channel context tag and per-message channel hint.",
    href: "/ui-primitives/unified-inbox/conversation-thread-view",
    accent: "amber",
    glyph: "◗◖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Composer with macros",
    body:
      "Reply composer with a canned-reply chip strip + variable insertion buttons + Cmd/Ctrl+Enter to send.",
    href: "/ui-primitives/unified-inbox/composer-with-macros",
    accent: "violet",
    glyph: "/",
    state: "Stateful · compose",
  },
  {
    kicker: "Primitive 04",
    title: "Assign-to card",
    body:
      "Assignee picker with avatar, presence dot and workload chip — single-select with unassign action.",
    href: "/ui-primitives/unified-inbox/assign-to-card",
    accent: "red",
    glyph: "♂",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 05",
    title: "Sentiment tag strip",
    body:
      "Auto-detected sentiment chips (positive / neutral / negative / upset) with AI badge + human override.",
    href: "/ui-primitives/unified-inbox/sentiment-tag-strip",
    accent: "green",
    glyph: "♥",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 06",
    title: "Priority flag row",
    body:
      "Priority flag toggle row (low / normal / high / urgent) with caption + tone-coded states.",
    href: "/ui-primitives/unified-inbox/priority-flag-row",
    accent: "amber",
    glyph: "⚑",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 07",
    title: "Customer context rail",
    body:
      "Right rail with Customer 360 — avatar, contact, LTV, past job count and a recent-jobs list.",
    href: "/ui-primitives/unified-inbox/customer-context-rail",
    accent: "amber",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Bulk action bar",
    body:
      "Floating bar for bulk assign / move / close / spam over a multi-select — dismissible with X.",
    href: "/ui-primitives/unified-inbox/bulk-action-bar",
    accent: "red",
    glyph: "⊟",
    state: "Stateful · toolbar",
  },
  {
    kicker: "Primitive 09",
    title: "Team presence rail",
    body:
      "Team presence list with online / away / busy + current conversation count per teammate.",
    href: "/ui-primitives/unified-inbox/team-presence-rail",
    accent: "green",
    glyph: "○●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "SLA countdown tile",
    body:
      "First-response SLA countdown — large tabular timer, progress bar, breach alert when overdue.",
    href: "/ui-primitives/unified-inbox/sla-countdown-tile",
    accent: "red",
    glyph: "⏱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Auto-reply rule card",
    body:
      "Out-of-hours / away-message / first-touch rule card with toggle switch + channel chips.",
    href: "/ui-primitives/unified-inbox/auto-reply-rule-card",
    accent: "violet",
    glyph: "⟲",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 12",
    title: "Merge conversations modal",
    body:
      "Modal to fold duplicates into a primary thread with keep-history toggle + tone-coded channels.",
    href: "/ui-primitives/unified-inbox/merge-conversations-modal",
    accent: "teal",
    glyph: "⇄",
    state: "Stateful · dialog",
  },
  {
    kicker: "Primitive 13",
    title: "Tag manager strip",
    body:
      "Tag input with autocomplete suggestions + colour coding derived from the tag label.",
    href: "/ui-primitives/unified-inbox/tag-manager-strip",
    accent: "amber",
    glyph: "#",
    state: "Stateful · combobox",
  },
  {
    kicker: "Primitive 14",
    title: "Channel status row",
    body:
      "Connection state cards per channel — FB connected, IG OAuth expired with Reconnect CTA.",
    href: "/ui-primitives/unified-inbox/channel-status-row",
    accent: "red",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full unified inbox",
    body:
      "All 14 primitives composed end-to-end — Tim / Mia / Daniel handling DPF, quote and refund threads.",
    href: "/ui-primitives/unified-inbox/full-inbox",
    accent: "red",
    glyph: "▣▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function UnifiedInboxIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Unified inbox / 14 primitives + composition"
        title="Unified inbox"
        description="The Mufflermen front-desk console where SMS, Facebook DM, Instagram DM, email and web chat land in one queue. Tim runs the workshop diary, Mia takes counter inquiries, Daniel admins bookings and refunds. Sentiment auto-tags inbound messages, SLA timers turn red on hot leads after 15 minutes, presence shows who's actually replying, and tags + merge tools keep the queue clean."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — channels are not wired
      </span>

      <section className={styles.grid} aria-label="Unified inbox primitives">
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
