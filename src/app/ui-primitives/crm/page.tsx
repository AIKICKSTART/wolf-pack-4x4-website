import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./crm.module.css"

export const metadata: Metadata = {
  title: "CRM | UI Primitives",
  description:
    "Customer-relationship primitives — customer + contact cards, deal stage and pipeline, activity log, lead score, deal value, stage probability, touch-point timeline, account health meter, segment chip, note composer, next action, quote-to-cash funnel.",
}

interface CrmScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<CrmScene> = [
  {
    kicker: "Primitive 01",
    title: "Customer card",
    body: "Full customer profile — avatar, contact, suburb, lifetime value, status, last contact, actions.",
    href: "/ui-primitives/crm/customer-card",
    accent: "red",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Contact mini card",
    body: "Compact contact card with avatar, name, role, primary channel chip.",
    href: "/ui-primitives/crm/contact-mini",
    accent: "teal",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Deal stage card",
    body: "Single deal — name, customer, value, expected close, probability, color-coded stage.",
    href: "/ui-primitives/crm/deal-stage",
    accent: "amber",
    glyph: "▰",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Pipeline kanban",
    body: "Five-column deal pipeline with per-stage counts and totals, selectable columns.",
    href: "/ui-primitives/crm/pipeline-kanban",
    accent: "red",
    glyph: "▦",
    state: "Stateful · selection",
  },
  {
    kicker: "Primitive 05",
    title: "Activity row",
    body: "Activity log entry with verb chip, duration, timestamp, inline-expand transcript.",
    href: "/ui-primitives/crm/activity-row",
    accent: "green",
    glyph: "○─",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 06",
    title: "Lead score chip",
    body: "0-100 score with gradient tone and breakdown popover (engagement / fit / intent / recency).",
    href: "/ui-primitives/crm/lead-score",
    accent: "amber",
    glyph: "▲",
    state: "Stateful · popover",
  },
  {
    kicker: "Primitive 07",
    title: "Deal value chip",
    body: "Currency value with period (one-off / monthly / annual) and likelihood multiplier.",
    href: "/ui-primitives/crm/deal-value",
    accent: "amber",
    glyph: "$",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Stage probability bar",
    body: "Horizontal 0-100% bar with tick markers at typical stage probabilities.",
    href: "/ui-primitives/crm/stage-probability",
    accent: "teal",
    glyph: "▬",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Touch-point timeline",
    body: "Vertical touch log — call, email, SMS, in-person, DM, quote, invoice, payment.",
    href: "/ui-primitives/crm/touch-point-timeline",
    accent: "violet",
    glyph: "│●",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 10",
    title: "Account health meter",
    body: "Circular health score with tone shift and four contributing factor tiles.",
    href: "/ui-primitives/crm/account-health",
    accent: "green",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Segment chip",
    body: "Customer segment chip — Fleet / Performance / DIY / Trade / Retail.",
    href: "/ui-primitives/crm/segment-chip",
    accent: "teal",
    glyph: "▪",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 12",
    title: "Note composer",
    body: "Note textarea with @mentions, tag input, pin toggle, save with toast.",
    href: "/ui-primitives/crm/note-composer",
    accent: "amber",
    glyph: "✎",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 13",
    title: "Next action card",
    body: "Suggested next action with urgency chip and snooze options (1h / 1d / 1w).",
    href: "/ui-primitives/crm/next-action",
    accent: "red",
    glyph: "→",
    state: "Stateful · snooze",
  },
  {
    kicker: "Primitive 14",
    title: "Quote-to-cash funnel",
    body: "Lead → Qualified → Quoted → Approved → Invoiced → Paid with count, value, drop-off.",
    href: "/ui-primitives/crm/quote-to-cash",
    accent: "violet",
    glyph: "▼",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full CRM workspace",
    body: "Customer + health meter + touch points + pipeline + composer + next action + score row.",
    href: "/ui-primitives/crm/full-workspace",
    accent: "red",
    glyph: "◉▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<CrmScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function CrmIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="CRM / 14 primitives + composition"
        title="CRM primitives"
        description="The customer-relationship stack — profile, deal pipeline, touch-point timeline, lead and health scoring, segment tagging, note capture, next-action prompts, and a quote-to-cash funnel. Realistic Mufflermen data only; no real CRM wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real CRM wired
      </span>

      <section className={styles.grid} aria-label="CRM primitives">
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
