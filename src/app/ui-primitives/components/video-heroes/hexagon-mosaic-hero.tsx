"use client"

import { useMemo } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"

import styles from "./hexagon-mosaic-hero.module.css"

export interface HexagonMosaicHeroAction {
  label: string
  href: string
}

export interface HexagonMosaicHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: HexagonMosaicHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/**
 * Honeycomb geometry. The stage is divided into pointy-top hexagons laid out
 * in offset rows. Each tile is a clip-path window onto a single shared video
 * plane: the plane is sized to the whole stage and translated negatively by the
 * tile origin, so the hexagons read as one continuous video mosaic with glowing
 * brand-red seams between them.
 */
const COLUMNS = 6
const ROWS = 5

interface HexTile {
  key: string
  col: number
  row: number
  /** horizontal origin of the tile within the stage, as a fraction (0..1) */
  originX: number
  /** vertical origin of the tile within the stage, as a fraction (0..1) */
  originY: number
  /** ripple distance from the mosaic centre, drives the reveal stagger */
  ripple: number
}

/**
 * A tile CSS variable payload. `--hx-*` values place the video plane window and
 * `--hx-delay` sequences the ripple-stagger reveal.
 */
type HexTileStyle = CSSProperties & {
  "--hx-x": string
  "--hx-y": string
  "--hx-w": string
  "--hx-h": string
  "--hx-delay": string
}

function buildTiles(): HexTile[] {
  // Pointy-top hex packing: every other row is offset half a column. Tile pitch
  // is derived so neighbours interlock into a continuous honeycomb.
  const tileWidth = 1 / (COLUMNS - 0.5)
  const tileHeight = 1 / (ROWS * 0.75 + 0.25)

  const centreX = 0.5
  const centreY = 0.5
  const tiles: HexTile[] = []

  for (let row = 0; row < ROWS; row += 1) {
    const isOffsetRow = row % 2 === 1
    const rowColumns = isOffsetRow ? COLUMNS - 1 : COLUMNS
    const rowShift = isOffsetRow ? tileWidth / 2 : 0

    for (let col = 0; col < rowColumns; col += 1) {
      const originX = rowShift + col * tileWidth
      const originY = row * tileHeight * 0.75
      const tileCentreX = originX + tileWidth / 2
      const tileCentreY = originY + tileHeight / 2
      const dx = tileCentreX - centreX
      const dy = tileCentreY - centreY
      const ripple = Math.sqrt(dx * dx + dy * dy)

      tiles.push({
        key: `${row}-${col}`,
        col,
        row,
        originX,
        originY,
        ripple,
      })
    }
  }

  return tiles
}

export function HexagonMosaicHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "MOSAIC · 06 × 05 CELLS",
}: HexagonMosaicHeroProps) {
  const tiles = useMemo(() => buildTiles(), [])

  // The video plane spans a touch beyond the stage so edge hexagons stay filled
  // even after their negative offset. A small overscan removes hairline gaps.
  const overscan = 0.06
  const planeScale = 1 + overscan * 2
  const tileWidth = 1 / (COLUMNS - 0.5)
  const tileHeight = 1 / (ROWS * 0.75 + 0.25)

  return (
    <section className={styles.hero} aria-labelledby="hexagon-mosaic-headline">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.mosaic}>
          {tiles.map((tile) => {
            const style: HexTileStyle = {
              "--hx-x": `${tile.originX * 100}%`,
              "--hx-y": `${tile.originY * 100}%`,
              "--hx-w": `${tileWidth * 100}%`,
              "--hx-h": `${tileHeight * 100}%`,
              "--hx-delay": `${tile.ripple * 1100}ms`,
            }
            return (
              <span
                key={tile.key}
                className={styles.cell}
                style={style}
                data-edge-col={tile.col === 0 ? "true" : undefined}
              >
                <span className={styles.cellGlass}>
                  <video
                    className={styles.cellVideo}
                    style={{
                      width: `${planeScale * (COLUMNS - 0.5) * 100}%`,
                      height: `${planeScale * (ROWS * 0.75 + 0.25) * 100}%`,
                      left: `calc(-1 * var(--hx-x) - ${overscan * 100}%)`,
                      top: `calc(-1 * var(--hx-y) - ${overscan * 100}%)`,
                    }}
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
                </span>
              </span>
            )
          })}
        </div>
        <div className={styles.combWash} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="hexagon-mosaic-headline" className={styles.headline}>
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
        <span>HONEYCOMB · CLIP-PATH</span>
        <span>RIPPLE STAGGER · 1.1s</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
