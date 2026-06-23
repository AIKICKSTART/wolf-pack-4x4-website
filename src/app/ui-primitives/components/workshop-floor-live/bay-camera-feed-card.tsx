import { Camera, Maximize2, Video } from "lucide-react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./bay-camera-feed-card.module.css"

export type BayCameraFeedQuality = "live" | "delayed" | "offline"

export interface BayCameraFeedCardProps {
  bay: BayId
  /** Camera name e.g. "Cam-2 · ceiling". */
  cameraName: string
  /** Timestamp formatted "13:42:08". */
  timestamp: string
  /** Quality of the feed. */
  quality: BayCameraFeedQuality
  /** Snapshot time stamp, e.g. "13:36 · last weld photo". */
  lastSnapshot?: string
  className?: string
}

const QUALITY_LABEL: Record<BayCameraFeedQuality, string> = {
  live: "Live",
  delayed: "Buffered",
  offline: "Offline",
}

const QUALITY_TONE: Record<BayCameraFeedQuality, "green" | "amber" | "red"> = {
  live: "green",
  delayed: "amber",
  offline: "red",
}

export function BayCameraFeedCard({
  bay,
  cameraName,
  timestamp,
  quality,
  lastSnapshot,
  className,
}: BayCameraFeedCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const isOffline = quality === "offline"

  return (
    <article
      className={classes}
      aria-label={`${BAY_LABEL[bay]} camera feed — ${QUALITY_LABEL[quality]}`}
    >
      <div className={styles.viewport} data-quality={quality}>
        {isOffline ? (
          <span className={styles.offline}>
            <Video size={26} strokeWidth={1.4} aria-hidden="true" />
            Feed offline
          </span>
        ) : (
          <>
            <span className={styles.scan} aria-hidden="true" />
            <span className={styles.grid} aria-hidden="true" />
            <span className={styles.timecode}>{timestamp}</span>
            <button type="button" className={styles.expand} aria-label="Expand camera">
              <Maximize2 size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <footer className={styles.foot}>
        <div className={styles.identity}>
          <span className={styles.bay}>{BAY_LABEL[bay]}</span>
          <span className={styles.cam}>{cameraName}</span>
        </div>
        <div className={styles.meta}>
          <Chip label={QUALITY_LABEL[quality]} tone={QUALITY_TONE[quality]} />
          {lastSnapshot && (
            <span className={styles.snap}>
              <Camera size={11} strokeWidth={2.2} aria-hidden="true" />
              {lastSnapshot}
            </span>
          )}
        </div>
      </footer>
    </article>
  )
}

export default BayCameraFeedCard
