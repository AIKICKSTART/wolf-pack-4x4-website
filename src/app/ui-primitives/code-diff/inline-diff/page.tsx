import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InlineDiff } from "../../components/code-diff"
import type { DiffLine } from "../../components/code-diff"
import styles from "../code-diff.module.css"

export const metadata: Metadata = {
  title: "Inline diff | UI Primitives — Code diff",
}

const BAY_SYNC_LINES: ReadonlyArray<DiffLine> = [
  { kind: "context", oldLineNumber: 40, newLineNumber: 40, text: "subscription.on('bay.availability', (payload) => {" },
  { kind: "removed", oldLineNumber: 41, text: "  cache.set(payload.bayId, payload.slots)" },
  { kind: "added", newLineNumber: 41, text: "  const next = mergeSlots(cache.get(payload.bayId), payload.slots)" },
  { kind: "added", newLineNumber: 42, text: "  cache.set(payload.bayId, next)" },
  { kind: "added", newLineNumber: 43, text: "  notifyListeners(payload.bayId, next)" },
  { kind: "context", oldLineNumber: 42, newLineNumber: 44, text: "})" },
  { kind: "context", oldLineNumber: 43, newLineNumber: 45, text: "" },
  { kind: "removed", oldLineNumber: 44, text: "subscription.on('bay.closed', (bayId) => cache.delete(bayId))" },
  { kind: "added", newLineNumber: 46, text: "subscription.on('bay.closed', (bayId) => {" },
  { kind: "added", newLineNumber: 47, text: "  cache.delete(bayId)" },
  { kind: "added", newLineNumber: 48, text: "  notifyListeners(bayId, [])" },
  { kind: "added", newLineNumber: 49, text: "})" },
]

export default function InlineDiffPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 03"
        title="Inline diff"
        description="Single-column unified diff — the default GitHub-style review surface. Tuned for the realtime bay-availability sync fix."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Code diff", href: "/ui-primitives/code-diff" },
          { label: "Inline diff" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>services/realtime/bay-availability.ts · hotfix/bay-availability-sync</span>
          <InlineDiff
            filePath="services/realtime/bay-availability.ts"
            commitRef="3f1b09a"
            lines={BAY_SYNC_LINES}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Compact — both line-number gutters render in the same column. Use this for narrow
            layouts where the side-by-side variant would wrap. Tone treatments are identical to the
            hunk primitive: green for adds, red for removes, teal for meta lines.
          </p>
        </div>
      </section>
    </main>
  )
}
