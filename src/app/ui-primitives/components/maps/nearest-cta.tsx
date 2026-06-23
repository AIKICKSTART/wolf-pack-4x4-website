import { DistanceDurationChip, type DistanceDurationTraffic } from "./distance-duration-chip"
import styles from "./nearest-cta.module.css"

export interface NearestOption {
  name: string
  suburb: string
  distance: string
  duration: string
  traffic: DistanceDurationTraffic
}

export interface NearestCtaProps {
  /** Headline above the CTA. */
  heading: string
  /** Sub-copy beneath the headline. */
  copy: string
  /** Closest workshop. */
  nearest: NearestOption
  /** Up to four alternative options. */
  alternatives: ReadonlyArray<NearestOption>
  /** Button label. */
  ctaLabel: string
}

export function NearestCta({
  heading,
  copy,
  nearest,
  alternatives,
  ctaLabel,
}: NearestCtaProps) {
  return (
    <section className={styles.root} aria-label="Nearest workshop">
      <header className={styles.head}>
        <span className={styles.kicker}>Find nearest</span>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.copy}>{copy}</p>
      </header>

      <div className={styles.primary}>
        <div className={styles.primaryBody}>
          <span className={styles.primaryLabel}>Closest workshop</span>
          <strong className={styles.primaryName}>{nearest.name}</strong>
          <span className={styles.primarySuburb}>{nearest.suburb}</span>
        </div>
        <DistanceDurationChip
          distance={nearest.distance}
          duration={nearest.duration}
          traffic={nearest.traffic}
          label={`${nearest.name} — drive time`}
        />
        <button type="button" className={styles.cta}>
          {ctaLabel}
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.altWrap}>
        <span className={styles.altLabel}>Alternatives</span>
        <ul className={styles.alternatives}>
          {alternatives.map((alt) => (
            <li key={`${alt.name}-${alt.suburb}`} className={styles.alt}>
              <span className={styles.altInfo}>
                <strong>{alt.name}</strong>
                <small>{alt.suburb}</small>
              </span>
              <DistanceDurationChip
                distance={alt.distance}
                duration={alt.duration}
                traffic={alt.traffic}
                label={`${alt.name} — drive time`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default NearestCta
