import type { Metadata } from "next"

import { HandDrawnArrow } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Hand-drawn arrow | UI Primitives - Whiteboard",
}

export default function HandDrawnArrowPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 06"
        title="Hand-drawn arrow"
        description="Loose, scratchy and marker-style SVG arrows for sketchy board annotations."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Hand-drawn arrow" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Wobble styles</span>
          <div className={styles.demoStack}>
            <HandDrawnArrow style="loose" tone="red" ariaLabel="Loose red hand-drawn arrow" />
            <HandDrawnArrow style="scratchy" tone="amber" ariaLabel="Scratchy amber hand-drawn arrow" />
            <HandDrawnArrow style="marker" tone="teal" strokeWidth={5} ariaLabel="Marker teal hand-drawn arrow" />
          </div>
        </div>
      </section>
    </main>
  )
}
