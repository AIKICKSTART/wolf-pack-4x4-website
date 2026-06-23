import type { Metadata } from "next"

import { ReplayCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { REPLAY_BROADCASTS } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Replay card | Live broadcast",
  description:
    "Primitive 05 — replay tile with poster, chapter list, view count, runtime, and share button.",
}

const REPLAY_NO_CHAPTERS = {
  ...REPLAY_BROADCASTS[2],
  id: "replay-no-chapters",
  chapters: [],
}

export default function ReplayCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Replay card"
        title="Replay card"
        description="Replay tile used in the replays library, video heroes' related strip, and the post-broadcast outro. Chapter list scrolls when more than 6 entries."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Replay card" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Full chapter list · high views</span>
          <ReplayCard replay={REPLAY_BROADCASTS[0]} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Supplier launch replay</span>
          <ReplayCard replay={REPLAY_BROADCASTS[1]} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Replay without chapter markers</span>
          <ReplayCard replay={REPLAY_NO_CHAPTERS} />
        </div>
      </section>
    </main>
  )
}
