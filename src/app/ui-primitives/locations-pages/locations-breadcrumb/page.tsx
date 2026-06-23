import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LocationsBreadcrumb } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Locations breadcrumb | Locations & Suburbs",
  description:
    "Primitive 11 — locations breadcrumb. Composes primitives/Breadcrumb with state badge.",
}

export default function LocationsBreadcrumbPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Locations breadcrumb"
        title="Locations breadcrumb"
        description="Composes primitives/Breadcrumb with the locations trail plus a trailing state badge so the geographic context stays visible."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Locations breadcrumb" },
        ]}
      />

      <span className={styles.stageCaption}>Suburb · Albion Park Rail NSW</span>
      <LocationsBreadcrumb
        suburbName="Albion Park Rail"
        suburbHref="/locations/albion-park-rail"
        state="NSW"
      />

      <span className={styles.stageCaption}>Suburb · Wollongong NSW</span>
      <LocationsBreadcrumb
        suburbName="Wollongong"
        suburbHref="/locations/wollongong"
        state="NSW"
      />

      <span className={styles.stageCaption}>Suburb + service · Kiama / Performance exhausts</span>
      <LocationsBreadcrumb
        suburbName="Kiama"
        suburbHref="/locations/kiama"
        state="NSW"
        service={{ label: "Performance exhausts", href: "/locations/kiama/performance-exhausts" }}
      />
    </main>
  )
}
