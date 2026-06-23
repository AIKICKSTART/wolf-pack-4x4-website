import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbFinderCard, type SuburbEntry } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Suburb finder | Maps & Location",
  description:
    "Primitive 07 — suburb finder card with postcode input, locate-me CTA, and Illawarra suburb suggestions.",
}

const SUBURBS: ReadonlyArray<SuburbEntry> = [
  { name: "Albion Park", postcode: "2527", distance: 3.2 },
  { name: "Oak Flats", postcode: "2529", distance: 0.4 },
  { name: "Shellharbour", postcode: "2529", distance: 4.8 },
  { name: "Warilla", postcode: "2528", distance: 6.6 },
  { name: "Dapto", postcode: "2530", distance: 12.4 },
  { name: "Kiama", postcode: "2533", distance: 18.2 },
  { name: "Wollongong", postcode: "2500", distance: 22.5 },
  { name: "Figtree", postcode: "2525", distance: 24.2 },
  { name: "Helensburgh", postcode: "2508", distance: 58.4 },
]

export default function SuburbFinderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Suburb finder"
        title="Suburb finder card"
        description="Compact card with postcode/suburb search and a Locate-me CTA. Auto-suggests matches against the configured suburb list — falls back to the top five when empty."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Suburb finder" },
        ]}
      />
      <section className={styles.stageFrame} aria-label="Suburb finder demo">
        <SuburbFinderCard suburbs={SUBURBS} />
      </section>
    </main>
  )
}
