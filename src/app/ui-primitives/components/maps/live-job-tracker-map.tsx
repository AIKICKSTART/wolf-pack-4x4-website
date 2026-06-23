"use client"

import { motion, useReducedMotion } from "framer-motion"

import { StaticMapCanvas } from "./static-map-canvas"
import styles from "./live-job-tracker-map.module.css"

export interface TechnicianMarker {
  id: string
  name: string
  /** Base X position (0–100). */
  x: number
  /** Base Y position (0–100). */
  y: number
  /** Drift radius in percentage points; controls how far the pin wanders. */
  drift: number
  job: string
}

export interface LiveJobTrackerMapProps {
  /** Workshop centre — X 0–100. */
  centerX: number
  /** Workshop centre — Y 0–100. */
  centerY: number
  technicians: ReadonlyArray<TechnicianMarker>
  caption: string
}

export function LiveJobTrackerMap({
  centerX,
  centerY,
  technicians,
  caption,
}: LiveJobTrackerMapProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={styles.root} aria-label="Live job tracker">
      <div className={styles.mapWrap}>
        <StaticMapCanvas label={`Live technician tracking — ${caption}`} tone="midnight" />

        <div className={styles.overlay} aria-hidden="true">
          <span
            className={styles.center}
            style={{ left: `${centerX}%`, top: `${centerY}%` }}
          >
            <span className={styles.centerRing} />
            <span className={styles.centerDot} />
            <small>Oak Flats HQ</small>
          </span>
        </div>

        <ul className={styles.techLayer} aria-label="Technicians in field">
          {technicians.map((tech) => {
            const motionProps = reduceMotion
              ? undefined
              : {
                  animate: {
                    x: [0, tech.drift, -tech.drift * 0.7, tech.drift * 0.4, 0],
                    y: [0, -tech.drift * 0.6, tech.drift * 0.5, -tech.drift * 0.3, 0],
                  },
                  transition: {
                    duration: 18 + tech.drift,
                    ease: "easeInOut" as const,
                    repeat: Infinity,
                  },
                }
            return (
              <motion.li
                key={tech.id}
                className={styles.tech}
                style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
                aria-label={`${tech.name} — ${tech.job}`}
                {...motionProps}
              >
                <span className={styles.techDot} />
                <span className={styles.techLabel}>
                  <strong>{tech.name}</strong>
                  <small>{tech.job}</small>
                </span>
              </motion.li>
            )
          })}
        </ul>

        <span className={styles.pulse} aria-hidden="true">
          <span /> <span /> <span />
          Live · refreshing
        </span>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerKicker}>Field operations</span>
        <p className={styles.footerCopy}>{caption}</p>
      </footer>
    </section>
  )
}

export default LiveJobTrackerMap
