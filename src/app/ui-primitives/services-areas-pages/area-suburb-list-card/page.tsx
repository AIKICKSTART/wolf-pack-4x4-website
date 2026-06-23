import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AreaSuburbListCard } from "../../components/services-areas-pages"
import { DEMO_AREA_SUBURBS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Area suburb list card | Services & areas | UI Primitives",
  description:
    "Suburb list card with postcode chip, drive-time chip, and services-count per row.",
}

export default function AreaSuburbListCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14"
        title="Area suburb list card"
        description="Listing card of suburbs within an area. Net-new layout for the area→suburb composition — each row carries a postcode chip, the maps DistanceDurationChip primitive for drive time, and a services-count chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Area suburb list card" },
        ]}
      />
      <AreaSuburbListCard title="Illawarra suburbs" suburbs={DEMO_AREA_SUBURBS} />
    </main>
  )
}
