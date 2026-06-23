import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommitPulseStrip } from "../../components/collab-deep"

import { COMMIT_EVENTS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Commit pulse strip | Collab deep",
  description:
    "Primitive 12 — horizontal strip of recent saves with a pulsing dot on the latest write.",
}

export default function CommitPulseStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Saves"
        title="Commit pulse strip"
        description="Horizontal strip of recent commits / saves on the doc. The latest event gets a pulsing radial ring; each event is tinted to the author's collab tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Commit pulse strip" },
        ]}
      />

      <section className={styles.stageFrame}>
        <CommitPulseStrip
          events={COMMIT_EVENTS}
          caption="Falcon parts page · last 5m"
          totalLabel="5 saves · last 5m"
        />
      </section>
    </main>
  )
}
