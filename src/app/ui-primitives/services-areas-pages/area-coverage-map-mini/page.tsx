import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AreaCoverageMapMini } from "../../components/services-areas-pages"
import { DEMO_WORKSHOPS_PINS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Area coverage map mini | Services & areas | UI Primitives",
  description:
    "Mini coverage map for an area — hand-drawn region outline with workshop pins and scale chip.",
}

export default function AreaCoverageMapMiniScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10"
        title="Area coverage map mini"
        description="Mini coverage map rendered on the area-hub page. Composes the maps StaticMapCanvas (hand-drawn Illawarra-style region outline) and the MapPin primitive for each workshop. The only adapter concern is the scale chip overlay and the density-to-tone mapping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Area coverage map mini" },
        ]}
      />
      <AreaCoverageMapMini
        title="Illawarra coverage"
        workshops={DEMO_WORKSHOPS_PINS}
        density="high"
        scaleLabel="20 km radius"
      />
    </main>
  )
}
