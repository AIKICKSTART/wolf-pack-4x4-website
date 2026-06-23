import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FaqAccordion, type FaqAccordionItem } from "../../components/marketing/faq-accordion"
import { CodeBlock } from "../../components/primitives/code-block"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "FAQ accordion | Marketing Blocks",
  description:
    "Primitive 06 — single-open FAQ accordion built on @base-ui/react with rich content support.",
}

const ITEMS: ReadonlyArray<FaqAccordionItem> = [
  {
    id: "adr-stamp",
    question: "Are your catbacks ADR-compliant?",
    answer: (
      <>
        <p>
          Every Mufflermen catback is fitted against ADR 83/00 and ADR 28/02 and stamped at our Oak Flats bay. The
          ADR docket leaves the workshop in the centre console of the ute the same day the install signs off.
        </p>
        <p>
          We log the stamp number against your VIN. If RMS asks, the paperwork lines up.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    question: "How long is the warranty on a Mufflermen weld?",
    answer: (
      <p>
        Lifetime crack guarantee on every joint we lay. That covers stainless TIG joints, MIG mounting welds, and
        flange fusion. Bring the ute back to Central Ave any year, any kilometre — we re-fuse the joint at no
        charge.
      </p>
    ),
  },
  {
    id: "manta-config",
    question: "What Manta options do you carry?",
    answer: (
      <>
        <p>
          We stock the full Manta South Coast range — 3-inch and 3.5-inch catbacks, twin-tip rear sections, blued
          and polished tips. Bracket patterns are pulled from our matrix and confirmed before any weld.
        </p>
        <CodeBlock
          fileName="manta-matrix.json"
          language="json"
          showLineNumbers={false}
          code={`{
  "ute":       ["HiLux SR5", "Ranger XLT", "BT-50", "Triton GLS"],
  "diameter":  ["3in", "3.5in"],
  "tip":       ["polished", "blued", "burnt"],
  "shield":    "alloy-stamped"
}`}
        />
      </>
    ),
  },
  {
    id: "mobile",
    question: "Do you do mobile call-outs in the Illawarra?",
    answer: (
      <p>
        Yes — the Mufflermen mobile bay covers Wollongong, Kiama, Shellharbour and the Shoalhaven. Stainless TIG
        welds done bay-side. Larger fabrication jobs come back to Oak Flats so the dyno can confirm flow.
      </p>
    ),
  },
  {
    id: "booking",
    question: "How quickly can I book a slot?",
    answer: (
      <p>
        Drop your ute Monday, drive it home Wednesday. Caravan rigs and trade trucks book 5 days out. Quotes are
        confirmed in writing before any cut is made.
      </p>
    ),
  },
]

export default function FaqAccordionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / FAQ accordion"
        title="FAQ accordion"
        description="Single-open accordion (Base UI) with rich panel content — supports paragraphs and code blocks for technical answers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "FAQ accordion" },
        ]}
      />

      <FaqAccordion
        kicker="Asked in the bay"
        heading="The five things every Oak Flats driver asks first."
        body="Quick answers — pulled from the front desk log. Need more detail? The fitters take a yarn before any weld starts."
        items={ITEMS}
        defaultOpenId="adr-stamp"
      />
    </main>
  )
}
