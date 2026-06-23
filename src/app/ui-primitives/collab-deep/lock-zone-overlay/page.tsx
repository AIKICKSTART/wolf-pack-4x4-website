import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LockZoneOverlay } from "../../components/collab-deep"

import { LOCK_EXPORT, LOCK_HERO, LOCK_PRICE } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Lock zone overlay | Collab deep",
  description:
    "Primitive 07 — translucent overlay that locks a section while another collaborator edits, renders or exports it.",
}

export default function LockZoneOverlayPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Lock"
        title="Lock zone overlay"
        description="Translucent overlay over a section that another collaborator is currently editing, reviewing, rendering, or exporting. Hatched background and tinted bar — read-only intent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Lock zone overlay" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Editing · Tim H. on price</span>
        <LockZoneOverlay lock={LOCK_PRICE} hint="Auto-unlock in 12s">
          <p style={{ margin: 0 }}>
            A$ 1,499 · RRP · GST inclusive · Free shipping Wollongong → Bowral
          </p>
        </LockZoneOverlay>

        <span className={styles.stageCaption}>Rendering · Hannah K. on hero image</span>
        <LockZoneOverlay lock={LOCK_HERO}>
          <p style={{ margin: 0 }}>
            Hero / 2400×1600 / hangers shot — uploading from Bay 3
          </p>
        </LockZoneOverlay>

        <span className={styles.stageCaption}>Exporting · Daniel V. on catalogue PDF</span>
        <LockZoneOverlay lock={LOCK_EXPORT} hint="14% of 64 pages" />
      </section>
    </main>
  )
}
