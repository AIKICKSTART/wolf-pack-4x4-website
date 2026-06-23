import type { Metadata } from "next"

import { SlaCountdownTile } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "SLA countdown tile | Unified inbox primitives",
  description:
    "Primitive 10 — first-response SLA countdown tile with progress bar and breach alert when overdue.",
}

export default function SlaCountdownTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / SLA tile"
        title="SLA countdown tile"
        description="Tile shows the remaining time against the SLA target with a tabular-numeric timer. Hot leads get a 15-minute first-response window, info-only enquiries get 4 hours. Tone shifts from green to amber to red as time runs out — and a breach alert appears once the timer goes negative."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "SLA countdown tile" },
        ]}
      />
      <section className={styles.demoDouble}>
        <SlaCountdownTile
          remainingMinutes={9}
          targetMinutes={15}
          scope="first-response"
          context="Hot lead · Karen W."
        />
        <SlaCountdownTile
          remainingMinutes={228}
          targetMinutes={240}
          scope="first-response"
          context="Info enquiry · Mick D."
        />
        <SlaCountdownTile
          remainingMinutes={-7}
          targetMinutes={15}
          scope="first-response"
          context="Breached · Bec S. refund"
        />
        <SlaCountdownTile
          remainingMinutes={42}
          targetMinutes={60}
          scope="next-update"
          context="Karen W. · next update due"
        />
      </section>
    </main>
  )
}
