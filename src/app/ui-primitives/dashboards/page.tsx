import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./dashboards.module.css"

export const metadata: Metadata = {
  title: "Persona Dashboards | UI Primitives",
  description:
    "Persona-specific dashboard composites — workshop manager, front desk, parts receiver, customer portal, owner, editor, operator, executive, mobile technician, and marketing performance.",
}

interface DashboardScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  persona: string
}

const SCENES: ReadonlyArray<DashboardScene> = [
  {
    kicker: "Persona 01",
    title: "Workshop manager",
    body: "Bay flow, job kanban, activity stream, alert routing, and the 7-day revenue curve.",
    href: "/ui-primitives/dashboards/workshop-manager",
    accent: "red",
    glyph: "WM",
    persona: "Bay supervisor",
  },
  {
    kicker: "Persona 02",
    title: "Front desk",
    body: "Day calendar with bay swimlanes, customer queue, quick actions, and inbox.",
    href: "/ui-primitives/dashboards/front-desk",
    accent: "amber",
    glyph: "FD",
    persona: "Reception",
  },
  {
    kicker: "Persona 03",
    title: "Parts receiver",
    body: "Inbound POs, stock vs reorder point, supplier signal strength, recent receipts.",
    href: "/ui-primitives/dashboards/parts-receiver",
    accent: "teal",
    glyph: "PR",
    persona: "Yard & receiving",
  },
  {
    kicker: "Persona 04",
    title: "Customer portal",
    body: "Garage of vehicles, open quotes, active job progress, invoice history, articles.",
    href: "/ui-primitives/dashboards/customer-portal",
    accent: "green",
    glyph: "CP",
    persona: "End customer",
  },
  {
    kicker: "Persona 05",
    title: "Admin · organisation",
    body: "MRR, customers, NPS, integrations, owner audit log, plan posture.",
    href: "/ui-primitives/dashboards/admin-org",
    accent: "red",
    glyph: "AO",
    persona: "Owner",
  },
  {
    kicker: "Persona 06",
    title: "Mufflerpulse editor",
    body: "Today's slot strip, composer, queue table, engagement gauge, top performer.",
    href: "/ui-primitives/dashboards/mufflerpulse-editor",
    accent: "violet",
    glyph: "ME",
    persona: "Social editor",
  },
  {
    kicker: "Persona 07",
    title: "Hermes operator",
    body: "Campaign kanban, alert inbox, reach trend, supplier-health gauges, routing.",
    href: "/ui-primitives/dashboards/hermes-operator",
    accent: "amber",
    glyph: "HO",
    persona: "Ops cockpit",
  },
  {
    kicker: "Persona 08",
    title: "Executive overview",
    body: "Four big numbers, 12-week trend, workshop heatmap, leading indicators, plan ribbon.",
    href: "/ui-primitives/dashboards/executive-overview",
    accent: "green",
    glyph: "EX",
    persona: "Owner / Board",
  },
  {
    kicker: "Persona 09",
    title: "Technician · mobile",
    body: "Mobile shell with active job ticket, materials checklist, handover link, bottom nav.",
    href: "/ui-primitives/dashboards/technician-mobile",
    accent: "teal",
    glyph: "TM",
    persona: "On-tool tech",
  },
  {
    kicker: "Persona 10",
    title: "Marketing performance",
    body: "Headline stats, 8-week trend, channel donut, campaigns table, platform logos.",
    href: "/ui-primitives/dashboards/marketing-performance",
    accent: "red",
    glyph: "MP",
    persona: "Acquisition",
  },
]

const ACCENT_CLASS: Record<DashboardScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function DashboardsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dashboards / 10 persona views"
        title="Persona dashboard composites"
        description="Each composite layers the existing primitive library — stats, charts, tables, kanban, calendars — into a layout shaped for a specific Mufflermen persona. Reference only; no live data."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Persona Dashboards" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — composed from existing primitives
      </span>

      <section className={styles.grid} aria-label="Persona dashboard composites">
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
              <span>{scene.persona}</span>
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
