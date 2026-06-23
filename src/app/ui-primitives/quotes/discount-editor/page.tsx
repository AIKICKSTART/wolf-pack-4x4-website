import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DiscountEditor } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Discount editor | Quotes | UI Primitives",
  description:
    "Discount picker — percentage / fixed / bulk-tier toggle, amount, applied-to scope chip, internal reason note.",
}

const SCOPE_OPTIONS: ReadonlyArray<string> = [
  "Whole quote",
  "Cat-back system only",
  "Workshop labour only",
  "Manta parts",
  "Mid-pipe resonator",
]

export default function DiscountEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 03"
        title="Discount editor"
        description="Apply a discount to one line, a category, or the whole quote. Percentage, fixed amount, or bulk-tier — all with a scope chip and an internal reason note so workshop margin is auditable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Discount editor" },
        ]}
      />
      <DiscountEditor
        scopeOptions={SCOPE_OPTIONS}
        initial={{
          kind: "percentage",
          amount: 10,
          scope: SCOPE_OPTIONS[0],
          reason: "Returning Silverline fleet customer — second N80 quote this quarter",
        }}
      />
    </main>
  )
}
