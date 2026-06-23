import type { Metadata } from "next"

import { MaskThumbnailRow } from "../../components/photo-editor"
import type { MaskThumbnail } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Mask thumbnails | Photo editor",
  description:
    "Primitive 14 — horizontal row of mask thumbnails per layer with region tag, density chip and an inverted tag when applicable. Examples reflect the Hilux dyno run grade stack.",
}

const HILUX_MASKS: ReadonlyArray<MaskThumbnail> = [
  {
    layerId: "mask-bonnet",
    layerName: "Bonnet · highlights",
    region: "Bonnet",
    density: 0.78,
  },
  {
    layerId: "mask-tailpipe",
    layerName: "Tailpipe · amber boost",
    region: "Tailpipe",
    density: 0.92,
  },
  {
    layerId: "mask-grille",
    layerName: "Grille shadow lift",
    region: "Grille",
    density: 0.46,
  },
  {
    layerId: "mask-sky-inv",
    layerName: "Sky · invert mask",
    region: "Sky",
    density: 0.62,
    inverted: true,
  },
  {
    layerId: "mask-dyno-rollers",
    layerName: "Dyno rollers · darken",
    region: "Rollers",
    density: 0.34,
  },
]

const BAY_MASKS: ReadonlyArray<MaskThumbnail> = [
  {
    layerId: "mask-hoist",
    layerName: "Hoist · cool tint",
    region: "Hoist",
    density: 0.56,
  },
  {
    layerId: "mask-roller-door",
    layerName: "Roller door · contrast",
    region: "Door",
    density: 0.82,
  },
  {
    layerId: "mask-floor",
    layerName: "Floor reflection",
    region: "Floor",
    density: 0.24,
  },
  {
    layerId: "mask-rim-light",
    layerName: "Rim light · invert",
    region: "Rim",
    density: 0.72,
    inverted: true,
  },
]

export default function MaskThumbnailsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Mask thumbnails"
        title="Mask thumbnail row"
        description="A horizontal scroll row of mask thumbs — one per layer. Each thumb hashes the layer id into a deterministic centre offset so the radial gradient feels placed against the underlying composition. Density and region chips give a glanceable summary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Mask thumbnails" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · five-mask grade stack · tailpipe active</span>
        <MaskThumbnailRow thumbs={HILUX_MASKS} activeLayerId="mask-tailpipe" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · four-mask grade stack · roller door active</span>
        <MaskThumbnailRow thumbs={BAY_MASKS} activeLayerId="mask-roller-door" />
      </section>
    </main>
  )
}
