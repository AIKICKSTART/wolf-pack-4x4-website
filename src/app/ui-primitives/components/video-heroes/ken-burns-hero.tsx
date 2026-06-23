import Link from "next/link"

import styles from "./ken-burns-hero.module.css"

export interface KenBurnsHeroAction {
  label: string
  href: string
}

export interface KenBurnsLayer {
  id: string
  posterSrc?: string
  tint: "ember" | "dusk" | "abyss"
  caption: string
}

export interface KenBurnsHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: KenBurnsHeroAction
  layers?: KenBurnsLayer[]
  chapterLabel?: string
}

const DEFAULT_LAYERS: KenBurnsLayer[] = [
  { id: "plate-a", tint: "ember", caption: "Plate · A · Workshop" },
  { id: "plate-b", tint: "dusk", caption: "Plate · B · Forecourt" },
  { id: "plate-c", tint: "abyss", caption: "Plate · C · Coastline" },
]

const TINT_CLASS: Record<KenBurnsLayer["tint"], string> = {
  ember: "tintEmber",
  dusk: "tintDusk",
  abyss: "tintAbyss",
}

export function KenBurnsHero({
  videoSrc,
  videoSrcWebm,
  posterSrc,
  headline,
  subhead,
  cta,
  layers = DEFAULT_LAYERS,
  chapterLabel = "Chapter · 03 / Field Plates",
}: KenBurnsHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="ken-burns-headline">
      <div className={styles.stage} aria-hidden="true">
        {videoSrc ? (
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            {videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        {layers.map((layer, index) => (
          <figure
            key={layer.id}
            className={`${styles.plate} ${styles[TINT_CLASS[layer.tint]]}`}
            style={{
              backgroundImage: layer.posterSrc ? `url(${layer.posterSrc})` : undefined,
              animationDelay: `${index * 6}s`,
            }}
            role="img"
            aria-label={layer.caption}
          >
            <figcaption className={styles.plateCaption}>{layer.caption}</figcaption>
          </figure>
        ))}
        <div className={styles.scrim} />
      </div>

      <div className={styles.copy}>
        <span className={styles.chapter}>
          <i aria-hidden="true" />
          {chapterLabel}
        </span>
        <h1 id="ken-burns-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          {cta.label}
          <em aria-hidden="true">↗</em>
        </Link>
      </div>

      <ol className={styles.markers} aria-hidden="true">
        {layers.map((_layer, index) => (
          <li
            key={`mark-${index}`}
            style={{ animationDelay: `${index * 6}s` }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
