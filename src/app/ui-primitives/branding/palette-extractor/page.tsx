import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PaletteExtractor, type PaletteSource } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Palette extractor | Branding Lab",
  description:
    "Primitive 03 — pulls a five-colour palette from a source frame. Each swatch shows hex and semantic role.",
}

const SOURCES: ReadonlyArray<PaletteSource> = [
  {
    id: "workshop-floor",
    label: "Workshop floor",
    description: "Bay 04 — exhaust line under amber service lighting and chrome reflections.",
    gradient:
      "radial-gradient(circle at 22% 18%, #ffc14f 0%, transparent 38%), radial-gradient(circle at 78% 82%, #e62028 0%, transparent 48%), linear-gradient(135deg, #1c1c25 0%, #0a0a10 100%)",
    samples: [
      { id: "amber", name: "Service amber", hex: "#FFC14F", role: "Accent" },
      { id: "red", name: "Workshop red", hex: "#E62028", role: "Primary" },
      { id: "graphite", name: "Bay graphite", hex: "#1B1C25", role: "Surface" },
      { id: "chrome", name: "Chrome mist", hex: "#9AA3AD", role: "Muted" },
      { id: "ink", name: "Stencil ink", hex: "#050508", role: "Base" },
    ],
  },
  {
    id: "diagnostic-bay",
    label: "Diagnostic bay",
    description: "Telemetry monitors, blue scan light, and ESD floor mats.",
    gradient:
      "radial-gradient(circle at 18% 22%, #40bcff 0%, transparent 44%), radial-gradient(circle at 82% 78%, #37d67a 0%, transparent 42%), linear-gradient(135deg, #05080f 0%, #0e1320 100%)",
    samples: [
      { id: "teal", name: "Scan teal", hex: "#40BCFF", role: "Accent" },
      { id: "green", name: "Telemetry green", hex: "#37D67A", role: "Success" },
      { id: "navy", name: "Diagnostic navy", hex: "#0E1320", role: "Surface" },
      { id: "mist", name: "Scope mist", hex: "#8EA0B5", role: "Muted" },
      { id: "ink", name: "Console ink", hex: "#04060B", role: "Base" },
    ],
  },
  {
    id: "evening-yard",
    label: "Evening yard",
    description: "Sunset over the yard fence, fluorescents kicking on inside the shop.",
    gradient:
      "linear-gradient(160deg, #ff8b32 0%, #e62028 40%, #2a1c2e 72%, #0a0a10 100%)",
    samples: [
      { id: "ember", name: "Yard ember", hex: "#FF8B32", role: "Accent" },
      { id: "red", name: "Sunset red", hex: "#E62028", role: "Primary" },
      { id: "violet", name: "Dusk violet", hex: "#2A1C2E", role: "Surface" },
      { id: "smoke", name: "Smoke", hex: "#5C5765", role: "Muted" },
      { id: "ink", name: "Night ink", hex: "#0A0A10", role: "Base" },
    ],
  },
]

export default function PaletteExtractorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Palette extractor"
        title="Palette extractor"
        description="Choose a source frame. Five representative colours are surfaced as swatch + hex + semantic role chip. Use it during identity work to anchor palette decisions in real imagery."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Palette extractor" },
        ]}
      />
      <PaletteExtractor sources={SOURCES} />
    </main>
  )
}
