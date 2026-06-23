import type { Metadata } from "next"

import { ColorSwatchLibrary } from "../../components/photo-editor"
import type { SwatchEntry } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Color swatch library | Photo editor",
  description:
    "Primitive 13 — saved swatch library with an extracted palette stripe and an ASE export action. Swatches reflect the Mufflermen workshop brand kit.",
}

const WORKSHOP_LIBRARY: ReadonlyArray<SwatchEntry> = [
  { id: "workshop-red", hex: "#e62028", name: "Workshop red" },
  { id: "amber-spark", hex: "#ffc14f", name: "Amber spark" },
  { id: "dyno-teal", hex: "#40bcff", name: "Dyno teal" },
  { id: "weld-glow", hex: "#ff8a3d", name: "Weld glow" },
  { id: "bay-steel", hex: "#5d6573", name: "Bay steel" },
  { id: "tarmac-black", hex: "#0b0c12", name: "Tarmac black" },
  { id: "muffler-bronze", hex: "#8e6437", name: "Muffler bronze" },
  { id: "exhaust-chrome", hex: "#cfd5e0", name: "Exhaust chrome" },
  { id: "warning-yellow", hex: "#f5cb33", name: "Warning yellow" },
  { id: "manta-mint", hex: "#37d67a", name: "Manta mint" },
]

const HILUX_PALETTE = [
  { hex: "#0b0c12", weight: 0.34 },
  { hex: "#1a1f2b", weight: 0.22 },
  { hex: "#ffc14f", weight: 0.18 },
  { hex: "#a85020", weight: 0.16 },
  { hex: "#cfd5e0", weight: 0.1 },
]

const MANTA_PALETTE = [
  { hex: "#08090c", weight: 0.4 },
  { hex: "#3b414d", weight: 0.24 },
  { hex: "#cfd5e0", weight: 0.18 },
  { hex: "#ff8a3d", weight: 0.12 },
  { hex: "#40bcff", weight: 0.06 },
]

export default function ColorSwatchesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Swatch library"
        title="Color swatch library"
        description="Saved swatches grid with name + hex per cell. Header keeps tally counts. An extracted palette stripe surfaces the dominant tones from the active document, with cell widths weighted by relative coverage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Swatch library" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop kit · Hilux dyno run palette extract · workshop red active</span>
        <ColorSwatchLibrary
          library={WORKSHOP_LIBRARY}
          extracted={HILUX_PALETTE}
          activeId="workshop-red"
          sourceLabel="hilux-dyno-run.psd"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop kit · Manta exhaust closeup palette extract · weld glow active</span>
        <ColorSwatchLibrary
          library={WORKSHOP_LIBRARY}
          extracted={MANTA_PALETTE}
          activeId="weld-glow"
          sourceLabel="manta-exhaust-closeup.psd"
        />
      </section>
    </main>
  )
}
