import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Muffler Pulse / Social scheduler | UI Primitives",
  description:
    "Muffler Pulse — Postiz-style social scheduling primitives expanded for Mufflermen. 14 primitives + composed control room.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "pink" | "teal" | "amber" | "violet" | "green" | "red"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Cross-platform composer",
    body:
      "Single editor producing per-platform variants for FB, IG, TikTok, X, LinkedIn, YouTube, Threads, Bluesky with counters + previews.",
    href: "/ui-primitives/social-scheduler/cross-platform-composer",
    accent: "pink",
    glyph: "✎",
    state: "Stateful · platform toggles",
  },
  {
    kicker: "Primitive 02",
    title: "Queue calendar",
    body:
      "Month / week / day grid of scheduled posts. Drag a chip to reschedule, arrow keys for keyboard rescheduling.",
    href: "/ui-primitives/social-scheduler/queue-calendar",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · drag + view",
  },
  {
    kicker: "Primitive 03",
    title: "Account connector card",
    body:
      "Connected social account tile with handle, OAuth status, follower count, token expiry, retry CTA.",
    href: "/ui-primitives/social-scheduler/account-connector-card",
    accent: "violet",
    glyph: "⊕",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Caption AI studio",
    body:
      "Tone / length / hook sliders with voice presets and a tappable suggested hashtag pool.",
    href: "/ui-primitives/social-scheduler/caption-ai-studio",
    accent: "violet",
    glyph: "✨",
    state: "Stateful · sliders",
  },
  {
    kicker: "Primitive 05",
    title: "Post card",
    body:
      "Scheduled post card with platform pills, status badge, and engagement preview.",
    href: "/ui-primitives/social-scheduler/post-card",
    accent: "pink",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Hashtag strategy panel",
    body:
      "Branded, trending, community, and local groups with reach estimates and trend / competition signals.",
    href: "/ui-primitives/social-scheduler/hashtag-strategy-panel",
    accent: "teal",
    glyph: "#",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Engagement strip",
    body:
      "Likes, comments, shares, saves with trend sparklines and signed 7-day deltas.",
    href: "/ui-primitives/social-scheduler/engagement-analytics-strip",
    accent: "amber",
    glyph: "♥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Audience growth chart",
    body:
      "Follower trajectory per platform with current value and 30-day delta — Mufflermen handles wired in.",
    href: "/ui-primitives/social-scheduler/audience-growth-chart",
    accent: "green",
    glyph: "↗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Best time heatmap",
    body:
      "Day × hour heatmap of optimal post times. Peak window callout — Dyno Tuesday 17:00 lights up.",
    href: "/ui-primitives/social-scheduler/best-time-heatmap",
    accent: "teal",
    glyph: "◼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Repurpose flow",
    body:
      "Pipeline: blog → tweet thread → reel → carousel → shorts. State per stage with owners + ETAs.",
    href: "/ui-primitives/social-scheduler/repurpose-flow",
    accent: "amber",
    glyph: "↻",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Media binder",
    body:
      "Attached media tray with per-platform aspect-ratio fit chips (ok / crop / fail).",
    href: "/ui-primitives/social-scheduler/media-binder",
    accent: "pink",
    glyph: "▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Approval stage tracker",
    body:
      "Multi-stage approval — draft → Daniel (admin) → Mia (brand) → scheduled. Current stage + notes.",
    href: "/ui-primitives/social-scheduler/approval-stage-tracker",
    accent: "amber",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Webhook event log",
    body:
      "Live tail of incoming platform webhooks — likes spike, mention, DM, token refresh, post fail.",
    href: "/ui-primitives/social-scheduler/webhook-event-log",
    accent: "red",
    glyph: "⟳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Mention inbox row",
    body:
      "Unified inbox row — mention / comment / DM with sentiment chip and reply / thread CTAs.",
    href: "/ui-primitives/social-scheduler/mention-inbox-row",
    accent: "teal",
    glyph: "@",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full Muffler Pulse control room",
    body:
      "All 14 primitives composed into a single live scheduling and listening surface.",
    href: "/ui-primitives/social-scheduler/full-pulse",
    accent: "pink",
    glyph: "◆◇",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  pink: styles.accentPink,
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  violet: styles.accentViolet,
  green: styles.accentGreen,
  red: styles.accentRed,
}

export default function SocialSchedulerIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Muffler Pulse / 14 primitives + composition"
        title="Social scheduler — Muffler Pulse"
        description="Postiz-style scheduling, listening, and approval primitives expanded with Mufflermen-specific concerns. Wire the Oak Flats workshop's eight social channels into a single control room."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no posts are wired
      </span>

      <section className={styles.grid} aria-label="Social scheduler primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={`${styles.card} ${ACCENT_CLASS[scene.accent]}`}
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
