import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Live broadcast | UI Primitives",
  description:
    "Live broadcast primitives for Oak Flats Mufflermen workshop streams — player, chat, RSVP, replay, backstage, poll, Q&A, supporter tiers, stream-health, raid, clip creator.",
}

interface BroadcastScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<BroadcastScene> = [
  {
    kicker: "Primitive 01",
    title: "Live player",
    body:
      "Broadcast viewport with LIVE badge, viewer count, bitrate indicator, play / mute / fullscreen / settings.",
    href: "/ui-primitives/live-broadcast/live-player",
    accent: "red",
    glyph: "▶",
    state: "Stateful · play + mute",
  },
  {
    kicker: "Primitive 02",
    title: "Chat panel",
    body:
      "Live chat with rate-limit countdown, slow mode hint, quick reactions, host + mod badges, supporter tiers.",
    href: "/ui-primitives/live-broadcast/chat-panel",
    accent: "amber",
    glyph: "✦",
    state: "Stateful · composer + cooldown",
  },
  {
    kicker: "Primitive 03",
    title: "RSVP card",
    body:
      "RSVP card with calendar add, reminder toggle, share, countdown banner. Triggers the going-state.",
    href: "/ui-primitives/live-broadcast/rsvp-card",
    accent: "red",
    glyph: "✓",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 04",
    title: "Schedule card",
    body:
      "Upcoming broadcast tile with countdown, host badge, RSVP count, add-to-calendar action.",
    href: "/ui-primitives/live-broadcast/schedule-card",
    accent: "amber",
    glyph: "⌛",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Replay card",
    body:
      "Replay tile with poster, chapters, view count, runtime, jump-to-chapter, share button.",
    href: "/ui-primitives/live-broadcast/replay-card",
    accent: "teal",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Host backstage panel",
    body:
      "Host controls — start / end stream, mute, slow-mode, raised-hands queue, mod reports, supporter count.",
    href: "/ui-primitives/live-broadcast/host-backstage-panel",
    accent: "red",
    glyph: "◑",
    state: "Stateful · toggles",
  },
  {
    kicker: "Primitive 07",
    title: "Viewer list row",
    body:
      "Viewer row with avatar, handle, region, watch-duration, supporter tier badge, host action cluster.",
    href: "/ui-primitives/live-broadcast/viewer-list-row",
    accent: "amber",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Reactions strip",
    body:
      "Floating muffler-flame / wrench / dyno / smoke / Aussie-flag reactions that bubble up the side rail.",
    href: "/ui-primitives/live-broadcast/reactions-strip",
    accent: "red",
    glyph: "❀",
    state: "Stateless · animated",
  },
  {
    kicker: "Primitive 09",
    title: "Poll card",
    body:
      "Live poll with vote bars + percentages, host close button, countdown when open, locked closed result.",
    href: "/ui-primitives/live-broadcast/poll-card",
    accent: "amber",
    glyph: "▤",
    state: "Stateful · vote",
  },
  {
    kicker: "Primitive 10",
    title: "Q&A queue row",
    body:
      "Question row with upvote, asker, timestamp, answered chip, host mic / mark-answered actions.",
    href: "/ui-primitives/live-broadcast/qna-queue-row",
    accent: "teal",
    glyph: "?",
    state: "Stateful · upvote",
  },
  {
    kicker: "Primitive 11",
    title: "Donation tier card",
    body:
      "Supporter tier card — Workshop Crew / Inner Circle / Pit Boss / Platinum — with perks and supporter count.",
    href: "/ui-primitives/live-broadcast/donation-tier-card",
    accent: "amber",
    glyph: "♛",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Stream quality panel",
    body:
      "Bitrate / dropped-frames / audio levels + 24-sample bitrate sparkline. Color-coded by stream health.",
    href: "/ui-primitives/live-broadcast/stream-quality-panel",
    accent: "teal",
    glyph: "≋",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Raid banner",
    body:
      "Incoming raid notification with raider channel, avatar, viewer count, message, greet action.",
    href: "/ui-primitives/live-broadcast/raid-banner",
    accent: "amber",
    glyph: "✷",
    state: "Stateless · shimmer",
  },
  {
    kicker: "Primitive 14",
    title: "Clip creator card",
    body:
      "Moment clipper with 15/30/60/90s pre+post window selector, copy link, download MP4, share to FB/IG/X/YT.",
    href: "/ui-primitives/live-broadcast/clip-creator-card",
    accent: "red",
    glyph: "✂",
    state: "Stateful · window",
  },
  {
    kicker: "Composition",
    title: "Full live studio",
    body:
      "All primitives composed — player, chat, reactions, poll, Q&A, viewer rail, backstage, raid, clip, tiers.",
    href: "/ui-primitives/live-broadcast/full-studio",
    accent: "red",
    glyph: "▶▤",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<BroadcastScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function LiveBroadcastIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Live broadcast / 14 primitives + composition"
        title="Live broadcast"
        description="Reusable primitives for the Mufflermen workshop live streams — Dyno Tuesday, supplier launches, and customer Q&A. Distinct from video heroes (marketing) and inbox (1:1 messaging)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — player audio + chat send are not wired
      </span>

      <section className={styles.grid} aria-label="Live broadcast primitives">
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
            <footer className={styles.metaRow}>
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
