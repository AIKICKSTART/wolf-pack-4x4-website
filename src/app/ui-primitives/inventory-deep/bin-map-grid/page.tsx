import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BinMapGrid } from "../../components/inventory-deep"

import { BAYS, BIN_CELLS, ROWS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Bin map grid | Inventory deep",
  description:
    "Primitive 02 — warehouse bay × row visual map with density tone coding and click-to-detail cells.",
}

export default function BinMapGridPage() {
  const denseSubset = BIN_CELLS.filter(
    (c) =>
      c.coord.bay === "A" ||
      c.coord.bay === "B" ||
      c.coord.bay === "C",
  )
  const fullBays = [...BAYS]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Bin map"
        title="Bin map grid"
        description="Bay × row warehouse map — density tone-codes capped, dense, active, light, empty, reserved and blocked cells. Click-to-detail interaction surfaces the live SKU primary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Bin map grid" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Full warehouse · 7 bays × 12 rows</span>
        <BinMapGrid
          warehouseName="Oak Flats HQ"
          cells={BIN_CELLS}
          bays={fullBays}
          rows={ROWS}
          activeCellId="A3"
        />

        <span className={styles.stageCaption}>Active subset · Bays A–C</span>
        <BinMapGrid
          warehouseName="Bays A–C · Manta + Pacemaker + X-Force"
          cells={denseSubset}
          bays={["A", "B", "C"]}
          rows={8}
        />

        <span className={styles.stageCaption}>Empty bay · dispatch staging</span>
        <BinMapGrid
          warehouseName="Bay G · Dispatch staging"
          cells={BIN_CELLS.filter((c) => c.coord.bay === "G")}
          bays={["G"]}
          rows={ROWS}
        />
      </section>
    </main>
  )
}
