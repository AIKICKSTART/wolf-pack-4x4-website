import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProposalCoverPage } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Proposal cover page | Quotes | UI Primitives",
  description:
    "Proposal cover page template — hero band, project title, client name, proposal date, author, footer.",
}

export default function ProposalCoverPagePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 11"
        title="Proposal cover page"
        description="First page of any long-form proposal. Hero band carries the brand and proposal number, body presents project + client, meta grid lists date / number / author, footer carries the brand swatch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Proposal cover" },
        ]}
      />
      <ProposalCoverPage
        projectTitle="Hilux N80 — Full Manta stainless cat-back system + fitment"
        clientName="Silverline Fleet Pty Ltd — Mikhail Petrov"
        proposalDate="Tuesday 27 May 2026"
        proposalNumber="OFM-2641"
        author="Brad Cassidy"
        authorRole="Workshop Manager · Oak Flats"
        footerNote="Oak Flats Mufflermen Pty Ltd · 14 Industrial Drive, Oak Flats NSW 2529 · ABN 32 411 207 559 · 02 4256 1188"
      />
    </main>
  )
}
