import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  Bell,
  Columns3,
  Gauge,
  Images,
  LayoutDashboard,
  ListChecks,
  PackageCheck,
  Rows3,
  Table2,
  Tags,
} from "lucide-react"

import {
  DashboardCard,
  MetricBlock,
  StatusBadge,
} from "../components/data-display"
import { PageHeader } from "../components/page-header"
import styles from "./data-display.module.css"

export const metadata: Metadata = {
  title: "Data Display | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
  example: string
  pattern: string
  status: "Live" | "Reference" | "Composable"
  Icon: typeof Table2
}

const primitives: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Data table",
    href: "/ui-primitives/data-display/table",
    description:
      "Generic typed table with sortable column heads, sticky header, zebra rows, density modes, and row selection.",
    example: "Supplier ledger, job queue, invoice runs",
    pattern: "Rows + controls + status cells",
    status: "Live",
    Icon: Table2,
  },
  {
    index: "02",
    title: "Dashboard card",
    href: "/ui-primitives/data-display/dashboard-card",
    description:
      "KPI tile with icon, big value, delta chip, sparkline slot, and footer link across glass / neuo / material surfaces.",
    example: "Today revenue, bay utilisation, SLA risk",
    pattern: "KPI + delta + spark slot",
    status: "Composable",
    Icon: LayoutDashboard,
  },
  {
    index: "03",
    title: "Metric block",
    href: "/ui-primitives/data-display/metric-block",
    description:
      "Inline dl trio for dense dashboards — label, value, delta — joined as a single bordered band.",
    example: "Open jobs, gross margin, parts fill rate",
    pattern: "Dense summary band",
    status: "Composable",
    Icon: Gauge,
  },
  {
    index: "04",
    title: "Activity feed",
    href: "/ui-primitives/data-display/activity-feed",
    description:
      "Vertical timeline with tone-tinted dots, actor avatar, timestamp, and live polite aria region.",
    example: "Quote approvals, bay handoffs, supplier syncs",
    pattern: "Timeline + actor + tone",
    status: "Live",
    Icon: Activity,
  },
  {
    index: "05",
    title: "Notification inbox",
    href: "/ui-primitives/data-display/notification-inbox",
    description:
      "Three-tab inbox panel (unread / all / mentions) with status icons, dismiss actions, and footer mark-all-read.",
    example: "Exceptions, mentions, system alerts",
    pattern: "Tabbed stream + actions",
    status: "Live",
    Icon: Bell,
  },
  {
    index: "06",
    title: "Status badge grid",
    href: "/ui-primitives/data-display/status-badge-grid",
    description:
      "Catalogue of every badge style (info / success / warn / error / neutral / brand) at three sizes and three shapes.",
    example: "Booked, complete, on hold, recalled",
    pattern: "Tone + size + shape",
    status: "Reference",
    Icon: Tags,
  },
  {
    index: "07",
    title: "Live counter card",
    href: "/ui-primitives/data-display/live-counter-card",
    description:
      "Animated count-up large value with live pulse pill, descriptive subhead, and trailing sparkline.",
    example: "Calls answered, active jobs, quote velocity",
    pattern: "Live value + trend",
    status: "Live",
    Icon: Rows3,
  },
  {
    index: "08",
    title: "Comparison table",
    href: "/ui-primitives/data-display/comparison-table",
    description:
      "Plan comparison with multi-column header, popular-column emphasis, ribbon, and check/cross/dot indicators.",
    example: "Service plans, warranty coverage, supplier terms",
    pattern: "Matrix + indicators",
    status: "Reference",
    Icon: Columns3,
  },
  {
    index: "09",
    title: "Pricing tier card",
    href: "/ui-primitives/data-display/pricing-tier-card",
    description:
      "Single tier card with feature list, currency-aware price, optional highlight ribbon, and primary CTA.",
    example: "Fleet service tiers, care plans",
    pattern: "Offer + feature list",
    status: "Composable",
    Icon: PackageCheck,
  },
  {
    index: "10",
    title: "Kanban board",
    href: "/ui-primitives/data-display/kanban-board",
    description:
      "Four-column board (backlog / progress / review / done) with priority dot, tag chips, and avatar stack.",
    example: "Workshop bays, quote approvals, parts intake",
    pattern: "Stage columns + cards",
    status: "Live",
    Icon: ListChecks,
  },
  {
    index: "11",
    title: "Media tray",
    href: "/ui-primitives/data-display/media-tray",
    description:
      "Horizontal snap scroller of figures with hover scale, overlay tag, and figcaption metadata.",
    example: "Vehicle proof shots, install references",
    pattern: "Media rail + metadata",
    status: "Composable",
    Icon: Images,
  },
]

