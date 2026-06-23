import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartImageGallery } from "../../components/parts-pages"

import { GALLERY_IMAGES } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part image gallery | Parts pages",
  description: "Primitive 06 — Part image gallery with thumb strip, zoom indicator, supplier watermark variant, and fallback.",
}

export default function PartImageGalleryPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Image gallery"
        title="Part image gallery"
        description="Square primary stage with zoom toggle, thumbnail strip, and a supplier-watermark variant for media that has supplier brand overlay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Image gallery" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Click Zoom to expand the primary image — thumbs are scrubbable</span>
        <div style={{ maxWidth: 420 }}>
          <PartImageGallery images={GALLERY_IMAGES} />
        </div>
      </div>
    </main>
  )
}
