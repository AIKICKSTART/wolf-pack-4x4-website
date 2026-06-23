import type { Metadata } from "next"

import { ReactionPicker } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import { DEMO_REACTIONS } from "../demo-data"
import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Reaction picker | Inbox primitives",
  description:
    "Primitive 10 — floating emoji reaction picker. Six defaults plus an expand button revealing more reactions.",
}

export default function ReactionPickerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Reaction picker"
        title="Reaction picker"
        description="Drop-in reaction trigger that opens a small panel of six default emoji and an expand chip. Reactions are stateless — the panel just emits the chosen reaction."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Reaction picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Default trigger</span>
        <div className={styles.demoColumn}>
          <ReactionPicker />
        </div>

        <span className={styles.demoLabel}>Workshop-tuned reactions</span>
        <div className={styles.demoColumn}>
          <ReactionPicker reactions={DEMO_REACTIONS} />
        </div>
      </section>
    </main>
  )
}
