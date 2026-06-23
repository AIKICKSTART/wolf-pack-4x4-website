import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  RoutePreviewLine,
  StaticMapCanvas,
} from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Route preview | Maps & Location",
  description:
    "Primitive 05 — SVG route line with animated dash plus a floating distance + ETA chip.",
}

export default function RoutePreviewPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Route preview"
        title="Route preview line"
        description="Quadratic-bezier SVG path between two pins with an animated dash and a chip showing live distance and ETA. Useful for handover pages and job-dispatch surfaces."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Route preview" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Route preview demo">
        <StaticMapCanvas
          label="Oak Flats to Wollongong delivery route"
          tone="dark"
          width={720}
          height={480}
        >
          <RoutePreviewLine
            from={{ x: 280, y: 320, label: "Oak Flats workshop" }}
            to={{ x: 540, y: 140, label: "Wollongong depot" }}
            distance="18.4 km"
            eta="22 min"
            curvature={0.28}
          />
          <RoutePreviewLine
            from={{ x: 280, y: 320, label: "Oak Flats workshop" }}
            to={{ x: 160, y: 420, label: "Kiama drop-off" }}
            distance="11.2 km"
            eta="14 min"
            curvature={-0.2}
          />
        </StaticMapCanvas>

        <div className={styles.stageLegend}>
          <div className={styles.legendItem}>
            <strong>Route A</strong>
            Oak Flats → Wollongong · 18.4 km
          </div>
          <div className={styles.legendItem}>
            <strong>Route B</strong>
            Oak Flats → Kiama · 11.2 km
          </div>
        </div>
      </section>
    </main>
  )
}
