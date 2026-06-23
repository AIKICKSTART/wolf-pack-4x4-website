import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierBadge } from "../../components/parts-pages"

import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Supplier badge | Parts pages",
  description: "Primitive 09 — Inline supplier badge with official brand logos, verified chip, and warranty chip.",
}

export default function SupplierBadgePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Supplier badge"
        title="Supplier badge"
        description="Brand badge using official supplier logo assets for stocked parts brands. Verified + warranty chips compose the primitives/Chip primitive, with a plain No official logo fallback only when a supplier is not in the source-backed manifest."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Supplier badge" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>All six tones, inline variant</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--primitive-space-3)" }}>
          <SupplierBadge name="Manta" tone="manta" code="MPI" verified warranty="Lifetime mufflers" />
          <SupplierBadge name="Redback" tone="redback" code="RBK" verified />
          <SupplierBadge name="XForce" tone="xforce" code="XFR" verified warranty="3yr workmanship" />
          <SupplierBadge name="Pacemaker" tone="pacemaker" code="PMR" verified />
          <SupplierBadge name="Lukey" tone="lukey" code="LKY" verified warranty="Sound-tested" />
          <SupplierBadge name="Workshop part" tone="neutral" code="OFM" />
        </div>
      </div>

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Stacked variant — card-friendly</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--primitive-space-3)", maxWidth: 720 }}>
          <SupplierBadge name="Manta" tone="manta" variant="stacked" verified warranty="Lifetime mufflers" />
          <SupplierBadge name="XForce" tone="xforce" variant="stacked" verified warranty="3yr workmanship" />
          <SupplierBadge name="Pacemaker" tone="pacemaker" variant="stacked" verified />
        </div>
      </div>

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Expanded exhaust brand coverage</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--primitive-space-3)" }}>
          <SupplierBadge name="Silverback Armour" tone="neutral" code="SBA" verified />
          <SupplierBadge name="Flowtech Advantage" tone="neutral" code="FTA" verified />
          <SupplierBadge name="Blue Diamond" tone="neutral" code="BD" verified />
          <SupplierBadge name="Mission Euro" tone="neutral" code="ME" verified />
          <SupplierBadge name="UltiBend" tone="neutral" code="UB" verified />
          <SupplierBadge name="Xtraseal" tone="neutral" code="XTS" verified />
          <SupplierBadge name="Torctite Clamps" tone="neutral" code="TOR" verified />
          <SupplierBadge name="RoadBase" tone="neutral" code="RB" verified />
          <SupplierBadge name="DINEX" tone="neutral" code="DNX" verified />
          <SupplierBadge name="Wombat" tone="neutral" code="WBT" verified />
          <SupplierBadge name="UFI Filters" tone="neutral" code="UFI" verified />
          <SupplierBadge name="Diode Dynamics" tone="neutral" code="DD" verified />
          <SupplierBadge name="Brink" tone="neutral" code="BRK" verified />
          <SupplierBadge name="KC HiLiTES" tone="neutral" code="KC" verified />
        </div>
      </div>
    </main>
  )
}
