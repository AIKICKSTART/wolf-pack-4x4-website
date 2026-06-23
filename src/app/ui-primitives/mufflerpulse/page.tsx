import type { Metadata } from "next"
import {
  CalendarDays,
  Eye,
  Globe,
  Heart,
  ImagePlus,
  Music2,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react"

import { ButtonDnaLink } from "../components/button-dna-link"
import styles from "./mufflerpulse.module.css"

export const metadata: Metadata = {
  title: "Muffler Pulse | UI Primitives",
  description:
    "Muffler Pulse — Postiz-fork social publishing surface rebranded under the Mufflermen umbrella. Channel switcher, composer, calendar, and pulse panel.",
}

// ── Types ──────────────────────────────────────────────────────────────────
type ChannelKey = "ig" | "tt" | "fb" | "x" | "yt"
type Tone = "red" | "amber" | "teal" | "green"

interface ChannelAccount {
  key: ChannelKey
  handle: string
  badge: string
  active?: boolean
}

interface ControlSlab {
  label: string
  value: string
  icon: typeof Timer
  tone?: Tone
}

interface DayCell {
  date: number
  otherMonth?: boolean
  today?: boolean
  posts: { ch: ChannelKey; title: string }[]
}

// ── Data ───────────────────────────────────────────────────────────────────
const channels: ChannelAccount[] = [
  { key: "ig", handle: "@oakflatsmufflermen", badge: "IG", active: true },
  { key: "tt", handle: "@oakflats", badge: "TT" },
  { key: "fb", handle: "Oak Flats Mufflermen", badge: "FB" },
  { key: "x", handle: "@oakflats_men", badge: "X" },
  { key: "yt", handle: "Oak Flats Workshop", badge: "YT" },
]

const controls: ControlSlab[] = [
  { label: "Schedule", value: "Sat · 09:30 AEST", icon: Timer, tone: "amber" },
  { label: "Audience", value: "Public", icon: Globe, tone: "green" },
  { label: "Soundtrack", value: "Workshop ambience", icon: Music2, tone: "teal" },
  { label: "Variants", value: "3 ready", icon: Sparkles, tone: "red" },
]

// Build a 4-week (28-day) calendar centered on a fixed day so it's deterministic.
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

const calendarDays: DayCell[] = [
  // Week 1 — bleed from previous month
  { date: 27, otherMonth: true, posts: [{ ch: "fb", title: "Recap reel" }] },
  { date: 28, otherMonth: true, posts: [] },
  { date: 29, otherMonth: true, posts: [{ ch: "ig", title: "BTS pit" }] },
  { date: 30, otherMonth: true, posts: [] },
  { date: 1, posts: [{ ch: "x", title: "Open-shop teaser" }] },
  { date: 2, posts: [{ ch: "yt", title: "Dyno run" }, { ch: "ig", title: "Carousel" }] },
  { date: 3, posts: [] },
  // Week 2
  { date: 4, posts: [{ ch: "tt", title: "Quick weld" }] },
  { date: 5, posts: [{ ch: "ig", title: "Customer car" }] },
  { date: 6, posts: [] },
  { date: 7, today: true, posts: [{ ch: "ig", title: "Spring spread" }, { ch: "fb", title: "Long-form" }] },
  { date: 8, posts: [{ ch: "yt", title: "Townsville recap" }] },
  { date: 9, posts: [{ ch: "tt", title: "Coilover snip" }] },
  { date: 10, posts: [{ ch: "ig", title: "Saturday tour" }, { ch: "x", title: "Live note" }] },
  // Week 3
  { date: 11, posts: [] },
  { date: 12, posts: [{ ch: "fb", title: "Subaru WRX testimonial" }] },
  { date: 13, posts: [{ ch: "tt", title: "Twin-loop reveal" }] },
  { date: 14, posts: [{ ch: "ig", title: "Carousel · part B" }] },
  { date: 15, posts: [{ ch: "yt", title: "Long-form rebuild" }] },
  { date: 16, posts: [] },
  { date: 17, posts: [{ ch: "x", title: "Meet teaser" }, { ch: "ig", title: "Reel" }] },
  // Week 4 — bleed forward
  { date: 18, posts: [] },
  { date: 19, posts: [{ ch: "fb", title: "Customer car #82" }] },
  { date: 20, posts: [{ ch: "tt", title: "Quick fit" }] },
  { date: 21, posts: [{ ch: "ig", title: "Wollongong recap" }] },
  { date: 22, otherMonth: true, posts: [] },
  { date: 23, otherMonth: true, posts: [{ ch: "yt", title: "Long-form" }] },
  { date: 24, otherMonth: true, posts: [] },
]

// ── Page ────────────────────────────────────────────────────────────────────
export default function MufflerPulsePrimitivesPage() {
  return (
    <main className={styles.page} aria-labelledby="pulse-title">
      {/* Brand banner — Material-3 elevated */}
      <header className={styles.brandBanner} data-ui-primitive-route-header="true">
        <div className={styles.brandLeft}>
          <span className={styles.brandKicker}>
            <Sparkles size={11} aria-hidden="true" /> Powered by the Mufflermen umbrella
          </span>
          <h1 className={styles.brandTitle} id="pulse-title">
            Muffler <em>Pulse</em>
          </h1>
          <p className={styles.brandSub}>
            Social publishing surface — formerly Postiz — rebranded for the Mufflermen brand system.
            Composer, multi-channel publishing, editorial calendar, and a performance pulse, all in one
            cockpit.
          </p>
        </div>
        <div className={styles.brandRight}>
          <ButtonDnaLink />
          <article className={styles.brandMeter}>
            <span>
              <TrendingUp aria-hidden="true" /> 7-day reach
            </span>
            <strong>184.2k</strong>
            <small>+24.1% vs prior 7d</small>
          </article>
        </div>
      </header>

      {/* Channel strip — glassmorphic */}
      <section className={styles.channelStrip} aria-label="Connected channels">
        <span className={styles.channelLabel}>
          <Globe size={11} aria-hidden="true" /> Channels
        </span>
        {channels.map((ch) => (
          <button
            key={ch.key}
            type="button"
            className={styles.channelChip}
            data-active={ch.active ? "true" : "false"}
          >
            <span className={styles.channelAvatar} data-ch={ch.key} aria-hidden="true">
              {ch.badge[0]}
            </span>
            {ch.handle}
            <span className={styles.channelBadge}>{ch.badge}</span>
          </button>
        ))}
      </section>

      {/* Composer + Performance pulse */}
      <section className={styles.workGrid}>
        {/* Composer — neumorphic */}
        <article className={styles.composer} aria-label="Post composer">
          <header className={styles.composerHead}>
            <h3>Compose</h3>
            <span>Draft · auto-saved 4s ago</span>
          </header>

          <div className={styles.composerTextarea}>
            <p>
              Saturday open-shop tour at the workshop. Twin-loop builds on display, including the
              latest <mark>WRX coil-over swap</mark>. Bring your friends and your project car —
              the espresso machine is also on. Doors open from 09:30.
              <span className={styles.composerCaret} aria-hidden="true" />
            </p>
            <div className={styles.composerMeta}>
              <span>238 / 2200 chars</span>
              <span>
                <strong>3 variants</strong> generated · 1 selected
              </span>
            </div>
          </div>

          <div className={styles.mediaTray}>
            <div className={styles.mediaTile} data-kind="image" aria-hidden="true">
              <span>JPG · 1080</span>
            </div>
            <div className={styles.mediaTile} data-kind="video" aria-hidden="true">
              <span>MP4 · 0:18</span>
            </div>
            <div className={styles.mediaTile} data-kind="carousel" aria-hidden="true">
              <span>Carousel · 4</span>
            </div>
            <div className={styles.mediaTile} data-kind="add" role="button" aria-label="Add media">
              <ImagePlus aria-hidden="true" />
            </div>
          </div>

          <div className={styles.composerControls}>
            {controls.map((ctrl) => {
              const Icon = ctrl.icon
              return (
                <div
                  key={ctrl.label}
                  className={styles.controlSlab}
                  data-tone={ctrl.tone ?? "teal"}
                >
                  <span>{ctrl.label}</span>
                  <strong>
                    <Icon aria-hidden="true" /> {ctrl.value}
                  </strong>
                </div>
              )
            })}
          </div>

          <footer className={styles.composerActions}>
            <span className={styles.audienceToggle}>Audience &mdash; Public · global</span>
            <div style={{ display: "flex", gap: "var(--primitive-space-2-5)" }}>
              <button type="button" className={styles.aiButton}>
                <Sparkles size={13} aria-hidden="true" /> AI Assist
              </button>
              <button type="button" className={styles.scheduleButton}>
                <Timer size={13} aria-hidden="true" /> Schedule pulse
              </button>
            </div>
          </footer>
        </article>

        {/* Performance pulse — glassmorphic */}
        <article className={styles.perfPanel} aria-label="Performance pulse">
          <header>
            <h3>Pulse</h3>
            <span>last 24h</span>
          </header>

          <section className={styles.perfMetric}>
            <span>Reach</span>
            <div className={styles.perfReach}>
              <div className={styles.reachValue}>
                <strong>42.8k</strong>
                <small>+12.4%</small>
              </div>
              <svg
                className={styles.sparkline}
                viewBox="0 0 100 36"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  data-fill="true"
                  d="M0,30 L8,24 L18,28 L26,18 L34,22 L42,14 L52,18 L60,8 L70,12 L80,6 L90,10 L100,4 L100,36 L0,36 Z"
                />
                <path d="M0,30 L8,24 L18,28 L26,18 L34,22 L42,14 L52,18 L60,8 L70,12 L80,6 L90,10 L100,4" />
              </svg>
            </div>
          </section>

          <section className={styles.perfMetric}>
            <span>Engagement</span>
            <div className={styles.gauge} aria-label="Engagement gauge — 68 of 100">
              <div className={styles.gaugeRing} aria-hidden="true" />
              <div className={styles.gaugeNeedle} aria-hidden="true" />
              <div className={styles.gaugeCore}>
                <strong>68</strong>
                <span>engagement</span>
              </div>
            </div>
          </section>

          <section className={styles.perfMetric}>
            <span>Top post</span>
            <article className={styles.topPostCard}>
              <div className={styles.topPostThumb} aria-hidden="true">
                <Heart aria-hidden="true" />
              </div>
              <div className={styles.topPostBody}>
                <strong>Twin-loop exhaust dyno run — long-form recap</strong>
                <div className={styles.topPostStats}>
                  <span>
                    <Eye aria-hidden="true" />
                    1.2k
                  </span>
                  <span>
                    <Heart aria-hidden="true" />
                    480
                  </span>
                  <span>
                    <TrendingUp aria-hidden="true" />
                    +18%
                  </span>
                </div>
              </div>
            </article>
          </section>
        </article>
      </section>

      {/* Editorial calendar */}
      <section className={styles.calendarPanel} aria-label="Editorial calendar">
        <header className={styles.calendarHeader}>
          <h3>Editorial calendar</h3>
          <nav>
            <span>‹</span>
            <strong>Apr 2026</strong>
            <span>›</span>
            <CalendarDays size={13} aria-hidden="true" />
          </nav>
        </header>

        <div className={styles.calendarDays}>
          {dayLabels.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className={styles.calendarGrid}>
          {calendarDays.map((day, idx) => (
            <article
              key={`${day.date}-${idx}`}
              className={styles.dayCell}
              data-today={day.today ? "true" : "false"}
              data-other-month={day.otherMonth ? "true" : "false"}
            >
              <span>
                {day.date.toString().padStart(2, "0")}
                {day.posts.length > 0 ? (
                  <small style={{ color: "var(--primitive-muted)", fontWeight: "var(--primitive-weight-semibold)" }}>
                    {day.posts.length}
                  </small>
                ) : null}
              </span>
              {day.posts.slice(0, 2).map((post, postIdx) => (
                <span
                  key={`${day.date}-${postIdx}`}
                  className={styles.dayChip}
                  data-ch={post.ch}
                  title={`${post.ch.toUpperCase()} — ${post.title}`}
                >
                  {post.title}
                </span>
              ))}
              {day.posts.length > 2 ? (
                <span
                  className={styles.dayChip}
                  data-ch="x"
                  style={{ opacity: 0.7 }}
                >
                  +{day.posts.length - 2} more
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}
