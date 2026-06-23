import type { Metadata } from "next"

import { DamPreviewPane } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_HERO_ASSET,
  DEMO_LINKED_COLLECTIONS,
  DEMO_PREVIEW_PROPERTIES,
} from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "DAM preview pane | Asset Library",
  description:
    "Primitive 10 — right-side preview pane with large media, metadata, EXIF, linked-collections row, and actions.",
}

export default function DamPreviewPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Preview"
        title="DAM preview pane"
        description="The right-side pane shown when an asset is selected in the DAM grid. Displays a large preview, key chips, EXIF / properties, the collections this asset is linked to, and the core actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Preview pane" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 460, marginInline: "auto" }}>
          <DamPreviewPane
            asset={DEMO_HERO_ASSET}
            properties={DEMO_PREVIEW_PROPERTIES}
            linkedCollections={DEMO_LINKED_COLLECTIONS}
          />
        </div>
      </section>
    </main>
  )
}
