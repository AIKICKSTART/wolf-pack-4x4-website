import type { Metadata } from "next"

import { OutlineRail } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { OUTLINE } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Outline rail | Content studio",
  description:
    "Primitive 02 — auto-generated heading outline with jump-to and reorder. Three states — long article, short draft, and top-level focused.",
}

const SHORT_OUTLINE = OUTLINE.slice(0, 3)

const TOP_FOCUS = OUTLINE.map((entry, idx) => ({
  ...entry,
  active: idx === 0,
}))

export default function OutlineRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Outline rail"
        title="Outline rail"
        description="A jump-to rail with per-section word counts and reorder chevrons. The active entry is highlighted with a violet wash. Three states — full article, short draft, and H1 focused."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Outline rail" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          <OutlineRail entries={OUTLINE} />
          <OutlineRail entries={SHORT_OUTLINE} />
          <OutlineRail entries={TOP_FOCUS} />
        </div>
      </section>
    </main>
  )
}
