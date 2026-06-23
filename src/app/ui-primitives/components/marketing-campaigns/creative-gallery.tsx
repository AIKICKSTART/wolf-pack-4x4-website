"use client"

import { Check, Copy } from "lucide-react"
import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./creative-gallery.module.css"
import {
  CHANNEL_LABEL,
  type ChannelKind,
  type CreativeAsset,
} from "./marketing-campaigns-types"

interface CreativeGalleryProps {
  assets: ReadonlyArray<CreativeAsset>
  /** Channel filter defaults to "all". */
  defaultFilter?: ChannelKind | "all"
  className?: string
}

const FILTER_KEYS: ReadonlyArray<ChannelKind | "all"> = [
  "all",
  "email",
  "sms",
  "push",
  "inapp",
  "banner",
  "social",
]

function filterLabel(kind: ChannelKind | "all"): string {
  return kind === "all" ? "All" : CHANNEL_LABEL[kind]
}

export function CreativeGallery({
  assets,
  defaultFilter = "all",
  className,
}: CreativeGalleryProps) {
  const [filter, setFilter] = useState<ChannelKind | "all">(defaultFilter)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const visibleAssets = useMemo(() => {
    if (filter === "all") return assets
    return assets.filter((a) => a.channel === filter)
  }, [assets, filter])

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Creative gallery"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Creative library</span>
        <span className={styles.count}>
          {selected.size > 0
            ? `${selected.size} selected for A/B`
            : `${visibleAssets.length} assets`}
        </span>
      </header>

      <div className={styles.filters}>
        {FILTER_KEYS.map((key) => (
          <Chip
            key={key}
            label={filterLabel(key)}
            tone={key === filter ? "teal" : "neutral"}
            selected={key === filter}
            onSelect={() => setFilter(key)}
          />
        ))}
      </div>

      <ul className={styles.grid}>
        {visibleAssets.map((asset) => {
          const isSelected = selected.has(asset.id)
          return (
            <li
              key={asset.id}
              className={[styles.tile, isSelected ? styles.tileSelected : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className={styles.thumb}
                aria-pressed={isSelected}
                aria-label={`${asset.title} — ${CHANNEL_LABEL[asset.channel]} creative`}
                onClick={() => toggleSelect(asset.id)}
              >
                <span className={styles.thumbGlyph} aria-hidden="true">
                  {asset.thumbGlyph}
                </span>
                {isSelected ? (
                  <span className={styles.thumbMark} aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                ) : null}
              </button>
              <div className={styles.meta}>
                <span className={styles.title}>{asset.title}</span>
                <span className={styles.subline}>
                  <Chip
                    label={CHANNEL_LABEL[asset.channel]}
                    tone="amber"
                  />
                  {asset.durationLabel ? (
                    <span className={styles.duration}>{asset.durationLabel}</span>
                  ) : null}
                </span>
              </div>
              <button
                type="button"
                className={styles.cloneAction}
                aria-label={`Clone ${asset.title}`}
              >
                <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
                Clone
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CreativeGallery
