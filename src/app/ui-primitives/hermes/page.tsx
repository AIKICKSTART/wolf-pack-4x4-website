import type { Metadata } from "next"
import {
  Activity,
  CalendarClock,
  Command,
  Inbox,
  Megaphone,
  Search,
  SendHorizontal,
  Sparkles,
} from "lucide-react"

import { ButtonDnaLink } from "../components/button-dna-link"
import styles from "./hermes.module.css"

export const metadata: Metadata = {
  title: "Hermes Mirror | UI Primitives",
  description:
    "Hermes dashboard primitives — workspace rail, KPI tiles, live feed, kanban pipeline, command bar, and empty/loading states.",
}

// ── Types ──────────────────────────────────────────────────────────────────
type Tone = "red" | "amber" | "teal" | "green"

interface Workspace {
  id: string
  name: string
  channel: string
  tone: Tone
  initials: string
  active?: boolean
}

interface Kpi {
  label: string
  value: string
  unit?: string
  delta: string
  direction: "up" | "down"
  tone: Tone
  icon: typeof Activity
  spark: string
}

type FeedStatus = "info" | "success" | "warn" | "error"

interface FeedItem {
  id: string
  title: string
  detail: string
  time: string
  status: FeedStatus
}

type Stage = "drafts" | "review" | "scheduled" | "published"
type ChannelKey = "fb" | "ig" | "x" | "yt"

interface KanbanCard {
  id: string
  title: string
  meta: string
  channel: ChannelKey
}

interface KanbanColumn {
  stage: Stage
  label: string
  cards: KanbanCard[]
}

// ── Data (deterministic — no client randomness) ────────────────────────────
const workspaces: Workspace[] = [
  { id: "oak-flats", name: "Oak Flats Mufflermen", channel: "Workshop · Marketing", tone: "red", initials: "OF", active: true },
  { id: "verridian", name: "Verridian Labs", channel: "Internal · R&D", tone: "teal", initials: "VR" },
  { id: "northwall", name: "Northwall Forge", channel: "Client · Industrial", tone: "amber", initials: "NW" },
  { id: "afterburn", name: "Afterburn Studio", channel: "Client · Lifestyle", tone: "green", initials: "AB" },
]

const kpis: Kpi[] = [
  {
    label: "Active Campaigns",
    value: "14",
    delta: "+3 this week",
    direction: "up",
    tone: "red",
    icon: Megaphone,
    spark: "M0,18 L10,14 L20,16 L30,10 L40,12 L50,8 L60,9 L70,5 L80,8 L90,3 L100,6",
  },
  {
    label: "Scheduled Posts",
    value: "86",
    unit: "queued",
    delta: "+12 vs last 7d",
    direction: "up",
    tone: "amber",
    icon: CalendarClock,
    spark: "M0,14 L10,18 L20,12 L30,16 L40,10 L50,14 L60,8 L70,12 L80,6 L90,10 L100,4",
  },
  {
    label: "Last Sync",
    value: "00:42",
    unit: "ago",
    delta: "All channels healthy",
    direction: "up",
    tone: "teal",
    icon: Activity,
    spark: "M0,12 L10,10 L20,11 L30,9 L40,11 L50,8 L60,10 L70,7 L80,9 L90,6 L100,8",
  },
  {
    label: "Queue Depth",
    value: "3",
    unit: "items",
    delta: "-5 in 1h",
    direction: "down",
    tone: "green",
    icon: Inbox,
    spark: "M0,4 L10,8 L20,10 L30,12 L40,14 L50,12 L60,16 L70,14 L80,18 L90,16 L100,20",
  },
]

