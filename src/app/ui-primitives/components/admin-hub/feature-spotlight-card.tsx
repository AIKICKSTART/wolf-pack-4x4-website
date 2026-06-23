import { Sparkles, X } from "lucide-react"

import type { FeatureSpotlight } from "./admin-hub-types"

import styles from "./feature-spotlight-card.module.css"

interface FeatureSpotlightCardProps {
  spotlight: FeatureSpotlight
  className?: string
}

export function FeatureSpotlightCard({
  spotlight,
  className,
}: FeatureSpotlightCardProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Feature spotlight: ${spotlight.title}`}
    >
      <div className={styles.aurora} aria-hidden="true" />

      <header className={styles.head}>
        <span className={styles.badge}>
          <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" />
          {spotlight.badge}
        </span>
        <button
          type="button"
          className={styles.dismiss}
          aria-label={`${spotlight.dismissLabel} ${spotlight.title}`}
        >
          <X size={12} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.body}>
        <h3 className={styles.title}>{spotlight.title}</h3>
        <p className={styles.description}>{spotlight.description}</p>

        <ul className={styles.bullets} role="list">
          {spotlight.bullets.map((bullet, idx) => (
            <li key={idx} className={styles.bullet}>
              <span className={styles.bulletDot} aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.foot}>
        <button type="button" className={styles.ctaPrimary}>
          {spotlight.ctaLabel}
        </button>
        <span className={styles.released}>Released {spotlight.releasedAt}</span>
      </footer>
    </article>
  )
}

export default FeatureSpotlightCard
