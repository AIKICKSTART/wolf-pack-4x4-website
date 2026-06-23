import type { Metadata } from "next"

import { ConditionalLogicCard } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { CONDITIONAL_RULES } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Conditional logic card | Forms platform",
  description:
    "Primitive 07 — the if / then conditional rule card with source field, operator, value, action, and target field.",
}

export default function ConditionalLogicCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Conditional logic card"
        title="Conditional logic card"
        description="Three rules driving the Mufflermen forms — show tow rating for 4WDs, require a deposit on big quotes, and skip the Stripe page for trade accounts. ALL vs ANY match gates the conditions; the action chip is tone-coded by intent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Conditional logic card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book-a-Service rules
        </span>
        <div className={styles.demoRowList}>
          {CONDITIONAL_RULES.map((rule) => (
            <ConditionalLogicCard key={rule.id} rule={rule} />
          ))}
        </div>
      </section>
    </main>
  )
}