const feed: FeedItem[] = [
  {
    id: "1",
    title: "Render queue cleared",
    detail: "All 8 carousel exports pushed to CDN. Cache primed across edges.",
    time: "00:42",
    status: "success",
  },
  {
    id: "2",
    title: "Approval requested — Spring exhaust spread",
    detail: "Northwall reviewer assigned. SLA 4h.",
    time: "01:14",
    status: "warn",
  },
  {
    id: "3",
    title: "Instagram token rotated",
    detail: "OAuth refresh successful for @oakflatsmufflermen.",
    time: "01:38",
    status: "info",
  },
  {
    id: "4",
    title: "Scheduler conflict resolved",
    detail: "Two overlapping reels merged into thread sequence.",
    time: "02:05",
    status: "info",
  },
  {
    id: "5",
    title: "Webhook timed out — TikTok ingest",
    detail: "Retrying with exponential backoff. Last attempt 12s ago.",
    time: "02:23",
    status: "error",
  },
]

const kanban: KanbanColumn[] = [
  {
    stage: "drafts",
    label: "Drafts",
    cards: [
      { id: "d1", title: "Behind-the-scenes weld pit — 4-shot carousel", meta: "Iris · 2d", channel: "ig" },
      { id: "d2", title: "Townsville job recap — long-form post", meta: "Jonah · 1d", channel: "fb" },
    ],
  },
  {
    stage: "review",
    label: "Review",
    cards: [
      { id: "r1", title: "Spring exhaust feature spread", meta: "Awaiting Northwall · 4h SLA", channel: "ig" },
      { id: "r2", title: "Customer testimonial — Subaru WRX", meta: "Awaiting brand QA · 2h SLA", channel: "yt" },
    ],
  },
  {
    stage: "scheduled",
    label: "Scheduled",
    cards: [
      { id: "s1", title: "Wollongong meet — teaser reel", meta: "Today · 18:00 AEST", channel: "ig" },
      { id: "s2", title: "Saturday open-shop tour", meta: "Sat · 09:30 AEST", channel: "fb" },
      { id: "s3", title: "Coil-over rebuild snippet", meta: "Sun · 11:00 AEST", channel: "x" },
    ],
  },
  {
    stage: "published",
    label: "Published",
    cards: [
      { id: "p1", title: "Twin-loop exhaust dyno run", meta: "Tue · 1.2k views", channel: "yt" },
      { id: "p2", title: "Workshop ambient loop", meta: "Mon · 480 reactions", channel: "ig" },
    ],
  },
]

