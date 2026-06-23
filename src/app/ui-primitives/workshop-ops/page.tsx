import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Workshop ops | UI Primitives",
  description:
    "Operational CRM primitives for the Oak Flats Mufflermen — service tickets, bay schedule, mechanic shifts, parts pulls, customer 360, SMS, quotes, inspections, dyno, payments, roadworthy, recalls, loyalty stamps, and the vehicle health tile.",
}

interface OpsPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<OpsPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "Service ticket card",
    body: "Work order with VIN, customer, vehicle, services checklist, status, mechanic, ETA.",
    href: "/ui-primitives/workshop-ops/service-ticket-card",
    accent: "red",
    glyph: "WO",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Bay scheduler",
    body: "Day × bay grid with draggable bookings, bay status (free, in-use, dirty, blocked).",
    href: "/ui-primitives/workshop-ops/bay-scheduler",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · drag",
  },
  {
    kicker: "Primitive 03",
    title: "Mechanic shift timeline",
    body: "Staff × hour grid with shift blocks, breaks, training, sick-leave chips.",
    href: "/ui-primitives/workshop-ops/mechanic-shift-timeline",
    accent: "green",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Parts pull list",
    body: "Required parts checklist with in-stock / back-order badges and bin location.",
    href: "/ui-primitives/workshop-ops/parts-pull-list",
    accent: "amber",
    glyph: "▢",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 05",
    title: "Customer 360 card",
    body: "Profile, vehicles in garage, lifetime value, visits, and the comms timeline.",
    href: "/ui-primitives/workshop-ops/customer-360-card",
    accent: "red",
    glyph: "○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "SMS conversation thread",
    body: "Workshop SMS thread with quick-reply templates and AU-style character count.",
    href: "/ui-primitives/workshop-ops/sms-conversation-thread",
    accent: "teal",
    glyph: "”",
    state: "Stateful · type",
  },
  {
    kicker: "Primitive 07",
    title: "Quote builder row",
    body: "Quote line item — parts, labour, fee — with markup, GST, and the grand total.",
    href: "/ui-primitives/workshop-ops/quote-builder-row",
    accent: "violet",
    glyph: "$",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Vehicle inspection checklist",
    body: "Body, tyres, brakes, exhaust, and electrical inspection panel with pass / warn / fail.",
    href: "/ui-primitives/workshop-ops/vehicle-inspection-checklist",
    accent: "amber",
    glyph: "☑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Dyno run card",
    body: "Dyno result — power & torque curves before vs after, peak kW, peak Nm, peak rpm.",
    href: "/ui-primitives/workshop-ops/dyno-run-card",
    accent: "amber",
    glyph: "∿",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Payment collection card",
    body: "Payment status with Stripe / Square / Tyro / cash selector and the refund button.",
    href: "/ui-primitives/workshop-ops/payment-collection-card",
    accent: "green",
    glyph: "₿",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 11",
    title: "Roadworthy cert card",
    body: "Pink-slip / blue-slip / safety-check status with NSW RTA eSafety verification.",
    href: "/ui-primitives/workshop-ops/roadworthy-cert-card",
    accent: "neutral",
    glyph: "▢",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Recall notice row",
    body: "Manufacturer recall hit row — severity, affected fleet, reach %, reach-out CTA.",
    href: "/ui-primitives/workshop-ops/recall-notice-row",
    accent: "red",
    glyph: "!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Loyalty stamp card",
    body: "Visual stamp grid with current / total and the reward-unlocked badge.",
    href: "/ui-primitives/workshop-ops/loyalty-stamp-card",
    accent: "amber",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Vehicle health tile",
    body: "Last service date, days-until-next countdown, oil / brake / tyre dial trio.",
    href: "/ui-primitives/workshop-ops/vehicle-health-tile",
    accent: "teal",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full workshop",
    body: "Live workshop floor cockpit — all 14 ops primitives composed into one surface.",
    href: "/ui-primitives/workshop-ops/full-workshop",
    accent: "red",
    glyph: "▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<OpsPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function WorkshopOpsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Workshop ops / 14 primitives + composition"
        title="Workshop ops primitives"
        description="Operational CRM family for Oak Flats Mufflermen — service tickets, bay scheduling, mechanic shifts, parts pulls, customer 360, SMS, quote builder, inspections, dyno cards, payments, NSW pink-slips, recall outreach, loyalty stamps, and the per-vehicle health tile. Visual references only — no real CRM wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — workshop ops are not wired
      </span>

      <section className={styles.grid} aria-label="Workshop ops primitives">
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
