"use client"

import {
  IMAGE_FIT_LABEL,
  IMAGE_FORMAT_LABEL,
  PRESET_CATEGORY_LABEL,
  formatDimensions,
  type ImagePreset,
  type PresetCategory,
} from "./asset-cdn-types"

import styles from "./image-preset-card.module.css"

interface ImagePresetCardProps {
  preset: ImagePreset
  selected?: boolean
  onSelect?: (preset: ImagePreset) => void
  className?: string
}

const CATEGORY_CLASS: Record<PresetCategory, string> = {
  thumbnail: styles.catThumb,
  hero: styles.catHero,
  "og-image": styles.catOg,
  card: styles.catCard,
  avatar: styles.catAvatar,
  splash: styles.catSplash,
}

const CATEGORY_GLYPH: Record<PresetCategory, string> = {
  thumbnail: "▢",
  hero: "▭",
  "og-image": "▤",
  card: "▥",
  avatar: "●",
  splash: "▦",
}

export function ImagePresetCard({
  preset,
  selected = false,
  onSelect,
  className,
}: ImagePresetCardProps) {
  const aspectRatio = `${preset.transform.width} / ${preset.transform.height}`
  const classes = [
    styles.card,
    CATEGORY_CLASS[preset.category],
    selected ? styles.selected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Image preset ${preset.label}, ${formatDimensions(preset.transform.width, preset.transform.height)}`}
      aria-pressed={onSelect ? selected : undefined}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? () => onSelect(preset) : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onSelect(preset)
              }
            }
          : undefined
      }
    >
      <header className={styles.head}>
        <span className={styles.catChip}>{PRESET_CATEGORY_LABEL[preset.category]}</span>
        <span className={styles.usage}>{preset.usageCount.toLocaleString("en-AU")} uses</span>
      </header>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.frame} style={{ aspectRatio }}>
          <span className={styles.frameGlyph}>{CATEGORY_GLYPH[preset.category]}</span>
          <span className={styles.frameDimChip}>
            {formatDimensions(preset.transform.width, preset.transform.height)}
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{preset.label}</h3>
        <p className={styles.description}>{preset.description}</p>
      </div>

      <footer className={styles.foot}>
        <span className={styles.chip}>{IMAGE_FORMAT_LABEL[preset.transform.format]}</span>
        <span className={styles.chip}>{IMAGE_FIT_LABEL[preset.transform.fit]}</span>
        <span className={styles.chip}>q{preset.transform.quality}</span>
      </footer>
    </article>
  )
}

export default ImagePresetCard
