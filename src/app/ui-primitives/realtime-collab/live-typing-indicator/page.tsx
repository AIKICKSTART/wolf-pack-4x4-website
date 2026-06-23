import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveTypingIndicator } from "../../components/realtime-collab"
import { BEC, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Live typing indicator | UI Primitives - Realtime collab",
}

export default function LiveTypingIndicatorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 03"
        title="Live typing indicator"
        description="Who's currently typing on a doc and which field they're inside — single user, two-user, and three-user variants with animated dots and reduced-motion fallback."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Live typing indicator" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Single typist · field locked in</span>
          <div className={styles.demoStack}>
            <LiveTypingIndicator
              users={[SOPHIE]}
              field="Labour line 3"
              docTitle="Quote #Q-1408"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Two typists on the same field</span>
          <div className={styles.demoStack}>
            <LiveTypingIndicator
              users={[MARCUS, JORDAN]}
              field="Parts line 5 · Magnaflow muffler"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Three typists, no field anchor</span>
          <div className={styles.demoStack}>
            <LiveTypingIndicator users={[SOPHIE, BEC, MARCUS]} />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Wrapped in <code>role=&quot;status&quot; aria-live=&quot;polite&quot;</code> so
            screen readers announce the typist + field + doc on change without
            stealing focus. Reduced motion hides the bouncing dot row and reveals a
            static <code>..</code> glyph so the row keeps its rhythm without
            animation.
          </p>
        </div>
      </section>
    </main>
  )
}
