import type { Metadata } from "next"

import {
  BeforeAfterSlider,
  BrushSettings,
  ColorSwatchLibrary,
  CropOverlay,
  ExportOptionsCard,
  FilterPresetsGrid,
  HistoryPanel,
  ImageCanvas,
  LayersPanel,
  LevelsCurvesEditor,
  MaskThumbnailRow,
  SelectionMarquee,
  TextToolOverlay,
  ToolPalette,
} from "../../components/photo-editor"
import type {
  HistogramBuckets,
  HistoryStep,
  MaskThumbnail,
  PhotoLayer,
  SwatchEntry,
} from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Full photo editor | Photo editor",
  description:
    "Composition — Mufflermen workshop photo intake editor for the Hilux dyno run, Manta exhaust closeup and Bay 2 hero. Composes all 14 primitives into a working editor shell.",
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
    depth: 1,
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
    id: "adj-amber",
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

const HILUX_MASKS: ReadonlyArray<MaskThumbnail> = [
  { layerId: "adj-curves", layerName: "Curve mid-tones", region: "Mids", density: 0.62 },
  { layerId: "adj-levels", layerName: "Levels bonnet clamp", region: "Bonnet", density: 0.78 },
  { layerId: "adj-amber", layerName: "Tailpipe amber boost", region: "Tailpipe", density: 0.92 },
  { layerId: "shape-pill", layerName: "Headline pill backing", region: "Pill", density: 0.84 },
  { layerId: "sky-invert", layerName: "Sky · invert mask", region: "Sky", density: 0.46, inverted: true },
]

const HILUX_HISTORY: ReadonlyArray<HistoryStep> = [
  { index: 0, action: "open", label: "Open hilux-dyno-run.CR3", timestamp: "08:42:01" },
  { index: 1, action: "crop", label: "Crop · 16:9 hero", timestamp: "08:42:46" },
  { index: 2, action: "levels", label: "Levels · shadows clamp", timestamp: "08:43:18" },
  { index: 3, action: "curves", label: "Curves · S-curve contrast", timestamp: "08:43:52" },
  { index: 4, action: "filter", label: "Filter · Workshop @ 78%", timestamp: "08:44:21" },
  { index: 5, action: "mask", label: "Mask · selective amber boost", timestamp: "08:45:02" },
  { index: 6, action: "text", label: "Text · 412 kW headline", timestamp: "08:46:18" },
  { index: 7, action: "transform", label: "Transform · text bottom-left", timestamp: "08:46:46" },
]

const WORKSHOP_LIBRARY: ReadonlyArray<SwatchEntry> = [
  { id: "workshop-red", hex: "#e62028", name: "Workshop red" },
  { id: "amber-spark", hex: "#ffc14f", name: "Amber spark" },
  { id: "dyno-teal", hex: "#40bcff", name: "Dyno teal" },
  { id: "weld-glow", hex: "#ff8a3d", name: "Weld glow" },
  { id: "bay-steel", hex: "#5d6573", name: "Bay steel" },
  { id: "tarmac-black", hex: "#0b0c12", name: "Tarmac black" },
  { id: "muffler-bronze", hex: "#8e6437", name: "Muffler bronze" },
  { id: "exhaust-chrome", hex: "#cfd5e0", name: "Exhaust chrome" },
]

const HILUX_PALETTE = [
  { hex: "#0b0c12", weight: 0.34 },
  { hex: "#1a1f2b", weight: 0.22 },
  { hex: "#ffc14f", weight: 0.18 },
  { hex: "#a85020", weight: 0.16 },
  { hex: "#cfd5e0", weight: 0.1 },
]

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

export default function FullPhotoEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full photo editor"
        title="Hilux dyno run · workshop photo intake"
        description="All 14 photo-editor primitives composed into a Photoshop-lite shell — tool palette on the left, image canvas centred with active selection marquee and text overlay, layers + history on the right, mask thumbnails strip beneath the canvas, levels/curves + filter presets + brush settings + crop overlay + before/after slider + swatch library + export card stacked in working order."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Full editor" },
        ]}
      />

      <section className={styles.compositionLayout}>
        <ToolPalette activeTool="brush" foregroundHex="#ffc14f" backgroundHex="#0b0c12" />

        <div className={styles.compositionMain}>
          <ImageCanvas
            name="hilux-dyno-run.psd"
            size={{ widthPx: 3840, heightPx: 2160 }}
            zoom={1}
            cursorXPx={1840}
            cursorYPx={1024}
            cursorMode="crosshair"
          />
          <MaskThumbnailRow thumbs={HILUX_MASKS} activeLayerId="adj-amber" />
          <SelectionMarquee
            rect={{ xPx: 480, yPx: 360, widthPx: 2240, heightPx: 1180 }}
            canvasWidthPx={3840}
            canvasHeightPx={2160}
            surfaceLabel="Hilux dyno run"
            mode="add"
          />
        </div>

        <aside className={styles.compositionAside}>
          <LayersPanel
            layers={HILUX_LAYERS}
            selectedLayerId="adj-curves"
            selectedBlend="soft-light"
            selectedOpacity={0.78}
          />
          <HistoryPanel steps={HILUX_HISTORY} currentIndex={6} />
        </aside>
      </section>

      <section className={styles.compositionFooter}>
        <LevelsCurvesEditor
          mode="curves"
          histogram={HILUX_HISTOGRAM}
          levels={{ black: 0.08, mid: 0.52, white: 0.94 }}
          curve={[
            { t: 0, v: 0 },
            { t: 0.25, v: 0.18 },
            { t: 0.5, v: 0.52 },
            { t: 0.75, v: 0.78 },
            { t: 1, v: 1 },
          ]}
          title="Workshop steel · curves"
        />
        <FilterPresetsGrid activeId="workshop" sourceLabel="Hilux dyno" strength={0.78} />
      </section>

      <section className={styles.compositionFooter}>
        <BrushSettings state={{ sizePx: 96, hardness: 0.3, flow: 0.64, hex: "#ffc14f" }} />
        <CropOverlay ratioId="16:9" widthPx={3840} heightPx={2160} />
      </section>

      <section className={styles.compositionFooter}>
        <TextToolOverlay
          state={{
            text: "412 kW",
            fontFamily: "Inter, sans-serif",
            sizePx: 88,
            weight: 800,
            hex: "#ffc14f",
            letterSpacing: 0.02,
          }}
          surfaceLabel="Hilux dyno run"
        />
        <BeforeAfterSlider
          source={{
            beforeLabel: "Raw .CR3",
            afterLabel: "Workshop steel",
            splitT: 0.56,
          }}
        />
      </section>

      <section className={styles.compositionFooter}>
        <ColorSwatchLibrary
          library={WORKSHOP_LIBRARY}
          extracted={HILUX_PALETTE}
          activeId="amber-spark"
          sourceLabel="hilux-dyno-run.psd"
        />
        <ExportOptionsCard
          state={{ format: "webp", quality: 0.84, longEdgePx: 2400 }}
          estimatedSizeLabel="384 KB"
          documentName="hilux-dyno-run.webp"
        />
      </section>
    </main>
  )
}
