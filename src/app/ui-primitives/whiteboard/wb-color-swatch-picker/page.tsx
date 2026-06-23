import type { Metadata } from "next"

import { WbColorSwatchPicker } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Colour swatch picker | UI Primitives - Whiteboard",
}

export default function WbColorSwatchPickerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 08"
        title="WB colour swatch picker"
        description="Whiteboard colour picker with a 12-swatch grid, recent colours and inline hex input validation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "WB colour swatch picker" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Tool colour picker</span>
          <div className={styles.demoRowJustified}>
            <WbColorSwatchPicker
              title="Sticky colour"
              defaultValue="#ffc14f"
              recent={["#e62028", "#40bcff", "#37d67a"]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
