import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AreaCoverageMapMini,
  AreaHubHero,
  AreaServicesGrid,
  AreaStatsTrio,
  AreaSuburbListCard,
} from "../../components/services-areas-pages"
import {
  DEMO_AREA_SERVICES,
  DEMO_AREA_STATS,
  DEMO_AREA_SUBURBS,
  DEMO_WORKSHOPS_PINS,
} from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Full area hub composition | Services & areas | UI Primitives",
  description:
    "End-to-end area hub composition — hub hero, mini coverage map, stats trio, services grid, and suburb list.",
}

export default function FullAreaPageScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Full composition"
        title="Full area hub page"
        description="A full regional area-hub page wired from the area primitives. Hub hero → mini coverage map → stats trio → services grid → suburb list card, mirroring the live regional-hub anatomy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Full area hub page" },
        ]}
      />
      <div style={{ display: "grid", gap: 18 }}>
        <AreaHubHero
          region="illawarra"
          copy="Illawarra coverage spans Oak Flats, Albion Park, Shellharbour, Wollongong, Dapto, Kiama, and Helensburgh — same-day repair work and longer custom-exhaust builds out of the Albion Park Rail workshop."
          suburbsCount={DEMO_AREA_SUBURBS.length * 8}
          workshopsCount={1}
          primaryCta={{ label: "Book a slot", href: "#book" }}
          secondaryCta={{ label: "Get a quote", href: "#quote" }}
        />
        <AreaCoverageMapMini
          title="Illawarra coverage"
          workshops={DEMO_WORKSHOPS_PINS}
          density="high"
          scaleLabel="20 km radius"
        />
        <AreaStatsTrio stats={DEMO_AREA_STATS} />
        <AreaServicesGrid
          title="Services available in Illawarra"
          body="Every service runs out of the Albion Park Rail workshop, with mobile-fit runs for outer suburbs where the job allows."
          services={DEMO_AREA_SERVICES}
        />
        <AreaSuburbListCard title="Illawarra suburbs" suburbs={DEMO_AREA_SUBURBS} />
      </div>
    </main>
  )
}
