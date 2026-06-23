import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Realtime collab | UI Primitives",
  description:
    "Figma / Linear-style real-time collaboration indicator primitives — presence avatar stacks, multi-cursor overlay, live typing indicators, field lock banners, presence activity feed, collab room cards, online status dots, read receipt trails, co-edit conflict banners, live reaction pops, room participants panel, share link generator, time-zone chips, and live doc version indicators — plus a full collaborative quote room composition.",
}

interface Scene {
  index: string
  title: string
  href: string
  description: string
  accent: "teal" | "amber" | "red" | "green" | "purple" | "neutral"
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    index: "01",
    title: "Presence avatar stack",
    href: "/ui-primitives/realtime-collab/presence-avatar-stack",
    description:
      "Stacked avatars of currently-online collaborators with tone-coded status ring and overflow chip when count exceeds the visible max.",
    accent: "green",
    state: "Stateless · per-user",
  },
  {
    index: "02",
    title: "Multi-cursor overlay",
    href: "/ui-primitives/realtime-collab/multi-cursor-overlay",
    description:
      "Five+ named cursors floating over a stage with chip labels and smooth percent-positioned interpolation. Visual only — no socket logic.",
    accent: "purple",
    state: "Stateless · positions",
  },
  {
    index: "03",
    title: "Live typing indicator",
    href: "/ui-primitives/realtime-collab/live-typing-indicator",
    description:
      "Who's currently typing, where — animated dots, names, target field, and target doc. Reduced-motion override swaps dots for dot-dot glyph.",
    accent: "teal",
    state: "Stateless · per-event",
  },
  {
    index: "04",
    title: "Field lock banner",
    href: "/ui-primitives/realtime-collab/field-lock-banner",
    description:
      "“Sophie is editing this field” — amber lock icon, holder avatar, hold duration, and a request-release CTA. Marks the field aria-busy.",
    accent: "amber",
    state: "Stateful · holder",
  },
  {
    index: "05",
    title: "Presence activity feed",
    href: "/ui-primitives/realtime-collab/presence-activity-feed",
    description:
      "Live feed of who did what just now — composes data-display/ActivityFeed with collab-typed events (joined / edited / resolved / shared).",
    accent: "green",
    state: "Stateful · stream",
  },
  {
    index: "06",
    title: "Collab room card",
    href: "/ui-primitives/realtime-collab/collab-room-card",
    description:
      "Glass-surface card for an active collab room — doc title, kind chip, last-edited stamp, active-user avatar stack, open-room CTA.",
    accent: "teal",
    state: "Stateless · per-room",
  },
  {
    index: "07",
    title: "Online status dot",
    href: "/ui-primitives/realtime-collab/online-status-dot",
    description:
      "Tiny presence dot — green online (pulses) / amber idle / red busy / grey offline. Four sizes, optional inline label, full aria-label.",
    accent: "green",
    state: "Stateless · sm / md / lg",
  },
  {
    index: "08",
    title: "Read receipt trail",
    href: "/ui-primitives/realtime-collab/read-receipt-trail",
    description:
      "Avatar trail showing who has seen the latest change + when — overflow chip for long trails. Composed inside doc footers.",
    accent: "teal",
    state: "Stateless · per-trail",
  },
  {
    index: "09",
    title: "Co-edit conflict banner",
    href: "/ui-primitives/realtime-collab/co-edit-conflict-banner",
    description:
      "Red alert banner when 2+ users edited the same field — side-by-side my-version vs their-version, keep-mine / keep-theirs / merge CTAs.",
    accent: "red",
    state: "Stateful · alert",
  },
  {
    index: "10",
    title: "Live reaction pop",
    href: "/ui-primitives/realtime-collab/live-reaction-pop",
    description:
      "Floating emoji reaction popping briefly from a user's cursor location. Tone follows cursor colour. Reduced-motion holds the pop static.",
    accent: "amber",
    state: "Stateless · per-event",
  },
  {
    index: "11",
    title: "Room participants panel",
    href: "/ui-primitives/realtime-collab/room-participants-panel",
    description:
      "Glass side panel — every participant with role chip, current-focus area, presence dot overlay on avatar, and a leave-room button.",
    accent: "purple",
    state: "Stateful · panel",
  },
  {
    index: "12",
    title: "Collab share link generator",
    href: "/ui-primitives/realtime-collab/collab-share-link-generator",
    description:
      "Share link card — URL input, copy CTA, scope chip radio (View / Comment / Edit / Admin), and expiry label below.",
    accent: "teal",
    state: "Stateful · scope",
  },
  {
    index: "13",
    title: "Time zone indicator chip",
    href: "/ui-primitives/realtime-collab/time-zone-indicator-chip",
    description:
      "Tiny TZ chip per collaborator — their local time, timezone shortname, and relative-to-me offset (e.g. +3h, Same TZ).",
    accent: "amber",
    state: "Stateless · per-user",
  },
  {
    index: "14",
    title: "Live doc version indicator",
    href: "/ui-primitives/realtime-collab/live-doc-version-indicator",
    description:
      "Pill bar — current version chip + save state (saved/saving/dirty/offline) + saved-X-secs-ago + collaborators-online count.",
    accent: "green",
    state: "Stateful · save state",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  purple: styles.accentPurple,
  neutral: styles.accentNeutral,
}

