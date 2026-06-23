import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { DENOMINATIONS_FLOAT, DENOMINATIONS_VARIANT } from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { DailyTallyInteractiveDemo } from "./daily-tally-interactive-demo"

export const metadata: Metadata = {
  title: "Daily tally | POS checkout",
  description:
    "Primitive 12 — open / close cash drawer panel with denomination counting and declared vs system delta tone coding.",
}

export default function DailyTallyPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Daily tally"
        title="Daily tally panel"
        description="Open or close the Bay 1 cash drawer. Counts every AUD denomination, computes declared total and tone-codes variance vs system."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Daily tally" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · stateful · opening float, balanced</span>
        <DailyTallyInteractiveDemo
          initialMode="open"
          initialDenominations={DENOMINATIONS_FLOAT}
          systemAmount={520.0}
          operator="Mia"
        />
        <span className={styles.stageCaption}>State 02 · end of day · short variance</span>
        <DailyTallyInteractiveDemo
          initialMode="close"
          initialDenominations={DENOMINATIONS_VARIANT}
          systemAmount={1054.5}
          operator="Daniel"
        />
        <span className={styles.stageCaption}>State 03 · end of day · over variance</span>
        <DailyTallyInteractiveDemo
          initialMode="close"
          initialDenominations={DENOMINATIONS_FLOAT}
          systemAmount={420.5}
          operator="Mia"
        />
      </section>
    </main>
  )
}