// ── Page ────────────────────────────────────────────────────────────────────
export default function HermesPrimitivesPage() {
  return (
    <main className={styles.page} aria-labelledby="hermes-title">
      {/* Top frame */}
      <header className={styles.topFrame} data-ui-primitive-route-header="true">
        <div className={styles.topFrameLeft}>
          <span className={styles.frameBadge}>Mirror</span>
          <div>
            <h1 className={styles.frameTitle} id="hermes-title">
              Hermes mirror — design system reference
            </h1>
            <div className={styles.frameSub}>NOT the live Hermes ops cockpit · primitive surfaces only</div>
          </div>
        </div>
        <div className={styles.topFrameRight}>
          <ButtonDnaLink />
          <span className={styles.frameLive}>Live</span>
          <span>v1.0 · build 0427</span>
        </div>
      </header>

      {/* Workspace rail — neumorphic */}
      <aside className={styles.workspaceRail} aria-label="Workspace switcher">
        <div className={styles.railHeader}>
          <strong>Workspaces</strong>
          <span>04 · active</span>
        </div>
        <ul className={styles.workspaceList}>
          {workspaces.map((ws) => (
            <li
              key={ws.id}
              className={styles.workspaceItem}
              data-active={ws.active ? "true" : "false"}
            >
              <span className={styles.workspaceAvatar} data-tone={ws.tone} aria-hidden="true">
                {ws.initials}
              </span>
              <span className={styles.workspaceLabel}>
                <strong>{ws.name}</strong>
                <span>{ws.channel}</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main column */}
      <div className={styles.main}>
        {/* Command bar — glassmorphic */}
        <section className={styles.commandBar} aria-label="Command palette">
          <span className={styles.commandIcon} aria-hidden="true">
            <Search size={18} />
          </span>
          <span className={styles.commandInput}>
            <em>Search workspaces, posts, channels &mdash;</em> try &ldquo;schedule TikTok Tuesday&rdquo;
          </span>
          <span className={styles.commandShortcut}>
            <Command size={11} aria-hidden="true" /> <kbd>/</kbd>
          </span>
        </section>

        {/* KPI tiles — glassmorphic */}
        <section className={styles.kpiRow} aria-label="Key performance indicators">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <article key={kpi.label} className={styles.kpiTile} data-tone={kpi.tone}>
                <header className={styles.kpiLabel}>
                  <Icon aria-hidden="true" />
                  <span>{kpi.label}</span>
                </header>
                <div className={styles.kpiValue}>
                  {kpi.value}
                  {kpi.unit ? <small>{kpi.unit}</small> : null}
                </div>
                <div className={styles.kpiDelta} data-direction={kpi.direction}>
                  {kpi.direction === "up" ? "▲" : "▼"} {kpi.delta}
                </div>
                <svg
                  className={styles.kpiSparkline}
                  viewBox="0 0 100 22"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d={kpi.spark} />
                </svg>
              </article>
            )
          })}
        </section>

        {/* Body — feed + kanban */}
        <section className={styles.bodyGrid}>
          {/* Live feed — material-3 elevated */}
          <article className={styles.feedPanel} aria-label="Live status feed">
            <header className={styles.panelHeader}>
              <h3>Live feed</h3>
              <span>realtime · ws://hermes</span>
            </header>
            <ol className={styles.feedTimeline}>
              {feed.map((item) => (
                <li key={item.id} className={styles.feedItem} data-status={item.status}>
                  <span className={styles.feedDot} aria-hidden="true" />
                  <div className={styles.feedBody}>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <time className={styles.feedTime}>+{item.time}</time>
                </li>
              ))}
            </ol>
          </article>

          {/* Kanban pipeline */}
          <article className={styles.kanbanPanel} aria-label="Channel pipeline">
            <header className={styles.panelHeader}>
              <h3>Channel pipeline</h3>
              <span>drafts → published</span>
            </header>
            <div className={styles.kanbanBoard}>
              {kanban.map((col) => (
                <section key={col.stage} className={styles.kanbanColumn} data-stage={col.stage}>
                  <header className={styles.kanbanColumnHeader}>
                    <strong>{col.label}</strong>
                    <span>{col.cards.length.toString().padStart(2, "0")}</span>
                  </header>
                  {col.cards.map((card) => (
                    <article key={card.id} className={styles.kanbanCard}>
                      <strong>{card.title}</strong>
                      <div className={styles.kanbanCardMeta}>
                        <span className={styles.channelChip} data-ch={card.channel}>
                          {card.channel.toUpperCase()}
                        </span>
                        <span>{card.meta}</span>
                      </div>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </section>

        {/* Footer — empty state + skeleton */}
        <section className={styles.footerGrid}>
          <article className={styles.emptyState} aria-label="Empty state primitive">
            <Sparkles size={28} aria-hidden="true" />
            <h3>No campaigns yet</h3>
            <p>
              When you connect a channel, Hermes will surface your first campaign here with telemetry,
              suggested edits, and a one-tap re-schedule.
            </p>
            <span className={styles.emptyCta}>
              <SendHorizontal size={12} aria-hidden="true" /> Connect a channel
            </span>
          </article>

          <article className={styles.skeletonCard} aria-label="Skeleton loader primitive" aria-busy="true">
            <header>
              <span className={styles.skeletonAvatar} aria-hidden="true" />
              <div className={styles.skeletonHeaderText}>
                <span className={styles.skeletonLine} data-w="60" aria-hidden="true" />
                <span className={styles.skeletonLine} data-w="40" aria-hidden="true" />
              </div>
            </header>
            <span className={styles.skeletonLine} data-w="100" aria-hidden="true" />
            <span className={styles.skeletonLine} data-w="80" aria-hidden="true" />
            <span className={styles.skeletonLine} data-w="60" aria-hidden="true" />
          </article>
        </section>
      </div>

    </main>
  )
}
