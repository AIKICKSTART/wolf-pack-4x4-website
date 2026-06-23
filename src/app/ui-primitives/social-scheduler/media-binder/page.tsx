import type { Metadata } from "next"

import { MediaBinder } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { MEDIA_BINDER_ITEMS, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Media binder | Muffler Pulse",
  description:
    "Primitive 11 — attached media tray with per-platform aspect-ratio fit chips.",
}

export default function MediaBinderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Media binder"
        title="Media binder"
        description="The attachments tray for the active draft. Each asset is checked against each platform's aspect ratio expectations and labelled ok, crop, or fail before anything goes near the publish queue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Media binder" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Mixed media set</span>
        <MediaBinder items={MEDIA_BINDER_ITEMS} platforms={PLATFORMS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Vertical-only (reels + 9:16)</span>
        <MediaBinder
          title="Vertical drop"
          items={MEDIA_BINDER_ITEMS.filter((m) => m.aspectRatio === "9:16")}
          platforms={PLATFORMS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · 16:9 dyno asset (X-first)</span>
        <MediaBinder
          title="Dyno curve"
          items={MEDIA_BINDER_ITEMS.filter((m) => m.aspectRatio === "16:9")}
          platforms={PLATFORMS}
        />
      </section>
    </main>
  )
}
