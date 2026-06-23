"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

import styles from "./video-lightbox.module.css"

interface VideoLightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  src: string
  poster?: string
  caption?: string
}

export function VideoLightbox({
  open,
  onOpenChange,
  title,
  src,
  poster,
  caption,
}: VideoLightboxProps) {
  const [reduceMotion, setReduceMotion] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <header className={styles.bar}>
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            <BaseDialog.Close className={styles.iconBtn} aria-label="Close video">
              <X size={16} strokeWidth={2.2} aria-hidden="true" />
            </BaseDialog.Close>
          </header>
          <div className={styles.stage}>
            {reduceMotion && poster ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={poster} alt={title} className={styles.poster} />
            ) : (
              <video
                className={styles.video}
                src={src}
                poster={poster}
                controls
                playsInline
                preload="metadata"
              >
                <track kind="captions" />
              </video>
            )}
          </div>
          {caption && (
            <BaseDialog.Description className={styles.caption}>{caption}</BaseDialog.Description>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default VideoLightbox
