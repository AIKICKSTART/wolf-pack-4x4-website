import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./inbox.module.css"

export const metadata: Metadata = {
  title: "Inbox & Messaging | UI Primitives",
  description:
    "Reusable human-to-human messaging primitives — conversation list, headers, bubbles, voice memos, attachments, reactions, threads, pinned bar, unread divider, read receipts.",
}

interface InboxScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<InboxScene> = [
  {
    kicker: "Primitive 01",
    title: "Conversation list rail",
    body:
      "Left rail with search, filter chips, avatar + preview rows, unread badges, active highlight.",
    href: "/ui-primitives/inbox/conversation-list",
    accent: "red",
    glyph: "▤",
    state: "Stateful · filter + search",
  },
  {
    kicker: "Primitive 02",
    title: "Conversation header",
    body:
      "Top bar with avatar, presence dot, role chip, and call / video / pin / mute / archive actions.",
    href: "/ui-primitives/inbox/conversation-header",
    accent: "amber",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Message bubble",
    body:
      "Self vs other bubble with status ticks, reactions tray, time + footer meta.",
    href: "/ui-primitives/inbox/message-bubble",
    accent: "red",
    glyph: "◗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Message group",
    body:
      "Groups consecutive messages by author with shared header and timestamp divider.",
    href: "/ui-primitives/inbox/message-group",
    accent: "teal",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Typing indicator",
    body:
      "Three-dot bounce showing someone is typing. Reduced-motion swaps to static dots.",
    href: "/ui-primitives/inbox/typing-indicator",
    accent: "teal",
    glyph: "···",
    state: "Stateless · animation",
  },
  {
    kicker: "Primitive 06",
    title: "Reply composer",
    body:
      "Auto-grow textarea, emoji / attach / mention buttons, send action, Cmd+Enter to send.",
    href: "/ui-primitives/inbox/reply-composer",
    accent: "amber",
    glyph: "✎",
    state: "Stateful · textarea",
  },
  {
    kicker: "Primitive 07",
    title: "Voice memo bubble",
    body:
      "Inline voice memo with play button + waveform + duration, tone-coordinated to sender.",
    href: "/ui-primitives/inbox/voice-memo",
    accent: "red",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Image attachment bubble",
    body:
      "Image inside a bubble with expand affordance and hover overlay showing file name.",
    href: "/ui-primitives/inbox/image-attachment",
    accent: "amber",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "File attachment bubble",
    body:
      "File card in a bubble — typed icon, file name, size, optional progress, download CTA.",
    href: "/ui-primitives/inbox/file-attachment",
    accent: "green",
    glyph: "⎙",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Reaction picker",
    body:
      "Floating emoji picker shown on hover / click — 6 defaults + expand to more.",
    href: "/ui-primitives/inbox/reaction-picker",
    accent: "teal",
    glyph: "☺",
    state: "Stateful · open",
  },
  {
    kicker: "Primitive 11",
    title: "Thread reply row",
    body:
      "Inline link showing reply count + last-reply time; expands to indented thread panel.",
    href: "/ui-primitives/inbox/thread-reply",
    accent: "teal",
    glyph: "↳",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 12",
    title: "Pinned message bar",
    body:
      "Top strip scrolling through pinned items; click a card to jump to that message.",
    href: "/ui-primitives/inbox/pinned-bar",
    accent: "amber",
    glyph: "📌",
    state: "Stateful · scroll",
  },
  {
    kicker: "Primitive 13",
    title: "Unread divider",
    body:
      "Horizontal divider with pulsing 'Unread messages' pill between read + unread groups.",
    href: "/ui-primitives/inbox/unread-divider",
    accent: "red",
    glyph: "—",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Read receipts row",
    body:
      "Tiny avatar group + timestamp showing who has read your most recent message.",
    href: "/ui-primitives/inbox/read-receipts",
    accent: "teal",
    glyph: "✓✓",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full inbox scene",
    body:
      "Conversation list + header + pinned bar + threaded transcript + typing + composer.",
    href: "/ui-primitives/inbox/full-scene",
    accent: "red",
    glyph: "✉◤",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<InboxScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function InboxIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Inbox / 14 primitives + composition"
        title="Inbox & messaging"
        description="Reusable primitives for assembling Mufflermen workshop conversations — front-desk to bay tech, parts runner to foreman, and customer threads. Distinct from AI assistant chat primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — messaging is not wired
      </span>

      <section className={styles.grid} aria-label="Inbox primitives">
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
