import type { Metadata } from "next"

import { MediaBinder } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { DEMO_ASSETS } from "../../asset-library/asset-library-fixtures"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Media binder | Content studio",
  description:
    "Primitive 05 — inline asset chooser wired into the DAM. Three states — image tab (default), video tab with one inserted, audio tab empty query.",
}

const INSERTED_IMAGE_IDS = ["asset-manta-catback"]
const INSERTED_VIDEO_IDS = ["asset-bay-2-tour"]

export default function MediaBinderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Media binder"
        title="Media binder"
        description="The binder lets writers pull straight from the DAM and drop assets into the open draft. Three states — image tab default, video tab with a clip already inserted, audio tab."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Media binder" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <MediaBinder
            assets={DEMO_ASSETS}
            insertedIds={INSERTED_IMAGE_IDS}
            defaultKind="image"
          />
          <MediaBinder
            assets={DEMO_ASSETS}
            insertedIds={INSERTED_VIDEO_IDS}
            defaultKind="video"
          />
          <MediaBinder
            assets={DEMO_ASSETS}
            defaultKind="audio"
          />
        </div>
      </section>
    </main>
  )
}
