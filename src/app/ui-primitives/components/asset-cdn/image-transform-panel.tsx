"use client"

import { useState, type ChangeEvent } from "react"

import {
  IMAGE_FORMAT_LABEL,
  IMAGE_FIT_LABEL,
  formatDimensions,
  type ImageFit,
  type ImageFormat,
  type ImageTransform,
} from "./asset-cdn-types"

import styles from "./image-transform-panel.module.css"

interface ImageTransformPanelProps {
  defaultTransform?: ImageTransform
  sourceLabel?: string
  onChange?: (transform: ImageTransform) => void
  className?: string
}

const DEFAULT_TRANSFORM: ImageTransform = {
  width: 1920,
  height: 1080,
  format: "auto",
  quality: 82,
  fit: "cover",
  focal: { x: 50, y: 50 },
}

const FORMAT_ORDER: ReadonlyArray<ImageFormat> = [
  "auto",
  "avif",
  "webp",
  "jpeg",
  "png",
]

const FIT_ORDER: ReadonlyArray<ImageFit> = [
  "cover",
  "contain",
  "scale-down",
  "crop",
  "pad",
]

export function ImageTransformPanel({
  defaultTransform = DEFAULT_TRANSFORM,
  sourceLabel = "manta-hero-frame-019.heic",
  onChange,
  className,
}: ImageTransformPanelProps) {
  const [transform, setTransform] = useState<ImageTransform>(defaultTransform)

  const emit = (next: ImageTransform) => {
    setTransform(next)
    onChange?.(next)
  }

  const handleDimChange = (key: "width" | "height") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(16, Math.min(8192, Number(event.target.value) || 0))
      emit({ ...transform, [key]: value })
    }

  const handleQualityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, Number(event.target.value) || 0))
    emit({ ...transform, quality: value })
  }

  const handleFocalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))
    emit({ ...transform, focal: { x, y } })
  }

  const handleFocalKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2
    const { focal } = transform
    let { x, y } = focal
    if (event.key === "ArrowLeft") x = Math.max(0, x - step)
    else if (event.key === "ArrowRight") x = Math.min(100, x + step)
    else if (event.key === "ArrowUp") y = Math.max(0, y - step)
    else if (event.key === "ArrowDown") y = Math.min(100, y + step)
    else return
    event.preventDefault()
    emit({ ...transform, focal: { x, y } })
  }

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="Image transform panel"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Cloudflare image transform</span>
        <h3 className={styles.title}>{sourceLabel}</h3>
        <span className={styles.summary}>
          {formatDimensions(transform.width, transform.height)} ·{" "}
          {IMAGE_FORMAT_LABEL[transform.format]} · q{transform.quality} ·{" "}
          {IMAGE_FIT_LABEL[transform.fit]}
        </span>
      </header>

      <div className={styles.body}>
        <div className={styles.previewCol}>
          <div
            role="application"
            aria-label="Focal point picker"
            tabIndex={0}
            className={styles.preview}
            onClick={handleFocalClick}
            onKeyDown={handleFocalKey}
          >
            <span className={styles.previewGrain} aria-hidden="true" />
            <span className={styles.previewGrid} aria-hidden="true" />
            <span
              className={styles.focal}
              style={{ left: `${transform.focal.x}%`, top: `${transform.focal.y}%` }}
              aria-hidden="true"
            >
              <span className={styles.focalCross} />
            </span>
            <span className={styles.previewBadge}>Focal {Math.round(transform.focal.x)}, {Math.round(transform.focal.y)}</span>
          </div>
          <p className={styles.help}>
            Click the preview or use arrow keys to move the focal point. Shift jumps by 10.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Width</span>
              <input
                className={styles.input}
                type="number"
                inputMode="numeric"
                min={16}
                max={8192}
                value={transform.width}
                onChange={handleDimChange("width")}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Height</span>
              <input
                className={styles.input}
                type="number"
                inputMode="numeric"
                min={16}
                max={8192}
                value={transform.height}
                onChange={handleDimChange("height")}
              />
            </label>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.fieldLabel}>Format</legend>
            <div className={styles.toggleRow} role="radiogroup" aria-label="Output format">
              {FORMAT_ORDER.map((fmt) => {
                const active = transform.format === fmt
                return (
                  <button
                    key={fmt}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={[styles.toggle, active ? styles.toggleOn : ""].filter(Boolean).join(" ")}
                    onClick={() => emit({ ...transform, format: fmt })}
                  >
                    {IMAGE_FORMAT_LABEL[fmt]}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.fieldLabel}>Fit</legend>
            <div className={styles.toggleRow} role="radiogroup" aria-label="Resize behaviour">
              {FIT_ORDER.map((fit) => {
                const active = transform.fit === fit
                return (
                  <button
                    key={fit}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={[styles.toggle, active ? styles.toggleOn : ""].filter(Boolean).join(" ")}
                    onClick={() => emit({ ...transform, fit })}
                  >
                    {IMAGE_FIT_LABEL[fit]}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Quality <em className={styles.fieldValue}>{transform.quality}</em>
            </span>
            <input
              className={styles.slider}
              type="range"
              min={1}
              max={100}
              value={transform.quality}
              onChange={handleQualityChange}
              aria-label="Output quality"
            />
          </label>
        </div>
      </div>
    </section>
  )
}

export default ImageTransformPanel
