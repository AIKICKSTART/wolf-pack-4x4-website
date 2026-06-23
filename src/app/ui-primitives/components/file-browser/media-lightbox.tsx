"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import {
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
} from "react"

import styles from "./media-lightbox.module.css"

export interface MediaAsset {
  id: string
  src: string
  thumb?: string
  name: string
  caption?: string
  dimensions?: { width: number; height: number }
  meta?: ReadonlyArray<{ label: string; value: string }>
}

interface MediaLightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assets: ReadonlyArray<MediaAsset>
  initialIndex?: number
}

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

export function MediaLightbox({
  open,
  onOpenChange,
  assets,
  initialIndex = 0,
}: MediaLightboxProps) {
  const [index, setIndex] = useState<number>(initialIndex)
  const [zoom, setZoom] = useState<number>(1)
  const [infoOpen, setInfoOpen] = useState<boolean>(true)
  const [prevOpen, setPrevOpen] = useState<boolean>(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setIndex(initialIndex)
      setZoom(1)
    }
  }

  const total = assets.length
  const safeIndex = total === 0 ? 0 : Math.min(Math.max(index, 0), total - 1)
  const current = assets[safeIndex]

  const goPrev = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i - 1 + total) % total)
    setZoom(1)
  }, [total])

  const goNext = useCallback(() => {
    if (total === 0) return
    setIndex((i) => (i + 1) % total)
    setZoom(1)
  }, [total])

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault()
        zoomIn()
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault()
        zoomOut()
      } else if (event.key === "i" || event.key === "I") {
        event.preventDefault()
        setInfoOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, goPrev, goNext, zoomIn, zoomOut])

  const handleStageKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onOpenChange(false)
    }
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup} onKeyDown={handleStageKey}>
          <header className={styles.bar}>
            <BaseDialog.Title className={styles.title}>
              {current?.name ?? "Media"}
              <span className={styles.counter}>
                {safeIndex + 1} / {total}
              </span>
            </BaseDialog.Title>
            <div className={styles.barControls}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={zoomOut}
                aria-label="Zoom out"
                disabled={zoom <= MIN_ZOOM}
              >
                <ZoomOut size={14} strokeWidth={2.2} />
              </button>
              <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={zoomIn}
                aria-label="Zoom in"
                disabled={zoom >= MAX_ZOOM}
              >
                <ZoomIn size={14} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                className={[
                  styles.iconBtn,
                  infoOpen ? styles.iconBtnActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setInfoOpen((v) => !v)}
                aria-pressed={infoOpen}
                aria-label="Toggle info pane"
              >
                <Info size={14} strokeWidth={2.2} />
              </button>
              <BaseDialog.Close
                render={(props) => (
                  <button
                    {...props}
                    className={styles.iconBtn}
                    aria-label="Close lightbox"
                  >
                    <X size={14} strokeWidth={2.2} />
                  </button>
                )}
              />
            </div>
          </header>

          <div className={styles.stage}>
            <button
              type="button"
              className={[styles.nav, styles.navLeft].join(" ")}
              onClick={goPrev}
              aria-label="Previous"
              disabled={total <= 1}
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>

            {current ? (
              <div
                className={styles.frame}
                style={{ transform: `scale(${zoom})` }}
              >
                <Image
                  src={current.src}
                  alt={current.name}
                  width={current.dimensions?.width ?? 1280}
                  height={current.dimensions?.height ?? 720}
                  className={styles.image}
                  unoptimized
                />
              </div>
            ) : (
              <p className={styles.empty}>No assets to display.</p>
            )}

            <button
              type="button"
              className={[styles.nav, styles.navRight].join(" ")}
              onClick={goNext}
              aria-label="Next"
              disabled={total <= 1}
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>

            {infoOpen && current ? (
              <aside className={styles.info} aria-label="Asset information">
                <h4 className={styles.infoHead}>Info</h4>
                {current.caption ? (
                  <p className={styles.infoCaption}>{current.caption}</p>
                ) : null}
                <dl className={styles.infoList}>
                  {current.dimensions ? (
                    <div>
                      <dt>Dimensions</dt>
                      <dd>
                        {current.dimensions.width} × {current.dimensions.height}
                      </dd>
                    </div>
                  ) : null}
                  {current.meta?.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            ) : null}
          </div>

          {total > 1 ? (
            <div
              className={styles.thumbs}
              role="listbox"
              aria-label="Asset thumbnails"
            >
              {assets.map((asset, idx) => (
                <button
                  key={asset.id}
                  type="button"
                  role="option"
                  aria-selected={idx === safeIndex}
                  className={[
                    styles.thumb,
                    idx === safeIndex ? styles.thumbActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    setIndex(idx)
                    setZoom(1)
                  }}
                >
                  <Image
                    src={asset.thumb ?? asset.src}
                    alt=""
                    width={64}
                    height={42}
                    className={styles.thumbImage}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default MediaLightbox
