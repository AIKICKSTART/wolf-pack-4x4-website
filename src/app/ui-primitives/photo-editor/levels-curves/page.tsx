import type { Metadata } from "next"

import { LevelsCurvesEditor } from "../../components/photo-editor"
import type { HistogramBuckets } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Levels & curves | Photo editor",
  description:
    "Primitive 06 — combined levels and curves editor with a 64-bucket histogram, black/mid/white markers and an S-curve anchor stack.",
}

function buildHistogram(seed: number, length: number): HistogramBuckets {
  return Array.from({ length }, (_, index) => {
    const phase = (index + seed) / length
    const main = Math.sin(phase * Math.PI) * 0.6
    const tail = Math.sin(phase * Math.PI * 3 + seed) * 0.2
    const blacks = phase < 0.2 ? 0.36 - phase * 1.4 : 0
    return Math.max(0, main + tail + blacks)
  })
}

const HILUX_HISTOGRAM = buildHistogram(1.4, 64)
const MANTA_HISTOGRAM = buildHistogram(2.6, 64)

export default function LevelsCurvesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Levels & curves"
        title="Levels & curves editor"
        description="Histogram beneath both editor modes — Levels surfaces three sliders (black / gamma / white) plus axis markers; Curves overlays an S-curve with five anchor handles and a diagonal reference line. Sliders track the gamma readout in real units."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Levels & curves" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · levels mode · clipped shadows</span>
        <LevelsCurvesEditor
          mode="levels"
          histogram={HILUX_HISTOGRAM}
          levels={{ black: 0.08, mid: 0.52, white: 0.94 }}
          curve={[
            { t: 0, v: 0 },
            { t: 0.25, v: 0.18 },
            { t: 0.5, v: 0.52 },
            { t: 0.75, v: 0.78 },
            { t: 1, v: 1 },
          ]}
          title="Workshop steel · levels"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta exhaust closeup · curves mode · contrast S</span>
        <LevelsCurvesEditor
          mode="curves"
          histogram={MANTA_HISTOGRAM}
          levels={{ black: 0.14, mid: 0.46, white: 0.86 }}
          curve={[
            { t: 0, v: 0 },
            { t: 0.22, v: 0.1 },
            { t: 0.5, v: 0.52 },
            { t: 0.78, v: 0.9 },
            { t: 1, v: 1 },
          ]}
          title="Manta closeup · curve"
        />
      </section>
    </main>
  )
}
