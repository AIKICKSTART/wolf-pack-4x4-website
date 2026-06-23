"use client"

import { AlertTriangle, Search } from "lucide-react"
import { useMemo, useState, type CSSProperties, type MouseEvent } from "react"

import { TONE_HEX, type MediaItem } from "./cms-types"

import styles from "./media-picker.module.css"

interface FocalPoint {
  x: number
  y: number
}

export interface MediaPickerProps {
  items: ReadonlyArray<MediaItem>
  defaultSelectedId?: string
  defaultFocalPoint?: FocalPoint
  loading?: boolean
  error?: string
  className?: string
}

export function MediaPicker({
  items,
  defaultSelectedId,
  defaultFocalPoint = { x: 50, y: 38 },
  loading = false,
  error,
  className,
}: MediaPickerProps) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultSelectedId ?? items[0]?.id ?? "",
  )
  const [focal, setFocal] = useState<FocalPoint>(defaultFocalPoint)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return items
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(needle) ||
      item.format.toLowerCase().includes(needle),
    )
  }, [items, query])

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0],
    [items, selectedId],
  )

  const updateFocal = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))
    setFocal({ x: Math.round(x), y: Math.round(y) })
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Media picker">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Media picker · DAM</span>
          <span className={styles.heading}>{selected?.name ?? "Choose media"}</span>
        </div>
      </header>

      <div className={styles.search}>
        <Search size={14} strokeWidth={2.2} aria-hidden="true" />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search assets — exhaust, dyno, hero…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search media library"
        />
      </div>

      <div className={styles.layout}>
        {error ? (
          <div className={styles.error} role="alert">
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
            <strong>Asset library unavailable</strong>
            <span>{error}</span>
          </div>
        ) : (
          <>
            <div className={styles.gallery} role="listbox" aria-label="Media library">
              {loading
                ? items.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className={styles.tile}
                      aria-busy="true"
                      aria-label={`Loading ${item.name}`}
                      style={{ "--tile-tone": TONE_HEX[item.tone] } as CSSProperties}
                    >
                      <div className={styles.thumb} aria-hidden="true">
                        …
                      </div>
                      <div className={styles.tileMeta}>
                        <span className={styles.tileName}>Loading…</span>
                        <span className={styles.tileDims}>—</span>
                      </div>
                    </div>
                  ))
                : filtered.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.tile}
                      role="option"
                      aria-selected={selectedId === item.id}
                      aria-label={`${item.name}, ${item.width} by ${item.height}, ${item.format}`}
                      onClick={() => setSelectedId(item.id)}
                      style={{ "--tile-tone": TONE_HEX[item.tone] } as CSSProperties}
                      data-selected={selectedId === item.id ? "true" : undefined}
                    >
                      <div className={styles.thumb} aria-hidden="true">
                        {item.kicker ?? item.format}
                        <span className={styles.formatChip}>{item.format}</span>
                      </div>
                      <div className={styles.tileMeta}>
                        <span className={styles.tileName}>{item.name}</span>
                        <span className={styles.tileDims}>
                          {item.width.toLocaleString("en-AU")} × {item.height.toLocaleString("en-AU")}
                        </span>
                      </div>
                    </button>
                  ))}
            </div>

            <div className={styles.focal}>
              <span className={styles.focalLabel}>Focal point</span>
              <div
                className={styles.focalSurface}
                role="application"
                aria-label="Click to set focal point"
                onClick={updateFocal}
                style={{ "--focal-x": `${focal.x}%`, "--focal-y": `${focal.y}%` } as CSSProperties}
              >
                <span className={styles.focalDot} aria-hidden="true" />
              </div>
              <div className={styles.focalMeta}>
                <span>
                  X · <span className={styles.focalCoord}>{focal.x}%</span>
                </span>
                <span>
                  Y · <span className={styles.focalCoord}>{focal.y}%</span>
                </span>
                <span>
                  Size ·{" "}
                  <span className={styles.focalCoord}>
                    {selected?.width.toLocaleString("en-AU") ?? "—"} ×{" "}
                    {selected?.height.toLocaleString("en-AU") ?? "—"}
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <span>{filtered.length.toString().padStart(2, "0")} / {items.length} assets</span>
        <span>{selected?.format ?? "—"} · Focal {focal.x}% / {focal.y}%</span>
      </footer>
    </section>
  )
}

export default MediaPicker
