/**
 * Co-located composition pieces for the Parts & inventory screen.
 *
 * Thin presentational wrappers arranging EXISTING primitives plus a little
 * bespoke brand chrome (the Torque command band + the supplier rail). No
 * primitive is modified here — everything is imported and composed.
 *
 * Brand note (dev-only): the assistant brand surfaced to the owner is "Torque".
 */

import { DashboardCard } from "../../components/data-display/dashboard-card"
import { MultiWarehouseSwitcher } from "../../components/inventory/multi-warehouse-switcher"
import { SupplierLinkCard } from "../../components/inventory/supplier-link-card"

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  PARTS_KPIS,
  STOCKTAKE_LABEL,
  SUPPLIERS,
  WAREHOUSES,
} from "./_demo-data"
import styles from "./parts-inventory.module.css"

const DELTA_DIRECTION = {
  up: "up",
  down: "down",
  flat: "flat",
} as const

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
export function TorqueAvatar() {
  return (
    <span
      className={styles.torqueAvatar}
      role="img"
      aria-label="Torque, your Mufflermen business assistant"
    >
      <span aria-hidden="true">T</span>
    </span>
  )
}

/** Hero command band: Torque identity + intro copy + warehouse switcher + KPIs. */
export function CommandBand() {
  return (
    <section className={styles.command} aria-labelledby="parts-command-title">
      <div className={styles.commandMain}>
        <div className={styles.commandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h2 id="parts-command-title" className={styles.commandTitle}>
          The <em>{BUSINESS_NAME}</em> parts wall, counted and current.
        </h2>
        <p className={styles.commandCopy}>
          Every muffler, cat, mandrel bend and chrome tip on the shelf — with live stock, supplier
          lead times and sell prices. Four lines are sitting under their reorder point; I&apos;ve
          flagged them and a reorder is one tap away.
        </p>
        <p className={styles.commandMeta}>
          <span className={styles.metaDot}>{STOCKTAKE_LABEL}</span>
          <span>{BUSINESS_REGION}</span>
        </p>
        <div className={styles.switcher}>
          <MultiWarehouseSwitcher options={WAREHOUSES} defaultWarehouseId="oak-flats" />
        </div>
      </div>

      <div className={styles.kpiGrid} role="group" aria-label="Parts inventory key metrics">
        {PARTS_KPIS.map((kpi) => (
          <DashboardCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            meta={kpi.meta}
            surface="glass"
            delta={{ label: kpi.delta.label, direction: DELTA_DIRECTION[kpi.delta.direction] }}
            className={styles.kpiCard}
          />
        ))}
      </div>
    </section>
  )
}

/** Supplier rail: a SupplierLinkCard per active exhaust-parts supplier. */
export function SupplierRail() {
  return (
    <section className={styles.supplierRail} aria-labelledby="parts-supplier-title">
      <header className={styles.railHead}>
        <span className={styles.catalogueKicker}>Supply chain</span>
        <h2 id="parts-supplier-title" className={styles.railTitle}>
          Who we buy exhaust stock from
        </h2>
      </header>
      <div className={styles.supplierGrid}>
        {SUPPLIERS.map((supplier) => (
          <SupplierLinkCard
            key={supplier.id}
            supplier={supplier.name}
            tagline={supplier.tagline}
            lastPoDate={supplier.lastPoDate}
            leadTimeDays={supplier.leadTimeDays}
            onTimePercent={supplier.onTimePercent}
            outstandingPoCount={supplier.outstandingPoCount}
          />
        ))}
      </div>
    </section>
  )
}
