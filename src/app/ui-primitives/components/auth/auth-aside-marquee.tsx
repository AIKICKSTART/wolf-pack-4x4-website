"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import styles from "./auth-aside-marquee.module.css"

export interface AuthAsideTestimonial {
  quote: string
  attribution: string
  role?: string
}

export interface AuthAsideMarqueeProps {
  testimonials?: AuthAsideTestimonial[]
  intervalMs?: number
  label?: string
  className?: string
}

const DEFAULT_TESTIMONIALS: AuthAsideTestimonial[] = [
  {
    quote:
      "Two months in and the quoting flow already cut paperwork in half. The lads notice.",
    attribution: "Hayley Ward",
    role: "Workshop manager · Wollongong",
  },
  {
    quote:
      "Booking turnaround dropped from days to hours. The fleet ops folks are over the moon.",
    attribution: "Marcus Reilly",
    role: "Fleet ops · Shellharbour Council",
  },
  {
    quote:
      "First exhaust shop I've worked with that actually treats the diagnostic data seriously.",
    attribution: "Priya Anand",
    role: "Lead tech · Albion Park",
  },
]

export function AuthAsideMarquee({
  testimonials = DEFAULT_TESTIMONIALS,
  intervalMs = 6200,
  label = "Voices from the workshop",
  className,
}: AuthAsideMarqueeProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused || testimonials.length <= 1) return
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, intervalMs)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [paused, testimonials.length, intervalMs])

  const current = testimonials[index]
  const classes = [styles.aside, className].filter(Boolean).join(" ")

  if (!current) return null

  const animatedSlide = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, y: 18, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -10, filter: "blur(4px)" },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }

  return (
    <section
      className={classes}
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <header className={styles.header}>
        <span>{label}</span>
        <span className={styles.headerStatus}>Streaming</span>
      </header>

      <div className={styles.viewport} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            className={styles.slide}
            initial={animatedSlide.initial}
            animate={animatedSlide.animate}
            exit={animatedSlide.exit}
            transition={animatedSlide.transition}
          >
            <blockquote className={styles.quote}>{current.quote}</blockquote>
            <figcaption className={styles.attribution}>
              <strong>{current.attribution}</strong>
              {current.role ? <span>· {current.role}</span> : null}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Testimonial pages">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial ${i + 1}`}
            className={[styles.dot, i === index && styles.dotActive].filter(Boolean).join(" ")}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}

export default AuthAsideMarquee
