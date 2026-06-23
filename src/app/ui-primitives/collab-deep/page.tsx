import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./collab-deep.module.css"

export const metadata: Metadata = {
  title: "Collab deep pack | UI Primitives",
  description:
    "Fourteen deep collaboration primitives for Oak Flats Mufflermen — floating cursor, presence avatar stack, comment overlay pin, comment thread popover, version conflict modal, awareness strip, lock zone overlay, follow mode pill, live edit indicator, selection highlight bar, cursor trail rail, commit pulse strip, screen share card, voice room tile.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Presence cursor",
    body: "Floating remote cursor with tinted name label, soft bob, and live activity verb.",
    href: "/ui-primitives/collab-deep/presence-cursor",
    accent: "teal",
    state: "Cursor",
  },
  {
    kicker: "Primitive 02",
    title: "Presence avatar stack",
    body: "Overlapping avatar stack with per-collaborator halos and optional caption.",
    href: "/ui-primitives/collab-deep/presence-avatar-stack",
    accent: "teal",
    state: "Presence",
  },
  {
    kicker: "Primitive 03",
    title: "Comment overlay pin",
    body: "Canvas comment pin — anchored, tinted to its author, with reply badge and status.",
    href: "/ui-primitives/collab-deep/comment-overlay-pin",
    accent: "amber",
    state: "Pin",
  },
  {
    kicker: "Primitive 04",
    title: "Comment thread popover",
    body: "Anchored thread popover with root comment, replies, status chip, and reply box.",
    href: "/ui-primitives/collab-deep/comment-thread-popover",
    accent: "amber",
    state: "Thread",
  },
  {
    kicker: "Primitive 05",
    title: "Version conflict modal",
    body: "3-way diff with Original / Yours / Theirs columns and merge / keep-mine / keep-theirs actions.",
    href: "/ui-primitives/collab-deep/version-conflict-modal",
    accent: "red",
    state: "Conflict",
  },
  {
    kicker: "Primitive 06",
    title: "Awareness strip",
    body: "Live 'who's looking at what' strip with focus dots and focus-duration tags.",
    href: "/ui-primitives/collab-deep/awareness-strip",
    accent: "teal",
    state: "Awareness",
  },
  {
    kicker: "Primitive 07",
    title: "Lock zone overlay",
    body: "Translucent overlay that locks a section while another collaborator edits it.",
    href: "/ui-primitives/collab-deep/lock-zone-overlay",
    accent: "amber",
    state: "Lock",
  },
  {
    kicker: "Primitive 08",
    title: "Follow mode pill",
    body: "Floating 'Following Mia P.' pill with stop-following affordance.",
    href: "/ui-primitives/collab-deep/follow-mode-pill",
    accent: "teal",
    state: "Follow",
  },
  {
    kicker: "Primitive 09",
    title: "Live edit indicator",
    body: "Pulsing edit indicator on a live field with author avatar and preview snippet.",
    href: "/ui-primitives/collab-deep/live-edit-indicator",
    accent: "amber",
    state: "Edit",
  },
  {
    kicker: "Primitive 10",
    title: "Selection highlight bar",
    body: "Tinted selection bar showing a remote collaborator's current text selection.",
    href: "/ui-primitives/collab-deep/selection-highlight-bar",
    accent: "teal",
    state: "Selection",
  },
  {
    kicker: "Primitive 11",
    title: "Cursor trail rail",
    body: "SVG heat trail of every recent cursor position on the doc, per collaborator.",
    href: "/ui-primitives/collab-deep/cursor-trail-rail",
    accent: "teal",
    state: "Trail",
  },
  {
    kicker: "Primitive 12",
    title: "Commit pulse strip",
    body: "Horizontal strip of recent saves with pulsing dot on the latest write.",
    href: "/ui-primitives/collab-deep/commit-pulse-strip",
    accent: "green",
    state: "Saves",
  },
  {
    kicker: "Primitive 13",
    title: "Screen share card",
    body: "Screen-share initiator card with preview frame, presenter, and viewer roster.",
    href: "/ui-primitives/collab-deep/screen-share-card",
    accent: "red",
    state: "Share",
  },
  {
    kicker: "Primitive 14",
    title: "Voice room tile",
    body: "Voice / audio room tile with active speaker rings and join / leave control.",
    href: "/ui-primitives/collab-deep/voice-room-tile",
    accent: "green",
    state: "Voice",
  },
  {
    kicker: "Bonus",
    title: "Full collab cockpit",
    body: "Composes every collab-deep primitive on a single canvas — Falcon parts CMS with Daniel, Mia, and Tim co-editing.",
    href: "/ui-primitives/collab-deep/full-collab",
    accent: "red",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function CollabDeepIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Collab deep pack"
        title="Deep collaboration primitives"
        description="Fourteen deep collaboration surfaces for Oak Flats Mufflermen — floating cursors, presence avatar stacks, anchored comment pins + threads, three-way version conflict modal, awareness strip, lock zones, follow mode, live edit pulses, remote selection bars, cursor heat trails, commit pulses, screen-share cards, and voice rooms. Bonus: a composed full collab cockpit route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep" },
        ]}
      />

      <span className={styles.notice}>
        Collab deep · composed on top of realtime-collab, comments, and whiteboard
      </span>

      <section className={styles.grid} aria-label="Collab deep primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
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
