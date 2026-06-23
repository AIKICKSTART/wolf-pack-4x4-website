import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsFaqSection } from "../../components/parts-pages"

import { FAQ_ITEMS } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts FAQ section | Parts pages",
  description: "Primitive 12 — Parts FAQ accordion with 8 default questions covering fitment, install time, warranty, ADR.",
}

export default function PartsFaqSectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / FAQ"
        title="Parts FAQ section"
        description="Adapter over the marketing/FaqAccordion primitive — maps a simpler PartsFaqItem shape into rich-content accordion panels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "FAQ section" },
        ]}
      />

      <PartsFaqSection
        kicker="Common parts questions"
        heading="The eight things the front desk hears most."
        body="Quick answers for fitment, fitting time, warranty, ADR compliance, sound level, RMS inspection, tuning, and delivery."
        items={FAQ_ITEMS}
        defaultOpenId="fit"
      />
    </main>
  )
}
