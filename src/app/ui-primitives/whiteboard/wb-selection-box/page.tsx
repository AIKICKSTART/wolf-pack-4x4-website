import type { Metadata } from "next"

import { WbSelectionBox, WbStickyNote } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Selection box | UI Primitives - Whiteboard",
}

export default function WbSelectionBoxPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 10"
        title="WB selection box"
        description="Selection affordance with resize handles, rotation handle, grouped-object chip and content slot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "WB selection box" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Grouped sticky selection</span>
          <div className={styles.demoRowJustified}>
            <WbSelectionBox width={360} height={240} groupCount={3} rotationLabel="-7 deg">
              <WbStickyNote
                content="Add ADR cheatsheet to quote flow."
                author="Marcus"
                authorInitials="MR"
                tone="blue"
                rotation={-4}
              />
            </WbSelectionBox>
          </div>
        </div>
      </section>
    </main>
  )
}
