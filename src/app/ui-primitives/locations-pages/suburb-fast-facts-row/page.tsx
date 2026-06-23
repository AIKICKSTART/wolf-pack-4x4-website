import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbFastFactsRow } from "../../components/locations-pages"

import { FAST_FACTS } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Suburb fast facts row | Locations & Suburbs",
  description:
    "Primitive 02 — semantic dl of suburb stat tiles. Composes MaterialSurface.",
}

export default function SuburbFastFactsRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Suburb fast facts"
        title="Suburb fast facts row"
        description="Five stat tiles laid out as a semantic dl — postcode, LGA, population estimate, average vehicle age, and distance from the Oak Flats workshop."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Suburb fast facts row" },
        ]}
      />

      <span className={styles.stageCaption}>Suburb · Albion Park Rail NSW</span>
      <SuburbFastFactsRow heading="Albion Park Rail fast facts" facts={FAST_FACTS} />
    </main>
  )
}
