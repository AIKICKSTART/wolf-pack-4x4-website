import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommunityTicker } from "../../components/bay-display"
import { COMMUNITY_ITEMS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Community ticker | UI Primitives — Bay Display",
}

export default function CommunityTickerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.08 / Bay display"
        title="Community ticker"
        description="Around-town ticker for the waiting room — Steelers half-time scores, Albion Park farmers market, Princes Hwy notices. Kind chip recolours per channel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Community ticker" },
        ]}
      />
      <section className={styles.canvas}>
        <CommunityTicker items={COMMUNITY_ITEMS} />
        <CommunityTicker items={COMMUNITY_ITEMS} speed={16} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Footy gets a red chip, local events teal, notices amber. Detail
            slot is optional — short scores or supporting copy. The two
            instances above show the same data at 28 px/s and a slower 16 px/s
            pass for distance reading and reduced-motion preferences.
          </p>
        </div>
      </section>
    </main>
  )
}
