import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OutOfStockRow } from "../../components/storefront"

import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Out-of-stock row | Storefront",
  description: "Primitive 12 — out-of-stock row with notify-me CTA and alternate suggestion.",
}

export default function OutOfStockRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Out-of-stock row"
        title="Out-of-stock row"
        description="OOS row with ETA, alternate suggestion CTA and inline notify-me email capture with valid/invalid states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Out-of-stock row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · OOS with ETA + alternate</span>
        <OutOfStockRow
          sku="BEAU-EXT-XF"
          brand="Beaudesert"
          title="Extractors · XF Falcon"
          price={1190}
          thumbnailGlyph="BEU"
          etaLabel="Mid June 2026"
          alternateSuggestion={{ sku: "PCMR-EXT-30", label: "Pacemaker LS1" }}
        />
        <span className={styles.stageCaption}>State 02 · subscribed confirmation</span>
        <OutOfStockRow
          sku="HUSH-RES-25"
          brand="Hushpower"
          title='2.5" Resonator · Universal'
          price={245}
          thumbnailGlyph="HSH"
          etaLabel="Out of supplier stock"
          subscribed
        />
        <span className={styles.stageCaption}>State 03 · plain OOS · no ETA · no alternate</span>
        <OutOfStockRow
          sku="MAGNA-CAT-300"
          brand="Magnaflow"
          title='Hi-Flow Cat 3" · 200 cell'
          price={695}
          thumbnailGlyph="MAG"
        />
      </section>
    </main>
  )
}
