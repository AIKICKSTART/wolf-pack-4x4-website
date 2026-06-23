import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AwarenessStrip } from "../../components/collab-deep"

import { AWARENESS_ENTRIES } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Awareness strip | Collab deep",
  description:
    "Primitive 06 — live 'who's looking at what' strip with focus dots and per-collaborator focus + duration.",
}

export default function AwarenessStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Awareness"
        title="Awareness strip"
        description="Strip showing every present collaborator with their current focus and a soft blinking focus dot. Reuses the collab-deep tone palette."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Awareness strip" },
        ]}
      />

      <section className={styles.stageFrame}>
        <AwarenessStrip
          entries={AWARENESS_ENTRIES}
          caption="Live focus · Falcon parts page"
        />
        <AwarenessStrip
          entries={AWARENESS_ENTRIES.slice(0, 3)}
          caption="Compact · 3 collaborators"
        />
      </section>
    </main>
  )
}