const overviewMetrics = [
  {
    id: "surfaces",
    label: "Primitive surfaces",
    value: "11",
    unit: "ready",
    delta: { label: "full set", direction: "flat" as const },
  },
  {
    id: "ops",
    label: "Operational examples",
    value: "34",
    unit: "mapped",
    delta: { label: "+12", direction: "up" as const },
  },
  {
    id: "states",
    label: "State patterns",
    value: "6",
    unit: "covered",
    delta: { label: "empty/load/fault", direction: "flat" as const },
  },
]

const surfaceRows = [
  {
    label: "Workshop control room",
    composition: "DashboardCard + MetricBlock + ActivityFeed",
    output: "Manager sees live bay utilisation, quote risk, and latest handoffs.",
    tone: "success" as const,
    status: "Live",
  },
  {
    label: "Supplier operations",
    composition: "DataTable + StatusBadge + progress cells",
    output: "Parts buyers compare spend, fulfilment, risk, and overdue orders.",
    tone: "warn" as const,
    status: "Watch",
  },
  {
    label: "Customer plan compare",
    composition: "ComparisonTable + PricingTierCard + badges",
    output: "Service advisers explain fleet care tiers without custom markup.",
    tone: "brand" as const,
    status: "Sales",
  },
  {
    label: "Install evidence",
    composition: "MediaTray + ActivityFeed + NotificationInbox",
    output: "Proof shots, customer approvals, and exception alerts stay together.",
    tone: "info" as const,
    status: "Review",
  },
]

export default function DataDisplayPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Data display operations system"
        description="Dark-first primitives for the workshop surfaces that carry real work: supplier ledgers, bay queues, KPI bands, status badges, comparison matrices, activity streams, and media evidence."
        dnaSectionId="data-display"
      />
      <section className={styles.overviewShell} aria-label="Data display operating snapshot">
        <div className={styles.leadPanel}>
          <div className={styles.leadCopy}>
            <span className={styles.kicker}>Workshop data stack</span>
            <h2 className={styles.sectionTitle}>From single row to control room</h2>
            <p className={styles.subhead}>
              The data-display family is organised by operational job instead of component shape.
              Each primitive has a live route, a domain example, and a clear integration path for
              badges, chips, progress meters, stats, and state handling.
            </p>
          </div>
          <MetricBlock metrics={overviewMetrics} />
        </div>

        <div className={styles.signalGrid} aria-label="Current workshop examples">
          <DashboardCard
            label="Bay utilisation"
            value="86"
            unit="%"
            icon={<Gauge aria-hidden="true" />}
            delta={{ label: "+9%", direction: "up" }}
            meta="5 of 6 hoists active"
            surface="material"
          />
          <DashboardCard
            label="Quote backlog"
            value="14"
            unit="jobs"
            icon={<ListChecks aria-hidden="true" />}
            delta={{ label: "3 due", direction: "down" }}
            meta="Needs adviser review"
            surface="glass"
          />
          <DashboardCard
            label="Parts fill rate"
            value="92"
            unit="%"
            icon={<PackageCheck aria-hidden="true" />}
            delta={{ label: "+4%", direction: "up" }}
            meta="Supplier ledger linked"
            surface="neuo"
          />
        </div>
      </section>

      <section className={styles.section} aria-label="Data display primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index / 11 primitives</span>
          <h2 className={styles.sectionTitle}>Primitive ecosystem</h2>
          <p className={styles.subhead}>
            Every route renders at full scale with Oak Flats domain data. The index below calls out
            the operational example, expected composition pattern, and readiness state.
          </p>
        </header>
        <div className={styles.surfaceTable} aria-label="Primitive ecosystem map">
          <div className={styles.surfaceTableHead}>
            <span>Primitive</span>
            <span>Operational example</span>
            <span>Composition pattern</span>
            <span>State</span>
          </div>
          {primitives.map((primitive) => (
            <Link key={primitive.href} className={styles.surfaceRow} href={primitive.href}>
              <span className={styles.surfaceName}>
                <span className={styles.thumbIndex}>{primitive.index}</span>
                <primitive.Icon aria-hidden="true" />
                <span>
                  <strong>{primitive.title}</strong>
                  <small>{primitive.description}</small>
                </span>
              </span>
              <span>{primitive.example}</span>
              <span>{primitive.pattern}</span>
              <span className={styles.stateCell}>
                <span data-state={primitive.status}>{primitive.status}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.compositionSection} aria-label="Operational compositions">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Compositions / production use</span>
          <h2 className={styles.sectionTitle}>How the primitives work together</h2>
        </header>
        <div className={styles.compositionRows}>
          {surfaceRows.map((row) => (
            <article key={row.label} className={styles.compositionRow}>
              <div>
                <StatusBadge tone={row.tone} size="sm" shape="pill" label={row.status} />
                <h3>{row.label}</h3>
              </div>
              <p>{row.composition}</p>
              <p>{row.output}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
