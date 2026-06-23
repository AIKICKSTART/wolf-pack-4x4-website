import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./inventory.module.css"

export const metadata: Metadata = {
  title: "Inventory pages | UI Primitives",
  description:
    "Fourteen reusable inventory primitives for the Oak Flats Mufflermen warehouse — SKU detail, stock level meter, reorder threshold chip, supplier link card, warehouse location grid, bin chip, pick list row, receive shipment scanner, stock take grid, variance row, analytics tile, warehouse switcher, low stock alert banner, backorder chip.",
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
    title: "SKU detail card",
    body: "Supplier, thumbnail, on-hand, average cost, reorder point and lead-time chip composed via DashboardCard.",
    href: "/ui-primitives/inventory/sku-detail-card",
    accent: "amber",
    state: "Detail",
  },
  {
    kicker: "Primitive 02",
    title: "Stock level meter",
    body: "Tone-shifting ProgressLinear with reorder / capacity bands and live aria-meter semantics.",
    href: "/ui-primitives/inventory/stock-level-meter",
    accent: "green",
    state: "Meter",
  },
  {
    kicker: "Primitive 03",
    title: "Reorder threshold chip",
    body: "Chip + QuoteBubble tooltip explaining when and why to reorder — supplier lead-time aware.",
    href: "/ui-primitives/inventory/reorder-threshold-chip",
    accent: "amber",
    state: "Hint",
  },
  {
    kicker: "Primitive 04",
    title: "Supplier link card",
    body: "Supplier identity + last PO date + lead-time and on-time chips composed via DashboardCard.",
    href: "/ui-primitives/inventory/supplier-link-card",
    accent: "teal",
    state: "Supplier",
  },
  {
    kicker: "Primitive 05",
    title: "Warehouse location grid",
    body: "Visual aisle × bay grid with density tone-coding — region semantics for screen-readers.",
    href: "/ui-primitives/inventory/warehouse-location-grid",
    accent: "green",
    state: "Map",
  },
  {
    kicker: "Primitive 06",
    title: "Bin location chip",
    body: "Compact aisle-bay-shelf chip with click-to-find affordance into the warehouse grid.",
    href: "/ui-primitives/inventory/bin-location-chip",
    accent: "teal",
    state: "Chip",
  },
  {
    kicker: "Primitive 07",
    title: "Pick list row",
    body: "Semantic table row — SKU, qty, bin location chip, pick-status chip. Drop into any pick table.",
    href: "/ui-primitives/inventory/pick-list-row",
    accent: "amber",
    state: "Pick",
  },
  {
    kicker: "Primitive 08",
    title: "Receive shipment scanner",
    body: "Barcode-scan field + scanned line variance flag + commit CTA for dock receipts.",
    href: "/ui-primitives/inventory/receive-shipment-scanner",
    accent: "teal",
    state: "Dock",
  },
  {
    kicker: "Primitive 09",
    title: "Stock take grid",
    body: "DataTable-backed counting grid — expected, counted input, live variance chip per row.",
    href: "/ui-primitives/inventory/stock-take-grid",
    accent: "green",
    state: "Audit",
  },
  {
    kicker: "Primitive 10",
    title: "Variance report row",
    body: "Expected vs actual with tone-coded delta chip + suggested-action chip, aria-live for updates.",
    href: "/ui-primitives/inventory/variance-report-row",
    accent: "red",
    state: "Variance",
  },
  {
    kicker: "Primitive 11",
    title: "Inventory analytics tile",
    body: "Turnover rate, days-of-stock, carrying cost composed via MetricBlock + Sparkline trend.",
    href: "/ui-primitives/inventory/inventory-analytics-tile",
    accent: "green",
    state: "KPI",
  },
  {
    kicker: "Primitive 12",
    title: "Multi-warehouse switcher",
    body: "Dropdown of Oak Flats, Albion Park and Sydney warehouses with total-SKUs chip.",
    href: "/ui-primitives/inventory/multi-warehouse-switcher",
    accent: "teal",
    state: "Nav",
  },
  {
    kicker: "Primitive 13",
    title: "Low stock alert banner",
    body: "Compose StickyCtaBar with N items below reorder + action CTA + suppress-for-Xh toggle.",
    href: "/ui-primitives/inventory/low-stock-alert-banner",
    accent: "red",
    state: "Alert",
  },
  {
    kicker: "Primitive 14",
    title: "Backorder / pre-order chip",
    body: "Compact chip group — kind + ETA + customer-impact count for unfulfilled SKUs.",
    href: "/ui-primitives/inventory/backorder-preorder-chip",
    accent: "amber",
    state: "Pipeline",
  },
  {
    kicker: "Bonus",
    title: "Full warehouse console",
    body: "Composes switcher, low-stock alert, analytics row, location grid, level meter, SKU detail, supplier links, pick list, receive scanner, stock take + variance rows.",
    href: "/ui-primitives/inventory/full-warehouse",
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

export default function InventoryIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Inventory pages"
        title="Inventory primitive pack"
        description="Fourteen reusable warehouse-management surfaces for Oak Flats Mufflermen — SKU detail, stock-level meter, reorder threshold, supplier link, location grid, bin chip, pick row, receive scanner, stock take grid, variance row, analytics tile, warehouse switcher, low-stock alert, backorder chip. Bonus: a full warehouse-console composition route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory" },
        ]}
      />

      <span className={styles.notice}>
        Inventory primitives — composed from the umbrella design system
      </span>

      <section className={styles.grid} aria-label="Inventory primitives index">
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