export default function RealtimeCollabPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 14 primitives + 1 composition"
        title="Working in the same doc, live"
        description="Figma / Linear-style real-time collaboration indicator primitives — presence avatar stacks with tone-coded status rings, a multi-cursor overlay with five named cursors, live typing indicators that name the field, field lock banners with release CTAs, a presence activity feed wired through data-display/ActivityFeed, collab room cards, four-tone online status dots with pulse, avatar read-receipt trails, co-edit conflict banners with side-by-side merge, floating emoji reaction pops anchored to cursors, a glass room participants panel, a scoped share-link generator, time-zone indicator chips with offset to me, and a live doc version pill with save-state dot. Tuned for Oak Flats Mufflermen co-editing a customer quote — Marcus on the labour line, Sophie on the parts breakdown, Jordan watching the totals."
      />
      <section className={styles.section} aria-label="Realtime collab primitives index">
        <header>
          <span className={styles.kicker}>Index · 14 primitives + Full room</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Every primitive renders at full scale in its own sub-route with realistic Oak Flats
            content — collaborators Marcus Halverson, Sophie Tan, Jordan Pace and Bec Lawson
            co-editing Quote #Q-1408 for a 2019 Hilux 2.8 exhaust replacement. Composition lives
            under <code style={{ color: "var(--primitive-amber)" }}>/full-room</code>.
          </p>
        </header>
        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <Link
              key={scene.href}
              className={`${styles.thumb} ${ACCENT_CLASS[scene.accent]}`}
              href={scene.href}
            >
              <div className={styles.thumbHead}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <span className={styles.thumbState}>{scene.state}</span>
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">{"->"}</span>
              </span>
            </Link>
          ))}
          <Link
            className={`${styles.thumb} ${styles.accentGreen}`}
            href="/ui-primitives/realtime-collab/full-room"
          >
            <div className={styles.thumbHead}>
              <span className={styles.thumbIndex}>15</span>
              <span className={styles.thumbState}>Composition · bonus</span>
            </div>
            <h3 className={styles.thumbTitle}>Full room composition</h3>
            <p className={styles.thumbCopy}>
              Every primitive assembled into one live quote-editing room — top-bar
              LiveDocVersionIndicator + PresenceAvatarStack, MultiCursorOverlay over a faux quote
              doc, LiveTypingIndicator on labour line 3, FieldLockBanner on the total, sidebar
              RoomParticipantsPanel, PresenceActivityFeed, ReadReceiptTrail, share-link card and
              time-zone chips, with a CoEditConflictBanner mid-canvas and a LiveReactionPop
              floating from Sophie&apos;s cursor.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">{"->"}</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
