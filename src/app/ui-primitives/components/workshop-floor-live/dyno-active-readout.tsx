import { RadialMeter } from "../charts/radial-meter"
import { StatTile } from "../primitives/stat-tile"
import styles from "./dyno-active-readout.module.css"

export interface DynoActiveReadoutProps {
  /** Vehicle currently on the dyno. */
  vehicle: string
  /** Peak wheel kW measured during the pull. */
  peakKilowatts: number
  /** Peak torque in Nm. */
  peakTorqueNm: number
  /** Current engine RPM. */
  currentRpm: number
  /** Redline / max RPM for gauge scale. */
  maxRpm: number
  /** Current air/fuel lambda value, e.g. 0.92. */
  lambda: number
  /** Run number, e.g. "Run 02 / 04". */
  run?: string
  className?: string
}

export function DynoActiveReadout({
  vehicle,
  peakKilowatts,
  peakTorqueNm,
  currentRpm,
  maxRpm,
  lambda,
  run = "Run 01",
  className,
}: DynoActiveReadoutProps) {
  const classes = [styles.cell, className].filter(Boolean).join(" ")
  const lambdaTone =
    lambda >= 0.95 && lambda <= 1.05
      ? "green"
      : lambda >= 0.88 && lambda <= 1.08
      ? "amber"
      : "red"

  return (
    <section
      className={classes}
      aria-label={`Live dyno readout for ${vehicle}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Dyno cell · live</span>
          <h3 className={styles.title}>{vehicle}</h3>
          <span className={styles.run}>{run}</span>
        </div>
        <RadialMeter
          value={currentRpm}
          max={maxRpm}
          label="RPM"
          tone="red"
          unit=" rpm"
          ariaLabel={`Current engine speed ${currentRpm} of max ${maxRpm} rpm`}
          size={132}
        />
      </header>

      <div className={styles.grid}>
        <StatTile
          label="Peak kW"
          value={peakKilowatts.toString()}
          unit="kW"
          tone="amber"
        />
        <StatTile
          label="Peak torque"
          value={peakTorqueNm.toString()}
          unit="Nm"
          tone="amber"
        />
        <StatTile
          label="Lambda (λ)"
          value={lambda.toFixed(2)}
          tone={lambdaTone}
          caption={
            lambdaTone === "green"
              ? "Stoichiometric"
              : lambdaTone === "amber"
              ? "Borderline mix"
              : "Out of band"
          }
        />
      </div>
    </section>
  )
}

export default DynoActiveReadout
