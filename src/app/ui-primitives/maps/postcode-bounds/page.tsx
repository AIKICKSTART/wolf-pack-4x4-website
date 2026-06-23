import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  PostcodeBoundsOverlay,
  StaticMapCanvas,
} from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Postcode bounds | Maps & Location",
  description:
    "Primitive 10 — SVG postcode boundary overlays with label tags.",
}

export default function PostcodeBoundsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Postcode bounds"
        title="Postcode bounds overlay"
        description="SVG polygon overlay representing NSW postcode boundaries with a tag label per polygon. Used on coverage maps to show service boundaries in the Illawarra."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Postcode bounds" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Postcode bounds demo">
        <StaticMapCanvas
          label="Illawarra postcode boundaries"
          tone="dark"
          width={720}
          height={480}
        >
          <PostcodeBoundsOverlay
            groupLabel="Illawarra postcode polygons"
            polygons={[
              {
                postcode: "2527",
                suburb: "Albion Park",
                points: "320,80 460,90 480,180 360,210 300,160",
                labelX: 390,
                labelY: 145,
              },
              {
                postcode: "2529",
                suburb: "Oak Flats",
                points: "200,180 360,210 380,300 220,320 180,260",
                labelX: 280,
                labelY: 250,
              },
              {
                postcode: "2528",
                suburb: "Warilla",
                points: "380,300 540,300 540,400 420,420 380,360",
                labelX: 460,
                labelY: 360,
              },
              {
                postcode: "2533",
                suburb: "Kiama",
                points: "420,420 560,420 600,440 560,460 420,460",
                labelX: 500,
                labelY: 440,
              },
            ]}
          />
        </StaticMapCanvas>

        <div className={styles.stageLegend}>
          <div className={styles.legendItem}>
            <strong>2527 · Albion Park</strong>
            Northern coverage edge
          </div>
          <div className={styles.legendItem}>
            <strong>2529 · Oak Flats</strong>
            Workshop headquarters
          </div>
          <div className={styles.legendItem}>
            <strong>2528 · Warilla</strong>
            Coastal coverage
          </div>
          <div className={styles.legendItem}>
            <strong>2533 · Kiama</strong>
            Southern extended coverage
          </div>
        </div>
      </section>
    </main>
  )
}
