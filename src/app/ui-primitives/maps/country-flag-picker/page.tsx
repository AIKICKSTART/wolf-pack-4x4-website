import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CountryFlagPicker } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Country flag picker | Maps & Location",
  description:
    "Primitive 11 — searchable country selector with inline flag SVGs.",
}

export default function CountryFlagPickerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Country flag picker"
        title="Country flag picker"
        description="Searchable country selector. AU, NZ, US, UK, IE, CA, ZA are pinned at the top in that order; the rest is alphabetical. Each entry renders an inline SVG flag for visual recognition."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Country flag picker" },
        ]}
      />
      <section className={styles.stageFrame} aria-label="Country flag picker demo">
        <CountryFlagPicker value="AU" />
      </section>
    </main>
  )
}
