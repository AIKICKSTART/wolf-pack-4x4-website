import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AbcAnalysisTile,
  BatchTrackingRow,
  BinMapGrid,
  CycleCountRow,
  ObsoleteStockCard,
  PickwaveCard,
  PurchaseOrderLineRow,
  ReorderPointCard,
  SafetyStockGauge,
  SlowMoverCard,
  StockMovementTimeline,
  StocktakeSessionCard,
  SupplierLeadTimeRow,
  TransferOrderRow,
} from "../../components/inventory-deep"

import {
  ABC_BANDS,
  BATCHES,
  BAYS,
  BIN_CELLS,
  CYCLE_COUNTS,
  MOVEMENTS,
  OBSOLETE_CARDS,
  PICKWAVES,
  PO_LINES,
  REORDER_CARDS,
  ROWS,
  SAFETY_GAUGES,
  SLOW_MOVERS,
  STOCKTAKE_ACTIVE,
  SUPPLIER_LEAD_ROWS,
  TRANSFERS,
} from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Full warehouse cockpit | Inventory deep",
  description:
    "Bonus composition — full Oak Flats warehouse cockpit wiring stocktake, bin map, transfers, reorder cards, safety gauges, supplier rows, ABC bands, cycle counts, slow movers, obsolete cards, stock movements, PO lines and pickwaves.",
}

export default function FullWarehousePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full warehouse cockpit"
        description="A composed warehouse-operations cockpit — every inventory-deep primitive wired together with realistic Oak Flats fixtures so you can see the pack as a complete surface."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Full warehouse cockpit" },
        ]}
      />

      <div className={styles.fullGrid}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Live cycle count · Q2 2026</span>
          <StocktakeSessionCard {...STOCKTAKE_ACTIVE} />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Floor map · live fill density</span>
          <BinMapGrid
            warehouseName="Oak Flats HQ"
            cells={BIN_CELLS}
            bays={[...BAYS]}
            rows={ROWS}
            activeCellId="A3"
          />
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>ABC analysis</span>
          <AbcAnalysisTile scopeLabel="Oak Flats HQ" bands={ABC_BANDS} />
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Reorder watchlist</span>
            <div className={styles.stack}>
              {REORDER_CARDS.map((card) => (
                <ReorderPointCard key={card.sku} {...card} />
              ))}
            </div>
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Safety stock gauges</span>
            <div className={styles.stack}>
              {SAFETY_GAUGES.map((gauge) => (
                <SafetyStockGauge key={gauge.sku} {...gauge} size="md" />
              ))}
            </div>
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Active transfers</span>
          <div className={styles.stack}>
            {TRANSFERS.map((row) => (
              <TransferOrderRow key={row.transferRef} {...row} />
            ))}
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Active pickwaves</span>
          <div className={styles.stageRow}>
            {PICKWAVES.map((wave) => (
              <PickwaveCard key={wave.sequence} {...wave} />
            ))}
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>PO receive queue</span>
          <div className={styles.stack}>
            {PO_LINES.map((line) => (
              <PurchaseOrderLineRow key={line.sku} {...line} />
            ))}
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Cycle count triage</span>
          <table className={styles.cycleTable}>
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Expected</th>
                <th scope="col">Counted</th>
                <th scope="col">Variance</th>
                <th scope="col">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {CYCLE_COUNTS.map((row) => (
                <CycleCountRow key={row.sku} {...row} />
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Supplier scorecard</span>
          <div className={styles.stack}>
            {SUPPLIER_LEAD_ROWS.map((row) => (
              <SupplierLeadTimeRow key={row.supplier} {...row} />
            ))}
          </div>
        </section>

        <div className={styles.stageColumns}>
          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Slow movers</span>
            <div className={styles.stack}>
              {SLOW_MOVERS.map((card) => (
                <SlowMoverCard key={card.sku} {...card} />
              ))}
            </div>
          </section>

          <section className={styles.stageFrame}>
            <span className={styles.stageCaption}>Obsolete disposal</span>
            <div className={styles.stack}>
              {OBSOLETE_CARDS.map((card) => (
                <ObsoleteStockCard key={card.sku} {...card} />
              ))}
            </div>
          </section>
        </div>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Batch / lot tracker</span>
          <div className={styles.stack}>
            {BATCHES.map((row) => (
              <BatchTrackingRow key={row.batchId} {...row} />
            ))}
          </div>
        </section>

        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>MB-3-90 · stock movement timeline</span>
          <StockMovementTimeline sku="MB-3-90" entries={MOVEMENTS} />
        </section>
      </div>
    </main>
  )
}
