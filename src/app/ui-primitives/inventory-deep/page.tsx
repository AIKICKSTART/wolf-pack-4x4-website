import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Inventory deep pack | UI Primitives",
  description:
    "Fourteen warehouse-operations primitives for Oak Flats Mufflermen — stocktake session card, bin map grid, transfer order row, reorder point card, batch tracking row, ABC analysis tile, cycle count row, slow mover card, safety stock gauge, supplier lead time row, obsolete stock card, stock movement timeline, purchase order line row, pickwave card.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Stocktake session card",
    body: "Active cycle-count session with auditor, counted-vs-total radial, elapsed time and status pill.",
    href: "/ui-primitives/inventory-deep/stocktake-session-card",
    accent: "amber",
    state: "Audit",
  },
  {
    kicker: "Primitive 02",
    title: "Bin map grid",
    body: "Warehouse bay × row × column map with click-to-detail cells and density tone coding.",
    href: "/ui-primitives/inventory-deep/bin-map-grid",
    accent: "teal",
    state: "Map",
  },
  {
    kicker: "Primitive 03",
    title: "Transfer order row",
    body: "Inter-bay transfer row with status, ETA, signature footer — drops into any transfer table.",
    href: "/ui-primitives/inventory-deep/transfer-order-row",
    accent: "teal",
    state: "Transfer",
  },
  {
    kicker: "Primitive 04",
    title: "Reorder point card",
    body: "SKU reorder card with EOQ, lead time and safety-stock metrics + segmented stock meter.",
    href: "/ui-primitives/inventory-deep/reorder-point-card",
    accent: "amber",
    state: "Reorder",
  },
  {
    kicker: "Primitive 05",
    title: "Batch tracking row",
    body: "Batch / lot / expiry row with traceability link and lifecycle chip.",
    href: "/ui-primitives/inventory-deep/batch-tracking-row",
    accent: "green",
    state: "Batch",
  },
  {
    kicker: "Primitive 06",
    title: "ABC analysis tile",
    body: "A/B/C class breakdown with revenue contribution and SKU share.",
    href: "/ui-primitives/inventory-deep/abc-analysis-tile",
    accent: "green",
    state: "Analytics",
  },
  {
    kicker: "Primitive 07",
    title: "Cycle count row",
    body: "Cycle count row with variance chip + accept / recount verdict buttons.",
    href: "/ui-primitives/inventory-deep/cycle-count-row",
    accent: "amber",
    state: "Variance",
  },
  {
    kicker: "Primitive 08",
    title: "Slow mover card",
    body: "Slow-moving SKU card with days-since-last-sale meter + disposition actions.",
    href: "/ui-primitives/inventory-deep/slow-mover-card",
    accent: "red",
    state: "Slow",
  },
  {
    kicker: "Primitive 09",
    title: "Safety stock gauge",
    body: "Radial gauge: current vs safety stock + days of cover.",
    href: "/ui-primitives/inventory-deep/safety-stock-gauge",
    accent: "green",
    state: "Gauge",
  },
  {
    kicker: "Primitive 10",
    title: "Supplier lead time row",
    body: "Supplier delivery performance row with quoted vs actual lead time and on-time chip.",
    href: "/ui-primitives/inventory-deep/supplier-lead-time-row",
    accent: "teal",
    state: "Supplier",
  },
  {
    kicker: "Primitive 11",
    title: "Obsolete stock card",
    body: "Obsolete-stock card with quantity, book value, and disposal options.",
    href: "/ui-primitives/inventory-deep/obsolete-stock-card",
    accent: "red",
    state: "Disposal",
  },
  {
    kicker: "Primitive 12",
    title: "Stock movement timeline",
    body: "Chronological in/out movements per SKU — receipts, picks, transfers, adjustments, write-offs.",
    href: "/ui-primitives/inventory-deep/stock-movement-timeline",
    accent: "teal",
    state: "Trace",
  },
  {
    kicker: "Primitive 13",
    title: "Purchase order line row",
    body: "PO line row with ordered / received qty, subtotal and inline receive button.",
    href: "/ui-primitives/inventory-deep/purchase-order-line-row",
    accent: "amber",
    state: "PO",
  },
  {
    kicker: "Primitive 14",
    title: "Pickwave card",
    body: "Pickwave card with sequence, picker, tote and segmented progress.",
    href: "/ui-primitives/inventory-deep/pickwave-card",
    accent: "amber",
    state: "Wave",
  },
  {
    kicker: "Bonus",
    title: "Full warehouse cockpit",
    body: "Composes stocktake, bin map, transfers, reorder cards, safety gauges, supplier rows, ABC bands, slow movers, obsolete cards, movements, PO lines and pickwaves.",
    href: "/ui-primitives/inventory-deep/full-warehouse",
    accent: "red",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function InventoryDeepIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Inventory deep pack"
        title="Warehouse operations primitives"
        description="Fourteen deep warehouse-management surfaces for Oak Flats Mufflermen — stocktake sessions, bin maps, transfers, EOQ-aware reorder cards, batch tracing, ABC analysis, cycle counts, slow movers, safety stock gauges, supplier lead-time scorecards, obsolete stock disposal, stock movement timelines, PO line rows, and pickwave cards. Bonus: a composed full-warehouse cockpit route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep" },
        ]}
      />

      <span className={styles.notice}>
        Inventory deep · composed from the umbrella design system
      </span>

      <section className={styles.grid} aria-label="Inventory deep primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
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
