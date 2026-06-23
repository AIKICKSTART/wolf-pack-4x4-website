import type { Metadata } from "next"

import { MediaPicker } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_MEDIA_ITEMS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Media picker | CMS",
  description:
    "Primitive 13 — DAM-backed media picker with search and focal-point selector.",
}

export default function MediaPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Media"
        title="Media picker"
        description="Gallery picker tied to the workshop's asset library. Each tile reports dimensions and format. The right column holds an interactive focal-point selector — click anywhere on the canvas to set the X / Y crop anchor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Media picker" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · fetching renditions
          </span>
          <MediaPicker items={CMS_MEDIA_ITEMS.slice(0, 6)} loading />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · focal pinned
          </span>
          <MediaPicker
            items={CMS_MEDIA_ITEMS}
            defaultSelectedId="media-hero-1"
            defaultFocalPoint={{ x: 38, y: 42 }}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · DAM offline
          </span>
          <MediaPicker
            items={CMS_MEDIA_ITEMS}
            error="DAM CDN refused signed URLs — credentials may have rotated."
          />
        </div>
      </section>
    </main>
  )
}
