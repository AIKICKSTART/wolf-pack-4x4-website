"use client"

import { useId, useState } from "react"
import { ZoomIn } from "lucide-react"

import type { PartGalleryImage } from "./parts-pages-types"

import styles from "./part-image-gallery.module.css"

export interface PartImageGalleryProps {
  images: ReadonlyArray<PartGalleryImage>
  /** Fallback label shown when images list is empty or has no usable src. */
  fallbackLabel?: string
  className?: string
}

export function PartImageGallery({
  images,
  fallbackLabel = "Media being sourced",
  className,
}: PartImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [zoomed, setZoomed] = useState<boolean>(false)
  const galleryId = useId()

  const active = images[activeIdx]

  return (
    <div
      className={[styles.gallery, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Product images"
      aria-describedby={`${galleryId}-cap`}
    >
      <div
        className={`${styles.stage} ${active?.supplierWatermark ? styles.watermark : ""} ${
          zoomed ? styles.stageZoomed : ""
        }`}
      >
        {active?.src ? (
          <button
            type="button"
            className={styles.zoomBtn}
            onClick={() => setZoomed((value) => !value)}
            aria-pressed={zoomed}
            aria-label={zoomed ? "Reset zoom" : "Zoom image"}
          >
            <ZoomIn size={14} aria-hidden="true" />
            <span>{zoomed ? "Reset" : "Zoom"}</span>
          </button>
        ) : null}

        {active?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={active.src}
            alt={active.alt}
            width={720}
            height={720}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={styles.image}
          />
        ) : (
          <div className={styles.fallback} aria-hidden="true">
            <strong>{fallbackLabel}</strong>
            <span>Specs and fitment available now.</span>
          </div>
        )}

        {active?.supplierWatermark ? (
          <span className={styles.watermarkChip} aria-hidden="true">Supplier image</span>
        ) : null}
      </div>

      <p id={`${galleryId}-cap`} className={styles.caption}>
        {active?.caption ?? active?.alt ?? "Product image"}
      </p>

      {images.length > 1 && (
        <ul className={styles.strip} aria-label="Image thumbnails">
          {images.map((img, idx) => (
            <li key={img.id}>
              <button
                type="button"
                aria-pressed={idx === activeIdx}
                onClick={() => {
                  setActiveIdx(idx)
                  setZoomed(false)
                }}
                className={`${styles.thumb} ${idx === activeIdx ? styles.thumbActive : ""}`}
              >
                {img.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.src}
                    alt=""
                    width={120}
                    height={120}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span aria-hidden="true" className={styles.thumbFallback}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                )}
                <span className={styles.srOnly}>View image {idx + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PartImageGallery
