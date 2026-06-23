"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"

import styles from "./card-deck-hero.module.css"

export interface CardDeckHeroAction {
  label: string
  href: string
}

export interface CardDeckHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: CardDeckHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** Subscribes to the reduced-motion preference via an external store. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

/**
 * Decorative under-cards in the fanned deck (top card holds the live video).
 * `depth` drives the per-layer rotation/offset in CSS that makes the deck
 * read as a fanned stack; the mono label is stamped on the card's edge.
 */
interface DeckLayer {
  depth: number
  label: string
}

const DECK_LAYERS: readonly DeckLayer[] = [
  { depth: 4, label: "TAKE 04" },
  { depth: 3, label: "TAKE 03" },
  { depth: 2, label: "TAKE 02" },
  { depth: 1, label: "TAKE 01" },
]

export function CardDeckHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "DECK · 5 TAKES",
}: CardDeckHeroProps) {
  const reduceMotion = useReducedMotion()

  // The fan-out is a one-shot CSS animation; when motion is reduced we mark the
  // deck static so it paints fully splayed with no reveal animation.
  const deckClassName = `${styles.deck} ${reduceMotion ? styles.deckStatic : ""}`

  return (
    <section className={styles.hero} aria-labelledby="card-deck-headline">
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.layout}>
        <header className={styles.copy}>
          <span className={styles.kicker}>
            <i className={styles.kickerDot} aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id="card-deck-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </header>

        <div className={styles.stage}>
          <div className={deckClassName}>
            {DECK_LAYERS.map((layer) => (
              <div
                key={layer.depth}
                className={styles.card}
                data-depth={layer.depth}
                aria-hidden="true"
              >
                <div className={styles.cardChrome}>
                  <div className={styles.cardFace} />
                </div>
                <span className={styles.cardEdgeLabel}>{layer.label}</span>
              </div>
            ))}

            {/* Top card — the live, playing video. */}
            <div className={`${styles.card} ${styles.cardTop}`} data-depth={0}>
              <div className={styles.cardChrome}>
                <video
                  className={styles.video}
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
                <div className={styles.cardGloss} aria-hidden="true" />
                <span className={styles.recDot} aria-hidden="true">
                  <i />
                  REC
                </span>
                <span className={styles.cardFrameMarks} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <span className={styles.cardEdgeLabel}>TAKE 05 · LIVE</span>
            </div>
          </div>

          <span className={styles.stageTag} aria-hidden="true">
            <i />
            FANNED DECK · TOP TAKE ROLLING
          </span>
        </div>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>5 CARD STACK · CHROME EDGE</span>
        <span>EXHAUST · 04:00 LOOP</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
