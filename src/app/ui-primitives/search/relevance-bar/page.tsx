import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RelevanceBar } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Relevance bar | UI Primitives — Search",
}

export default function RelevanceBarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 12"
        title="Relevance bar"
        description="Tiny 0–100% relevance indicator. The fill is a tone-shifting gradient; the paired chip shows the percentage and confidence label — strong, partial, or loose match."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Relevance bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Relevance bar demo">
        <div className={styles.note}>
          <span>Tones</span>
          <p>
            Auto-classified by score: ≥75% strong (green), 45–74% partial (amber), &lt;45% loose
            (red). Pass a custom label for domain-specific phrasing.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageGrid}>
            <div className={styles.subStage}>
              <h4>Default size · all confidence tiers</h4>
              <div style={{ display: "grid", gap: 14 }}>
                <RelevanceBar score={92} />
                <RelevanceBar score={68} />
                <RelevanceBar score={36} />
                <RelevanceBar score={8} />
              </div>
            </div>
            <div className={styles.subStage}>
              <h4>Small size · for inline use inside result cards</h4>
              <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
                <RelevanceBar score={88} size="sm" />
                <RelevanceBar score={54} size="sm" />
                <RelevanceBar score={22} size="sm" />
              </div>
            </div>
            <div className={styles.subStage}>
              <h4>Custom label · domain-specific phrasing</h4>
              <div style={{ display: "grid", gap: 14 }}>
                <RelevanceBar score={94} label="Confirmed fitment" />
                <RelevanceBar score={62} label="Likely fitment" />
                <RelevanceBar score={28} label="Inspect required" />
              </div>
            </div>
            <div className={styles.subStage}>
              <h4>Without chip · bar-only</h4>
              <div style={{ display: "grid", gap: 14 }}>
                <RelevanceBar score={78} showChip={false} />
                <RelevanceBar score={42} showChip={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
