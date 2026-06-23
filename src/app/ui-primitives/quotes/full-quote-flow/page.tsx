import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  DiscountEditor,
  ProposalCoverPage,
  ProposalSectionDivider,
  QuoteBundleOption,
  SendForSignatureCard,
  TaxCalcStrip,
  TermsConditionsEditor,
} from "../../components/quotes"

import { FullQuoteLineStack } from "./full-quote-line-stack"
import {
  BUNDLE_ITEMS,
  INITIAL_LINES,
  QUOTE_TOTALS,
  SIGNATURE_DEFAULTS,
  TAX_LINES,
} from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Full quote flow | Quotes | UI Primitives",
  description:
    "Composition view — proposal cover page, section dividers, quote line stack, bundled option, discount editor, tax strip, terms, and send-for-signature.",
}

const SCOPE_OPTIONS: ReadonlyArray<string> = [
  "Whole quote",
  "Cat-back system only",
  "Workshop labour only",
  "Manta parts",
]

const TERMS = `**Terms of acceptance — Oak Flats Mufflermen Pty Ltd**

- Quote valid for **14 days** from issue date. Pricing subject to change after expiry.
- Workshop labour booked once **50% deposit** is received via the accept link.
- All parts come with a **12-month manufacturer warranty**; workshop labour is warranted for 6 months from fitment.
- Vehicle must be supplied with at least a quarter tank of fuel for the wideband O2 retune.`

export default function FullQuoteFlowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 15"
        title="Full quote flow"
        description="Seven primitives composed into the end-to-end Mufflermen quote authoring experience. Proposal cover → section dividers → quote line stack with a bundled option mid-list → discount editor → tax strip → terms editor → send-for-signature."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Full flow" },
        ]}
      />

      <div className={styles.flow}>
        <ProposalCoverPage
          projectTitle="Hilux N80 — Full Manta stainless cat-back system + fitment"
          clientName="Silverline Fleet Pty Ltd — Mikhail Petrov"
          proposalDate="Tuesday 27 May 2026"
          proposalNumber="OFM-2641"
          author="Brad Cassidy"
          authorRole="Workshop Manager · Oak Flats"
          footerNote="Oak Flats Mufflermen Pty Ltd · 14 Industrial Drive, Oak Flats NSW 2529 · ABN 32 411 207 559 · 02 4256 1188"
        />

        <section className={styles.flowSurface} aria-label="Quote body">
          <ProposalSectionDivider
            sectionNumber="01"
            title="Itemised quote"
            subtitle="Stainless system + labour at workshop rates"
            tone="red"
          />
          <FullQuoteLineStack initial={INITIAL_LINES} />

          <ProposalSectionDivider
            sectionNumber="02"
            title="Bundled alternative"
            subtitle="Same scope packaged at a single price — $340 saving"
            tone="amber"
          />
          <QuoteBundleOption
            id="manta-touring"
            name="Manta Touring — Full Hilux N80 system"
            description="Manta 3″ catback stainless, mid-pipe resonator, twin-tip rear muffler, cat-back fitment labour, wideband O2 retune, header heat wrap."
            items={BUNDLE_ITEMS}
            bundlePrice={2685.0}
            savings={340.0}
            defaultExpanded={false}
          />

          <ProposalSectionDivider
            sectionNumber="03"
            title="Discounts & totals"
            subtitle="Loyalty discount applied + GST 10%"
            tone="green"
          />
          <div className={styles.two}>
            <DiscountEditor
              scopeOptions={SCOPE_OPTIONS}
              initial={{
                kind: "percentage",
                amount: 10,
                scope: SCOPE_OPTIONS[3],
                reason: "Loyal fleet customer — third N80 quote this quarter",
              }}
            />
            <TaxCalcStrip
              subtotal={QUOTE_TOTALS.subtotal}
              taxes={TAX_LINES}
              total={QUOTE_TOTALS.total}
            />
          </div>

          <ProposalSectionDivider
            sectionNumber="04"
            title="Terms & dispatch"
            subtitle="Sign electronically — workshop books in once deposit clears"
            tone="teal"
          />
          <TermsConditionsEditor
            initialValue={TERMS}
            lastEditedAt="Wed 28 May · 11:04 AEST"
            version="v2.1"
          />
          <SendForSignatureCard defaults={SIGNATURE_DEFAULTS} />
        </section>
      </div>
    </main>
  )
}
