import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./cloud-costs.module.css"

export const metadata: Metadata = {
  title: "Cloud costs | UI Primitives",
  description:
    "Fourteen Vantage / Cloudability-style cloud cost management primitives for AWS ap-southeast-2 (Sydney) and ap-southeast-4 (Melbourne) — spend, anomalies, budgets, commitments, tag allocation, rightsizing, idle resources, region heatmap.",
}

interface CloudCostScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<CloudCostScene> = [
  {
    kicker: "Primitive 01",
    title: "Cloud cost overview",
    body: "Month-to-date spend, end-of-period forecast and budget-vs-actual weekly bar chart.",
    href: "/ui-primitives/cloud-costs/overview",
    accent: "teal",
    glyph: "MTD",
    state: "Visual · stats",
    preview: [
      { label: "MTD", value: "$22.8k" },
      { label: "Budget", value: "$38k" },
    ],
  },
  {
    kicker: "Primitive 02",
    title: "Cost by service donut",
    body: "Donut split of spend across AWS services — EC2, RDS, S3, Lambda, CloudFront — with per-service legend.",
    href: "/ui-primitives/cloud-costs/service-donut",
    accent: "amber",
    glyph: "EC2",
    state: "Visual · donut",
    preview: [
      { label: "Top", value: "EC2 47%" },
      { label: "Total", value: "$38.4k" },
    ],
  },
  {
    kicker: "Primitive 03",
    title: "Top cost resources",
    body: "Top N most expensive resources with service chips, region and attribute chips (instance type, AZ, OS).",
    href: "/ui-primitives/cloud-costs/top-resources",
    accent: "teal",
    glyph: "TOP",
    state: "Visual · table",
    preview: [
      { label: "Rows", value: "8" },
      { label: "Heavy", value: "EC2 m5.2xl" },
    ],
  },
  {
    kicker: "Primitive 04",
    title: "Cost anomaly card",
    body: "Detected spend spike with baseline vs spike, sparkline trend and recommended action.",
    href: "/ui-primitives/cloud-costs/anomaly",
    accent: "red",
    glyph: "Δ",
    state: "Visual · alert",
    preview: [
      { label: "Service", value: "RDS" },
      { label: "Spike", value: "+142%" },
    ],
  },
  {
    kicker: "Primitive 05",
    title: "Budget alert banner",
    body: "Budget exceeded / approaching alert banner with delta chip and segmented progress meter.",
    href: "/ui-primitives/cloud-costs/budget-alert",
    accent: "red",
    glyph: "!$",
    state: "Visual · alert",
    preview: [
      { label: "State", value: "Approaching" },
      { label: "Used", value: "82%" },
    ],
  },
  {
    kicker: "Primitive 06",
    title: "Commitment utilisation",
    body: "Reserved-instance / savings-plan utilisation radial meter with savings vs on-demand.",
    href: "/ui-primitives/cloud-costs/commitment",
    accent: "green",
    glyph: "RI",
    state: "Visual · meter",
    preview: [
      { label: "Use", value: "92%" },
      { label: "Save", value: "$4.2k" },
    ],
  },
  {
    kicker: "Primitive 07",
    title: "Tag allocation pie",
    body: "Spend allocated by tag (env / team / project) with untagged spend chip.",
    href: "/ui-primitives/cloud-costs/tag-allocation",
    accent: "green",
    glyph: "TAG",
    state: "Visual · donut",
    preview: [
      { label: "Top", value: "prod 56%" },
      { label: "Untag", value: "$1.4k" },
    ],
  },
  {
    kicker: "Primitive 08",
    title: "Rightsizing recommendation",
    body: "Per-resource rightsizing — current SKU vs suggested + CPU/memory util bars + AUD savings.",
    href: "/ui-primitives/cloud-costs/rightsizing",
    accent: "green",
    glyph: "↓",
    state: "Visual · action",
    preview: [
      { label: "Save", value: "$640/mo" },
      { label: "CPU avg", value: "12%" },
    ],
  },
  {
    kicker: "Primitive 09",
    title: "Unused resource row",
    body: "Idle / unused resource row with idle days, monthly cost and decommission CTA.",
    href: "/ui-primitives/cloud-costs/unused-resource",
    accent: "amber",
    glyph: "IDL",
    state: "Visual · row",
    preview: [
      { label: "Idle", value: "42 days" },
      { label: "Cost", value: "$184/mo" },
    ],
  },
  {
    kicker: "Primitive 10",
    title: "Cost trend area chart",
    body: "Daily cost area chart with selectable range (7/14/30/90d) and forecast band overlay.",
    href: "/ui-primitives/cloud-costs/cost-trend",
    accent: "teal",
    glyph: "▼▲",
    state: "Stateful · range",
    preview: [
      { label: "Range", value: "30d" },
      { label: "Forecast", value: "+6%" },
    ],
  },
  {
    kicker: "Primitive 11",
    title: "Chargeback report",
    body: "Per-team chargeback table — team contact, allocation bar, trend sparkline and invoiced AUD.",
    href: "/ui-primitives/cloud-costs/chargeback",
    accent: "teal",
    glyph: "CHB",
    state: "Visual · table",
    preview: [
      { label: "Teams", value: "5" },
      { label: "Total", value: "$39.7k" },
    ],
  },
  {
    kicker: "Primitive 12",
    title: "Region cost heatmap",
    body: "Map of AWS regions tone-coded by spend with Sydney and Melbourne highlighted.",
    href: "/ui-primitives/cloud-costs/region-heatmap",
    accent: "red",
    glyph: "AU",
    state: "Visual · map",
    preview: [
      { label: "Heavy", value: "Sydney" },
      { label: "Spend", value: "$26.4k" },
    ],
  },
  {
    kicker: "Primitive 13",
    title: "Daily budget burndown",
    body: "Daily budget burndown chart with target line vs actual cumulative, plus variance %.",
    href: "/ui-primitives/cloud-costs/burndown",
    accent: "amber",
    glyph: "▼",
    state: "Visual · chart",
    preview: [
      { label: "State", value: "Hot" },
      { label: "Variance", value: "+8.4%" },
    ],
  },
  {
    kicker: "Primitive 14",
    title: "Cost saving action card",
    body: "Saving action card — title + description, monthly savings, effort chip and implement CTA.",
    href: "/ui-primitives/cloud-costs/saving-action",
    accent: "green",
    glyph: "$↓",
    state: "Visual · action",
    preview: [
      { label: "Save", value: "$420/mo" },
      { label: "Effort", value: "Low" },
    ],
  },
]

const ACCENT_CLASS: Record<CloudCostScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function CloudCostsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Cloud cost primitives"
        title="Cloud costs — FinOps console"
        description="Fourteen Vantage / Cloudability-style cloud cost management primitives. AUD pricing, AWS ap-southeast-2 (Sydney) and ap-southeast-4 (Melbourne). Spend overview, service split, top spenders, anomalies, budget alerts, commitment utilisation, tag allocation, rightsizing, idle resources, daily trend, chargeback, region heatmap, burndown and saving actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Cloud costs" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live AWS Cost Explorer / Vantage wiring
      </span>

      <Link className={styles.fullCenterCta} href="/ui-primitives/cloud-costs/full-console">
        Open full cloud cost console composition <span aria-hidden="true">→</span>
      </Link>

      <section className={styles.grid} aria-label="Cloud cost primitives gallery">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
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
