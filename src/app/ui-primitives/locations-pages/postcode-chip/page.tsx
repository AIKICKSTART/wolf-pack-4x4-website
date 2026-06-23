import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PostcodeChip } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Postcode chip | Locations & Suburbs",
  description:
    "Primitive 05 — postcode chip with popover. Composes primitives/Chip + primitives/Popover.",
}

export default function PostcodeChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Postcode chip"
        title="Postcode chip"
        description="Amber Chip + Popover combo — hover or focus the chip and the state + LGA pop into view."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Postcode chip" },
        ]}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <PostcodeChip postcode="2527" state="NSW" lga="Shellharbour City" ariaSuburbLabel="Albion Park Rail" />
        <PostcodeChip postcode="2528" state="NSW" lga="Shellharbour City" ariaSuburbLabel="Warilla" />
        <PostcodeChip postcode="2529" state="NSW" lga="Shellharbour City" ariaSuburbLabel="Oak Flats" />
        <PostcodeChip postcode="2530" state="NSW" lga="Wollongong" ariaSuburbLabel="Dapto" />
        <PostcodeChip postcode="2533" state="NSW" lga="Municipality of Kiama" ariaSuburbLabel="Kiama" />
        <PostcodeChip postcode="2500" state="NSW" lga="Wollongong" ariaSuburbLabel="Wollongong" />
      </div>
    </main>
  )
}
