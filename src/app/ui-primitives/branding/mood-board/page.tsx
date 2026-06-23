import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MoodBoard, type MoodTile } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Mood board | Branding Lab",
  description:
    "Primitive 05 — pinned references, swatches, textures, and type pulled into a deliberate composition.",
}

const TILES: ReadonlyArray<MoodTile> = [
  { id: "hero-image", kind: "image", label: "Bay 04", detail: "Service light · 6500K", span: "wide" },
  { id: "swatch-red", kind: "swatch", label: "Workshop red", detail: "#E62028", background: "#E62028" },
  {
    id: "type-anton",
    kind: "type",
    label: "ANTON",
    detail: "Display headliner",
    span: "square",
  },
  { id: "swatch-amber", kind: "swatch", label: "Service amber", detail: "#FFC14F", background: "#FFC14F" },
  {
    id: "texture-carbon",
    kind: "texture",
    label: "Carbon weave",
    detail: "Surface texture",
    span: "tall",
  },
  { id: "image-pit", kind: "image", label: "Pit lane", detail: "Tooling rack" },
  {
    id: "quote",
    kind: "quote",
    label: '"Built properly. Not pretty — proper."',
    detail: "Workshop manifesto",
    span: "wide",
  },
  { id: "swatch-teal", kind: "swatch", label: "Scan teal", detail: "#40BCFF", background: "#40BCFF" },
  { id: "swatch-ink", kind: "swatch", label: "Stencil ink", detail: "#050508", background: "#050508" },
  { id: "image-decal", kind: "image", label: "Decals", detail: "Van livery" },
  { id: "texture-plate", kind: "texture", label: "Diamond plate", detail: "Floor texture" },
  { id: "swatch-green", kind: "swatch", label: "Telemetry", detail: "#37D67A", background: "#37D67A" },
]

export default function MoodBoardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Mood board"
        title="Mood board"
        description="A pinned composition of references — surfaces, textures, swatches, type, and a manifesto pull-quote. Use it to keep all stakeholders staring at the same north star before diving into specifics."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Mood board" },
        ]}
      />
      <MoodBoard tiles={TILES} />
    </main>
  )
}
