"use client"

import { useState } from "react"

import { VideoLightbox } from "../../components/overlays"
import styles from "../overlays.module.css"

export function VideoLightboxDemo() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Play workshop reel
        </button>
        <span className={styles.statusPill}>Bay 04 · build time-lapse</span>
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <VideoLightbox
        open={open}
        onOpenChange={setOpen}
        title="Bay 04 build time-lapse"
        src="/media/cinematic/home-exhaust.mp4"
        poster="/media/workshop-performance-exhaust.webp"
        caption="Mandrel-bent 2.5-inch stainless cat-back · welded, hung, dyno-confirmed in 4h 12m."
      />
    </div>
  )
}
