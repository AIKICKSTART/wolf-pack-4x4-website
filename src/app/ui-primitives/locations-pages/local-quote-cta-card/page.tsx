import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LocalQuoteCtaCard } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Local quote CTA card | Locations & Suburbs",
  description:
    "Primitive 07 — local quote CTA. Composes GlassSurface + primitives/Chip toggle.",
}

export default function LocalQuoteCtaCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Local quote CTA card"
        title="Local quote CTA card"
        description="GlassSurface-wrapped CTA — phone chip, book-online button, and a drop-off vs mobile-fit toggle built from primitives/Chip selected state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Local quote CTA card" },
        ]}
      />

      <LocalQuoteCtaCard
        suburbName="Albion Park Rail"
        phoneDisplay="(02) 4256 7000"
        phoneHref="tel:+61242567000"
        bookHref="#book"
        defaultMode="drop-off"
        body="Drop your ute at the Central Ave bay or have the Mufflermen mobile bay attend your Albion Park Rail address. Quote confirmed in writing inside 24 hours."
      />
    </main>
  )
}
