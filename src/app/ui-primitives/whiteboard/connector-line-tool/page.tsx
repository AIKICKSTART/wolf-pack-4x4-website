import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConnectorLineTool } from "../../components/whiteboard"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Connector line tool | UI Primitives — Whiteboard",
}

export default function ConnectorLineToolPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 05"
        title="Connector line tool"
        description="Visual connector primitive — straight, orthogonal, or curved bezier — with arrow / dot / diamond endpoint caps and an optional label-on-line slot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Connector line tool" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Straight · arrow end cap · label slot</span>
          <div className={styles.demoRowJustified}>
            <ConnectorLineTool
              start={{ x: 0, y: 50 }}
              end={{ x: 280, y: 50 }}
              shape="straight"
              endCap="arrow"
              label="depends on"
              color="var(--primitive-teal)"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Orthogonal · dot start · diamond end · dashed</span>
          <div className={styles.demoRowJustified}>
            <ConnectorLineTool
              start={{ x: 0, y: 0 }}
              end={{ x: 320, y: 120 }}
              shape="orthogonal"
              startCap="dot"
              endCap="diamond"
              dashed
              label="blocks"
              color="var(--primitive-amber)"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Curved · arrow end · brand red · workshop bay → quote PDF</span>
          <div className={styles.demoRowJustified}>
            <ConnectorLineTool
              start={{ x: 0, y: 0 }}
              end={{ x: 360, y: 140 }}
              shape="curved"
              endCap="arrow"
              label="Bay 2 → Quote PDF"
              color="var(--primitive-red)"
              strokeWidth={3}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            SVG path is generated per shape — straight uses <code>L</code>, orthogonal builds a
            three-segment path through the midpoint, curved uses a single cubic{" "}
            <code>C</code> with control points 45% along the x-axis. Caps are rendered as SVG
            markers so colour passes through to fill.
          </p>
        </div>
      </section>
    </main>
  )
}
