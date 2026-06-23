import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RegionHeatmap, type HeatmapCell } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Region heatmap | Maps & Location",
  description:
    "Primitive 06 — hex-bin region heatmap with hover tooltips for Illawarra service performance.",
}

const SUBURBS: ReadonlyArray<{ col: number; row: number; label: string; bookings: number }> = [
  { col: 2, row: 2, label: "Wollongong CBD", bookings: 184 },
  { col: 3, row: 3, label: "Figtree", bookings: 142 },
  { col: 4, row: 2, label: "Dapto", bookings: 168 },
  { col: 5, row: 3, label: "Albion Park", bookings: 212 },
  { col: 6, row: 4, label: "Oak Flats", bookings: 268 },
  { col: 7, row: 4, label: "Shellharbour", bookings: 198 },
  { col: 8, row: 5, label: "Warilla", bookings: 156 },
  { col: 9, row: 6, label: "Kiama", bookings: 122 },
  { col: 5, row: 5, label: "Lake Illawarra", bookings: 96 },
  { col: 4, row: 4, label: "Yallah", bookings: 78 },
  { col: 6, row: 6, label: "Minnamurra", bookings: 64 },
  { col: 3, row: 5, label: "Unanderra", bookings: 88 },
  { col: 7, row: 6, label: "Shell Cove", bookings: 134 },
  { col: 8, row: 4, label: "Mount Warrigal", bookings: 102 },
  { col: 9, row: 4, label: "Barrack Heights", bookings: 86 },
]

const MAX = SUBURBS.reduce((m, s) => Math.max(m, s.bookings), 1)

const CELLS: ReadonlyArray<HeatmapCell> = SUBURBS.map((s) => ({
  col: s.col,
  row: s.row,
  intensity: s.bookings / MAX,
  label: s.label,
  detail: `${s.bookings} bookings · last 30 days`,
}))

export default function RegionHeatmapPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Region heatmap"
        title="Region heatmap"
        description="Hex-bin grid overlay with red-intensity tones for region performance. Hover or tab through a hex to reveal a tooltip — Oak Flats is the hottest cell."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Region heatmap" },
        ]}
      />
      <RegionHeatmap
        cells={CELLS}
        cols={15}
        rows={10}
        groupLabel="Illawarra booking heatmap — last 30 days"
      />
    </main>
  )
}
