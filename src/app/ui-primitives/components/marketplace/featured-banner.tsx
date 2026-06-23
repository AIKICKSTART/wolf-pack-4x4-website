"use client"

import { useEffect, useState, type ReactNode } from "react"

import styles from "./featured-banner.module.css"

export interface FeaturedBannerSlide {
  id: string
  kicker: string
  title: string
  description: string
  ctaLabel: string
  ctaHref?: string
  visual?: ReactNode
  badgeLabel?: string
}

export interface FeaturedBannerProps {
  slides: ReadonlyArray<FeaturedBannerSlide>
  autoplayMs?: number
  initialIndex?: number
  onInstallFeatured?: (slideId: string) => void
  className?: string
}

export function FeaturedBanner({
  slides,
  autoplayMs,
  initialIndex = 0,
  onInstallFeatured,
  className,
}: FeaturedBannerProps) {
  const [index, setIndex] = useState(() => {
    if (slides.length === 0) {
      return 0
    }
    return Math.min(initialIndex, slides.length - 1)
  })

  useEffect(() => {
    if (!autoplayMs || autoplayMs <= 0 || slides.length <= 1) {
      return
    }
    const mediaQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null
    if (mediaQuery?.matches) {
      return
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [autoplayMs, slides.length])

  if (slides.length === 0) {
    return null
  }

  const slide = slides[index]
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  const handleInstall = () => {
    onInstallFeatured?.(slide.id)
  }

  const ctaProps =
    slide.ctaHref && !onInstallFeatured
      ? { href: slide.ctaHref }
      : { type: "button" as const, onClick: handleInstall }
  const CtaComponent = slide.ctaHref && !onInstallFeatured ? "a" : "button"

  return (
    <section
      className={classes}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured plugins"
    >
      <div className={styles.copy}>
        <span className={styles.kicker}>{slide.kicker}</span>
        <h2 className={styles.title}>{slide.title}</h2>
        <p className={styles.description}>{slide.description}</p>
        <CtaComponent className={styles.cta} {...ctaProps}>
          {slide.ctaLabel}
        </CtaComponent>
      </div>

      <div className={styles.visual} aria-hidden="true">
        {slide.visual ?? (
          <span className={styles.visualBadge}>
            {slide.badgeLabel ?? slide.title.charAt(0)}
          </span>
        )}
      </div>

      {slides.length > 1 && (
        <div className={styles.controls} role="tablist" aria-label="Carousel pagination">
          {slides.map((dot, dotIndex) => {
            const isActive = dotIndex === index
            return (
              <button
                key={dot.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show slide ${dotIndex + 1}: ${dot.title}`}
                className={[styles.dot, isActive ? styles.dotActive : ""].filter(Boolean).join(" ")}
                onClick={() => setIndex(dotIndex)}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default FeaturedBanner
