import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BayCameraFeedCard } from "../../components/workshop-floor-live"
import type { BayCameraFeedCardProps } from "../../components/workshop-floor-live"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Bay camera feed card | UI Primitives — Workshop Floor Live",
}

const feeds: ReadonlyArray<BayCameraFeedCardProps> = [
  {
    bay: "bay-1",
    cameraName: "Cam-1 · ceiling",
    timestamp: "11:58:42",
    quality: "live",
    lastSnapshot: "11:42 · floor wash",
  },
  {
    bay: "bay-2",
    cameraName: "Cam-2 · hoist west",
    timestamp: "11:58:42",
    quality: "live",
    lastSnapshot: "11:54 · cat-back fit",
  },
  {
    bay: "bay-3",
    cameraName: "Cam-3 · dyno cell",
    timestamp: "11:58:38",
    quality: "delayed",
    lastSnapshot: "11:50 · pull 03 start",
  },
  {
    bay: "bay-4",
    cameraName: "Cam-4 · ceiling",
    timestamp: "—",
    quality: "offline",
  },
]

export default function BayCameraPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.10 / Workshop floor live"
        title="Bay camera feed card"
        description="Bay camera feed presentation card with a placeholder viewport, scanline animation, timecode overlay, expand control, and a last-snapshot meta strip. Offline state is explicit, not hidden."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Bay camera" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {feeds.map((f) => (
            <BayCameraFeedCard key={f.bay} {...f} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Card surfaces stream quality via a green / amber / red chip. The
            scanline animation is ornament — it cuts to a still frame under
            prefers-reduced-motion. The offline branch falls back to an icon
            and a plain message instead of pretending there is video.
          </p>
        </div>
      </section>
    </main>
  )
}
