import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MultiCursorOverlay } from "../../components/realtime-collab"
import type { CollabCursor } from "../../components/realtime-collab"
import { BEC, DANIEL, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Multi-cursor overlay | UI Primitives - Realtime collab",
}

const CURSORS: ReadonlyArray<CollabCursor> = [
  { id: "c-marcus", user: MARCUS, position: { x: 22, y: 28 }, hint: "row 3" },
  { id: "c-sophie", user: SOPHIE, position: { x: 62, y: 18 }, hint: "totals" },
  { id: "c-jordan", user: JORDAN, position: { x: 78, y: 56 }, hint: "parts" },
  { id: "c-bec", user: BEC, position: { x: 30, y: 70 }, hint: "notes" },
  { id: "c-daniel", user: DANIEL, position: { x: 52, y: 80 }, hint: "share" },
]

export default function MultiCursorOverlayPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 02"
        title="Multi-cursor overlay"
        description="Five collaborator cursors floating over a faux quote document with smooth percent-positioned interpolation and per-user tone, name chip, and an optional hint label."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Multi-cursor overlay" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Quote #Q-1408 · 5 live cursors</span>
          <MultiCursorOverlay
            cursors={CURSORS}
            caption="QUOTE #Q-1408 / 2019 HILUX 2.8L EXHAUST"
          >
            <div className={styles.docMock}>
              <h4>Quote #Q-1408 - 2019 Hilux 2.8L exhaust replacement</h4>
              <p>Customer: Mira K. - 0418 442 991</p>
              <p>
                <span className={styles.bar} style={{ "--bar-w": "82%" } as React.CSSProperties} />
              </p>
              <p>
                <span className={styles.bar} style={{ "--bar-w": "64%" } as React.CSSProperties} />
              </p>
              <p>
                <span className={styles.bar} style={{ "--bar-w": "76%" } as React.CSSProperties} />
              </p>
              <p>Labour line 3 - 1.5h @ $148/hr ........ $222.00</p>
              <p>Parts line 4 - Catalytic converter ... $612.40</p>
              <p>Parts line 5 - Magnaflow muffler ..... $284.90</p>
              <p>
                <span className={styles.bar} style={{ "--bar-w": "44%" } as React.CSSProperties} />
              </p>
              <p>Totals: $1,469.30 inc GST</p>
            </div>
          </MultiCursorOverlay>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cursors are absolutely positioned in percentage space so the overlay
            scales with the stage. <code>top</code> + <code>left</code> animate on
            a 220ms ease-out-expo curve to fake smooth interpolation. The stage is
            <code> role=&quot;img&quot;</code> with a single aria-label rather than
            announcing every cursor to avoid screen-reader chatter.
          </p>
        </div>
      </section>
    </main>
  )
}
