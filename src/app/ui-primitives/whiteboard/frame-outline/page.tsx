import type { Metadata } from "next"

import { FrameOutline, WbStickyNote } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Frame outline | UI Primitives - Whiteboard",
}

export default function FrameOutlinePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 07"
        title="Frame outline"
        description="Whiteboard frame group with title chip, id badge, dimension label and tone variants."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Frame outline" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Marketing campaign frame</span>
          <div className={styles.demoRowJustified}>
            <FrameOutline title="Q3 offers" frameId="F-04" width={520} height={280} tone="amber">
              <WbStickyNote
                content="Photo evidence flow needs SMS link."
                author="Daniel"
                authorInitials="DF"
                tone="yellow"
                votes={8}
              />
            </FrameOutline>
          </div>
        </div>
      </section>
    </main>
  )
}
