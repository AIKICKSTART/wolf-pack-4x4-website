"use client"

import { useState } from "react"

import { ImageLightbox } from "../../components/overlays"
import type { LightboxSlide } from "../../components/overlays"
import styles from "../overlays.module.css"

const SLIDES: ReadonlyArray<LightboxSlide> = [
  {
    src: "/media/workshop-performance-exhaust.webp",
    alt: "Performance exhaust on the bay 04 hoist",
    caption: "Bay 04 · 2017 Holden Commodore VFII SS · post-fitment walkaround",
  },
  {
    src: "/media/exhaust-pipes-tips.webp",
    alt: "Polished twin tips against rolling chassis",
    caption: "Twin 4-inch polished slash-cut tips, hangers welded to OEM spec",
  },
  {
    src: "/media/complete-exhaust-systems.webp",
    alt: "Complete exhaust system on the workshop bench",
    caption: "Mandrel-bent 2.5-inch cat-back, SUS304 stainless, dyno booked Thursday",
  },
  {
    src: "/media/fabrication-service-one.webp",
    alt: "TIG welder in the workshop",
    caption: "TIG bay · purge-back welds, certified to AS/NZS 1554.6",
  },
]

export function ImageLightboxDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [start, setStart] = useState<number>(0)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => {
            setStart(0)
            setOpen(true)
          }}
        >
          Open job 2415 photos
        </button>
        <span className={styles.statusPill}>{SLIDES.length} photos attached</span>
      </div>
      <span className={styles.stageHelp}>
        Trigger · click a thumbnail or the button (← → keyboard navigation)
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "var(--primitive-space-2-5)",
        }}
      >
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.src}
            type="button"
            className={styles.galleryThumb}
            onClick={() => {
              setStart(idx)
              setOpen(true)
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.alt} />
          </button>
        ))}
      </div>

      <ImageLightbox open={open} onOpenChange={setOpen} slides={SLIDES} initialIndex={start} />
    </div>
  )
}
