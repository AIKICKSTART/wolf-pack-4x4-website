import type { Metadata } from "next"

import {
  ClipThumbnailStrip,
  ClipTrimHandles,
} from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Clip trim handles | Video editor",
  description:
    "Primitive 06 — left + right grips overlaid on a selected clip with hover ripple and a duration-delta chip showing the trim offset.",
}

export default function ClipTrimHandlesScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Clip trim handles"
        title="Clip trim handles"
        description="Trim handles overlaid on the selected clip — left and right grips with hover ripple. When dragging, a duration-delta chip shows the offset in seconds + frames."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Clip trim handles" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Trimming left in — Tear down old muffler · -1.2s</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ position: "relative", width: "280px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Tear down old muffler"
              durationSec={12.4}
              state="trimming"
              thumbnails={[
                { label: "Tear 01" },
                { label: "Tear 02" },
                { label: "Tear 03" },
                { label: "Tear 04" },
                { label: "Tear 05" },
              ]}
            />
            <ClipTrimHandles activeSide="left" deltaSec={-1.2} />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Trimming right out — Manta cat-back fit · +0.8s</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ position: "relative", width: "260px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Manta cat-back fit"
              durationSec={9.6}
              state="trimming"
              thumbnails={[
                { label: "Manta 01" },
                { label: "Manta 02" },
                { label: "Manta 03" },
                { label: "Manta 04" },
              ]}
            />
            <ClipTrimHandles activeSide="right" deltaSec={0.8} />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Idle handles — Dyno run</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ position: "relative", width: "220px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Dyno run"
              durationSec={6.0}
              state="selected"
              thumbnails={[
                { label: "Dyno 01" },
                { label: "Dyno 02" },
                { label: "Dyno 03" },
              ]}
            />
            <ClipTrimHandles activeSide="none" showDelta={false} />
          </div>
        </div>
      </section>
    </main>
  )
}
