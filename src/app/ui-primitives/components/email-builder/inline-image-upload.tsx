"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./inline-image-upload.module.css"

interface InlineImageUploadProps {
  /** Optional pre-populated alt text. */
  defaultAlt?: string
  /** Optional pre-populated link target. */
  defaultHref?: string
  /** Initial retina state. */
  defaultRetina?: boolean
  /** Display label for the existing image source — e.g. an asset library row. */
  selectedAssetLabel?: string
  className?: string
}

export function InlineImageUpload({
  defaultAlt = "",
  defaultHref = "",
  defaultRetina = true,
  selectedAssetLabel,
  className,
}: InlineImageUploadProps) {
  const [alt, setAlt] = useState<string>(defaultAlt)
  const [href, setHref] = useState<string>(defaultHref)
  const [retina, setRetina] = useState<boolean>(defaultRetina)
  const [drag, setDrag] = useState<boolean>(false)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Image block upload">
      <header className={styles.head}>
        <span className={styles.kicker}>Image block</span>
        <h3 className={styles.title}>Drop, link, or pick an asset</h3>
      </header>

      <div
        className={[styles.dropZone, drag ? styles.dropZoneActive : ""]
          .filter(Boolean)
          .join(" ")}
        role="button"
        tabIndex={0}
        aria-label="Drop image or open asset picker"
        onDragEnter={(event) => {
          event.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          setDrag(false)
        }}
      >
        <span className={styles.dropGlyph} aria-hidden="true">
          ⤓
        </span>
        <span className={styles.dropTitle}>Drop image to upload</span>
        <span className={styles.dropHint}>
          PNG · JPG · WebP — 1200 × 600 recommended
        </span>
        <div className={styles.dropActions}>
          <span className={styles.dropBtn}>Browse files</span>
          <span className={styles.dropBtnGhost}>Pick from library</span>
        </div>
      </div>

      {selectedAssetLabel ? (
        <div className={styles.selected}>
          <Chip
            label={selectedAssetLabel}
            tone="teal"
            selected
          />
        </div>
      ) : null}

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email-builder-img-alt">
          Alt text
        </label>
        <input
          id="email-builder-img-alt"
          type="text"
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
          placeholder="Describe the image for screen readers"
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email-builder-img-href">
          Link target
        </label>
        <input
          id="email-builder-img-href"
          type="url"
          value={href}
          onChange={(event) => setHref(event.target.value)}
          placeholder="https://mufflermen.com.au/winter-special"
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Serve retina @2x</span>
        <button
          type="button"
          role="switch"
          aria-checked={retina}
          className={[styles.toggle, retina ? styles.toggleOn : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setRetina((value) => !value)}
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>
    </section>
  )
}
