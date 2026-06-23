import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TextFirstHero } from "../../components/marketing/text-first-hero"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Text-first hero | Marketing Blocks",
  description:
    "Primitive 01 — editorial text-first hero. Three layouts: left-aligned, centered, split-credit.",
}

const TRUST = [
  { value: "1968", label: "Workshop opened" },
  { value: "12+", label: "Illawarra suburbs" },
  { value: "ADR", label: "Compliant systems" },
  { value: "Manta", label: "Partner since 2014" },
] as const

export default function TextFirstHeroPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Text-first hero"
        title="Text-first hero"
        description="Editorial hero block — huge display headline, supporting subhead, dual CTA, and a trust strip. Three composition modes: left-aligned, centered, and split-credit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Text-first hero" },
        ]}
      />

      <span className={styles.stageCaption}>Layout · Left-aligned</span>
      <TextFirstHero
        kicker="Oak Flats / Est. 1968"
        headline={
          <>
            Hand-built exhaust
            <br />
            <span style={{ color: "var(--primitive-red)" }}>since the South Coast</span>
            <br />
            roared.
          </>
        }
        subhead="MIG and TIG welds, ADR-compliant catbacks, and full Manta installs — fitted at the Oak Flats bay that's been welding stainless under Illawarra utes since 1968."
        primaryAction={{ label: "Book a workshop slot", href: "#book", tone: "red" }}
        secondaryAction={{ label: "View Manta catalogue", href: "#manta", tone: "chrome" }}
        trust={TRUST}
        layout="left-aligned"
      />

      <span className={styles.stageCaption}>Layout · Centered</span>
      <TextFirstHero
        kicker="Illawarra / Workshop coverage"
        headline={
          <>
            One pit,
            <br />
            two welders,
            <br />
            zero rust.
          </>
        }
        subhead="Stainless catbacks fitted on the bay, parts pulled from the Manta cage upstairs, and a torque test before your ute leaves the kerb."
        primaryAction={{ label: "Request quote", href: "#quote", tone: "red" }}
        secondaryAction={{ label: "Drive in directly", href: "#directions", tone: "ghost" }}
        trust={TRUST}
        layout="centered"
      />

      <span className={styles.stageCaption}>Layout · Split-credit</span>
      <TextFirstHero
        kicker="Featured / South Coast Register"
        headline="Five decades of mufflers welded under one tin roof."
        subhead="The Oak Flats workshop has been welding catbacks for Illawarra utes, caravans, and trade rigs since the Whitlam years. Every joint TIG-fused. Every fit ADR-signed."
        primaryAction={{ label: "Read the workshop story", href: "#story", tone: "red" }}
        layout="split-credit"
        credit="South Coast Register · Workshop profile · March 2025"
      />
    </main>
  )
}
