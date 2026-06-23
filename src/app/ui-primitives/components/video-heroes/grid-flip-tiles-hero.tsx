"use client"

import { useMemo } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"

import styles from "./grid-flip-tiles-hero.module.css"

export interface GridFlipTilesHeroAction {
  label: string
  href: string
}

export interface GridFlipTilesHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: GridFlipTilesHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Grid density. Kept modest so each tile stays a legible, premium panel and the
 *  3D flip reads clearly rather than dissolving into noise. */
const COLUMNS = 5
const ROWS = 3

/** Per-tile delay budget. The wave sweeps diagonally across the grid; this is
 *  how long (ms) the leading edge takes to reach the far corner. */
const WAVE_SPAN_MS = 900

interface FlipTile {
  key: string
  col: number
  row: number
  /** Diagonal wave position (0..1) from the top-left origin tile. */
  wave: number
}

/** CSS variable payload positioning each tile's video window onto the shared
 *  plane and sequencing its flip in the staggered wave. */
type FlipTileStyle = CSSProperties & {
  "--gf-col": string
  "--gf-row": string
  "--gf-delay": string
}

function buildTiles(): FlipTile[] {
  const tiles: FlipTile[] = []
  // Diagonal distance is normalised by the maximum (bottom-right corner) so the
  // wave delay maps cleanly to 0..1 regardless of grid dimensions.
  const maxDiagonal = COLUMNS - 1 + (ROWS - 1)

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLUMNS; col += 1) {
      const wave = maxDiagonal === 0 ? 0 : (col + row) / maxDiagonal
      tiles.push({ key: `${row}-${col}`, col, row, wave })
    }
  }

  return tiles
}

/**
 * GRID FLIP TILES HERO — a grid of panels that flip in 3D (rotateY/rotateX) to
 * reveal the looping video underneath in a staggered diagonal wave. Each tile is
 * a `transform-style: preserve-3d` card: the back face is dark carbon, the front
 * face is a window onto one shared video plane (the plane is sized to the whole
 * grid and offset per tile via `background`-style positioning so the revealed
 * tiles read as a single continuous video). A poster image backs the same plane
 * for the no-JS / loading fallback.
 */
export function GridFlipTilesHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "FLIP GRID · 05 × 03 PANELS",
}: GridFlipTilesHeroProps) {
  const tiles = useMemo(() => buildTiles(), [])

  // Each tile's video plane spans the entire grid (COLUMNS × ROWS times its own
  // box) and is shifted by the tile's index so every window samples the matching
  // slice of one continuous video.
  const planeWidth = `${COLUMNS * 100}%`
  const planeHeight = `${ROWS * 100}%`

  return (
    <section className={styles.hero} aria-labelledby="grid-flip-tiles-headline">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage} aria-hidden="true">
        <div
          className={styles.grid}
          style={
            {
              "--gf-cols": String(COLUMNS),
              "--gf-rows": String(ROWS),
            } as CSSProperties
          }
        >
          {tiles.map((tile) => {
            const style: FlipTileStyle = {
              "--gf-col": String(tile.col),
              "--gf-row": String(tile.row),
              "--gf-delay": `${Math.round(tile.wave * WAVE_SPAN_MS)}ms`,
            }
            const planeStyle: CSSProperties = {
              width: planeWidth,
              height: planeHeight,
              left: `calc(${tile.col} * -100%)`,
              top: `calc(${tile.row} * -100%)`,
            }
            return (
              <span key={tile.key} className={styles.tile} style={style}>
                <span className={styles.tileInner}>
                  <span className={styles.faceBack}>
                    <span className={styles.backMark} />
                  </span>
                  <span className={styles.faceFront}>
                    <span className={styles.media}>
                      {posterSrc ? (
                        <span
                          className={styles.posterPlane}
                          style={{
                            ...planeStyle,
                            backgroundImage: `url(${posterSrc})`,
                          }}
                        />
                      ) : null}
                      <video
                        className={styles.videoPlane}
                        style={planeStyle}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={posterSrc}
                        aria-hidden="true"
                      >
                        <source src={videoSrc} type="video/mp4" />
                      </video>
                      <span className={styles.sheen} />
                    </span>
                  </span>
                </span>
              </span>
            )
          })}
        </div>
        <div className={styles.seamWash} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="grid-flip-tiles-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          <span>{cta.label}</span>
          <span className={styles.ctaArrow} aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>PRESERVE-3D · ROTATE WAVE</span>
        <span>STAGGER · {WAVE_SPAN_MS}ms</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
