import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CoachMark } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Coach mark | UI Primitives — Help & Docs",
}

export default function CoachMarkPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 02"
        title="Coach mark"
        description="Pointer + tooltip floating next to a target, with arrow, title, body, and Next / Skip actions. Composed inside the tour controller."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Coach mark" },
        ]}
      />
      <section className={styles.canvas} aria-label="Coach mark demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Standalone tip card. Use one at a time on first-run experiences; chain inside the
            tour controller for multi-step walkthroughs.
          </p>
        </div>
        <div className={styles.stage} style={{ minHeight: 260 }}>
          <div className={styles.stageRow} style={{ gap: 40, alignItems: "flex-start" }}>
            <CoachMark
              title="Workshop view"
              body="This is where every active job lives. Drag a job between bays to reschedule."
              placement="bottom"
              step={1}
              totalSteps={4}
            />
            <CoachMark
              title="Quote inbox"
              body="Incoming quotes from the public site land here. Triage them within an hour."
              placement="right"
              step={2}
              totalSteps={4}
              primaryLabel="Got it"
              secondaryLabel="Later"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
