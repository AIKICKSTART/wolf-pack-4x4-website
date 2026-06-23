import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FitmentCompatibilityList } from "../../components/parts-pages"

import { FITMENT_TABLE } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Fitment compatibility list | Parts pages",
  description: "Primitive 08 — Vehicle fitment table with make, model, years, body, engine, and notes / adapter chips.",
}

export default function FitmentCompatibilityListPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Fitment list"
        title="Fitment compatibility list"
        description="Semantic table with row-scope headers, adapter-required and notes chips composed via the Chip primitive, and a mobile card stack at narrow widths."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Fitment list" },
        ]}
      />

      <FitmentCompatibilityList kicker="Direct fitment" heading="Confirmed fitment for Manta 3in catback" fitments={FITMENT_TABLE} />
    </main>
  )
}
