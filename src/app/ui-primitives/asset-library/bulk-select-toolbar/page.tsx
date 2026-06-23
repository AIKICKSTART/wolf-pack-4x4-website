import type { Metadata } from "next"

import { BulkSelectToolbar } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Bulk-select toolbar | Asset Library",
  description:
    "Primitive 07 — floating toolbar that appears once one or more assets are selected, exposing tag / move / download / license / archive.",
}

export default function BulkSelectToolbarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Bulk"
        title="Bulk-select toolbar"
        description="A floating toolbar that animates into view when one or more assets are selected. Surfaces the most common bulk actions — tag, move, download, license, archive — alongside a clear-selection control."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Bulk-select toolbar" },
        ]}
      />
      <section
        className={styles.demoSurface}
        style={{ minHeight: 240, position: "relative", paddingBottom: 100 }}
      >
        <span className={styles.demoLabel}>
          Live primitive — 8 assets selected
        </span>
        <p
          style={{
            color: "var(--primitive-body)",
            margin: 0,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          Imagine an asset grid above. The toolbar docks to the bottom of its
          container, so it can ride along with scroll without obscuring the
          grid content.
        </p>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <BulkSelectToolbar selectedCount={8} />
        </div>
      </section>
    </main>
  )
}
