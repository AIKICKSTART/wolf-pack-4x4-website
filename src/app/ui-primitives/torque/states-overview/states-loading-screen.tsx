import styles from "./states-loading-screen.module.css"

export interface StatesLoadingScreenProps {
  headline: string
  message: string
  /** Labels for the staged skeleton rows, shown as they "hydrate". */
  steps: ReadonlyArray<string>
}

/**
 * Bespoke branded loading surface for the Torque app states gallery.
 *
 * The `states` family ships error/empty/offline screens but no loading screen,
 * so this small composition lives in-folder. It mirrors the family's house
 * style — chrome rotor illustration, status code line, reduced-motion fallback.
 */
export function StatesLoadingScreen({ headline, message, steps }: StatesLoadingScreenProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-labelledby="state-loading-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 240 200"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="ldRotor" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="62%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </radialGradient>
            <linearGradient id="ldArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffc14f" />
              <stop offset="100%" stopColor="#e62028" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="180" rx="80" ry="7" fill="#000" opacity="0.4" />

          {/* Brake rotor spinning */}
          <g className={styles.rotor}>
            <circle cx="120" cy="96" r="62" fill="url(#ldRotor)" stroke="#0a0c10" strokeWidth="2" />
            <circle
              cx="120"
              cy="96"
              r="62"
              fill="none"
              stroke="#3a414c"
              strokeWidth="1"
              opacity="0.6"
              strokeDasharray="2 6"
            />
            <g fill="#0a0c10">
              <circle cx="120" cy="50" r="4" />
              <circle cx="162" cy="74" r="4" />
              <circle cx="162" cy="118" r="4" />
              <circle cx="120" cy="142" r="4" />
              <circle cx="78" cy="118" r="4" />
              <circle cx="78" cy="74" r="4" />
            </g>
            <circle cx="120" cy="96" r="15" fill="#0a0c10" stroke="#3a414c" strokeWidth="2" />
            <circle cx="120" cy="96" r="6" fill="#3a414c" />
          </g>

          {/* Progress arc sweeping the rotor */}
          <circle
            className={styles.arc}
            cx="120"
            cy="96"
            r="74"
            fill="none"
            stroke="url(#ldArc)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="120 345"
          />
        </svg>
        <figcaption className={styles.caption}>Spinning up · please hold</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>LOADING · DASHBOARD</span>
        <h2 id="state-loading-heading" className={styles.headline}>
          {headline}
        </h2>
        <p className={styles.message}>{message}</p>

        <ul className={styles.steps} aria-hidden="true">
          {steps.map((step, index) => (
            <li
              key={step}
              className={styles.step}
              style={{ animationDelay: `${index * 220}ms` }}
            >
              <span className={styles.stepBar} />
              <span className={styles.stepLabel}>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default StatesLoadingScreen
