import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MediaTray } from "../../components/data-display"
import type { MediaTrayItem } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Media tray | UI Primitives — Data display",
}

const partsTray: ReadonlyArray<MediaTrayItem> = [
  { id: "m-1", title: "Magnaflow 14816 oval", meta: "2.5in · stainless", tag: "In stock", placeholder: "MUFFLER" },
  { id: "m-2", title: "XForce twin-cone resonator", meta: "3in · T304", tag: "Bestseller", placeholder: "RESONATOR" },
  { id: "m-3", title: "Redback 3-into-1 header", meta: "LS · 1.75in primaries", tag: "Backorder", placeholder: "HEADER" },
  { id: "m-4", title: "Pacemaker extractors PH4-04", meta: "Falcon BA · ceramic", tag: "Featured", placeholder: "EXTRACTORS" },
  { id: "m-5", title: "Hush Power oval HP3000", meta: "OEM replacement", placeholder: "OVAL MUFFLER" },
  { id: "m-6", title: "Stainless lab custom bend", meta: "Mandrel · 3in", tag: "Custom", placeholder: "MANDREL BEND" },
  { id: "m-7", title: "Genie cat-back system", meta: "Hilux N80 · 2.5in", placeholder: "CAT-BACK" },
]

const galleryTray: ReadonlyArray<MediaTrayItem> = [
  { id: "g-1", title: "Bay 2 · stainless full system", meta: "Mustang GT 2024", placeholder: "BAY 2" },
  { id: "g-2", title: "Bay 1 · cat swap", meta: "Hilux 2.8 turbo diesel", placeholder: "BAY 1" },
  { id: "g-3", title: "Workshop yard · ute fleet", meta: "Six-truck commercial pickup", placeholder: "YARD" },
  { id: "g-4", title: "Bay 3 · EGT harness pull", meta: "Patrol GU IV", placeholder: "BAY 3" },
  { id: "g-5", title: "Reception · loaner fleet", meta: "Mazda3 · Hyundai i30", placeholder: "RECEPTION" },
]

export default function MediaTrayShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.11 / Data display"
        title="Media tray — horizontal figure scroller"
        description="Snap-scrolling tray of figures with hover scale on the media tile and figcaption metadata underneath. Use it for product carousels, gallery rails, supplier shots."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Media tray" },
        ]}
      />
      <section className={styles.canvas}>
        <MediaTray
          title="Parts catalogue · highlights"
          kicker="7 SKUs"
          items={partsTray}
        />
        <MediaTray
          title="Workshop gallery"
          kicker="5 photos"
          items={galleryTray}
        />
      </section>
    </main>
  )
}
