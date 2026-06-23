"use client"

/**
 * Searchable parts catalogue — the centre of the Parts & inventory screen.
 *
 * Composes EXISTING primitives only: DataTable (sortable/zebra grid),
 * StockLevelMeter (per-row stock health bar), StatusBadge (health pill),
 * Chip (supplier filter pills) and the brand search field. Search + supplier
 * filtering are client-side over the demo fixtures; the reorder action raises
 * a transient, accessible confirmation (a real PO call lands when apps wire in).
 *
 * Brand note (dev-only): the assistant brand surfaced to the owner is "Torque".
 */

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { DataTable } from "../../components/data-display/data-table"
import type { DataTableColumn } from "../../components/data-display/data-table"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"
import { StockLevelMeter } from "../../components/inventory/stock-level-meter"
import type { StockHealth } from "../../components/inventory/inventory-types"
import { Chip } from "../../components/primitives/chip"

import { PARTS, SUPPLIERS, supplierName, type PartRow } from "./_demo-data"
import styles from "./parts-inventory.module.css"

const HEALTH_TONE: Record<StockHealth, StatusBadgeTone> = {
  critical: "error",
  low: "warn",
  healthy: "success",
  overstocked: "info",
}

const HEALTH_LABEL: Record<StockHealth, string> = {
  critical: "Below reorder",
  low: "Low",
  healthy: "In stock",
  overstocked: "Overstocked",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const ALL_SUPPLIERS = "all" as const

export function PartsCatalogue() {
  const [query, setQuery] = useState("")
  const [supplierFilter, setSupplierFilter] = useState<string>(ALL_SUPPLIERS)
  const [reordered, setReordered] = useState<ReadonlySet<string>>(new Set())
  const [statusMessage, setStatusMessage] = useState("")

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return PARTS.filter((part) => {
      const matchesSupplier =
        supplierFilter === ALL_SUPPLIERS || part.supplierId === supplierFilter
      if (!matchesSupplier) {
        return false
      }
      if (needle.length === 0) {
        return true
      }
      const haystack =
        `${part.sku} ${part.name} ${part.category} ${supplierName(part.supplierId)} ${part.bin}`.toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, supplierFilter])

  const handleReorder = (part: PartRow) => {
    setReordered((current) => {
      const next = new Set(current)
      next.add(part.id)
      return next
    })
    setStatusMessage(
      `Reorder drafted: ${part.sku} from ${supplierName(part.supplierId)}. Torque has queued it on the next PO.`,
    )
  }

  const columns = useMemo<ReadonlyArray<DataTableColumn<PartRow>>>(
    () => [
      {
        id: "part",
        header: "Part",
        cell: (part) => (
          <span className={styles.partCell}>
            <span className={styles.partThumb}>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative
                  catalogue thumbnail; sizes are fixed and below-the-fold. */}
              <img
                src={part.thumbSrc}
                alt=""
                width={52}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className={styles.partText}>
              <span className={styles.partName}>{part.name}</span>
              <span className={styles.partMeta}>
                <span className={styles.partSku}>{part.sku}</span>
                <span aria-hidden="true">·</span>
                <span>{part.category}</span>
                <span aria-hidden="true">·</span>
                <span>Bin {part.bin}</span>
              </span>
            </span>
          </span>
        ),
      },
      {
        id: "supplier",
        header: "Supplier",
        sortable: true,
        cell: (part) => <span className={styles.supplierCell}>{supplierName(part.supplierId)}</span>,
      },
      {
        id: "stock",
        header: "Stock level",
        width: "240px",
        cell: (part) => (
          <StockLevelMeter
            label={part.name}
            kicker={`${part.onHand} on hand`}
            current={part.onHand}
            capacity={part.capacity}
            reorderPoint={part.reorderPoint}
            className={styles.rowMeter}
          />
        ),
      },
      {
        id: "health",
        header: "Status",
        cell: (part) => (
          <StatusBadge
            tone={HEALTH_TONE[part.health]}
            size="sm"
            shape="pill"
            label={HEALTH_LABEL[part.health]}
          />
        ),
      },
      {
        id: "price",
        header: "Price (inc GST)",
        align: "right",
        sortable: true,
        cell: (part) => <span className={styles.priceCell}>{formatAud(part.price)}</span>,
      },
      {
        id: "action",
        header: "Reorder",
        align: "right",
        cell: (part) => {
          const isReordered = reordered.has(part.id)
          return (
            <button
              type="button"
              className={styles.reorderBtn}
              onClick={() => handleReorder(part)}
              disabled={isReordered}
              data-done={isReordered}
              aria-label={
                isReordered
                  ? `${part.sku} added to the next purchase order`
                  : `Reorder ${part.sku} from ${supplierName(part.supplierId)}`
              }
            >
              {isReordered ? "On PO ✓" : "Reorder"}
            </button>
          )
        },
      },
    ],
    [reordered],
  )

  return (
    <section className={styles.catalogue} aria-labelledby="parts-catalogue-title">
      <header className={styles.catalogueHead}>
        <div>
          <span className={styles.catalogueKicker}>Parts catalogue</span>
          <h2 id="parts-catalogue-title" className={styles.catalogueTitle}>
            Search the parts wall
          </h2>
        </div>

        <div className={styles.searchField}>
          <Search size={16} aria-hidden="true" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search SKU, part, supplier or bin…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search the parts catalogue"
          />
        </div>
      </header>

      <div className={styles.filterRow} role="group" aria-label="Filter parts by supplier">
        <Chip
          label="All suppliers"
          tone="neutral"
          selected={supplierFilter === ALL_SUPPLIERS}
          onSelect={() => setSupplierFilter(ALL_SUPPLIERS)}
        />
        {SUPPLIERS.map((supplier) => (
          <Chip
            key={supplier.id}
            label={supplier.name}
            tone="teal"
            selected={supplierFilter === supplier.id}
            onSelect={() => setSupplierFilter(supplier.id)}
          />
        ))}
      </div>

      <DataTable
        rows={[...filtered]}
        columns={columns}
        getRowId={(part) => part.id}
        density="comfortable"
        caption={`Parts catalogue — ${filtered.length} of ${PARTS.length} lines`}
        kicker="Live stock"
        zebra
        empty="No parts match that search. Try a different SKU, supplier or category."
      />

      <p className={styles.resultCount} aria-live="polite">
        Showing <strong>{filtered.length}</strong> of {PARTS.length} catalogue lines
      </p>

      <p className={styles.srStatus} role="status" aria-live="polite">
        {statusMessage}
      </p>
    </section>
  )
}
