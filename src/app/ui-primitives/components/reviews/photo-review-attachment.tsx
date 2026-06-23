"use client"

import { X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { EmptyState } from "../primitives/empty-state"

import styles from "./photo-review-attachment.module.css"

export interface ReviewPhoto {
  id: string
  /** Optional src — when missing, the thumb renders a numbered placeholder. */
  src?: string
  alt: string
  caption?: string
}

export interface PhotoReviewAttachmentProps {
  photos: ReadonlyArray<ReviewPhoto>
  label?: string
  className?: string
}

export function PhotoReviewAttachment({
  photos,
  label = "Photos from this review",
  className,
}: PhotoReviewAttachmentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  const close = useCallback(() => setOpenIndex(null), [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openIndex, close])

  if (photos.length === 0) {
    return (
      <div className={classes}>
        <EmptyState
          title="No photos yet"
          description="The reviewer didn’t attach any workshop photos."
        />
      </div>
    )
  }

  const openPhoto = openIndex !== null ? photos[openIndex] : null

  return (
    <div className={classes}>
      <span className={styles.label}>{label}</span>
      <div className={styles.strip} role="list">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            role="listitem"
            className={styles.thumbButton}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}
          >
            {photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element -- intentional <img> for unoptimized reviewer photos
              <img className={styles.thumb} src={photo.src} alt={photo.alt} />
            ) : (
              <span className={styles.placeholder} aria-hidden="true">
                {index + 1}
              </span>
            )}
            {index === photos.length - 1 && photos.length > 1 ? (
              <span className={styles.count}>{photos.length}</span>
            ) : null}
          </button>
        ))}
      </div>

      {openPhoto ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.alt}
          onClick={close}
        >
          <div
            className={styles.lightboxFrame}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={close}
              aria-label="Close photo"
            >
              <X size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>
            {openPhoto.src ? (
              // eslint-disable-next-line @next/next/no-img-element -- intentional <img> for lightbox
              <img
                className={styles.lightboxImage}
                src={openPhoto.src}
                alt={openPhoto.alt}
              />
            ) : (
              <span className={styles.placeholder} aria-hidden="true">
                {(openIndex ?? 0) + 1}
              </span>
            )}
            {openPhoto.caption ? (
              <p className={styles.lightboxCaption}>{openPhoto.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PhotoReviewAttachment
