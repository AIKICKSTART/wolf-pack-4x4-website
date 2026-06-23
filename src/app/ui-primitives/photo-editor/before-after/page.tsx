import type { Metadata } from "next"

import { BeforeAfterSlider } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Before / after slider | Photo editor",
  description:
    "Primitive 12 — before / after split slider with a draggable centre divider, labelled chips on both sides and a split-position chip in the header.",
}

export default function BeforeAfterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Before / After"
        title="Before / after split slider"
        description="Centre divider drives a clip-path on the After layer so dragging reveals the underlying Before. Header shows the percent edited; range row in the foot duplicates the divider position as a slider semantic for assistive tech."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Before / After" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · Raw .CR3 → Workshop steel grade · 56% reveal</span>
        <BeforeAfterSlider
          source={{
            beforeLabel: "Raw .CR3",
            afterLabel: "Workshop steel grade",
            splitT: 0.56,
          }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta exhaust closeup · pre-clone → spot heal · 78% reveal</span>
        <BeforeAfterSlider
          source={{
            beforeLabel: "Pre-clone scuff",
            afterLabel: "Spot heal",
            splitT: 0.78,
          }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · daytime ambient → workshop steel night · 32%</span>
        <BeforeAfterSlider
          source={{
            beforeLabel: "Day ambient",
            afterLabel: "Night Steel",
            splitT: 0.32,
          }}
        />
      </section>
    </main>
  )
}
