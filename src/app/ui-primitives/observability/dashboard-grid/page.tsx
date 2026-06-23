import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DashboardGrid, MetricTile } from "../../components/observability"
import type { DashboardTile } from "../../components/observability"

import {
  ERROR_RATE_SPARK,
  PARTS_CATALOGUE_LATENCY_SPARK,
  QUOTES_API_LATENCY_SPARK,
  QUOTES_API_RPS_SPARK,
  QUOTE_PDF_LATENCY_SPARK,
  SCHEDULER_LATENCY_SPARK,
} from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Dashboard grid | Observability cockpit",
  description:
    "Primitive 03 — 12-column dashboard grid with neuomorphic tiles, drag-handle hint and arbitrary content per tile.",
}

const TILES: ReadonlyArray<DashboardTile> = [
  {
    id: "tile-1",
    title: "Quotes API",
    subtitle: "p95 latency · 5m",
    span: 4,
    content: (
      <MetricTile
        label="p95 latency"
        value="142"
        unit="ms"
        tone="green"
        service="quotes-api"
        sparkline={QUOTES_API_LATENCY_SPARK}
        delta={{ label: "-12%", direction: "down", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "tile-2",
    title: "Parts catalogue",
    subtitle: "p95 latency · 5m",
    span: 4,
    content: (
      <MetricTile
        label="p95 latency"
        value="188"
        unit="ms"
        tone="teal"
        service="parts-catalogue"
        sparkline={PARTS_CATALOGUE_LATENCY_SPARK}
        delta={{ label: "+4%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "tile-3",
    title: "Quote PDF",
    subtitle: "render p95 · 5m",
    span: 4,
    content: (
      <MetricTile
        label="render p95"
        value="484"
        unit="ms"
        tone="amber"
        service="quote-pdf"
        sparkline={QUOTE_PDF_LATENCY_SPARK}
        delta={{ label: "+24%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "tile-4",
    title: "Quotes API",
    subtitle: "throughput · 1m",
    span: 6,
    content: (
      <MetricTile
        label="RPS"
        value="198"
        unit="req/s"
        tone="teal"
        service="quotes-api"
        sparkline={QUOTES_API_RPS_SPARK}
        delta={{ label: "+8.2%", direction: "up", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "tile-5",
    title: "Workshop scheduler",
    subtitle: "p95 latency · 5m",
    span: 6,
    content: (
      <MetricTile
        label="p95 latency"
        value="96"
        unit="ms"
        tone="green"
        service="workshop-scheduler"
        sparkline={SCHEDULER_LATENCY_SPARK}
        delta={{ label: "0%", direction: "flat", vs: "vs 1h" }}
      />
    ),
  },
  {
    id: "tile-6",
    title: "Customer SMS",
    subtitle: "delivery error rate · 5m",
    span: 12,
    content: (
      <MetricTile
        label="error rate"
        value="0.61"
        unit="%"
        tone="red"
        service="customer-sms"
        sparkline={ERROR_RATE_SPARK}
        delta={{ label: "+412%", direction: "up", vs: "vs 1h" }}
        caption="alert rule threshold: > 2% sustained 5m"
      />
    ),
  },
]

export default function DashboardGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Layout"
        title="Dashboard grid"
        description="A 12-column dashboard grid for arranging observability tiles. Each tile carries a title, subtitle, drag-handle hint (visual only) and arbitrary content slot. Below the breakpoints collapses the grid into stacked rows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Dashboard grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 tiles · 12-col grid</span>
        <DashboardGrid tiles={TILES} caption="Mufflermen platform overview" />
      </section>
    </main>
  )
}
