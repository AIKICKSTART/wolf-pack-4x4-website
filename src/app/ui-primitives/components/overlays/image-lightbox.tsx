"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react"

import styles from "./image-lightbox.module.css"

export interface LightboxSlide {
  src: string
  alt: string
  caption?: string
  thumb?: string
}

interface ImageLightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  slides: ReadonlyArray<LightboxSlide>
  initialIndex?: number
}

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

export function ImageLightbox({
  open,
  onOpenChange,
  slides,
  initialIndex = 0,
}: ImageLightboxProps) {
  const [index, setIndex] = useState<number>(initialIndex)
  const [zoom, setZoom] = useState<number>(1)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [prevOpen, setPrevOpen] = useState<boolean>(open)
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setIndex(initialIndex)
      setZoom(1)
      setPan({ x: 0, y: 0 })
    }
  }

  const total = slides.length
  const safeIndex = total === 0 ? 0 : Math.min(Math.max(index, 0), total - 1)
  const current = slides[safeIndex]

  const goPrev = useCallback(() => {
    setIndex((prev) => (total === 0 ? 0 : (prev - 1 + total) % total))
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [total])

  const goNext = useCallback(() => {
    setIndex((prev) => (total === 0 ? 0 : (prev + 1) % total))
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [total])

  useEffect(() => {
    if (!open) {
      return
    }
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrev()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, goNext, goPrev])

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLImageElement>) => {
      if (zoom <= 1) {
        return
      }
      dragRef.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [pan.x, pan.y, zoom],
  )

  const handlePointerMove = useCallback((event: PointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current
    if (!drag) {
      return
    }
    setPan({
      x: drag.panX + (event.clientX - drag.x),
      y: drag.panY + (event.clientY - drag.y),
    })
  }, [])

  const handlePointerUp = useCallback((event: PointerEvent<HTMLImageElement>) => {
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const handleThumbKey = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIndex(idx)
      setZoom(1)
      setPan({ x: 0, y: 0 })
    }
  }

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, z - ZOOM_STEP)
      if (next === 1) {
        setPan({ x: 0, y: 0 })
      }
      return next
    })
  }, [])

  const imageStyle = useMemo(
    () => ({ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }),
    [pan.x, pan.y, zoom],
  )

  if (total === 0 || !current) {
    return null
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <header className={styles.bar}>
            <BaseDialog.Title className={styles.title}>
              {safeIndex + 1} / {total} · {current.alt}
            </BaseDialog.Title>
            <div className={styles.barControls}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={zoomOut}
                aria-label="Zoom out"
                disabled={zoom <= MIN_ZOOM}
              >
                <ZoomOut size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={zoomIn}
                aria-label="Zoom in"
                disabled={zoom >= MAX_ZOOM}
              >
                <ZoomIn size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <BaseDialog.Close className={styles.iconBtn} aria-label="Close lightbox">
                <X size={16} strokeWidth={2.2} aria-hidden="true" />
              </BaseDialog.Close>
            </div>
          </header>
          <div className={styles.stage}>
            <button
              type="button"
              className={[styles.navBtn, styles.navPrev].join(" ")}
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              className={styles.image}
              style={imageStyle}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
            <button
              type="button"
              className={[styles.navBtn, styles.navNext].join(" ")}
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          {current.caption && (
            <BaseDialog.Description className={styles.caption}>
              {current.caption}
            </BaseDialog.Description>
          )}
          {total > 1 && (
            <div className={styles.thumbStrip} role="tablist" aria-label="Image slides">
              {slides.map((slide, idx) => (
                <button
                  key={`${slide.src}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={idx === safeIndex}
                  className={[styles.thumb, idx === safeIndex ? styles.thumbActive : ""].join(" ")}
                  onClick={() => {
                    setIndex(idx)
                    setZoom(1)
                    setPan({ x: 0, y: 0 })
                  }}
                  onKeyDown={(event) => handleThumbKey(event, idx)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.thumb ?? slide.src} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default ImageLightbox
