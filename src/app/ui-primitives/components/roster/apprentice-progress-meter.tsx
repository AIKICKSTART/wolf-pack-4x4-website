import { RadialMeter } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import styles from "./apprentice-progress-meter.module.css"

export interface ApprenticeModulePreview {
  title: string
  /** Estimated hours to complete. */
  estimatedHours: number
}

interface ApprenticeProgressMeterProps {
  apprenticeName: string
  /** Year level — defaults to "Year 3". */
  yearLevel: string
  /** Completed modules. */
  modulesDone: number
  /** Total modules in the program. */
  modulesTotal: number
  /** Percent toward final qualification (0–100). */
  completionPercent: number
  /** Optional next module preview. */
  nextModule?: ApprenticeModulePreview
  className?: string
}

export function ApprenticeProgressMeter({
  apprenticeName,
  yearLevel,
  modulesDone,
  modulesTotal,
  completionPercent,
  nextModule,
  className,
}: ApprenticeProgressMeterProps) {
  const safePercent = Math.max(0, Math.min(100, completionPercent))
  const classes = [styles.meter, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Apprentice progress, ${apprenticeName}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>{yearLevel}</span>
        <strong className={styles.title}>{apprenticeName}</strong>
      </header>

      <div className={styles.body}>
        <div className={styles.radial}>
          <RadialMeter
            value={safePercent}
            label="qualified"
            ariaLabel={`Apprentice qualification progress for ${apprenticeName} at ${safePercent} percent`}
            tone="amber"
            size={140}
            unit="%"
          />
        </div>

        <div className={styles.detail}>
          <Chip
            label={`${modulesDone}/${modulesTotal} modules`}
            tone="teal"
          />
          <ProgressLinear
            value={modulesDone}
            max={modulesTotal}
            tone="amber"
            variant="segmented"
            segments={modulesTotal}
            label="Modules done"
            showLabel
          />

          {nextModule ? (
            <div className={styles.next}>
              <span className={styles.nextKicker}>Next module</span>
              <strong>{nextModule.title}</strong>
              <span className={styles.nextHours}>
                ~ {nextModule.estimatedHours}h to complete
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ApprenticeProgressMeter
