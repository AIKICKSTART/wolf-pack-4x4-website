import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReadReceiptTrail } from "../../components/realtime-collab"
import type { CollabReadReceipt } from "../../components/realtime-collab"
import { BEC, DANIEL, JORDAN, MARCUS, READ_RECEIPTS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Read receipt trail | UI Primitives - Realtime collab",
}

const LONG_TRAIL: ReadonlyArray<CollabReadReceipt> = [
  { id: "rt-marcus", reader: MARCUS, seenAt: "Just now" },
  { id: "rt-sophie", reader: SOPHIE, seenAt: "3s ago" },
  { id: "rt-jordan", reader: JORDAN, seenAt: "11s ago" },
  { id: "rt-bec", reader: BEC, seenAt: "27s ago" },
  { id: "rt-daniel", reader: DANIEL, seenAt: "44s ago" },
  { id: "rt-marcus-2", reader: { ...MARCUS, id: "marcus-mob" }, seenAt: "1m ago" },
  { id: "rt-sophie-2", reader: { ...SOPHIE, id: "sophie-mob" }, seenAt: "2m ago" },
  { id: "rt-jordan-2", reader: { ...JORDAN, id: "jordan-mob" }, seenAt: "3m ago" },
]

export default function ReadReceiptTrailPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 08"
        title="Read receipt trail"
        description="Avatar trail showing who has seen the latest change to a doc and when each saw it, with an overflow chip when the trail grows long."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Read receipt trail" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Most recent first · 4 readers</span>
          <div className={styles.demoStack}>
            <ReadReceiptTrail
              receipts={READ_RECEIPTS}
              title="Seen by"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Long trail · overflow chip kicks in</span>
          <div className={styles.demoStack}>
            <ReadReceiptTrail receipts={LONG_TRAIL} max={5} title="Seen by" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Reads as a labelled <code>role=&quot;group&quot;</code> so screen
            readers announce &quot;Seen by 4 people&quot; followed by each name +
            relative seen-at time. Avatar slots get a faint teal ring so the trail
            reads as receipts rather than a presence stack.
          </p>
        </div>
      </section>
    </main>
  )
}
