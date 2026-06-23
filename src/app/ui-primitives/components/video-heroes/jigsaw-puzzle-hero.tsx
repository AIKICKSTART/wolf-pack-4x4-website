"use client"

import { useMemo } from "react"
import Link from "next/link"

import styles from "./jigsaw-puzzle-hero.module.css"

export interface JigsawPuzzleHeroAction {
  label: string
  href: string
}

export interface JigsawPuzzleHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: JigsawPuzzleHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Puzzle grid: columns x rows. Kept small so the interlocking read stays bold. */
const COLS = 4
const ROWS = 3

/** Tab protrusion as a fraction of the tile edge. Larger = more obviously jigsaw. */
const TAB = 0.26
/** Half-width of the tab neck along the edge. */
const NECK = 0.16

type Edge = -1 | 0 | 1

interface Tile {
  index: number
  col: number
  row: number
  clipPath: string
  /** Stagger delay in ms for the assemble-in animation. */
  delay: number
  /** Slight resting offset (px) on a couple of pieces for character. */
  offsetX: number
  offsetY: number
  rotate: number
}

/**
 * Deterministic edge polarity for the boundary between a tile and the
 * neighbour to its right (horizontal) or below (vertical). +1 = the left/top
 * tile pushes a tab outward; -1 = it cuts a blank inward. Neighbours read the
 * same seam with inverted polarity, so tabs always meet blanks.
 */
function seamPolarity(a: number, b: number): Edge {
  return (a * 7 + b * 13) % 2 === 0 ? 1 : -1
}

function horizontalSeam(col: number, row: number): Edge {
  // seam to the right of (col,row)
  return seamPolarity(col + 1, row + 2)
}

function verticalSeam(col: number, row: number): Edge {
  // seam below (col,row)
  return seamPolarity(col + 4, row + 1)
}

/**
 * Build the clip-path polygon for one tile in its own 0..1 local box.
 * Outer frame edges stay flat (no tab) so the assembled puzzle is rectangular;
 * interior edges carry a tab (+1) or blank (-1) that interlocks with the
 * neighbour. The neck/tab geometry is mirrored across shared seams.
 */
function buildClipPath(col: number, row: number): string {
  const top: Edge = row === 0 ? 0 : (-verticalSeam(col, row - 1) as Edge)
  const right: Edge = col === COLS - 1 ? 0 : horizontalSeam(col, row)
  const bottom: Edge = row === ROWS - 1 ? 0 : verticalSeam(col, row)
  const left: Edge = col === 0 ? 0 : (-horizontalSeam(col - 1, row) as Edge)

  const pts: Array<[number, number]> = []
  const push = (x: number, y: number): void => {
    pts.push([clamp01(x), clamp01(y)])
  }

  // Start top-left corner, travel clockwise.
  push(0, 0)
  addEdge(push, "top", top)
  push(1, 0)
  addEdge(push, "right", right)
  push(1, 1)
  addEdge(push, "bottom", bottom)
  push(0, 1)
  addEdge(push, "left", left)

  const body = pts
    .map(([x, y]) => `${pct(x)} ${pct(y)}`)
    .join(", ")
  return `polygon(${body})`
}

type PushFn = (x: number, y: number) => void
type Side = "top" | "right" | "bottom" | "left"

/**
 * Emit the four bump points (neck-in, peak-out-left, peak-out-right, neck-out)
 * along the centre of a side. `dir` +1 bulges outward from the tile, -1 carves
 * inward. The peak sits at the side midpoint.
 */
function addEdge(push: PushFn, side: Side, dir: Edge): void {
  if (dir === 0) return
  const a = 0.5 - NECK // neck start (along the edge)
  const b = 0.5 + NECK // neck end
  const out = dir // outward (+) or inward (-) normal

  switch (side) {
    case "top": {
      // travelling left -> right along y=0; outward = -y
      push(a, 0)
      push(a, -out * TAB)
      push(b, -out * TAB)
      push(b, 0)
      break
    }
    case "right": {
      // travelling top -> bottom along x=1; outward = +x
      push(1, a)
      push(1 + out * TAB, a)
      push(1 + out * TAB, b)
      push(1, b)
      break
    }
    case "bottom": {
      // travelling right -> left along y=1; outward = +y
      push(1 - a, 1)
      push(1 - a, 1 + out * TAB)
      push(1 - b, 1 + out * TAB)
      push(1 - b, 1)
      break
    }
    case "left": {
      // travelling bottom -> top along x=0; outward = -x
      push(0, 1 - a)
      push(-out * TAB, 1 - a)
      push(-out * TAB, 1 - b)
      push(0, 1 - b)
      break
    }
  }
}

function clamp01(v: number): number {
  if (v < -TAB) return -TAB
  if (v > 1 + TAB) return 1 + TAB
  return v
}

function pct(v: number): string {
  return `${(v * 100).toFixed(3)}%`
}

/** Pieces that get a small permanent offset/rotation for character. */
const OFFSET_TILES: Record<number, { x: number; y: number; r: number }> = {
  2: { x: 10, y: -8, r: -2.4 },
  9: { x: -9, y: 7, r: 2.1 },
}

function buildTiles(): Tile[] {
  const tiles: Tile[] = []
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const index = row * COLS + col
      // Diagonal-sweep stagger: pieces nearer top-left assemble first.
      const wave = col + row
      const offset = OFFSET_TILES[index] ?? { x: 0, y: 0, r: 0 }
      tiles.push({
        index,
        col,
        row,
        clipPath: buildClipPath(col, row),
        delay: 90 + wave * 130,
        offsetX: offset.x,
        offsetY: offset.y,
        rotate: offset.r,
      })
    }
  }
  return tiles
}

export function JigsawPuzzleHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "PUZZLE · 12 PCS · 00:14:08",
}: JigsawPuzzleHeroProps) {
  const tiles = useMemo<Tile[]>(() => buildTiles(), [])

  return (
    <section className={styles.hero} aria-labelledby="jigsaw-puzzle-headline">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.copy}>
          <span className={styles.kicker}>
            <i aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id="jigsaw-puzzle-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <div className={styles.metaRow} aria-hidden="true">
            <span>{COLS}×{ROWS} INTERLOCK</span>
            <span className={styles.dot} />
            <span>FACTORY ASSEMBLED</span>
          </div>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div
            className={styles.board}
            style={
              {
                "--cols": COLS,
                "--rows": ROWS,
              } as React.CSSProperties
            }
          >
            {tiles.map((tile) => (
              <div
                key={tile.index}
                className={styles.piece}
                style={
                  {
                    "--col": tile.col,
                    "--row": tile.row,
                    "--delay": `${tile.delay}ms`,
                    "--ox": `${tile.offsetX}px`,
                    "--oy": `${tile.offsetY}px`,
                    "--rot": `${tile.rotate}deg`,
                    clipPath: tile.clipPath,
                  } as React.CSSProperties
                }
              >
                <video
                  className={styles.video}
                  style={
                    {
                      "--col": tile.col,
                      "--row": tile.row,
                    } as React.CSSProperties
                  }
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
                <span className={styles.pieceEdge} />
              </div>
            ))}
          </div>
          <span className={styles.tag}>
            <i />ASSEMBLY · LIVE FEED
          </span>
        </div>
      </div>
    </section>
  )
}
