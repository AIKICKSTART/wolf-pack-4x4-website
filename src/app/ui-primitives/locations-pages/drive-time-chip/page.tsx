import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DriveTimeChip } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Drive time chip | Locations & Suburbs",
  description:
    "Primitive 10 — drive-time chip. Composes maps/DistanceDurationChip.",
}

export default function DriveTimeChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Drive time chip"
        title="Drive time chip"
        description="Workshop-to-suburb travel chip composed directly over maps/DistanceDurationChip with a small From-Oak-Flats caption above."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Drive time chip" },
        ]}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <DriveTimeChip minutes={4} distanceKm={1.6} traffic="clear" origin="From Oak Flats · Albion Park Rail" />
        <DriveTimeChip minutes={12} distanceKm={6.4} traffic="moderate" origin="From Oak Flats · Shellharbour" />
        <DriveTimeChip minutes={18} distanceKm={14.6} traffic="moderate" origin="From Oak Flats · Kiama" />
        <DriveTimeChip minutes={28} distanceKm={21.2} traffic="busy" origin="From Oak Flats · Wollongong" />
        <DriveTimeChip minutes={58} distanceKm={58.4} traffic="busy" origin="From Oak Flats · Helensburgh" />
      </div>
    </main>
  )
}
