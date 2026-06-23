import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { ImageLightboxDemo } from "./image-lightbox-demo"

export const metadata: Metadata = {
  title: "Image lightbox | UI Primitives — Overlays",
}

export default function ImageLightboxPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 08"
        title="Image lightbox"
        description="Image lightbox with click-to-zoom, drag-to-pan, thumbnail navigation, and full keyboard control — arrow keys for slide change, Esc to dismiss."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Image lightbox" },
        ]}
      />
      <section className={styles.canvas} aria-label="Image lightbox demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Workshop walkaround photos, customer-supplied damage shots, after-build photography
            for the quote PDF. Operators zoom in on specific welds and tip clearances.
          </p>
        </div>
        <ImageLightboxDemo />
      </section>
    </main>
  )
}
