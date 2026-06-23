import type { Metadata } from "next"

import {
  ClipThumbnailStrip,
  RazorSplitTool,
} from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Razor split tool | Video editor",
  description:
    "Primitive 07 — razor cursor over the hover position with a split-confirmation popover and a frame-snap toggle.",
}

export default function RazorSplitToolScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Razor split tool"
        title="Razor split tool"
        description="Razor cursor indicator that appears over the hover position with a split-confirmation popover containing a frame-snap toggle. Stateless — caller supplies the hover x and confirms via the popover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Razor split tool" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hovering over Tear down old muffler — popover open</span>
        <div className={styles.demoStage} style={{ minHeight: "200px", padding: "32px 24px" }}>
          <div style={{ position: "relative", width: "280px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Tear down old muffler"
              durationSec={12.4}
              thumbnails={[
                { label: "Tear 01" },
                { label: "Tear 02" },
                { label: "Tear 03" },
                { label: "Tear 04" },
                { label: "Tear 05" },
              ]}
            />
            <RazorSplitTool
              hoverLeftPx={172}
              atDisplay="00:07.6"
              popoverOpen
              snapToFrames
            />
          </div>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hover only · no popover</span>
        <div className={styles.demoStage} style={{ minHeight: "120px" }}>
          <div style={{ position: "relative", width: "240px", height: "84px" }}>
            <ClipThumbnailStrip
              name="Dyno run"
              durationSec={6.0}
              thumbnails={[
                { label: "Dyno 01" },
                { label: "Dyno 02" },
                { label: "Dyno 03" },
              ]}
            />
            <RazorSplitTool hoverLeftPx={96} atDisplay="00:02.4" />
          </div>
        </div>
      </section>
    </main>
  )
}
