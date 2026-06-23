import type { ReactNode } from "react"
import Link from "next/link"

import { GlassSurface } from "../surfaces/glass-surface"

import styles from "./ambient-grid-hero.module.css"

export interface AmbientHeroAction {
  label: string
  href: string
}

export interface AmbientTile {
  id: string
  caption: string
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
}

export interface AmbientGridHeroProps {
  headline: string
  subhead: string
  cta: AmbientHeroAction
  badge?: ReactNode
  tiles?: AmbientTile[]
}

const DEFAULT_TILES: AmbientTile[] = [
  { id: "ember", caption: "Workshop · A" },
  { id: "dusk", caption: "Showroom · B" },
  { id: "abyss", caption: "Hero panel · C" },
  { id: "grove", caption: "Sustainability · D" },
]

const FALLBACK_MP4 = "/media/cinematic/home-hero.mp4"
const FALLBACK_WEBM = undefined

export function AmbientGridHero({
  headline,
  subhead,
  cta,
  badge = "Mufflermen · Live ambient",
  tiles = DEFAULT_TILES,
}: AmbientGridHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="ambient-grid-headline">
      <div className={styles.grid} aria-hidden="true">
        {tiles.map((tile, index) => (
          <div key={tile.id} className={styles.tile} data-index={index}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={tile.posterSrc}
              className={styles.tileVideo}
            >
              {tile.videoSrcWebm ?? FALLBACK_WEBM ? <source src={tile.videoSrcWebm ?? FALLBACK_WEBM} type="video/webm" /> : null}
              <source src={tile.videoSrc ?? FALLBACK_MP4} type="video/mp4" />
            </video>
            <span className={styles.tileCaption}>
              <i aria-hidden="true" />
              {tile.caption}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.cross} aria-hidden="true" />
      <div className={styles.gridDarken} aria-hidden="true" />

      <div className={styles.cardWrap}>
        <GlassSurface tone="obsidian" intensity="high" className={styles.card}>
          <span className={styles.badge}>{badge}</span>
          <h1 id="ambient-grid-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <div className={styles.actions}>
            <Link href={cta.href} className={styles.cta}>
              {cta.label}
              <em aria-hidden="true">→</em>
            </Link>
            <span className={styles.signal} aria-hidden="true">
              <i /><i /><i /><i />
              <strong>SIG · OK</strong>
            </span>
          </div>
        </GlassSurface>
      </div>
    </section>
  )
}

