import type { Metadata } from "next"

import { ClipThumbnailStrip } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Clip thumbnail strip | Video editor",
  description:
    "Primitive 02 — clip with multiple thumbnails strung along its width, a name overlay, and a duration chip.",
}

export default function ClipThumbnailStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Clip thumbnail strip"
        title="Clip thumbnail strip"
        description="Inside a video track, a clip with multiple frame thumbnails strung along its width, with a name overlay and a duration chip. Supports idle / selected / trimming / locked / muted clip states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Clip thumbnail strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop tour — clip states</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ display: "grid", gridAutoFlow: "column", gap: "10px", height: "84px" }}>
            <ClipThumbnailStrip
              name="B-roll Hilux arrive"
              durationSec={4.8}
              width="240px"
              thumbnails={[
                { label: "Hilux 01" },
                { label: "Hilux 02" },
                { label: "Hilux 03" },
                { label: "Hilux 04" },
              ]}
            />
            <ClipThumbnailStrip
              name="Tear down old muffler"
              durationSec={12.4}
              width="280px"
              state="selected"
              thumbnails={[
                { label: "Tear 01" },
                { label: "Tear 02" },
                { label: "Tear 03" },
                { label: "Tear 04" },
                { label: "Tear 05" },
              ]}
            />
            <ClipThumbnailStrip
              name="Manta cat-back fit"
              durationSec={9.6}
              width="220px"
              state="trimming"
              thumbnails={[
                { label: "Manta 01" },
                { label: "Manta 02" },
                { label: "Manta 03" },
                { label: "Manta 04" },
              ]}
            />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Locked / muted variants</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ display: "grid", gridAutoFlow: "column", gap: "10px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Dyno run"
              durationSec={6.0}
              width="220px"
              state="locked"
              thumbnails={[
                { label: "Dyno 01" },
                { label: "Dyno 02" },
                { label: "Dyno 03" },
              ]}
            />
            <ClipThumbnailStrip
              name="Owner reaction"
              durationSec={3.2}
              width="160px"
              state="muted"
              thumbnails={[
                { label: "Owner 01" },
                { label: "Owner 02" },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
