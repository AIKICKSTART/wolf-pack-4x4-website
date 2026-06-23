import type { Metadata } from "next"

import { HistoryPanel } from "../../components/photo-editor"
import type { HistoryStep } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "History panel | Photo editor",
  description:
    "Primitive 10 — edit history list for the Hilux dyno run grade pass, with a thumbnail per step, a current-marker outline and a jump-back action per step.",
}

const HILUX_HISTORY: ReadonlyArray<HistoryStep> = [
  { index: 0, action: "open", label: "Open hilux-dyno-run.CR3", timestamp: "08:42:01" },
  { index: 1, action: "crop", label: "Crop · 16:9 hero", timestamp: "08:42:46" },
  { index: 2, action: "levels", label: "Levels · shadows clamp", timestamp: "08:43:18" },
  { index: 3, action: "curves", label: "Curves · S-curve contrast", timestamp: "08:43:52" },
  { index: 4, action: "filter", label: "Filter · Workshop @ 78%", timestamp: "08:44:21" },
  { index: 5, action: "mask", label: "Mask · selective amber boost", timestamp: "08:45:02" },
  { index: 6, action: "text", label: "Text · 412 kW headline", timestamp: "08:46:18" },
  { index: 7, action: "transform", label: "Transform · text bottom-left", timestamp: "08:46:46" },
  { index: 8, action: "export", label: "Export · WebP @ 2400 px", timestamp: "08:47:34" },
]

const MANTA_HISTORY: ReadonlyArray<HistoryStep> = [
  { index: 0, action: "open", label: "Open manta-closeup.CR3", timestamp: "09:12:04" },
  { index: 1, action: "crop", label: "Crop · 4:5 portrait", timestamp: "09:12:33" },
  { index: 2, action: "clone", label: "Clone · scuff on pipe", timestamp: "09:13:21" },
  { index: 3, action: "filter", label: "Filter · High contrast @ 62%", timestamp: "09:13:58" },
  { index: 4, action: "mask", label: "Mask · weld highlight", timestamp: "09:14:32" },
]

export default function HistoryPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / History panel"
        title="History panel"
        description="History rows pair an index chip, a tiny snapshot thumbnail and an action label. The current step is teal-outlined; future steps dim 0.46 to communicate redo-available. Jump-back lands as a small chip beside the action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "History panel" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · 9-step grade pass · current at step 5</span>
        <div className={styles.demoInline}>
          <HistoryPanel steps={HILUX_HISTORY} currentIndex={5} />
          <HistoryPanel steps={MANTA_HISTORY} currentIndex={3} />
        </div>
      </section>
    </main>
  )
}
