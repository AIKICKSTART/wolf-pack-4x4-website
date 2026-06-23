import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PatternLibraryTile, type PatternId } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Pattern library | Branding Lab",
  description:
    "Primitive 13 — SVG repeating patterns with name and usage notes (carbon fibre, diamond plate, herringbone, dots, hatch, brushed metal).",
}

interface PatternEntry {
  pattern: PatternId
  name: string
  usage: string
}

const PATTERNS: ReadonlyArray<PatternEntry> = [
  {
    pattern: "carbon-fibre",
    name: "Carbon fibre",
    usage: "High-performance product surfaces. Use sparingly — easy to overcook.",
  },
  {
    pattern: "diamond-plate",
    name: "Diamond plate",
    usage: "Workshop floor backdrops and industrial overlays. Hold opacity under 35%.",
  },
  {
    pattern: "herringbone",
    name: "Herringbone",
    usage: "Marketing accents — backgrounds for stat-counter sections and editorial spreads.",
  },
  {
    pattern: "dots",
    name: "Telemetry dots",
    usage: "Data visualisation backgrounds. Pairs with the diagnostic teal swatch.",
  },
  {
    pattern: "hatch",
    name: "Service hatch",
    usage: "Cross-hatch tied to the service amber — reserve for callouts and hot tips.",
  },
  {
    pattern: "brushed-metal",
    name: "Brushed metal",
    usage: "Chrome surfaces — toolbars, badges, and finished-product hero shots.",
  },
]

export default function PatternLibraryTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Pattern library"
        title="Pattern library tile"
        description="Six repeating SVG patterns make up the texture system — carbon fibre, diamond plate, herringbone, dots, hatch, brushed metal. Each tile carries usage rules so the textures stay disciplined."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Pattern library" },
        ]}
      />
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}
      >
        {PATTERNS.map((entry) => (
          <PatternLibraryTile
            key={entry.pattern}
            pattern={entry.pattern}
            name={entry.name}
            usage={entry.usage}
          />
        ))}
      </section>
    </main>
  )
}
