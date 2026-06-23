import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StaticMapCanvas, type StaticMapTone } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Static map canvas | Maps & Location",
  description:
    "Primitive 01 — hand-drawn SVG map canvas with four tonal variants for the Oak Flats workshop design system.",
}

interface ToneSample {
  tone: StaticMapTone
  label: string
  copy: string
}

const TONES: ReadonlyArray<ToneSample> = [
  { tone: "dark", label: "Dark", copy: "Default obsidian — for app shells and workshop dashboards." },
  { tone: "midnight", label: "Midnight", copy: "Cooler blue cast for live operations and dispatch maps." },
  { tone: "amber", label: "Amber", copy: "Warm tone for after-hours emergency routing surfaces." },
  { tone: "teal", label: "Teal", copy: "Brand teal accent for marketing & coverage pages." },
]

export default function StaticMapPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Static map canvas"
        title="Static map canvas"
        description="Base layer for every other map primitive — hand-drawn SVG landmass, harbour notch, road arteries, soft vignette, and a compass. Four tonal variants tuned for the Mufflermen palette."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Static map" },
        ]}
      />

      <div className={styles.stage}>
        {TONES.map((sample) => (
          <section
            key={sample.tone}
            className={styles.stageFrame}
            aria-label={`Static map canvas — ${sample.label} tone`}
          >
            <header className={styles.stageLegend}>
              <div className={styles.legendItem}>
                <strong>{sample.label}</strong>
                {sample.copy}
              </div>
            </header>
            <StaticMapCanvas
              tone={sample.tone}
              label={`${sample.label} canvas — Illawarra coastline`}
            />
          </section>
        ))}
      </div>
    </main>
  )
}
