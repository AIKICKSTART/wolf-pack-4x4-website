import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PhotoReviewAttachment } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Photo attachment | Reviews",
  description:
    "Primitive 06 — photo strip on a review with click-to-expand lightbox.",
}

const MANTA_PHOTOS = [
  { id: "photo-a", alt: "Manta cat-back tip flush with rear bar" },
  { id: "photo-b", alt: "Underside view of muffler tuck near diff" },
  { id: "photo-c", alt: "Bay 2 hoist shot during install" },
  { id: "photo-d", alt: "Final tip alignment in workshop light" },
] as const

const SINGLE_PHOTO = [
  { id: "single-a", alt: "Mid-pipe X-pipe weld closeup", caption: "Magnaflow X-pipe weld — Toby’s Hilux" },
] as const

const EMPTY_PHOTOS: ReadonlyArray<{ id: string; alt: string }> = []

export default function PhotoReviewAttachmentScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Photos"
        title="Photo review attachment"
        description="Reviewer-supplied photo strip with click-to-expand lightbox. Photos render numbered placeholders when an image source isn’t available — useful for moderation-queue previews."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Photo attachment" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Four-photo strip from a Manta install review</span>
        <PhotoReviewAttachment photos={MANTA_PHOTOS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Single photo with caption</span>
        <PhotoReviewAttachment photos={SINGLE_PHOTO} label="One photo attached" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty state</span>
        <PhotoReviewAttachment photos={EMPTY_PHOTOS} />
      </section>
    </main>
  )
}
