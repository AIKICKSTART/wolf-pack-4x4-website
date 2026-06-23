import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BackorderPreorderChip,
  InventoryAnalyticsTile,
  LowStockAlertBanner,
  MultiWarehouseSwitcher,
  PickListRow,
  ReceiveShipmentScanner,
  ReorderThresholdChip,
  SkuDetailCard,
  StockLevelMeter,
  StockTakeGrid,
  SupplierLinkCard,
  VarianceReportRow,
  WarehouseLocationGrid,
} from "../../components/inventory"

import {
  AISLES,
  BACKORDER_CHIPS,
  PICK_ROWS,
  RECEIVE_EXPECTED,
  RECEIVE_SCANNED,
  SKU_DETAIL,
  STOCK_TAKE,
  STOCK_TAKE_INITIAL,
  SUPPLIER_CARDS,
  TURNOVER_TREND,
  VARIANCE_ROWS,
  WAREHOUSE_OPTIONS,
} from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Full warehouse console | Inventory",
  description:
    "Bonus composition — full Oak Flats warehouse console wiring switcher, alert banner, analytics tiles, location grid, stock level meter, SKU detail, supplier links, pick list rows, receive scanner, stock take grid and variance rows together.",
}

export default function FullWarehousePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full warehouse console"
        description="A composed warehouse-management screen — every inventory primitive wired together with realistic Oak Flats fixtures so you can see them stack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Full warehouse" },
        ]}
      />

      <div className={styles.fullGrid}>
        <div className={styles.fullTopBar}>
          <MultiWarehouseSwitcher options={WAREHOUSE_OPTIONS} />
          <ReorderThresholdChip
            threshold={4}
            leadTimeDays={10}
            supplier="Manta Performance"
          />
        </div>

        <LowStockAlertBanner
          belowReorderCount={9}
          href="/ui-primitives/inventory/full-warehouse"
          raisePoHref="/ui-primitives/inventory/supplier-link-card"
          body="Manta cutoff 09:00 · Pacemaker cutoff 13:00 today"
          suppressHours={4}
        />

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Analytics · per warehouse</span>
          <div className={styles.stageRow}>
            <InventoryAnalyticsTile
              scopeLabel="Oak Flats (HQ)"
              turnoverRate={6.4}
              daysOfStock={57}
              carryingCost={18_400}
              turnoverTrend={TURNOVER_TREND}
              turnoverDeltaPct={4.2}
            />
            <InventoryAnalyticsTile
              scopeLabel="Albion Park"
              turnoverRate={4.8}
              daysOfStock={76}
              carryingCost={9_650}
              turnoverTrend={[3.4, 3.6, 3.9, 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8]}
              turnoverDeltaPct={2.1}
            />
            <InventoryAnalyticsTile
              scopeLabel="Sydney Depot"
              turnoverRate={5.6}
              daysOfStock={65}
              carryingCost={14_200}
              turnoverTrend={[6.4, 6.2, 6.0, 5.9, 5.8, 5.7, 5.6, 5.6, 5.5, 5.6, 5.6, 5.6]}
              turnoverDeltaPct={-1.4}
            />
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Floor map · live density</span>
          <WarehouseLocationGrid
            warehouseName="Oak Flats (HQ)"
            aisles={AISLES}
            activeBin="A3-B2"
          />
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Focus SKU</span>
            <SkuDetailCard {...SKU_DETAIL} />
            <StockLevelMeter
              kicker={SKU_DETAIL.sku}
              label={SKU_DETAIL.title}
              current={SKU_DETAIL.stockOnHand}
              capacity={24}
              reorderPoint={SKU_DETAIL.reorderPoint}
            />
            <div className={styles.stageRow}>
              {BACKORDER_CHIPS.map((chip, idx) => (
                <BackorderPreorderChip key={`${chip.kind}-${idx}`} {...chip} />
              ))}
            </div>
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Supplier window</span>
            {SUPPLIER_CARDS.map((card) => (
              <SupplierLinkCard key={card.supplier} {...card} />
            ))}
          </section>
        </div>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Active pick list</span>
            <table className={styles.pickTable} aria-label="Active pick list">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Bin</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {PICK_ROWS.map((row) => (
                  <PickListRow key={row.sku} {...row} />
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Dock · receive</span>
            <ReceiveShipmentScanner
              poRef="PO-2026-0481"
              supplier="Manta Performance"
              expected={RECEIVE_EXPECTED}
              scanned={RECEIVE_SCANNED}
            />
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Cycle count · Q2 2026</span>
          <StockTakeGrid
            sessionLabel="Oak Flats · Q2 2026 cycle count"
            lines={STOCK_TAKE}
            initialCounts={STOCK_TAKE_INITIAL}
          />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Variance triage</span>
          <div className={styles.varianceStack}>
            {VARIANCE_ROWS.map((row) => (
              <VarianceReportRow key={row.sku} {...row} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
