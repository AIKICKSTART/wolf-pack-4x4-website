import type { Metadata } from "next"

import { InlineImageUpload } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Inline image upload | Email builder",
  description:
    "Primitive 05 — image block upload with drag drop zone, library picker, alt-text, link target, and retina toggle.",
}

export default function InlineImageUploadScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Inline image upload"
        title="Inline image upload"
        description="The image-block editor. A drop zone with library picker, alt-text and link-target inputs, and a retina @2x toggle. The drop zone surfaces an active state when files are being dragged over it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Inline image upload" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter workshop hero</span>
        <div className={styles.demoInline}>
          <InlineImageUpload
            defaultAlt="Winter workshop at sunrise — bay door open"
            defaultHref="https://mufflermen.com.au/winter-special"
            defaultRetina
            selectedAssetLabel="winter-hero@2x.webp · 1200 × 600"
          />
        </div>
      </section>
    </main>
  )
}
