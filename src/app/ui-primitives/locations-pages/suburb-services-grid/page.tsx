import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SuburbServicesGrid } from "../../components/locations-pages"

import { SUBURB_SERVICES } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Suburb services grid | Locations & Suburbs",
  description:
    "Primitive 12 — services available in this suburb with localised chips.",
}

export default function SuburbServicesGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Suburb services grid"
        title="Suburb services grid"
        description="Service tiles localised to the focal suburb. The teal localised chip on each tile is rendered via primitives/Chip and pairs the service offer with the suburb name."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Suburb services grid" },
        ]}
      />

      <SuburbServicesGrid suburbName="Albion Park Rail" services={SUBURB_SERVICES} />
    </main>
  )
}
