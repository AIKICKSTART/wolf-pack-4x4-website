import { PlayCircle, Check, Clock } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"
import type { AdminTour } from "./admin-hub-types"

import styles from "./system-tour-launcher.module.css"

interface SystemTourLauncherProps {
  tour: AdminTour
  className?: string
}

export function SystemTourLauncher({ tour, className }: SystemTourLauncherProps) {
  const progressTone = tour.progress >= 100 ? "green" : tour.progress >= 50 ? "teal" : "amber"
  const ctaLabel = tour.progress >= 100
    ? "Replay tour"
    : tour.progress > 0
      ? "Resume tour"
      : "Start tour"

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`${tour.title} tour, ${tour.completedSteps} of ${tour.totalSteps} steps complete`}
    >
      <header className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          <PlayCircle size={20} strokeWidth={2.2} />
        </span>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Welcome tour</span>
          <h3 className={styles.title}>{tour.title}</h3>
          <p className={styles.description}>{tour.description}</p>
        </div>
      </header>

      <div className={styles.progressRow}>
        <ProgressLinear
          value={tour.progress}
          tone={progressTone}
          label={`${tour.completedSteps} of ${tour.totalSteps} steps complete`}
          showLabel={false}
        />
        <div className={styles.progressMeta}>
          <span className={styles.progressCount}>
            <strong>{tour.completedSteps}</strong>
            <em>of {tour.totalSteps} steps</em>
          </span>
          <span className={styles.eta}>
            <Clock size={11} strokeWidth={2.2} aria-hidden="true" />
            {tour.etaLabel}
          </span>
        </div>
      </div>

      <ol className={styles.steps} aria-label="Tour steps">
        {tour.steps.map((step) => (
          <li
            key={step.id}
            className={[styles.step, step.done ? styles.stepDone : ""]
              .filter(Boolean)
              .join(" ")}
            aria-label={`${step.label}, ${step.done ? "complete" : "todo"}`}
          >
            <span className={styles.stepDot} aria-hidden="true">
              {step.done && <Check size={10} strokeWidth={2.6} aria-hidden="true" />}
            </span>
            <span className={styles.stepLabel}>{step.label}</span>
          </li>
        ))}
      </ol>

      <footer className={styles.foot}>
        <button type="button" className={styles.primaryCta}>
          {ctaLabel}
        </button>
        <button type="button" className={styles.secondaryCta}>
          Skip for now
        </button>
      </footer>
    </article>
  )
}

export default SystemTourLauncher
