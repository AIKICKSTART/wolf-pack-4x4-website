import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartSpecTable } from "../../components/parts-pages"

import { SPEC_GROUPS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part spec table | Parts pages",
  description: "Primitive 07 — Sectioned part spec table grouped by Dimensions, Materials, Sound, Compliance and Fitment.",
}

export default function PartSpecTablePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Spec table"
        title="Part spec table"
        description="Structured spec table with grouped tbody sections, scope-correct row headings, and aria-sort hints on the column headers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Spec table" },
        ]}
      />

      <PartSpecTable kicker="Workshop specs" heading="Manta 3in catback — full spec sheet" groups={SPEC_GROUPS} />
    </main>
  )
}
