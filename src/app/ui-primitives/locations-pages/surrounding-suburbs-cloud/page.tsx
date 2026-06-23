import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SurroundingSuburbsCloud } from "../../components/locations-pages"

import { SURROUNDING_SUBURBS } from "../sample-data"
import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Surrounding suburbs cloud | Locations & Suburbs",
  description:
    "Primitive 06 — surrounding suburbs tag cloud. Composes primitives/Chip.",
}

export default function SurroundingSuburbsCloudPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Surrounding suburbs"
        title="Surrounding suburbs cloud"
        description="Tag-cloud of nearby suburbs rendered with primitives/Chip. Closer suburbs scale larger and pick up warmer tones so the immediate neighbours dominate visually."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Surrounding suburbs cloud" },
        ]}
      />

      <SurroundingSuburbsCloud
        kicker="Illawarra coverage"
        heading="Surrounding suburbs we cover from Albion Park Rail"
        suburbs={SURROUNDING_SUBURBS}
      />
    </main>
  )
}
