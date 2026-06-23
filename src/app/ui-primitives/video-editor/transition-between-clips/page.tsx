import type { Metadata } from "next"

import { TransitionBetweenClips } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Transition between clips | Video editor",
  description:
    "Primitive 09 — transition primitive placed between two adjacent clips. Cut / cross-fade / dissolve / wipe with a duration chip.",
}

export default function TransitionBetweenClipsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Transition between clips"
        title="Transition between clips"
        description="A transition primitive that sits between two adjacent clips. Variants: cut, cross-fade, dissolve, wipe — each with a glyph and duration chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Transition between clips" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All four kinds · default duration chip</span>
        <div className={styles.miniRow}>
          <TransitionBetweenClips kind="cut" durationSec={0} />
          <TransitionBetweenClips kind="cross-fade" durationSec={0.5} />
          <TransitionBetweenClips kind="dissolve" durationSec={0.8} />
          <TransitionBetweenClips kind="wipe" durationSec={1.2} />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Selected · with sub-labels for workshop edit</span>
        <div className={styles.miniRow}>
          <TransitionBetweenClips
            kind="cross-fade"
            durationSec={0.5}
            selected
            label="Hilux → Tear down"
          />
          <TransitionBetweenClips
            kind="dissolve"
            durationSec={0.7}
            label="Manta fit → Dyno"
          />
          <TransitionBetweenClips
            kind="cut"
            durationSec={0}
            label="Dyno → Owner reaction"
          />
        </div>
      </section>
    </main>
  )
}
