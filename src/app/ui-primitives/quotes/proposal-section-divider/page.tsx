import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProposalSectionDivider } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Proposal section divider | Quotes | UI Primitives",
  description:
    "Section divider used between major chapters of a long-form proposal — number, title, subtitle, accent rule.",
}

export default function ProposalSectionDividerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 12"
        title="Proposal section divider"
        description="Used to break up the body of a long-form proposal into chapters. Number set large, title set in display caps, subtitle in monospace, with a thin gradient rule for cadence between sections."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Section divider" },
        ]}
      />
      <section className={styles.stage} aria-label="Section divider demo">
        <ProposalSectionDivider
          sectionNumber="01"
          title="Vehicle & scope"
          subtitle="Hilux N80 SR5 · 2.8L 1GD-FTV · 38,200 km"
          tone="red"
        />
        <ProposalSectionDivider
          sectionNumber="02"
          title="System specification"
          subtitle="Manta 3″ stainless cat-back · DPF compliant · noise tested"
          tone="amber"
        />
        <ProposalSectionDivider
          sectionNumber="03"
          title="Workshop labour"
          subtitle="4 hours bench-fit · 1 hour wideband O2 retune · sign-off"
          tone="teal"
        />
        <ProposalSectionDivider
          sectionNumber="04"
          title="Warranty & after-care"
          subtitle="12-month parts · 6-month labour · annual re-tune included"
          tone="green"
        />
      </section>
    </main>
  )
}
