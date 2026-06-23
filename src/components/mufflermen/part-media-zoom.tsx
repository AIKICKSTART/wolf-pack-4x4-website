"use client"

import { Maximize2, ZoomIn, X } from "lucide-react"
import * as React from "react"
import { createPortal } from "react-dom"

/* Part detail media viewer. The product imgs stay server-rendered (LCP);
   this component only adds the interaction layer:
   - cursor-tracked transform-origin vars for the CSS hover zoom (26-presentation)
   - click on any [data-zoom-index] img, or the visible viewer button, opens
     a full-viewport lightbox (portal): aria-modal dialog, focus trap, Esc,
     scrim click, keyboard thumbs and arrow-key navigation. */
export function PartMediaZoom({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = React.useState<number | null>(null)
  const [magnified, setMagnified] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const frameRef = React.useRef<HTMLElement>(null)
  const portalRoot = typeof document === "undefined" ? null : document.body

  const showImage = React.useCallback((index: number) => {
    setMagnified(false)
    setActive(index)
  }, [])

  // Open from the server-rendered imgs + track cursor for the hover zoom.
  React.useEffect(() => {
    const media = triggerRef.current?.closest<HTMLElement>(".seo-product-media")
    if (!media) return undefined

    const onClick = (event: MouseEvent) => {
      const img = (event.target as HTMLElement).closest<HTMLElement>("img[data-zoom-index]")
      if (!img) return
      const index = Number(img.dataset.zoomIndex)
      showImage(Number.isFinite(index) ? Math.min(Math.max(index, 0), images.length - 1) : 0)
    }
    const onMove = (event: MouseEvent) => {
      const img = media.querySelector<HTMLElement>(':scope > img[data-zoom-index="0"]')
      if (!img) return
      const rect = img.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      media.style.setProperty("--zoom-ox", `${Math.min(100, Math.max(0, x)).toFixed(1)}%`)
      media.style.setProperty("--zoom-oy", `${Math.min(100, Math.max(0, y)).toFixed(1)}%`)
    }

    media.addEventListener("click", onClick)
    media.addEventListener("mousemove", onMove)
    return () => {
      media.removeEventListener("click", onClick)
      media.removeEventListener("mousemove", onMove)
    }
  }, [images.length, showImage])

  const close = React.useCallback(() => {
    setMagnified(false)
    setActive(null)
    triggerRef.current?.focus()
  }, [])

  // Scroll lock + focus management while the dialog is open.
  React.useEffect(() => {
    if (active === null) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>(".part-zoom-close")?.focus()
    })
    return () => {
      document.body.style.overflow = previousOverflow
      cancelAnimationFrame(frame)
    }
  }, [active])

  const onDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      close()
      return
    }
    if (event.key === "ArrowRight" && images.length > 1) {
      setMagnified(false)
      setActive((current) => (current === null ? 0 : (current + 1) % images.length))
      return
    }
    if (event.key === "ArrowLeft" && images.length > 1) {
      setMagnified(false)
      setActive((current) => (current === null ? 0 : (current - 1 + images.length) % images.length))
      return
    }
    if (event.key === "Tab") {
      const dialog = dialogRef.current
      if (!dialog) return
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>("button:not([disabled])"),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="seo-product-zoom-open"
        aria-haspopup="dialog"
        aria-label={`Open larger image viewer for ${title}`}
        onClick={() => showImage(0)}
      >
        <Maximize2 aria-hidden="true" size={17} />
        <span>View larger</span>
      </button>
      {portalRoot && active !== null
        ? createPortal(
            <div
              ref={dialogRef}
              className="part-zoom-overlay"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} image viewer`}
              onKeyDown={onDialogKeyDown}
              onClick={close}
            >
              <figure
                ref={frameRef}
                className={`part-zoom-frame${magnified ? " is-magnified" : ""}`}
                onClick={(event) => {
                  event.stopPropagation()
                  const frame = frameRef.current
                  if (frame) {
                    const rect = frame.getBoundingClientRect()
                    const x = ((event.clientX - rect.left) / rect.width) * 100
                    const y = ((event.clientY - rect.top) / rect.height) * 100
                    frame.style.setProperty("--mag-ox", `${Math.min(100, Math.max(0, x)).toFixed(1)}%`)
                    frame.style.setProperty("--mag-oy", `${Math.min(100, Math.max(0, y)).toFixed(1)}%`)
                  }
                  setMagnified((current) => !current)
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[active]}
                  alt={`${title}, large view ${active + 1} of ${images.length}`}
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget
                    if (naturalWidth > 0 && naturalHeight > 0) {
                      frameRef.current?.style.setProperty(
                        "--plate-ar",
                        (naturalWidth / naturalHeight).toFixed(4),
                      )
                    }
                  }}
                />
              </figure>
              <button
                type="button"
                className="part-zoom-magnify"
                aria-pressed={magnified}
                aria-label={magnified ? "Reset magnification" : "Magnify image 2x"}
                onClick={(event) => {
                  event.stopPropagation()
                  setMagnified((current) => !current)
                }}
              >
                <ZoomIn aria-hidden="true" size={20} />
              </button>
              <button
                type="button"
                className="part-zoom-close"
                aria-label="Close image viewer"
                onClick={(event) => {
                  event.stopPropagation()
                  close()
                }}
              >
                <X aria-hidden="true" size={20} />
              </button>
              {images.length > 1 && (
                <div
                  className="part-zoom-thumbs"
                  role="group"
                  aria-label="Choose part image"
                  onClick={(event) => event.stopPropagation()}
                >
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`View image ${index + 1} of ${images.length}`}
                      aria-current={index === active}
                      onClick={() => showImage(index)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>,
            portalRoot,
          )
        : null}
    </>
  )
}
