import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsCatalogCard } from "../../components/workshop-scenes/parts-catalog-card"
import type { PartsCatalogCardProps } from "../../components/workshop-scenes/parts-catalog-card"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Parts catalog | UI Primitives — Workshop Scenes",
}

const parts: ReadonlyArray<PartsCatalogCardProps> = [
  {
    sku: "MAN-MK24-405",
    title: "Manta 3in stainless cat-back",
    supplier: "Manta",
    fitment: "Patrol Y62 5.6L V8",
    rrp: 1729.0,
    stockState: "in-stock",
  },
  {
    sku: "XFC-PX3-MAN",
    title: "XForce twin-tip mid-muffler",
    supplier: "XForce",
    fitment: "Ranger PX3 3.2L diesel",
    rrp: 689.5,
    stockState: "low",
  },
  {
    sku: "PAC-LC79-HDR",
    title: "Pacemaker 5-into-1 headers",
    supplier: "Pacemaker",
    fitment: "Land Cruiser 79 V8",
    rrp: 2185.0,
    stockState: "back-order",
  },
  {
    sku: "REDB-N80-DPF",
    title: "Redback DPF-back 3in mandrel",
    supplier: "Redback",
    fitment: "Hilux N80 GUN126R",
    rrp: 1295.0,
    stockState: "in-stock",
  },
  {
    sku: "MAG-VE-405",
    title: "Magnaflow MFG-405 cat-back",
    supplier: "Magnaflow",
    fitment: "VE Commodore SS",
    rrp: 1489.0,
    stockState: "in-stock",
  },
  {
    sku: "DI-MX5-NB",
    title: "Di Filippo single-out 2.25in",
    supplier: "Di Filippo",
    fitment: "MX-5 NB SE",
    rrp: 765.0,
    stockState: "special",
  },
  {
    sku: "WIG-BT50-MUF",
    title: "Wigwam mid-mount muffler",
    supplier: "Wigwam",
    fitment: "BT-50 UR 3.2L",
    rrp: 412.0,
    stockState: "low",
  },
  {
    sku: "BST-NP300-2X",
    title: "Beast twin 2.5in tip kit",
    supplier: "Beast",
    fitment: "Navara NP300",
    rrp: 528.0,
    stockState: "in-stock",
  },
]

export default function PartsCatalogScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.01 / Workshop scenes"
        title="Parts catalog card"
        description="Catalog tile primitive in its native habitat — supplier, fitment, stock state, and quote CTA all clearly readable in the dim of the workshop counter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Parts catalog" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {parts.map((part) => (
            <PartsCatalogCard key={part.sku} {...part} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Stock-state tones map directly to ordering posture: green for
            in-stock, amber when we are running low, red on back-order, teal for
            special-order one-offs. The Add to quote CTA bridges into the
            quote-builder workspace primitive.
          </p>
        </div>
      </section>
    </main>
  )
}
