"use client"

import { useId, useState } from "react"

import styles from "./before-after-gallery.module.css"

export interface BeforeAfterItem {
  id: string
  /** Vehicle / job title, e.g. "VDJ79 — 4in turbo-back". */
  title: string
  /** One-line job summary. */
  summary: string
  beforeSrc: string
  beforeAlt: string
  afterSrc: string
  afterAlt: string
  /** Optional result chip, e.g. "+38rwkW". */
  result?: string
}

export interface BeforeAfterGalleryProps {
  kicker?: string
  heading: string
  body?: string
  items: ReadonlyArray<BeforeAfterItem>
  className?: string
}

type Phase = "before" | "after"

function GalleryCard({ item }: { item: BeforeAfterItem }) {
  const [phase, setPhase] = useState<Phase>("after")
  const labelId = useId()

  const isAfter = phase === "after"
  const active = isAfter
    ? { src: item.afterSrc, alt: item.afterAlt }
    : { src: item.beforeSrc, alt: item.beforeAlt }

  return (
    <figure className={styles.card} aria-labelledby={labelId}>
      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={active.src}
          alt={active.alt}
          loading="lazy"
          decoding="async"
        />
        <span className={`${styles.phaseTag} ${isAfter ? styles.phaseAfter : styles.phaseBefore}`}>
          {isAfter ? "After" : "Before"}
        </span>
        {item.result ? <span className={styles.result}>{item.result}</span> : null}
      </div>

      <div
        className={styles.toggle}
        role="group"
        aria-label={`Toggle before and after for ${item.title}`}
      >
        <button
          type="button"
          className={`${styles.toggleBtn} ${phase === "before" ? styles.toggleActive : ""}`}
          aria-pressed={phase === "before"}
          onClick={() => setPhase("before")}
        >
          Before
        </button>
        <button
          type="button"
          className={`${styles.toggleBtn} ${phase === "after" ? styles.toggleActive : ""}`}
          aria-pressed={phase === "after"}
          onClick={() => setPhase("after")}
        >
          After
        </button>
      </div>

      <figcaption className={styles.caption}>
        <strong id={labelId} className={styles.title}>
          {item.title}
        </strong>
        <span className={styles.summary}>{item.summary}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Before/after install gallery — a grid of job cards, each toggling between the
 * stock photo and the finished Mufflermen install. Keyboard-operable toggles,
 * lazy-loaded imagery, token-driven surfaces. Light/dark via tokens.
 */
export function BeforeAfterGallery({
  kicker,
  heading,
  body,
  items,
  className,
}: BeforeAfterGalleryProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h2 className={styles.heading}>{heading}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id} className={styles.cell}>
            <GalleryCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BeforeAfterGallery
