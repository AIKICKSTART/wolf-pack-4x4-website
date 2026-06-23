import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceRadiusChip } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Service radius chip | Locations & Suburbs",
  description:
    "Primitive 04 — service-radius chip with a mini map. Composes StaticMapCanvas + ServiceRadiusOverlay.",
}

export default function ServiceRadiusChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Service radius chip"
        title="Service radius chip"
        description="Mini-map chip composed from StaticMapCanvas + ServiceRadiusOverlay. The amber dot inside the ring tracks the suburb's distance from the workshop."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Service radius chip" },
        ]}
      />

      <span className={styles.stageCaption}>Band · Core (Albion Park Rail · 1.6 km)</span>
      <ServiceRadiusChip radiusKm={5} band="core" suburbDistanceKm={1.6} />

      <span className={styles.stageCaption}>Band · Near (Shellharbour · 4.2 km)</span>
      <ServiceRadiusChip radiusKm={15} band="near" suburbDistanceKm={4.2} />

      <span className={styles.stageCaption}>Band · Regional (Wollongong · 21 km)</span>
      <ServiceRadiusChip radiusKm={35} band="regional" suburbDistanceKm={21} />

      <span className={styles.stageCaption}>Band · Extended (Berry · 58 km)</span>
      <ServiceRadiusChip radiusKm={80} band="extended" suburbDistanceKm={58} />

      <span className={styles.stageCaption}>Band · Service (Bowral · 110 km)</span>
      <ServiceRadiusChip radiusKm={150} band="service" suburbDistanceKm={110} />
    </main>
  )
}
