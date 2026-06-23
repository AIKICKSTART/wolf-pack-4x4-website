import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbFaq } from "../../components/locations-pages"

import { SUBURB_FAQ } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Suburb FAQ | Locations & Suburbs",
  description:
    "Primitive 13 — suburb FAQ accordion. Adapter over marketing/FaqAccordion.",
}

export default function SuburbFaqPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Suburb FAQ"
        title="Suburb FAQ"
        description="Adapter over marketing/FaqAccordion that supplies suburb-named heading copy and four typical suburb questions — why us, fit time, mobile vs in-workshop, parking."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Suburb FAQ" },
        ]}
      />

      <SuburbFaq suburbName="Albion Park Rail" items={SUBURB_FAQ} />
    </main>
  )
}
