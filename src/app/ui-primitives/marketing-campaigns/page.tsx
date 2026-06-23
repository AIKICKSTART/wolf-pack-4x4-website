import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Marketing campaign builder | UI Primitives",
  description:
    "Klaviyo/Mailchimp-style marketing campaign cockpit primitives — campaign cards, segment builder, A/B variants, channel mix, schedule, goals, creatives, subject tester, send-time optimizer, results, funnel, templates, UTM, drip sequences.",
}

interface CampaignScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<CampaignScene> = [
  {
    kicker: "Primitive 01",
    title: "Campaign card",
    body: "Name + status + channel chips + audience-size + send window for any campaign row.",
    href: "/ui-primitives/marketing-campaigns/campaign-card",
    accent: "red",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Audience segment builder",
    body: "Rule chips, AND/OR groups, estimated reach with tag inputs for inline rules.",
    href: "/ui-primitives/marketing-campaigns/audience-segment",
    accent: "teal",
    glyph: "▻▻",
    state: "Stateful · rules",
  },
  {
    kicker: "Primitive 03",
    title: "A/B variant editor",
    body: "Tabs for each variant, weight sliders, winner rule chips, per-variant content.",
    href: "/ui-primitives/marketing-campaigns/ab-variant",
    accent: "teal",
    glyph: "A/B",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 04",
    title: "Channel mix picker",
    body: "Email, SMS, push, in-app, banner, social — chip toggles with cost + reach chips.",
    href: "/ui-primitives/marketing-campaigns/channel-mix",
    accent: "green",
    glyph: "▢▢▢",
    state: "Stateful · multi",
  },
  {
    kicker: "Primitive 05",
    title: "Schedule launcher",
    body: "Now / specific time / recurring / send-time-optimized + timezone picker.",
    href: "/ui-primitives/marketing-campaigns/schedule-launcher",
    accent: "amber",
    glyph: "◷",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 06",
    title: "Goal KPI selector",
    body: "Opens / Clicks / Conversions / Revenue / Bookings radio + target input.",
    href: "/ui-primitives/marketing-campaigns/goal-kpi",
    accent: "red",
    glyph: "◎",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 07",
    title: "Creative gallery",
    body: "Filtered thumbnail grid of email / SMS / push creative with A/B select + clone.",
    href: "/ui-primitives/marketing-campaigns/creative-gallery",
    accent: "teal",
    glyph: "▦▦",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 08",
    title: "Subject line tester",
    body: "Input + AI suggestions + spam, word-count, emoji-fit chips with suggestion dialog.",
    href: "/ui-primitives/marketing-campaigns/subject-tester",
    accent: "amber",
    glyph: "Aa",
    state: "Stateful · dialog",
  },
  {
    kicker: "Primitive 09",
    title: "Send time optimizer",
    body: "Per-hour heatmap of historical opens, recommended window, override picker.",
    href: "/ui-primitives/marketing-campaigns/send-time",
    accent: "green",
    glyph: "▭▭▭",
    state: "Stateful · pick",
  },
  {
    kicker: "Primitive 10",
    title: "Real-time results card",
    body: "Sent / delivered / opened / clicked / bounced metric tiles with sparkline trends.",
    href: "/ui-primitives/marketing-campaigns/real-time-results",
    accent: "green",
    glyph: "▲▼",
    state: "Live · status",
  },
  {
    kicker: "Primitive 11",
    title: "Conversion funnel card",
    body: "Funnel bars Sent → Opened → Clicked → Converted with drop-off % per step.",
    href: "/ui-primitives/marketing-campaigns/conversion-funnel",
    accent: "teal",
    glyph: "▼▼",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 12",
    title: "Campaign template chooser",
    body: "Library + private templates with previews, channel chips, clone button.",
    href: "/ui-primitives/marketing-campaigns/template-chooser",
    accent: "amber",
    glyph: "▥",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 13",
    title: "UTM parameter builder",
    body: "Source / medium / campaign / term / content inputs + URL preview + copy CTA.",
    href: "/ui-primitives/marketing-campaigns/utm-builder",
    accent: "violet",
    glyph: "?=",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 14",
    title: "Drip sequence editor",
    body: "Timeline of touchpoints with delay chips, branching conditions, edit per step.",
    href: "/ui-primitives/marketing-campaigns/drip-sequence",
    accent: "amber",
    glyph: "○─○─○",
    state: "Stateful · select",
  },
  {
    kicker: "Composition",
    title: "Full campaign cockpit",
    body: "All 14 primitives composed together in a single Klaviyo-style campaign builder cockpit.",
    href: "/ui-primitives/marketing-campaigns/full-cockpit",
    accent: "red",
    glyph: "▦▢◷",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<CampaignScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function MarketingCampaignsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Marketing campaigns / 14 primitives + composition"
        title="Marketing campaign builder primitives"
        description="The campaign cockpit stack — segment builder, A/B variants, channel mix, schedule, KPIs, creatives, subject line tester, send-time optimizer, live results, conversion funnel, template chooser, UTM builder, and drip sequence editor. Visual references — no real sends wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real sends wired
      </span>

      <section className={styles.grid} aria-label="Marketing campaign primitives">
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
