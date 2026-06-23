"use client"

import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import type { LandingTestimonial } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface TestimonialCarouselProps {
  kicker?: string
  heading: string
  entries: ReadonlyArray<LandingTestimonial>
  /** Auto-advance interval in ms — set to 0 to disable. */
  autoplayMs?: number
  className?: string
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase()
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.carouselStars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={1.4}
          fill={index < rating ? "currentColor" : "transparent"}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

/**
 * Primitive 05 — Testimonial carousel. State-driven (client component) with
 * previous / next navigation, dot indicators, optional autoplay, and an
 * accessible live region. Each card carries avatar initials, rating, quote,
 * and optional case-study link.
 */
export function TestimonialCarousel({
  kicker,
  heading,
  entries,
  autoplayMs = 0,
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const max = entries.length
  const safeIndex = max === 0 ? 0 : ((index % max) + max) % max

  const goTo = useCallback(
    (next: number) => {
      if (max === 0) return
      setIndex(((next % max) + max) % max)
    },
    [max],
  )

  const goNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex])
  const goPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex])

  useEffect(() => {
    if (!autoplayMs || autoplayMs < 1500 || max <= 1) return
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % max)
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [autoplayMs, max])

  const trackStyle = useMemo(
    () => ({
      transform: `translateX(-${safeIndex * 100}%)`,
    }),
    [safeIndex],
  )

  const sectionClasses = [styles.section, styles.carousel, className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={sectionClasses} aria-roledescription="carousel" aria-label={heading}>
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 className={styles.heading}>{heading}</h2>
      </header>

      <div className={styles.carouselViewport}>
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          style={trackStyle}
          aria-live="polite"
        >
          {entries.map((entry, slideIndex) => (
            <article
              key={entry.id}
              className={styles.carouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${slideIndex + 1} of ${entries.length}`}
              aria-hidden={slideIndex !== safeIndex}
            >
              <Stars rating={entry.rating} />
              <blockquote className={styles.carouselQuote}>{entry.quote}</blockquote>
              <footer className={styles.carouselFooter}>
                <span className={styles.carouselAvatar} aria-hidden="true">
                  {getInitials(entry.name)}
                </span>
                <div className={styles.carouselFooterMeta}>
                  <strong>{entry.name}</strong>
                  <span>{entry.role}</span>
                </div>
                {entry.caseStudyHref ? (
                  <a
                    className={styles.carouselFooterLink}
                    href={entry.caseStudyHref}
                    aria-label={`Read the case study for ${entry.name}`}
                  >
                    Read case study →
                  </a>
                ) : null}
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselNav}
          onClick={goPrev}
          aria-label="Previous testimonial"
          disabled={max <= 1}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <div className={styles.carouselDots} role="tablist" aria-label="Testimonial slides">
          {entries.map((entry, slideIndex) => (
            <button
              key={entry.id}
              type="button"
              className={styles.carouselDot}
              aria-current={slideIndex === safeIndex}
              aria-label={`Show testimonial ${slideIndex + 1}`}
              onClick={() => goTo(slideIndex)}
              role="tab"
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.carouselNav}
          onClick={goNext}
          aria-label="Next testimonial"
          disabled={max <= 1}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default TestimonialCarousel
