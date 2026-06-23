import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NearbyWorkshopsList } from "../../components/locations-pages"

import { NEARBY_WORKSHOPS } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Nearby workshops list | Locations & Suburbs",
  description:
    "Primitive 03 — workshops near the focal suburb. Composes maps/WorkshopLocator.",
}

export default function NearbyWorkshopsListPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Nearby workshops"
        title="Nearby workshops list"
        description="Composes maps/WorkshopLocator with status-driven pin tones plus a chip row of primary services per workshop."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Nearby workshops list" },
        ]}
      />

      <NearbyWorkshopsList
        heading="Workshops near Albion Park Rail"
        caption="Three Mufflermen bays inside the Illawarra service footprint."
        workshops={NEARBY_WORKSHOPS}
      />
    </main>
  )
}
