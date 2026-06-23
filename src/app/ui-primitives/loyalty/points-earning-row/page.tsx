import type { Metadata } from "next"

import { PointsEarningRow } from "../../components/loyalty/points-earning-row"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_LEDGER } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Points ledger row | Loyalty | UI Primitives",
  description:
    "Single activity row in the Mufflermen points ledger — timestamp, action label, points earned chip. Earn / bonus / redeem / adjust variants.",
}

export default function PointsEarningRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 02"
        title="Points ledger row"
        description="Single activity row variants — job completed, bonus credited, reward redeemed, Stuart adjustment. Tone derives from the kind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Points ledger row" },
        ]}
      />
      <section className={styles.sceneShell}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {SAMPLE_LEDGER.map((row) => (
            <PointsEarningRow
              key={row.id}
              timestamp={row.timestamp}
              action={row.action}
              detail={row.detail}
              points={row.points}
              kind={row.kind}
            />
          ))}
        </ol>
      </section>
    </main>
  )
}
