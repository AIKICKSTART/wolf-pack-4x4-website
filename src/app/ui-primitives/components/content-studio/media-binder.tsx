"use client"

import { Film, Image as ImageIcon, Link2, Music3, Search } from "lucide-react"
import { useId, useMemo, useState } from "react"

import { AssetCard } from "../asset-library"
import type { AssetItem } from "../asset-library"
import { GlassSurface } from "../surfaces"

import type { MediaKind } from "./content-studio-types"
import styles from "./media-binder.module.css"

interface MediaBinderProps {
  /** Asset-library items the binder can choose from. */
  assets: ReadonlyArray<AssetItem>
  /** Asset IDs that are already inserted into the current article. */
  insertedIds?: ReadonlyArray<string>
  /** Default filter. */
  defaultKind?: MediaKind
  className?: string
}

const KIND_TABS: ReadonlyArray<{ id: MediaKind; label: string; icon: typeof ImageIcon }> = [
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "video", label: "Video", icon: Film },
  { id: "audio", label: "Audio", icon: Music3 },
  { id: "embed", label: "Embed", icon: Link2 },
]

const ASSET_KIND_MAP: Record<MediaKind, ReadonlyArray<AssetItem["kind"]>> = {
  image: ["image", "vector", "animation"],
  video: ["video"],
  audio: ["audio"],
  embed: ["doc", "3d-model"],
}

export function MediaBinder({
  assets,
  insertedIds,
  defaultKind = "image",
  className,
}: MediaBinderProps) {
  const tabsId = useId()
  const [kind, setKind] = useState<MediaKind>(defaultKind)
  const [query, setQuery] = useState<string>("")
  const inserted = useMemo(() => new Set(insertedIds ?? []), [insertedIds])

  const filtered = useMemo(() => {
    const allowed = ASSET_KIND_MAP[kind]
    const q = query.trim().toLowerCase()
    return assets.filter((asset) => {
      if (!allowed.includes(asset.kind)) return false
      if (q.length === 0) return true
      return asset.name.toLowerCase().includes(q)
    })
  }, [assets, kind, query])

  const classes = [styles.binder, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Media binder</span>
            <h2 className={styles.title}>Insert media into the draft</h2>
          </div>
          <label className={styles.search}>
            <Search size={12} strokeWidth={2.4} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search Bay 3 photos, dyno reels, customer voicemails…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search asset library"
            />
          </label>
        </header>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Media kind"
          id={tabsId}
        >
          {KIND_TABS.map((tab) => {
            const Icon = tab.icon
            const selected = tab.id === kind
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${tabsId}-panel`}
                className={[styles.tab, selected ? styles.tabActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setKind(tab.id)}
              >
                <Icon size={13} strokeWidth={2.4} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div
          className={styles.grid}
          role="listbox"
          aria-label={`${kind} assets available to insert`}
          id={`${tabsId}-panel`}
        >
          {filtered.length === 0 ? (
            <p className={styles.empty}>No {kind} assets match your search.</p>
          ) : (
            filtered.map((asset) => (
              <div
                key={asset.id}
                className={[styles.cell, inserted.has(asset.id) ? styles.cellInserted : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <AssetCard asset={asset} selected={inserted.has(asset.id)} />
                <button
                  type="button"
                  className={styles.insert}
                  aria-label={`${inserted.has(asset.id) ? "Replace" : "Insert"} ${asset.name} into draft`}
                >
                  {inserted.has(asset.id) ? "Inserted ✓" : "+ Insert"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </GlassSurface>
  )
}

export default MediaBinder
