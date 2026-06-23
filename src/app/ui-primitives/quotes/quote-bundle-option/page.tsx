import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteBundleOption } from "../../components/quotes"

import { BUNDLE_ITEMS } from "../quote-fixtures"
import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "Quote bundle option | Quotes | UI Primitives",
  description:
    "Bundled exhaust + fitment package — collapsible included items list with bundle price and savings chip.",
}

export default function QuoteBundleOptionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 02"
        title="Quote bundle option"
        description="Bundled option block grouping multiple parts and labour into a single line at a packaged price. Use to merchandise a 'full system + fitment + tune' package against itemised quoting."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Bundle option" },
        ]}
      />
      <section className={styles.stage} aria-label="Bundle option demo">
        <div className={styles.stageHead}>
          <span className={styles.stageKicker}>Touring bundle</span>
          <h2 className={styles.stageTitle}>Bundled exhaust + fitment</h2>
          <p className={styles.stageBody}>
            Six items grouped into a single packaged price — the customer sees the saving versus
            piecemeal quoting, the workshop locks in margin on labour and the tune.
          </p>
        </div>
        <QuoteBundleOption
          id="manta-touring"
          name="Manta Touring — Full Hilux N80 system"
          description="Manta 3″ catback stainless, mid-pipe resonator, twin-tip rear muffler, cat-back fitment labour, wideband O2 retune, header heat wrap."
          items={BUNDLE_ITEMS}
          bundlePrice={2685.0}
          savings={340.0}
          defaultExpanded
        />
      </section>
    </main>
  )
}
