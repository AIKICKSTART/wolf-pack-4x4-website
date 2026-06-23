import type { Metadata } from "next"

import { ColorExtractPicker } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_HERO_ASSET, DEMO_SWATCHES } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Colour extract picker | Asset Library",
  description:
    "Primitive 04 — five-swatch palette extracted from an asset with role label and copy-to-clipboard.",
}

export default function ColorExtractPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Palette"
        title="Colour extract picker"
        description="Lifts five representative colours from a media asset and assigns each a role — primary, accent, highlight, midtone, rim light. Click Copy to send the hex to your clipboard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Colour extract" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 420 }}>
          <ColorExtractPicker
            assetName={DEMO_HERO_ASSET.name}
            swatches={DEMO_SWATCHES}
          />
        </div>
      </section>
    </main>
  )
}
