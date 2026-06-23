import type { Metadata } from "next"

import {
  FileTypeIcon,
  type FileKind,
} from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File type icon | File Browser",
  description:
    "Primitive 12 — single component rendering twelve hand-drawn SVG file-type icons.",
}

interface IconSpec {
  kind: FileKind
  label: string
  ext: string
}

const ICONS: ReadonlyArray<IconSpec> = [
  { kind: "image", label: "Image", ext: ".jpg .png .avif" },
  { kind: "video", label: "Video", ext: ".mp4 .mov .webm" },
  { kind: "audio", label: "Audio", ext: ".wav .mp3 .flac" },
  { kind: "pdf", label: "PDF", ext: ".pdf" },
  { kind: "doc", label: "Document", ext: ".doc .docx .md" },
  { kind: "sheet", label: "Spreadsheet", ext: ".xls .xlsx .csv" },
  { kind: "slide", label: "Slides", ext: ".ppt .pptx .key" },
  { kind: "archive", label: "Archive", ext: ".zip .tar .gz" },
  { kind: "code", label: "Code", ext: ".ts .py .svg" },
  { kind: "3d-model", label: "3D model", ext: ".glb .obj .fbx" },
  { kind: "cad", label: "CAD", ext: ".dwg .step .iges" },
  { kind: "generic", label: "Generic", ext: ".dat .bin .file" },
]

export default function FileTypeIconScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Icons"
        title="File type icon"
        description="One component, twelve hand-drawn glyphs. Switches on the file kind prop and accepts an optional extension label rendered inside the generic body. No external icon library."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "File type icon" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All twelve kinds</span>
        <ul
          className={styles.iconGallery}
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {ICONS.map((icon) => (
            <li key={icon.kind} className={styles.iconTile}>
              <FileTypeIcon kind={icon.kind} size="lg" />
              <span className={styles.iconTileLabel}>{icon.label}</span>
              <span className={styles.iconTileExt}>{icon.ext}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
