import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CoEditConflictBanner } from "../../components/realtime-collab"
import { JORDAN, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Co-edit conflict banner | UI Primitives - Realtime collab",
}

export default function CoEditConflictBannerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 09"
        title="Co-edit conflict banner"
        description="Red alert banner shown when two collaborators edited the same field at the same time — side-by-side my-version vs their-version, with keep / override / merge CTAs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Co-edit conflict banner" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Sophie and you conflicted on parts line 5</span>
          <div className={styles.demoStack}>
            <CoEditConflictBanner
              fieldLabel="Parts line 5 · Magnaflow muffler"
              myValue="Magnaflow 14816 - $284.90"
              otherUser={SOPHIE}
              otherValue="Magnaflow 14816 - $279.50 (workshop preferred rate)"
              conflictAt="Conflicted 4s ago"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Jordan and you conflicted on labour rate</span>
          <div className={styles.demoStack}>
            <CoEditConflictBanner
              fieldLabel="Labour line 3 · Hourly rate"
              myValue="$148.00 / hr"
              otherUser={JORDAN}
              otherValue="$155.00 / hr"
              conflictAt="Conflicted just now"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Banner is <code>role=&quot;alert&quot;</code> so it announces
            immediately on first render. Both versions are shown verbatim so the
            viewer can see exactly what diverged. Keep-mine / keep-theirs are
            tone-coded teal vs amber; merge opens a compare view via the red
            footer button.
          </p>
        </div>
      </section>
    </main>
  )
}
