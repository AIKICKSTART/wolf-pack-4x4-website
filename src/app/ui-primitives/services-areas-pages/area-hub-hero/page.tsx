import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AreaHubHero } from "../../components/services-areas-pages"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Area hub hero | Services & areas | UI Primitives",
  description:
    "Regional area-hub hero — region headline, suburbs + workshops chips, dual CTA, split-credit layout.",
}

export default function AreaHubHeroScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09"
        title="Area hub hero"
        description="Regional area-hub hero used at the top of the Illawarra / Eurobodalla / Shoalhaven / South Coast NSW hub pages. Composes the marketing TextFirstHero primitive in split-credit layout — region headline, suburbs-count + workshops-count trust chips, primary book + secondary quote CTAs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Area hub hero" },
        ]}
      />
      <AreaHubHero
        region="illawarra"
        copy="Illawarra coverage spans Oak Flats, Albion Park, Shellharbour, Wollongong, Dapto, Kiama, and Helensburgh — same-day repair work and longer custom-exhaust builds out of the Albion Park Rail workshop."
        suburbsCount={62}
        workshopsCount={1}
        primaryCta={{ label: "Book a slot", href: "#book" }}
        secondaryCta={{ label: "Get a quote", href: "#quote" }}
      />
    </main>
  )
}
