import type { Metadata } from "next"

import { SelectionMarquee } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Selection marquee | Photo editor",
  description:
    "Primitive 09 — marquee selection rectangle with marching ant animation, corner handles and a boolean mode row (New / Add / Subtract / Intersect).",
}

export default function SelectionMarqueeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Selection marquee"
        title="Selection marquee"
        description="Ant-march animation handled by paired pseudo-elements on top, bottom and sides so the dashes scroll independently. Boolean mode row selects how the new marquee combines with the existing selection. Reduced-motion stops the dashes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Selection marquee" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux bonnet selection · 1280×860 px · new</span>
        <SelectionMarquee
          rect={{ xPx: 480, yPx: 360, widthPx: 2240, heightPx: 1180 }}
          canvasWidthPx={3840}
          canvasHeightPx={2160}
          surfaceLabel="Hilux dyno run"
          mode="new"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta tailpipe · 720×620 px · add to selection</span>
        <SelectionMarquee
          rect={{ xPx: 980, yPx: 560, widthPx: 720, heightPx: 620 }}
          canvasWidthPx={2400}
          canvasHeightPx={1600}
          surfaceLabel="Manta exhaust closeup"
          mode="add"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · cone-light cutout · intersect</span>
        <SelectionMarquee
          rect={{ xPx: 1860, yPx: 720, widthPx: 1240, heightPx: 980 }}
          canvasWidthPx={5120}
          canvasHeightPx={2880}
          surfaceLabel="Bay 2 hero"
          mode="intersect"
        />
      </section>
    </main>
  )
}
