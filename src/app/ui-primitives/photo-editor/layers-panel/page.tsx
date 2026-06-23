import type { Metadata } from "next"

import { LayersPanel } from "../../components/photo-editor"
import type { PhotoLayer } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Layers panel | Photo editor",
  description:
    "Primitive 03 — right layers panel with visibility, lock, mask and opacity per layer plus a blend bar for the selected layer. Layers reflect the Hilux dyno run grade stack.",
}

const HILUX_LAYERS: ReadonlyArray<PhotoLayer> = [
  {
    id: "txt-headline",
    name: "Dyno run · 412 kW headline",
    kind: "text",
    visible: true,
    locked: false,
    opacity: 1,
    blend: "normal",
  },
  {
    id: "adj-curves",
    name: "Workshop steel curve",
    kind: "adjustment",
    visible: true,
    locked: false,
    opacity: 0.78,
    blend: "soft-light",
    maskLabel: "Mid-tones",
  },
  {
    id: "shape-pill",
    name: "Number pill backing",
    kind: "shape",
    visible: true,
    locked: false,
    opacity: 0.84,
    blend: "multiply",
  },
  {
    id: "grp-grade",
    name: "Grade group",
    kind: "group",
    visible: true,
    locked: true,
    opacity: 1,
    blend: "normal",
  },
  {
    id: "adj-levels",
    name: "Levels · shadows clamp",
    kind: "adjustment",
    visible: true,
    locked: false,
    opacity: 0.62,
    blend: "normal",
    maskLabel: "Bonnet",
    depth: 1,
  },
  {
    id: "adj-saturation",
    name: "Selective amber boost",
    kind: "adjustment",
    visible: true,
    locked: false,
    opacity: 0.46,
    blend: "overlay",
    maskLabel: "Tailpipe",
    depth: 1,
  },
  {
    id: "img-base",
    name: "Hilux dyno · raw .CR3",
    kind: "image",
    visible: true,
    locked: true,
    opacity: 1,
    blend: "normal",
  },
]

const BAY_LAYERS: ReadonlyArray<PhotoLayer> = [
  {
    id: "fx-grain",
    name: "Film grain · 6%",
    kind: "adjustment",
    visible: false,
    locked: false,
    opacity: 0.06,
    blend: "screen",
  },
  {
    id: "mask-hoist",
    name: "Hoist + roller door mask",
    kind: "mask",
    visible: true,
    locked: false,
    opacity: 1,
    blend: "normal",
    maskLabel: "Hoist",
  },
  {
    id: "img-base",
    name: "Bay 2 hero · .CR3",
    kind: "image",
    visible: true,
    locked: false,
    opacity: 1,
    blend: "normal",
  },
]

export default function LayersPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Layers panel"
        title="Layers panel"
        description="Layers list with visibility, lock, mask and opacity per row, plus a top blend bar showing the selected layer's blend mode and overall opacity. Footer holds FX, Mask, Group, + Layer and Delete actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Layers panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · 7-layer grade stack · workshop steel</span>
        <div className={styles.demoInline}>
          <LayersPanel
            layers={HILUX_LAYERS}
            selectedLayerId="adj-curves"
            selectedBlend="soft-light"
            selectedOpacity={0.78}
          />
          <LayersPanel
            layers={BAY_LAYERS}
            selectedLayerId="mask-hoist"
            selectedBlend="normal"
            selectedOpacity={1}
          />
        </div>
      </section>
    </main>
  )
}
