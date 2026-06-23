"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./preview.module.css"

export interface DeviceFrameSpec {
  /** Logical CSS viewport width handed to the embedded hero, in px. */
  width: number
  /** Aspect ratio (width / height) used to size the device viewport. */
  ratio: number
  label: string
  kind: "desktop" | "tablet" | "mobile"
}

interface DeviceFrameProps {
  spec: DeviceFrameSpec
  src: string
  title: string
}

/**
 * Renders an iframe at the spec's logical width (so the embedded hero sees a
 * real viewport of that width) and CSS-scales it down to fit the available
 * column. The wrapper reserves the scaled height so layout never overflows.
 */
export function DeviceFrame({ spec, src, title }: DeviceFrameProps) {
  const slotRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)

  const frameHeight = Math.round(spec.width / spec.ratio)

  const measure = useCallback(() => {
    const slot = slotRef.current
    if (!slot) return
    const available = slot.clientWidth
    // Never upscale above 1; only shrink wide frames to fit the column.
    const next = available > 0 ? Math.min(1, available / spec.width) : 1
    setScale(next)
  }, [spec.width])

  useEffect(() => {
    measure()
    const slot = slotRef.current
    if (!slot || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure)
      return () => window.removeEventListener("resize", measure)
    }
    const observer = new ResizeObserver(() => measure())
    observer.observe(slot)
    return () => observer.disconnect()
  }, [measure])

  const scaledHeight = Math.round(frameHeight * scale)

  return (
    <figure className={styles.device} data-kind={spec.kind}>
      <figcaption className={styles.deviceCaption}>
        <span className={styles.deviceLabel}>{spec.label}</span>
        <span className={styles.deviceWidth}>{spec.width}px</span>
      </figcaption>
      <div className={styles.deviceSlot} ref={slotRef} style={{ height: `${scaledHeight}px` }}>
        <div
          className={styles.deviceScaler}
          style={{
            width: `${spec.width}px`,
            height: `${frameHeight}px`,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            className={styles.deviceFrame}
            src={src}
            title={`${title} at ${spec.width}px`}
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
          />
        </div>
      </div>
    </figure>
  )
}
