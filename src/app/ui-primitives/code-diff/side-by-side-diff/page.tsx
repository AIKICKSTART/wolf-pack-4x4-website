import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SideBySideDiff } from "../../components/code-diff"
import type { DiffLine } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Side-by-side diff | UI Primitives — Code diff",
}

const CATALOGUE_LINES: ReadonlyArray<DiffLine> = [
  { kind: "context", oldLineNumber: 12, newLineNumber: 12, text: "import { PartsList } from './parts-list'" },
  { kind: "removed", oldLineNumber: 13, text: "import { ThumbnailGrid } from './thumbnail-grid'" },
  { kind: "added", newLineNumber: 13, text: "import { PartsViewer3D } from './parts-viewer-3d'" },
  { kind: "added", newLineNumber: 14, text: "import { useReducedMotion } from '../hooks/use-reduced-motion'" },
  { kind: "context", oldLineNumber: 14, newLineNumber: 15, text: "" },
  { kind: "context", oldLineNumber: 15, newLineNumber: 16, text: "export function PartsCatalogue() {" },
  { kind: "removed", oldLineNumber: 16, text: "  return <ThumbnailGrid items={parts} />" },
  { kind: "added", newLineNumber: 17, text: "  const reducedMotion = useReducedMotion()" },
  { kind: "added", newLineNumber: 18, text: "  if (reducedMotion) {" },
  { kind: "added", newLineNumber: 19, text: "    return <PartsList items={parts} />" },
  { kind: "added", newLineNumber: 20, text: "  }" },
  { kind: "added", newLineNumber: 21, text: "  return <PartsViewer3D items={parts} />" },
  { kind: "context", oldLineNumber: 17, newLineNumber: 22, text: "}" },
]

export default function SideBySideDiffPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 02"
        title="Side-by-side diff"
        description="Two-column unified diff for parts catalogue rebuild — old version left, new version right, paired removals + additions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Side-by-side diff" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>apps/parts/catalogue.tsx · main vs feature/parts-3d-viewer</span>
          <SideBySideDiff
            filePath="apps/parts/catalogue.tsx"
            oldLabel="main"
            newLabel="feature/parts-3d-viewer"
            oldRef="a92f4c1"
            newRef="d6e0b88"
            lines={CATALOGUE_LINES}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Lines pair up: each removed line on the left gets a matching added line on the right
            when possible. Unmatched rows render an empty cell on the opposite side so the line
            numbers stay aligned. Both columns scroll in sync because the rows are part of a single
            grid.
          </p>
        </div>
      </section>
    </main>
  )
}
