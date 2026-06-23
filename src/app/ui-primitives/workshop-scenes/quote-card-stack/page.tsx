import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteCardStack } from "../../components/workshop-scenes/quote-card-stack"
import { QUOTE_CARD_STACK_QUOTES } from "../../components/workshop-scenes/quote-card-stack-data"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Quote card stack | UI Primitives — Workshop Scenes",
}

export default function QuoteCardStackScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.09 / Workshop scenes"
        title="Quote card stack"
        description="A swipe-deck of quotes awaiting a decision. The top card is interactive — approve, amend, decline — and the deck behind tilts on subtle perspective."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Quote card stack" },
        ]}
      />
      <section className={styles.canvas}>
        <QuoteCardStack quotes={QUOTE_CARD_STACK_QUOTES} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Only the top card is in the tab order — the deck behind is visual
            stage-dressing. Production wires the three actions into the quoting
            backend; reduced-motion users see the deck collapse to the top card
            with no tilt.
          </p>
        </div>
      </section>
    </main>
  )
}
