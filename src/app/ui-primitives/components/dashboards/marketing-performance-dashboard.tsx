"use client"

import { AreaChart } from "../charts/area-chart"
import { DonutChart } from "../charts/donut-chart"
import { DataTable } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import { LogoCloud } from "../marketing/logo-cloud"
import { StatCounterRow } from "../marketing/stat-counter-row"
import type { DataTableColumn } from "../data-display/data-table"
import type { LogoCloudEntry } from "../marketing/logo-cloud"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./marketing-performance-dashboard.module.css"

const HEADLINE = [
  {
    id: "imp",
    label: "Impressions · 30d",
    value: 1_840_000,
    suffix: "",
    tone: "red" as const,
    body: "+18.4% vs prior 30d window.",
  },
  {
    id: "clicks",
    label: "Clicks",
    value: 42_180,
    tone: "amber" as const,
    body: "Top driver — twin-loop dyno reel.",
  },
  {
    id: "ctr",
    label: "CTR",
    value: 2.29,
    suffix: "%",
    decimals: 2,
    tone: "teal" as const,
    body: "Above the 1.8% workshop baseline.",
  },
  {
    id: "conv",
    label: "Quotes opened",
    value: 184,
    tone: "green" as const,
    body: "62% of clicks request a quote.",
  },
]

const TREND_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]
const TREND_SERIES = [
  {
    label: "Impressions",
    values: [180_000, 198_000, 212_000, 224_000, 246_000, 268_000, 284_000, 298_000],
    tone: "amber" as const,
  },
  {
    label: "Clicks",
    values: [3_840, 4_120, 4_460, 4_840, 5_280, 5_640, 6_020, 6_280],
    tone: "teal" as const,
  },
]

const CHANNEL_MIX = [
  { label: "Instagram", value: 42, tone: "red" as const },
  { label: "TikTok", value: 28, tone: "amber" as const },
  { label: "Facebook", value: 16, tone: "teal" as const },
  { label: "YouTube", value: 9, tone: "green" as const },
  { label: "Google", value: 5, tone: "red" as const },
]

interface Campaign {
  id: string
  name: string
  channel: string
  spendAud: number
  conversions: number
  cpa: number
  trendDirection: "up" | "down" | "flat"
}

const CAMPAIGNS: ReadonlyArray<Campaign> = [
  {
    id: "c-1",
    name: "Twin-loop dyno reel · IG boost",
    channel: "Instagram",
    spendAud: 420,
    conversions: 38,
    cpa: 11.05,
    trendDirection: "up",
  },
  {
    id: "c-2",
    name: "Mate-rate Tuesday · TT weekly",
    channel: "TikTok",
    spendAud: 320,
    conversions: 24,
    cpa: 13.33,
    trendDirection: "up",
  },
  {
    id: "c-3",
    name: "Wollongong meet · geo radius",
    channel: "Facebook",
    spendAud: 280,
    conversions: 18,
    cpa: 15.56,
    trendDirection: "flat",
  },
  {
    id: "c-4",
    name: "DPF explainer · long-form YT",
    channel: "YouTube",
    spendAud: 160,
    conversions: 8,
    cpa: 20.0,
    trendDirection: "down",
  },
  {
    id: "c-5",
    name: "Brand search · always-on",
    channel: "Google",
    spendAud: 140,
    conversions: 22,
    cpa: 6.36,
    trendDirection: "up",
  },
]

const DIRECTION_TONE: Record<Campaign["trendDirection"], "red" | "amber" | "teal" | "green"> = {
  up: "green",
  flat: "amber",
  down: "red",
}

const DIRECTION_LABEL: Record<Campaign["trendDirection"], string> = {
  up: "Trending up",
  flat: "Holding",
  down: "Trending down",
}

const CAMPAIGN_COLUMNS: ReadonlyArray<DataTableColumn<Campaign>> = [
  { id: "name", header: "Campaign", cell: (row) => row.name, sortable: true },
  { id: "channel", header: "Channel", cell: (row) => row.channel, width: "120px" },
  {
    id: "spend",
    header: "Spend",
    cell: (row) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
      }).format(row.spendAud),
    align: "right",
    width: "100px",
  },
  {
    id: "conv",
    header: "Conv.",
    cell: (row) => row.conversions.toString(),
    align: "right",
    width: "80px",
  },
  {
    id: "cpa",
    header: "CPA",
    cell: (row) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 2,
      }).format(row.cpa),
    align: "right",
    width: "100px",
  },
  {
    id: "trend",
    header: "Trend",
    cell: (row) => (
      <Chip
        label={DIRECTION_LABEL[row.trendDirection]}
        tone={DIRECTION_TONE[row.trendDirection]}
        selected
      />
    ),
    width: "140px",
  },
]

const INTEGRATIONS: ReadonlyArray<LogoCloudEntry> = [
  {
    id: "ig",
    name: "Instagram",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          IG·LIVE
        </text>
      </svg>
    ),
  },
  {
    id: "tt",
    name: "TikTok",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          TT·INK
        </text>
      </svg>
    ),
  },
  {
    id: "fb",
    name: "Meta business",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          META·B
        </text>
      </svg>
    ),
  },
  {
    id: "ga",
    name: "Google Ads",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          G/ADS
        </text>
      </svg>
    ),
  },
  {
    id: "yt",
    name: "YouTube",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          YT·STD
        </text>
      </svg>
    ),
  },
  {
    id: "klav",
    name: "Klaviyo",
    mark: (
      <svg viewBox="0 0 60 24" aria-hidden="true">
        <text
          x="0"
          y="17"
          fontFamily="'Anton', Impact, sans-serif"
          fontSize="20"
          fill="currentColor"
          letterSpacing="0.04em"
        >
          KLAV·O
        </text>
      </svg>
    ),
  },
]

export function MarketingPerformanceDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Marketing / Performance"
        title="Acquisition pulse"
        subtitle="Where the workshop is showing up online, how much it's costing, and which assets are doing the heavy lifting this month."
        toolbar={<span>Cycle · May 2026</span>}
        ariaLabel="Marketing performance dashboard"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Headline" aside="30d" span={1} tone="red">
          <StatCounterRow entries={HEADLINE} />
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Trend · 8 weeks" aside="Impressions vs clicks" tone="amber">
          <AreaChart
            series={TREND_SERIES}
            xLabels={TREND_LABELS}
            height={220}
            ariaLabel="Impressions and clicks over the last 8 weeks"
          />
        </DashboardTile>

        <DashboardTile label="Channel mix" aside="Share of clicks" tone="teal">
          <DonutChart
            segments={[...CHANNEL_MIX]}
            ariaLabel="Click share by marketing channel"
            centerLabel="42k"
            centerCaption="clicks · 30d"
            segmentLabels
          />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Campaigns"
        title="What's running this month"
        ariaLabel="Marketing campaigns table"
        density="comfortable"
        columns={1}
      >
        <DashboardTile label="Active campaigns" aside="5 live" span={1} tone="green">
          <DataTable
            rows={[...CAMPAIGNS]}
            columns={CAMPAIGN_COLUMNS}
            getRowId={(row) => row.id}
            density="comfortable"
            zebra
            kicker="Campaigns"
            caption="Active paid campaigns this month"
          />
        </DashboardTile>
      </DashboardShell>

      <DashboardShell
        kicker="Integrations"
        title="Where the data lives"
        subtitle="Active platforms reporting into the Mufflerpulse marketing stack."
        ariaLabel="Marketing platform integrations"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Platforms" aside="6 active" span={1} tone="teal">
          <LogoCloud entries={INTEGRATIONS} />
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default MarketingPerformanceDashboard
