import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./admin-hub.module.css"

export const metadata: Metadata = {
  title: "Admin hub | UI Primitives",
  description:
    "Control-room primitives for Oak Flats Mufflermen — KPIs, quick actions, system status, activity feed, command palette, pinned widgets, role / tenant switchers, weekly briefing, team pulse, glance strip, tour launcher, feature spotlight, daily summary.",
}

interface HubPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<HubPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "KPI tile",
    body: "Big-number KPI with delta arrow, sparkline trend and period chip.",
    href: "/ui-primitives/admin-hub/kpi-tile",
    accent: "green",
    glyph: "$",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 02",
    title: "Quick action grid",
    body: "3×3 grid of pinnable shortcuts — new quote, book bay, post update, run report.",
    href: "/ui-primitives/admin-hub/quick-action-grid",
    accent: "amber",
    glyph: "▦",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 03",
    title: "System status banner",
    body: "All-good / degraded / incident banner with link out to the status page.",
    href: "/ui-primitives/admin-hub/system-status-banner",
    accent: "teal",
    glyph: "◉",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 04",
    title: "Activity feed row",
    body: "Chronological event row — user · action · target · timestamp with surface chip.",
    href: "/ui-primitives/admin-hub/activity-feed-row",
    accent: "violet",
    glyph: "▷",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 05",
    title: "Command palette",
    body: "Cmd+K palette — grouped commands, recents, AI suggestions, keyboard nav.",
    href: "/ui-primitives/admin-hub/command-palette",
    accent: "teal",
    glyph: "⌘",
    state: "Stateful · keys + 3 states",
  },
  {
    kicker: "Primitive 06",
    title: "Pinned widgets board",
    body: "Admin-pinned widgets canvas with drag-rearrange and per-widget controls.",
    href: "/ui-primitives/admin-hub/pinned-board",
    accent: "violet",
    glyph: "▥",
    state: "Stateful · reorder + 3 states",
  },
  {
    kicker: "Primitive 07",
    title: "Role switcher",
    body: "Current-role chip with switcher dropdown and impersonation notice.",
    href: "/ui-primitives/admin-hub/role-switcher",
    accent: "red",
    glyph: "♛",
    state: "Stateful · open + 3 states",
  },
  {
    kicker: "Primitive 08",
    title: "Tenant switcher",
    body: "Workspace switcher dropdown with workspace logo + primary tag.",
    href: "/ui-primitives/admin-hub/tenant-switcher",
    accent: "teal",
    glyph: "◆",
    state: "Stateful · open + 3 states",
  },
  {
    kicker: "Primitive 09",
    title: "Weekly briefing card",
    body: "Monday briefing — highlights, watch-outs, action items with owners.",
    href: "/ui-primitives/admin-hub/weekly-briefing-card",
    accent: "teal",
    glyph: "▤",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 10",
    title: "Team pulse strip",
    body: "Team-member online · away · busy chip strip with presence tally.",
    href: "/ui-primitives/admin-hub/team-pulse-strip",
    accent: "green",
    glyph: "●",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 11",
    title: "Quick-glance row",
    body: "Single-line metric strip — revenue · bookings · leads · NPS · uptime.",
    href: "/ui-primitives/admin-hub/quick-glance-row",
    accent: "amber",
    glyph: "━",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 12",
    title: "System tour launcher",
    body: "Onboarding tour launcher with progress + per-step checklist.",
    href: "/ui-primitives/admin-hub/system-tour-launcher",
    accent: "violet",
    glyph: "▶",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 13",
    title: "Feature spotlight card",
    body: "New-feature spotlight with bullets, try CTA and dismiss.",
    href: "/ui-primitives/admin-hub/feature-spotlight-card",
    accent: "violet",
    glyph: "✦",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Primitive 14",
    title: "Daily summary card",
    body: "Yesterday's recap — highlights, watch-outs and the today outlook.",
    href: "/ui-primitives/admin-hub/daily-summary-card",
    accent: "amber",
    glyph: "☀",
    state: "Stateless · 3 states",
  },
  {
    kicker: "Composition",
    title: "Full control hub",
    body: "The composed Oak Flats Mufflermen cockpit — all 14 admin-hub primitives wired.",
    href: "/ui-primitives/admin-hub/full-control",
    accent: "violet",
    glyph: "✦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<HubPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function AdminHubIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Admin hub / 14 primitives + composition"
        title="Admin hub primitives"
        description="Control-room family for Oak Flats Mufflermen — the first surface a workshop manager lands on after login. KPI tiles, quick actions, system status, activity feed, command palette, pinned widgets, role/tenant switchers, weekly briefing, team pulse, quick-glance strip, tour launcher, feature spotlight and the daily summary. Visual references only — nothing wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — admin-hub is not wired
      </span>

      <section className={styles.grid} aria-label="Admin hub primitives">
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
