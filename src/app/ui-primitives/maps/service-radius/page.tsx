import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ServiceRadiusOverlay,
  StaticMapCanvas,
} from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Service radius | Maps & Location",
  description:
    "Primitive 03 — concentric service-radius rings centered on the Oak Flats workshop.",
}

export default function ServiceRadiusPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Service radius"
        title="Service radius overlay"
        description="Concentric rings centered on the Oak Flats workshop — 5 km, 10 km, 25 km coverage tiers. Drawn as an SVG group inside the StaticMapCanvas."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Service radius" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Service radius demo">
        <StaticMapCanvas
          label="Oak Flats service radius — 5 / 10 / 25 km"
          tone="dark"
          width={720}
          height={480}
        >
          <ServiceRadiusOverlay
            cx={300}
            cy={260}
            rings={[
              { radius: 60, label: "5 km" },
              { radius: 120, label: "10 km" },
              { radius: 200, label: "25 km" },
            ]}
            groupLabel="Service radius rings — 5km, 10km, 25km"
          />
        </StaticMapCanvas>

        <div className={styles.stageLegend}>
          <div className={styles.legendItem}>
            <strong>5 km · Local</strong>
            Same-day fitment guaranteed
          </div>
          <div className={styles.legendItem}>
            <strong>10 km · Standard</strong>
            Booking within 24 hours
          </div>
          <div className={styles.legendItem}>
            <strong>25 km · Extended</strong>
            Booking within 48 hours
          </div>
        </div>
      </section>
    </main>
  )
}
